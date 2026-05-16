import Review from "../models/Review.js";

import asyncHandler from "../utils/asyncHandler.js";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

// ================= AI REVIEW + SAVE =================
export const createReview =
asyncHandler(async (req,res)=>{

try{

const {
problem,
language,
code
}=req.body;

const genAI =
new GoogleGenerativeAI(
process.env.GEMINI_API_KEY?.trim()
);

const model=
genAI.getGenerativeModel({

model:"gemini-2.5-flash"

});

const prompt=`

You are a senior software engineer.

Review this code.

Problem:
${problem}

Language:
${language}

Code:
${code}

Return ONLY JSON:

{
"status":"",
"earnedXp":0,
"feedback":{
"bugs":[],
"optimization":[],
"readability":[],
"bestPractices":[],
"summary":""
}
}

Rules:

- Find bugs
- Suggest optimizations
- Suggest cleaner code
- Suggest best practices
- Give XP from 5–50
- status:
Excellent
Good
Needs Improvement

`;

const result=
await model.generateContent(
prompt
);

let text=
result.response
.text()
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();

let aiData;

try{

aiData=
JSON.parse(text);

}
catch{

aiData={

status:
"Needs Improvement",

earnedXp:5,

feedback:{

bugs:[],

optimization:[],

readability:[],

bestPractices:[],

summary:text

}

};

}

const review=
await Review.create({

user:req.user.id,

problem,

language,

code,

status:
aiData.status,

earnedXp:
aiData.earnedXp,

feedback:
aiData.feedback

});

res.status(201).json({

success:true,

review

});

}

catch(error){

console.error(
"Review Error:",
error
);

res.status(500).json({

success:false,

message:
error.message

});

}

});

// ================= GET REVIEWS =================

export const getUserReviews=
asyncHandler(async(req,res)=>{

const reviews=
await Review.find({

user:req.user.id

}).sort({

createdAt:-1

});

res.status(200).json({

success:true,
reviews

});

});