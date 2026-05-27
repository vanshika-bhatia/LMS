import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/enrollments/my-courses", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEnrollments(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnrollments();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "30px" }}>
        <h2>My Courses</h2>
        {enrollments.length === 0 ? (
          <p>You haven't enrolled in any courses yet. <span style={{ color: "#6c63ff", cursor: "pointer" }} onClick={() => navigate("/courses")}>Browse courses</span></p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
            {enrollments.map(e => (
              <div key={e._id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", minWidth: "200px" }}>
                <h3>{e.course?.title || "Course"}</h3>
                <p>{e.course?.description}</p>
                <button onClick={() => navigate(`/lectures/${e.course?._id}`)}>
                  Continue Learning
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
