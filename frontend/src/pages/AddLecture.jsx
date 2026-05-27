import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/addLecture.css";

function AddLecture(){

const { courseId } = useParams();
const navigate = useNavigate();

const [title,setTitle] = useState("");
const [videoUrl,setVideoUrl] = useState("");

const handleSubmit = async(e)=>{
e.preventDefault();

try{

const token = localStorage.getItem("token");

await axios.post(
`http://localhost:5000/api/lectures/${courseId}`,
{
title,
videoUrl
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

alert("Lecture added successfully");

setTitle("");
setVideoUrl("");

navigate("/admin");

}catch(err){
console.log(err);
alert("Error adding lecture");
}

};

return(

<div className="add-lecture-page">

<div className="add-lecture-card">

<h2>Add Lecture</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Lecture Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
/>

<input
type="text"
placeholder="Youtube Video URL"
value={videoUrl}
onChange={(e)=>setVideoUrl(e.target.value)}
required
/>

<button type="submit">
Add Lecture
</button>

</form>

</div>

</div>

);

}

export default AddLecture;