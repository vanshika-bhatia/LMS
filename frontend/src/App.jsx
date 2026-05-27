import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Courses from "./pages/Courses";
import LecturePlayer from "./pages/LecturePlayer";
import QuizPlayer from "./pages/QuizPlayer";

import Admin from "./pages/Admin";
import AdminCourses from "./pages/AdminCourses";
import Students from "./pages/Students";

import CreateCourse from "./pages/CreateCourse";
import AddLecture from "./pages/AddLecture";
import AddQuiz from "./pages/AddQuiz";

import About from "./pages/About";
import Contact from "./pages/Contact";

// Guard: only logged-in admins can access admin pages
function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token || role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// Guard: only logged-in users can access protected pages
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* STUDENT ROUTES */}
      <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
      <Route path="/lectures/:courseId" element={<ProtectedRoute><LecturePlayer /></ProtectedRoute>} />
      <Route path="/quiz/:courseId" element={<ProtectedRoute><QuizPlayer /></ProtectedRoute>} />

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
      <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
      <Route path="/users" element={<AdminRoute><Students /></AdminRoute>} />
      <Route path="/create-course" element={<AdminRoute><CreateCourse /></AdminRoute>} />
      <Route path="/add-lecture/:courseId" element={<AdminRoute><AddLecture /></AdminRoute>} />
      <Route path="/add-quiz/:courseId" element={<AdminRoute><AddQuiz /></AdminRoute>} />

    </Routes>
  );
}

export default App;
