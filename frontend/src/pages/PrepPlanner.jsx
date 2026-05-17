import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PrepPlanner() {

const API =
import.meta.env.VITE_API_URL;

const navigate =
useNavigate();

const [form,setForm] =
useState({

domain:"",
topics:"",
level:"Beginner"

});

const [result,setResult] =
useState(null);

const [loading,setLoading] =
useState(false);


// ================= GENERATE =================

const handleGenerate =
async()=>{

if(
!form.domain ||
!form.topics
){

return alert(
"Fill all fields"
);

}

const user =
JSON.parse(
localStorage.getItem(
"user"
)
);

if(!user){

alert(
"Please login again"
);

return;

}

try{

setLoading(true);

const token =
localStorage.getItem(
"token"
);

const res =
await axios.post(

`${API}/api/prep-planner`,

{

student_id:
user?.email ||
user?.id ||
"Unknown Student",

domain:
form.domain,

topics:
form.topics,

duration:
"1 Day",

level:
form.level.toLowerCase()

},

{

headers:{

Authorization:
`Bearer ${token}`

}

}

);

setResult(
res.data
);

}

catch(err){

console.error(
err.response?.data ||
err.message
);

alert(
"Failed to generate plan"
);

}

finally{

setLoading(false);

}

};


return(

<>

<button

onClick={()=>
navigate(
"/dashboard"
)
}

className="
m-4
mb-4
px-5
py-2

rounded-xl

bg-slate-800/80

border
border-slate-700

text-white

hover:border-blue-400

hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]

transition-all
duration-300
"
>

← Back to Dashboard

</button>


<div
className="
min-h-screen

bg-slate-900

text-white

flex
items-center
justify-center

px-6
"
>

<div
className="
w-full
max-w-3xl

bg-slate-800/70

backdrop-blur-xl

p-8

rounded-2xl

shadow-[0_0_40px_rgba(59,130,246,0.2)]
"
>

<h1
className="
text-3xl
font-bold
mb-6
text-center
"
>

⚡ 1-Day Prep Planner

</h1>


<div
className="
grid
gap-4
max-w-md
mx-auto
"
>

<input

placeholder=
"Domain (e.g. Web Dev)"

className="
p-3
text-black
rounded-lg
outline-none
"

onChange={(e)=>

setForm({

...form,

domain:
e.target.value

})

}

/>


<input

placeholder="Topics"

className="
p-3
text-black
rounded-lg
outline-none
"

onChange={(e)=>

setForm({

...form,

topics:
e.target.value

})

}

/>


<select

className="
p-3
text-black
rounded-lg
outline-none
"

onChange={(e)=>

setForm({

...form,

level:
e.target.value

})

}

>

<option>
Beginner
</option>

<option>
Intermediate
</option>

</select>


<button

onClick={
handleGenerate
}

className="
bg-blue-500

px-6
py-3

rounded-lg

hover:scale-105

transition-all
duration-300
"
>

{

loading

?

"⚡ Generating AI Plan..."

:

"Generate Plan"

}

</button>

</div>


{result && (

<div
className="
mt-10
grid
gap-6
"
>

<div
className="
bg-slate-800/80
p-6
rounded-xl
border
border-slate-700
"
>

<h2
className="
text-2xl
font-bold
text-blue-400
"
>

{
result.study_plan_title
}

</h2>

</div>

</div>

)}

</div>

</div>

</>

);

}