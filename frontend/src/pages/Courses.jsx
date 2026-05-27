import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/courseService";
import "../styles/style.css";

function Courses() {

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      const data = await getCourses();
      setCourses(data);
    };

    fetchCourses();

  }, [navigate]);

  const enrollCourse = async (courseId) => {

    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/enrollments/${courseId}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      }
    });

    alert("Enrolled successfully");

  };

  return (

    <div className="courses-page">

      <Navbar />

      <h2 className="courses-title">
        Courses
      </h2>

      <div className="courses-container">

        {courses.map((course) => (

          <div key={course._id}>

            <CourseCard
              course={course}
              enroll={enrollCourse}
              view={(id)=>navigate(`/lectures/${id}`)}
            />

           

          </div>

        ))}

      </div>

    </div>

  );

}

export default Courses;