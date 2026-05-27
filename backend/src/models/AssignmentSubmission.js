import mongoose from "mongoose";

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true
    },
    answerText: String,
    submittedAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("AssignmentSubmission", assignmentSubmissionSchema);