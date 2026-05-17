import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Editor from "@monaco-editor/react";

import DashboardLayout from "../components/layout/DashboardLayout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Practice() {

const API =
import.meta.env.VITE_API_URL;

const location =
useLocation();

const [language,setLanguage] =
useState("javascript");

const [code,setCode] =
useState(
`console.log("Hello LearnEdge");`
);

const [loading,setLoading] =
useState(false);

const [review,setReview] =
useState(null);

const question =
location.state?.question;

const [problem,setProblem] =
useState(
question?.title || ""
);

const [showQuestionInfo,
setShowQuestionInfo] =
useState(
!!question
);

const [output,setOutput] =
useState("");

const [running,setRunning] =
useState(false);


useEffect(()=>{

if(question){

setProblem(
question.title
);

setShowQuestionInfo(
true
);

setReview(
null
);

}

},[question]);


// ================= REVIEW =================

const handleReview =
async()=>{

if(!code.trim())
return;

try{

setLoading(true);

setShowQuestionInfo(false);

const token =
localStorage.getItem(
"token"
);

const res =
await fetch(

`${API}/api/reviews`,

{
method:"POST",

headers:{

"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`

},

body:
JSON.stringify({

problem,
language,
code

})

}

);

const data =
await res.json();

if(!data.success){

throw new Error(
data.message
);

}

setReview(
data.review
);

}

catch(error){

console.log(
error
);

setOutput(
"❌ Review Failed"
);

setShowQuestionInfo(
true
);

}

finally{

setLoading(
false
);

}

};


// ================= RUN =================

const handleRunCode =
async()=>{

try{

setRunning(true);

setOutput(
"Running..."
);

const res =
await fetch(

`${API}/api/compiler/run`,

{
method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

code,
language

})

}

);

const data =
await res.json();

setOutput(
data.output ||
"Completed"
);

}

catch(error){

console.log(error);

setOutput(
"❌ Execution failed"
);

}

finally{

setRunning(false);

}

};


// ================= LIST RENDER =================

const renderList =
(title,items)=>{

if(
!items ||
!items.length
)
return null;

return(

<div>

<p
className="
text-gray-400
mb-2
"
>

{title}

</p>

<div
className="
p-4
rounded-xl
bg-slate-800
border
border-slate-700
"
>

<ul
className="
list-disc
ml-5
space-y-2
"
>

{
items.map(
(item,i)=>(

<li key={i}>
{item}
</li>

)
)
}

</ul>

</div>

</div>

);

};


return(

<DashboardLayout>

<div
className="
max-w-7xl
mx-auto

grid
grid-cols-1
lg:grid-cols-2
gap-6
"
>

{/* LEFT */}

<Card
className="
p-5
bg-slate-900/60
backdrop-blur-xl
"
>

<h1
className="
text-2xl
font-bold
mb-5
"
>

Coding Practice

</h1>


<input

value={problem}

onChange={(e)=>
setProblem(
e.target.value
)
}

placeholder=
"Problem title..."

className="
w-full
mb-4
p-3

rounded-xl

bg-slate-800

border
border-slate-700
"
/>


<select

value={language}

onChange={(e)=>
setLanguage(
e.target.value
)
}

className="
mb-4
p-2

rounded-xl

bg-slate-800

border
border-slate-700
"
>

<option value="javascript">
JavaScript
</option>

<option value="python">
Python
</option>

<option value="cpp">
C++
</option>

<option value="java">
Java
</option>

</select>


<Editor

height="500px"

theme="vs-dark"

language={language}

value={code}

onChange={(v)=>
setCode(
v || ""
)
}

/>


<div
className="
mt-5
flex
gap-4
"
>

<Button
onClick={
handleRunCode
}
>

{
running
?
"Running..."
:
"Run Code"
}

</Button>


<Button
onClick={
handleReview
}
>

{
loading
?
"Reviewing..."
:
"Review Code"
}

</Button>

</div>


<div
className="
mt-5
p-4

rounded-xl

bg-black/40

border
border-slate-700

text-green-400

font-mono
"
>

{
output ||
"Run your code..."
}

</div>

</Card>


{/* RIGHT */}

<Card
className="
p-5
bg-slate-900/60
backdrop-blur-xl
min-h-[700px]
"
>

{
showQuestionInfo &&
question

?

(

<div>

<h2
className="
text-2xl
font-bold
mb-5
text-cyan-400
"
>

📝 Problem Details

</h2>

<div
className="
space-y-5
"
>

<div>

<p
className="
text-sm
text-gray-400
mb-2
"
>

Description

</p>

<div
className="
p-4
rounded-xl
bg-slate-800
border
border-slate-700
"
>

{question.description}

</div>

</div>

<div>

<p
className="
text-sm
text-gray-400
mb-2
"
>

Example

</p>

<pre
className="
p-4
rounded-xl
bg-black/40
border
border-slate-700
text-green-300
whitespace-pre-wrap
overflow-auto
"
>

{question.example}

</pre>

</div>

</div>

</div>

)

:

(

<div>

<h2
className="
text-2xl
font-bold
mb-5
"
>

🧠 AI Review

</h2>

{
!review

?

<div
className="
text-gray-500
"
>

Submit code for AI review 🚀

</div>

:

<div
className="
space-y-5
"
>

<div>

<span
className="
px-4 py-2
rounded-xl
bg-blue-500/20
"
>

{review.status}

</span>

</div>

<div
className="
p-4
rounded-xl
bg-slate-800
"
>

{review.feedback.summary}

</div>

{renderList(
"❌ Bugs",
review.feedback.bugs
)}

{renderList(
"⚡ Optimization",
review.feedback.optimization
)}

{renderList(
"📖 Readability",
review.feedback.readability
)}

{renderList(
"🚀 Best Practices",
review.feedback.bestPractices
)}

<div
className="
p-5
rounded-xl
bg-yellow-500/10
border
border-yellow-500/30
text-yellow-300
font-bold
"
>

+{review.earnedXp} XP ⚡

</div>

</div>

}

</div>

)

}

</Card>

</div>

</DashboardLayout>

);

}