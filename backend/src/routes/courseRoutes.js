import express from "express";
import Course from "../models/Course.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/* COURSE COUNT */
router.get("/count", async (req, res) => {
  try {
    const count = await Course.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* CREATE COURSE (ONLY ADMIN) */
router.post("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      instructor: req.user._id
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET ALL COURSES */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE COURSE (ONLY ADMIN) */
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
