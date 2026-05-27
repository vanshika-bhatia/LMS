import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/admin.css";

function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(res.data.filter(u => u.role === "student"));
      } catch (err) {
        console.log(err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="admin-layout">

      <div className="admin-sidebar">
        <div className="admin-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          📚 LearnHub
        </div>
        <ul>
          <li onClick={() => navigate("/admin")}>Dashboard</li>
          <li onClick={() => navigate("/courses")}>Courses</li>
          <li className="active" onClick={() => navigate("/users")}>Students</li>
          <li>Reports</li>
        </ul>
      </div>

      <div className="admin-main">

        <div className="admin-topbar">
          <h2>Registered Students</h2>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr style={{ background: "#f0f0f0" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{student.name}</td>
                <td style={{ padding: "10px" }}>{student.email}</td>
                <td style={{ padding: "10px" }}>{new Date(student.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <p style={{ marginTop: "20px", color: "#888" }}>No students registered yet.</p>
        )}

      </div>
    </div>
  );
}

export default Students;
