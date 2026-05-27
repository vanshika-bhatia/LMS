import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/quiz.css";

function AddQuiz() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not logged in");
      return;
    }

    if (!courseId) {
      alert("Invalid course ID");
      return;
    }

    if (!options.includes(correctAnswer)) {
      alert("Correct answer must match one of the options");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/api/quiz/${courseId}`,
        {
          question,
          options,
          correctAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Quiz added successfully");
      navigate("/admin/courses");

    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to add quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <h2>Add Quiz</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          {options.map((opt, index) => (
            <input
              key={index}
              placeholder={`Option ${index + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}

          {/* Correct Answer Dropdown */}
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          >
            <option value="">Select correct answer</option>
            {options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt || `Option ${index + 1}`}
              </option>
            ))}
          </select>

          <button className="quiz-btn" disabled={loading}>
            {loading ? "Adding..." : "Add Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddQuiz;