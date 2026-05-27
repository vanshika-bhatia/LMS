import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email: email,
          password: password
        }
      );

      // save data in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("role", res.data.user.role);

      // redirect based on role
      if(res.data.user.role === "admin"){
        navigate("/admin");
      } else {
        navigate("/courses");
      }

    }catch (err) {
  alert(err.response?.data?.message || "Login failed");
}
  };

  return (

    <div className="login-page">

      {/* LEFT SIDE LOGIN FORM */}

      <div className="login-left">

      <form className="login-card" onSubmit={handleLogin}>

  <h2 className="login-title">Login to LearnHub</h2>

  <input
    type="email"
    placeholder="Enter Email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
  />

  <input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
  />

  <div className="login-links">
    <a href="#">Forgot Password?</a>
  </div>

  <button className="login-btn">Login</button>

  <p className="login-register">
     New to LearnHub? <a href="/register">Register</a>
  </p>

</form>
      </div>

      {/* RIGHT SIDE WELCOME SECTION */}

      <div className="login-right">

        <h1>WELCOME TO<br/>LEARNHUB</h1>

        <p>
          Learn coding, core computer science subjects,
          aptitude and interview preparation all in one platform.
        </p>

      </div>

    </div>
  );
}

export default Login;