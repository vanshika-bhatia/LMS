import express from "express";
import Lecture from "../models/Lecture.js";
import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";
import Enrollment from "../models/Enrollment.js";

const router = express.Router();

// Admin adds lecture
router.post("/:courseId", protect, authorizeRoles("admin"), async (req, res) => {
  try {

    const { title, videoUrl } = req.body;

    const lecture = await Lecture.create({
      title,
      videoUrl,
      course: req.params.courseId
    });

    res.status(201).json(lecture);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Students view lectures (only if enrolled)
router.get("/:courseId", protect, async (req, res) => {

  const enrolled = await Enrollment.findOne({
    student: req.user._id,
    course: req.params.courseId
  });

  if (!enrolled) {
    return res.status(403).json({ message: "You are not enrolled in this course" });
  }

  const lectures = await Lecture.find({ course: req.params.courseId });

  res.json(lectures);
});

export default router;