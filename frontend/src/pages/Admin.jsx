import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import "../styles/admin.css";

function Admin(){

const navigate = useNavigate();
const username = localStorage.getItem("username") || "Admin";

const [usersCount,setUsersCount] = useState(0);
const [coursesCount,setCoursesCount] = useState(0);
const [enrollCount,setEnrollCount] = useState(0);

const logout = ()=>{
localStorage.clear();
navigate("/");
window.location.reload();
};

useEffect(()=>{

const fetchStats = async()=>{

try{

const users = await axios.get("http://localhost:5000/api/users/count");
const courses = await axios.get("http://localhost:5000/api/courses/count");
const enroll = await axios.get("http://localhost:5000/api/enrollments/count");

setUsersCount(users.data.count);
setCoursesCount(courses.data.count);
setEnrollCount(enroll.data.count);

}catch(err){
console.log(err);
}

};

fetchStats();

},[]);

return(

<div className="admin-layout">

{/* SIDEBAR */}

<div className="admin-sidebar">

<div
  className="admin-logo"
  onClick={() => navigate("/")}
  style={{ cursor: "pointer" }}
>
 📚 LearnHub
</div>

<ul>

<li className="active" onClick={()=>navigate("/admin")}>
Dashboard
</li>

<li onClick={()=>navigate("/courses")}>
Courses
</li>

<li onClick={()=>navigate("/users")}>
Students
</li>

<li>
Reports
</li>

</ul>

</div>

{/* MAIN */}

<div className="admin-main">

{/* TOPBAR */}

<div className="admin-topbar">

<h2>Dashboard Overview</h2>

<div className="topbar-right">

<input
className="admin-search"
placeholder="Search courses..."
/>

<div className="admin-user">

<span>{username}</span>

<button onClick={logout}>
Logout
</button>

</div>

</div>

</div>

{/* STATS */}

<div className="stats-grid">

<div className="stat-card blue">

<div className="stat-icon">📘</div>

<h2>{coursesCount}</h2>

<p>Total Courses</p>

</div>

<div className="stat-card orange">

<div className="stat-icon">👨‍🎓</div>

<h2>{usersCount}</h2>

<p>Total Users</p>

</div>

<div className="stat-card purple">

<div className="stat-icon">📈</div>

<h2>{enrollCount}</h2>

<p>Total Enrollments</p>

</div>

</div>

{/* ACTION CARDS */}

<div className="action-grid">

<div
className="action-card"
onClick={()=>navigate("/create-course")}
>

<h3>Add New Course</h3>

<p>Create a new LMS course</p>

</div>

<div
className="action-card"
onClick={()=>navigate("/admin/courses")}
>

<h3>Manage Courses</h3>

<p>Edit or delete courses</p>

</div>

<div
className="action-card"
onClick={()=>navigate("/users")}
>

<h3>Manage Students</h3>

<p>View registered users</p>

</div>

</div>

</div>

</div>

);

}

export default Admin;