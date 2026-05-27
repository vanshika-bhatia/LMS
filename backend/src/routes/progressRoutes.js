import express from "express";
import Progress from "../models/Progress.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// mark lecture as completed
router.post("/:courseId/:lectureId", protect, async (req, res) => {
  let progress = await Progress.findOne({
    student: req.user._id,
    course: req.params.courseId
  });

  if (!progress) {
    progress = await Progress.create({
      student: req.user._id,
      course: req.params.courseId,
      completedLectures: []
    });
  }

  if (!progress.completedLectures.includes(req.params.lectureId)) {
    progress.completedLectures.push(req.params.lectureId);
    await progress.save();
  }

  res.json(progress);
});

export default router;