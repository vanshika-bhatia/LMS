import express from "express";
import Enrollment from "../models/Enrollment.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* ENROLLMENT COUNT */
router.get("/count", async (req, res) => {
  try {
    const count = await Enrollment.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* MY COURSES — must be before /:courseId to avoid being matched as a param */
router.get("/my-courses", protect, async (req, res) => {
  try {
    const courses = await Enrollment.find({ student: req.user._id })
      .populate("course");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ENROLL */
router.post("/:courseId", protect, async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Prevent duplicate enrollments
    const existing = await Enrollment.findOne({
      student: req.user._id,
      course: courseId
    });

    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
