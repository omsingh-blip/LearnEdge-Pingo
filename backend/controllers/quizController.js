import Quiz from "../models/Quiz.js";

// ================= GET ALL =================

export const getAllQuizzes =
async(req,res)=>{

try{

const quizzes=
await Quiz.find()
.sort({
createdAt:-1
});

res.status(200).json({

success:true,
quizzes

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};


// ================= GET DOMAIN =================

export const getQuizByDomain =
async(req,res)=>{

try{

const {
domain
}=req.params;

const quiz=
await Quiz.findOne({

domain

});

if(!quiz){

return res
.status(404)
.json({

success:false,

message:
"Quiz not found"

});

}

res.status(200).json({

success:true,
quiz

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};


// ================= CREATE =================

export const createQuiz =
async(req,res)=>{

try{

const {
domain,
questions
}=req.body;

const exists=
await Quiz.findOne({

domain

});

if(exists){

return res
.status(400)
.json({

success:false,

message:
"Quiz already exists"

});

}

const quiz=
await Quiz.create({

domain,
questions

});

res.status(201).json({

success:true,
quiz

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};


// ================= UPDATE =================

export const updateQuiz =
async(req,res)=>{

try{

const {
id
}=req.params;

const updated=
await Quiz.findByIdAndUpdate(

id,

req.body,

{
new:true
}

);

res.status(200).json({

success:true,

quiz:
updated

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};


// ================= DELETE =================

export const deleteQuiz =
async(req,res)=>{

try{

const {
id
}=req.params;

await Quiz.findByIdAndDelete(
id
);

res.status(200).json({

success:true,

message:
"Quiz deleted"

});

}

catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};