export const reviewCode =
async({
  question_name,
  student_id,
  student_solution,
})=>{

const response =
await fetch(

`${import.meta.env.VITE_API_URL}/api/reviews/review-code`,

{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify({
question_name,
student_id,
student_solution
})

}

);

const data =
await response.json();

if(!response.ok){

throw new Error(
data.message ||
"Review failed"
);

}

return data;

};