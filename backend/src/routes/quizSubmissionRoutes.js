import express from "express";
import Quiz from "../models/Quiz.js";
import QuizSubmission from "../models/QuizSubmission.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// submit quiz answer
router.post("/:quizId", protect, async (req, res) => {
  const { selectedAnswer } = req.body;

  const quiz = await Quiz.findById(req.params.quizId);

  const submission = await QuizSubmission.create({
    student: req.user._id,
    quiz: quiz._id,
    selectedAnswer,
    isCorrect: quiz.answer === selectedAnswer
  });

  res.status(201).json(submission);
});

export default router;