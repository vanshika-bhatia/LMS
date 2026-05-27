import express from "express";
import AssignmentSubmission from "../models/AssignmentSubmission.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// submit assignment
router.post("/:assignmentId", protect, async (req, res) => {
  const { answerText } = req.body;

  const submission = await AssignmentSubmission.create({
    student: req.user._id,
    assignment: req.params.assignmentId,
    answerText,
    submittedAt: new Date()
  });

  res.status(201).json(submission);
});

export default router;