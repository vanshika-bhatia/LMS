import express from "express";
import Assignment from "../models/Assignment.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// create assignment
router.post("/:courseId", protect, async (req, res) => {
  const { title, description, dueDate } = req.body;

  const assignment = await Assignment.create({
    title,
    description,
    dueDate,
    course: req.params.courseId
  });

  res.status(201).json(assignment);
});

// get assignments of a course
router.get("/:courseId", protect, async (req, res) => {
  const assignments = await Assignment.find({
    course: req.params.courseId
  });

  res.json(assignments);
});

export default router;