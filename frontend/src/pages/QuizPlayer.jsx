import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/quiz.css";

function QuizPlayer(){

const { courseId } = useParams();

const [quiz,setQuiz] = useState([]);
const [answers,setAnswers] = useState({});
const [score,setScore] = useState(null);

useEffect(()=>{

const fetchQuiz = async()=>{

const token = localStorage.getItem("token");

const res = await axios.get(
`http://localhost:5000/api/quiz/${courseId}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setQuiz(res.data);

};

fetchQuiz();

},[courseId]);

const handleOptionChange = (questionId,option)=>{
setAnswers({...answers,[questionId]:option});
};

const submitQuiz = ()=>{

let correct = 0;

quiz.forEach(q=>{
if(answers[q._id] === q.correctAnswer){
correct++;
}
});

setScore(correct);

};

return(

<div className="quiz-page">

<div className="quiz-card">

<h2>Course Quiz</h2>

{quiz.map((q)=>(
<div key={q._id} className="quiz-question">

<h3>{q.question}</h3>

{q.options.map((opt,i)=>(
<label key={i} className="quiz-option">

<input
type="radio"
name={q._id}
value={opt}
onChange={()=>handleOptionChange(q._id,opt)}
/>

{opt}

</label>
))}

</div>
))}

<button className="quiz-btn" onClick={submitQuiz}>
Submit Quiz
</button>

{score !== null && (
<h3>Your Score: {score} / {quiz.length}</h3>
)}

</div>

</div>

);

}

export default QuizPlayer;