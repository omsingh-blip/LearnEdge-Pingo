const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const getToken = () =>
  localStorage.getItem("token");


// ================= HELPER =================

const request = async (
  url,
  options = {}
) => {

  const res =
    await fetch(
      `${API}${url}`,
      options
    );

  const data =
    await res.json();

  if(!res.ok){

    throw new Error(
      data.message ||
      "Request failed"
    );

  }

  return data;

};


// ================= GET DOMAIN =================

export const fetchQuizByDomain =
async(domain)=>{

const data =
await request(
`/api/quiz/${domain}`
);

return data.quiz;

};


// ================= ADMIN GET ALL =================

export const getAllQuizzes =
async()=>{

const data =
await request(

"/api/quiz",

{
headers:{
Authorization:
`Bearer ${getToken()}`
}
}

);

return data.quizzes;

};


// ================= CREATE =================

export const createQuiz =
async(payload)=>{

return await request(

"/api/quiz",

{
method:"POST",

headers:{

"Content-Type":
"application/json",

Authorization:
`Bearer ${getToken()}`
},

body:
JSON.stringify(
payload
)

}

);

};


// ================= UPDATE =================

export const updateQuiz =
async(id,payload)=>{

return await request(

`/api/quiz/${id}`,

{
method:"PATCH",

headers:{

"Content-Type":
"application/json",

Authorization:
`Bearer ${getToken()}`
},

body:
JSON.stringify(
payload
)

}

);

};


// ================= DELETE =================

export const deleteQuiz =
async(id)=>{

return await request(

`/api/quiz/${id}`,

{
method:"DELETE",

headers:{
Authorization:
`Bearer ${getToken()}`
}
}

);

};