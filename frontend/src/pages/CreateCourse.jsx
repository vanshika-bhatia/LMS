import { useState } from "react";
import axios from "axios";
import "../styles/createCourse.css";
import { useNavigate } from "react-router-dom";

function CreateCourse(){

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");

const navigate = useNavigate();
const [image,setImage] = useState(null);
const handleSubmit = async(e)=>{

e.preventDefault();

try{

const token = localStorage.getItem("token");

await axios.post(
"http://localhost:5000/api/courses",
{
title,
description
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

alert("Course created successfully");

setTitle("");
setDescription("");

navigate("/admin");

}catch(err){

console.log(err.response?.data);

alert(err.response?.data?.message || "Error creating course");

}

};

return(

<div className="create-course-page">

<div className="create-course-container">

<h2>Create Course</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
placeholder="Course Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
/>

<input
  type="file"
  accept="image/*"
  onChange={(e)=>setImage(e.target.files[0])}
/>

<textarea
placeholder="Course Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
required
/>

<button
className="create-course-btn"
type="submit"
>
Create Course
</button>

</form>

</div>

</div>

);

}

export default CreateCourse;