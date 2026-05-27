import express from "express";
import Quiz from "../models/Quiz.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* Add Quiz */

router.post("/:courseId",protect,async(req,res)=>{

try{

const {question,options,correctAnswer} = req.body;

const quiz = await Quiz.create({
question,
options,
correctAnswer,
course:req.params.courseId
});

res.status(201).json(quiz);

}catch(error){
res.status(500).json({error:error.message});
}

});

/* Get Quiz for Course */

router.get("/:courseId",protect,async(req,res)=>{

const quizzes = await Quiz.find({
course:req.params.courseId
});

res.json(quizzes);

});

export default router;