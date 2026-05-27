import express from "express";
import Quiz from "../models/Quiz.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Add quiz question
router.post("/:courseId", protect, async (req, res) => {
  const { question, options, answer } = req.body;

  const quiz = await Quiz.create({
    question,
    options,
    answer,
    course: req.params.courseId
  });

  res.status(201).json(quiz);
});

// Get quiz for a course
router.get("/:courseId", protect, async (req, res) => {
  const quizzes = await Quiz.find({ course: req.params.courseId });
  res.json(quizzes);
});

export default router;