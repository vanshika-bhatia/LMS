import mongoose from "mongoose";

const quizSubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true
    },
    selectedAnswer: String,
    isCorrect: Boolean
  },
  { timestamps: true }
);

export default mongoose.model("QuizSubmission", quizSubmissionSchema);