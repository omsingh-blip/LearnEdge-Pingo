import axios from "axios";

const languageMap = {

  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54

};

export const runCode =
async(req,res)=>{

try{

const {
code,
language
}=req.body;

const language_id=
languageMap[
language
];

if(!language_id){

return res.status(400).json({

success:false,
message:"Unsupported language"

});

}

const submit =
await axios.post(

"https://ce.judge0.com/submissions?base64_encoded=false&wait=true",

{
source_code:code,
language_id
},

{
headers:{
"Content-Type":"application/json"
}
}

);

res.json({

success:true,

output:

submit.data.stdout ||

submit.data.stderr ||

submit.data.compile_output ||

"Executed successfully"

});

}

catch(error){

console.log(
error.response?.data ||
error.message
);

res.status(500).json({

success:false,

message:"Execution failed"

});

}

};