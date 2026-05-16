import DashboardLayout
from "../components/layout/DashboardLayout";

import { useNavigate }
from "react-router-dom";

export default function Admin(){

const navigate =
useNavigate();

const sections=[

{
title:"🧠 Manage Quiz",
desc:"Create / Edit quizzes",
path:"/admin/quiz"
},

{
title:"📚 Manage Notes",
desc:"Update markdown notes",
path:"/admin/notes"
},

{
title:"🧩 Manage DSA",
desc:"Add or edit DSA questions",
path:"/admin/dsa"
}

];

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

⚙ Admin Dashboard

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

{sections.map((item)=>(

<div
key={item.title}

onClick={()=>
navigate(
item.path
)
}

className="
cursor-pointer

p-6

rounded-2xl

bg-slate-800/60
backdrop-blur-xl

border
border-slate-700

transition-all
duration-300

hover:scale-105
hover:border-blue-400
hover:shadow-[0_0_30px_rgba(59,130,246,.4)]
"
>

<h2
className="
text-xl
font-semibold
mb-2
"
>

{item.title}

</h2>

<p
className="
text-sm
text-gray-400
"
>

{item.desc}

</p>

</div>

))}

</div>

</div>

</DashboardLayout>

);

}