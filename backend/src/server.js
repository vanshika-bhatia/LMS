import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import lectureRoutes from "./routes/lectureRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import quizSubmissionRoutes from "./routes/quizSubmissionRoutes.js";
import assignmentSubmissionRoutes from "./routes/assignmentSubmissionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/lectures", lectureRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/quiz-submissions", quizSubmissionRoutes);
app.use("/api/assignment-submissions", assignmentSubmissionRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({ message: "LMS Backend Running Successfully 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});