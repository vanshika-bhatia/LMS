import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/* USER COUNT */
router.get("/count", async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* REGISTER USER */
router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Role is always "student" on self-registration — admin must be set in DB directly
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student"
    });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* LOGIN USER */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // FIX: use JWT_SECRET from environment, not hardcoded string
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* PROFILE */
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

/* ALL USERS — admin only */
router.get("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ADMIN ROUTE */
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;
