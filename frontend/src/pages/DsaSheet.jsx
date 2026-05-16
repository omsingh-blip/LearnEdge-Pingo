import { useNavigate } from "react-router-dom";

import DashboardLayout
from "../components/layout/DashboardLayout";

import { dsaQuestions }
from "../data/dsaQuestions";

export default function DsaSheet(){

const navigate=
useNavigate();

const getColor=(difficulty)=>{

switch(difficulty){

case "Easy":
return "text-green-400";

case "Medium":
return "text-yellow-400";

default:
return "text-red-400";

}

};

return(

<DashboardLayout>

<div className="max-w-7xl mx-auto">

<h1
className="
text-3xl
font-bold
mb-8
text-center
"
>

🧠 DSA Sheet

</h1>

<div
className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-5
"
>

{dsaQuestions.map(
(q)=>(

<div
key={q.id}

onClick={() =>
navigate("/practice",{state:{question:q}}
)
}

className="
cursor-pointer

p-5

rounded-2xl

bg-slate-800/70
backdrop-blur-xl

border
border-slate-700

transition-all
duration-300

hover:scale-[1.03]

hover:border-blue-400

hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]
"
>

<h2
className="
font-semibold
text-lg
mb-2
"
>

{q.title}

</h2>

<div
className="
flex
justify-between
text-sm
"
>

<span
className={
getColor(
q.difficulty
)
}
>

{q.difficulty}

</span>

<span>

{q.topic}

</span>

</div>

<div
className="
mt-4
text-yellow-400
"
>

⚡ +{q.xp} XP

</div>

</div>

)

)}

</div>

</div>

</DashboardLayout>

);

}