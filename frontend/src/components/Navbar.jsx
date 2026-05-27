import { useNavigate } from "react-router-dom";
import logo from "../assets/LearnHub.png";

function Navbar() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>

      {/* MAIN NAVBAR */}

      <div className="navbar">

        <div className="nav-left">
          <img
            src={logo}
            alt="LearnHub Logo"
            className="logo"
            onClick={() => navigate("/")}
          />
        </div>

        <div className="nav-right">

          <button onClick={() => navigate("/courses")}>
            Courses
          </button>

          {token ? (
            <button onClick={logout}>
              Logout
            </button>
          ) : (
            <button onClick={() => navigate("/login")}>
              Login
            </button>
          )}

        </div>

      </div>


     

      </div>

    
  );
}

export default Navbar;