import mernLogo from "../assets/mern.png";
import nodeLogo from "../assets/nodejs.png";

function CourseCard({ course, enroll, view }) {

  const image =
    course.title.includes("MERN")
      ? mernLogo
      : course.title.includes("Node")
      ? nodeLogo
      : "https://via.placeholder.com/100";

  return (

    <div className="course-card">

      <img
        src={image}
        alt={course.title}
        className="course-img"
      />

      <h3>{course.title}</h3>

      <p>{course.description}</p>

      <div className="course-buttons">

        <button onClick={() => enroll(course._id)}>
          Enroll
        </button>

        <button onClick={() => view(course._id)}>
          View Lectures
        </button>

      </div>

    </div>

  );
}

export default CourseCard;