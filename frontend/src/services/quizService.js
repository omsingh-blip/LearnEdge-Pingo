const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const getToken = () =>
  localStorage.getItem(
    "token"
  );

// ================= GET DOMAIN =================

export const fetchQuizByDomain =
async(domain)=>{

const res=
await fetch(

`${API}/quiz/${domain}`

);

const data=
await res.json();

if(!data.success){

throw new Error(
data.message
);

}

return data.quiz;

};


// ================= ADMIN GET ALL =================

export const getAllQuizzes =
async()=>{

const res=
await fetch(

`${API}/quiz`,

{

headers:{

Authorization:
`Bearer ${getToken()}`

}

}

);

const data=
await res.json();

return data.quizzes;

};


// ================= CREATE =================

export const createQuiz =
async(payload)=>{

const res=
await fetch(

`${API}/quiz`,

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

return await res.json();

};


// ================= UPDATE =================

export const updateQuiz =
async(
id,
payload
)=>{

const res=
await fetch(

`${API}/quiz/${id}`,

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

return await res.json();

};


// ================= DELETE =================

export const deleteQuiz =
async(id)=>{

const res=
await fetch(

`${API}/quiz/${id}`,

{

method:"DELETE",

headers:{

Authorization:
`Bearer ${getToken()}`
}

}

);

return await res.json();

};