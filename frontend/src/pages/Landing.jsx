import { useNavigate } from "react-router-dom";
import "../styles/landing.css";
import logo from "../assets/LearnHub.png";
import mernLogo from "../assets/mern.png";
import nodeLogo from "../assets/nodejs.png";

function Landing() {

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  return (

    <div className="landing-page">

      {/* NAVBAR */}

      <div className="landing-navbar">

        <div className="landing-logo">
          <img src={logo} alt="LearnHub" />
          <h2>LearnHub</h2>
        </div>

        <div className="landing-nav-buttons">

          <button onClick={() => navigate("/")}>
            Home
          </button>

          <button onClick={() => navigate("/courses")}>
            Courses
          </button>

          <button
            className="primary-btn"
            onClick={() => {

              const role = localStorage.getItem("role");

              if (!username) {
                navigate("/login");
              }
              else if (role === "admin") {
                navigate("/admin");
              }
              else {
                navigate("/courses");
              }

            }}
          >
            {username ? username : "Account"}
          </button>

        </div>

      </div>

      {/* HERO SECTION */}

      <div className="hero">

        <h1>Learn Modern Tech Skills</h1>

        <p>
          Master MERN Stack, JavaScript and Backend Development with
          structured courses and real world projects.
        </p>

        <button
          className="cta"
          onClick={() => navigate("/courses")}
        >
          Explore Courses
        </button>

      </div>

      {/* FEATURES */}

      <div className="features-section">

        <h2>Platform Features</h2>

        <div className="features">

          <div className="feature-card">
            <h3>📚 Courses</h3>
            <p>Structured learning paths for developers.</p>
          </div>

          <div className="feature-card">
            <h3>🎥 Video Lectures</h3>
            <p>Watch coding tutorials and improve skills.</p>
          </div>

          <div className="feature-card">
            <h3>📝 Assignments</h3>
            <p>Practice coding through assignments.</p>
          </div>

          <div className="feature-card">
            <h3>🧠 Quizzes</h3>
            <p>Test your knowledge after each section.</p>
          </div>

          <div className="feature-card">
            <h3>📊 Progress Tracking</h3>
            <p>Track your learning progress easily.</p>
          </div>

        </div>

      </div>

      {/* FEATURED COURSES */}

      <div className="featured-courses">

        <h2>Popular Courses</h2>

        <div className="course-preview">

          <div className="preview-card">
            <img src={mernLogo} alt="MERN" />
            <h3>MERN Stack</h3>
            <p>Full stack development course</p>
          </div>

          <div className="preview-card">
            <img src={nodeLogo} alt="Node" />
            <h3>Node.js Basics</h3>
            <p>Learn backend development</p>
          </div>

        </div>

      </div>

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-container">

          <div
            className="footer-left"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            LearnHub
          </div>

          <div className="footer-right">

            <a onClick={() => navigate("/about")}>
              About
            </a>

            <a onClick={() => navigate("/courses")}>
              Courses
            </a>

            <a onClick={() => navigate("/contact")}>
              Contact
            </a>

            <a onClick={() => navigate("/privacy")}>
              Privacy
            </a>

          </div>

        </div>

        <div className="footer-bottom">
          © 2026 LearnHub. All rights reserved.
        </div>

      </footer>

    </div>

  );
}

export default Landing;