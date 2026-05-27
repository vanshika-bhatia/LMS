import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminCourses.css";

function AdminCourses() {

const [courses,setCourses] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

const fetchCourses = async()=>{

try{

const res = await axios.get("http://localhost:5000/api/courses");
setCourses(res.data);

}catch(err){
console.log(err);
}

};

fetchCourses();

},[]);

const deleteCourse = async(courseId)=>{

try{

const token = localStorage.getItem("token");

await axios.delete(
`http://localhost:5000/api/courses/${courseId}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setCourses(courses.filter(c=>c._id !== courseId));

}catch(err){
console.log(err);
}

};

return(

<div className="admin-page">

<div className="admin-header">

<h1>Manage Courses</h1>



</div>

<div className="course-grid">

{courses.map(course=>(

<div key={course._id} className="course-card-admin">

<div className="course-thumbnail"></div>

<div className="course-content">

<h3>{course.title}</h3>

<p>{course.description}</p>

<div className="course-actions">

<button
onClick={()=>navigate(`/lectures/${course._id}`)}
>
View
</button>

<button
onClick={()=>navigate(`/add-lecture/${course._id}`)}
>
Add Lecture
</button>

<button
onClick={()=>navigate(`/add-quiz/${course._id}`)}
>
Add Quiz
</button>

<button
className="delete-btn"
onClick={()=>deleteCourse(course._id)}
>
Delete
</button>

</div>

</div>

</div>

))}

</div>

</div>

);

}

export default AdminCourses;