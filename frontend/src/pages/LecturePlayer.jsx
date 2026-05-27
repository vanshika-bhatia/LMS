import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function LecturePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [currentVideo, setCurrentVideo] = useState("");

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:5000/api/lectures/${courseId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setLectures(res.data);

        if (res.data.length > 0) {
          setCurrentVideo(res.data[0].videoUrl);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchLectures();
  }, [courseId]);

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/");
    if (url.includes("youtu.be")) return url.replace("youtu.be/", "youtube.com/embed/");
    return url;
  };

  return (
    <div>
      <Navbar />

      <div className="player-layout">

        <div className="sidebar">
          <h3>Course Modules</h3>

          {lectures.map((lecture) => (
            <div
              key={lecture._id}
              className="sidebar-item"
              onClick={() => setCurrentVideo(lecture.videoUrl)}
            >
              {lecture.title}
            </div>
          ))}

          {/* FIX: quiz button now navigates to the quiz page */}
          <button
            className="quiz-button"
            onClick={() => navigate(`/quiz/${courseId}`)}
          >
            Take Module Quiz
          </button>
        </div>

        <div className="player-main">
          {currentVideo && (
            <iframe
              width="100%"
              height="500"
              src={getEmbedUrl(currentVideo)}
              title="Video Player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
        </div>

      </div>
    </div>
  );
}

export default LecturePlayer;
