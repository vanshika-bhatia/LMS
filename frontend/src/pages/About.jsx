import { useNavigate } from "react-router-dom";
import "../styles/about.css";

function About() {

  const navigate = useNavigate();

  return (

    <div className="about-page">

      {/* NAVBAR */}

      <div className="about-navbar">

        <h2
          className="about-logo"
          onClick={() => navigate("/")}
        >
          LearnHub
        </h2>

        <div className="about-nav-buttons">

          <button onClick={() => navigate("/")}>
            Home
          </button>

          

        </div>

      </div>

      {/* HERO */}

      <div className="about-hero">

        <h1>About LearnHub</h1>

        <p>
          LearnHub is a modern learning platform designed to help students
          master software development and computer science through
          structured courses, video lectures, assignments, and quizzes.
        </p>

      </div>

      {/* CONTENT */}

      <div className="about-content">

        <div className="about-card">

          <h3>🎯 Our Mission</h3>

          <p>
            Our mission is to make high‑quality technical education
            accessible to everyone and help students become job‑ready
            developers.
          </p>

        </div>

        <div className="about-card">

          <h3>🚀 What We Offer</h3>

          <ul>
            <li>MERN Stack Development</li>
            <li>Backend Development</li>
            <li>Data Structures & Algorithms</li>
            <li>System Design</li>
            <li>Interview Preparation</li>
          </ul>

        </div>

        <div className="about-card">

          <h3>👩‍💻 Built For</h3>

          <p>
            LearnHub is built for students, aspiring developers,
            and professionals who want to improve their coding
            skills and build real‑world projects.
          </p>

        </div>

      </div>

      {/* FOOTER */}

      <footer className="about-footer">

        <p>© 2026 LearnHub. All rights reserved.</p>

      </footer>

    </div>

  );

}

export default About;