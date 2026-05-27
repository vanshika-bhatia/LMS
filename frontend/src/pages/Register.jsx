import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/users/create", {
        name,
        email,
        password
      });

      alert("Account created successfully");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-page">

      {/* LEFT SIDE */}
      <div className="register-left">
        <div className="register-container">

          <h2>Create Account</h2>

          <form onSubmit={handleRegister}>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="register-btn">
              Create Account
            </button>

            <p className="register-extra">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Login</span>
            </p>

          </form>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="register-right">
        <div className="bg-animation">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div className="welcome-text">
          <h1>Join<br/>LearnHub</h1>
          <p className="tagline">
            Start learning MERN stack, system design,
            data structures, aptitude and more.
          </p>
        </div>
      </div>

    </div>
  );
}

export default Register;
