import express from "express";
import Enrollment from "../models/Enrollment.js";
import AssignmentSubmission from "../models/AssignmentSubmission.js";
import QuizSubmission from "../models/QuizSubmission.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  const courses = await Enrollment.find({ student: req.user._id }).populate("course");

  const assignments = await AssignmentSubmission.find({ student: req.user._id });

  const quizzes = await QuizSubmission.find({ student: req.user._id });

  res.json({
    enrolledCourses: courses.length,
    assignmentsSubmitted: assignments.length,
    quizzesAttempted: quizzes.length
  });
});

export default router;