import { useState } from "react";

import {
  updateScore,
} from "../services/leaderboardService";

import { useGameStore }
from "../store/useGameStore";

export default function useCodeReview(){

const {

xp,
level,
addXP,
setStreak

}=useGameStore();

const [feedback,setFeedback]=
useState(null);

const [loading,setLoading]=
useState(false);

const [pingoState,setPingoState]=
useState("idle");

const [showLevelUp,setShowLevelUp]=
useState(false);


// ================= REVIEW =================

const handleReview=
async({

code,
problem,
language

})=>{

setLoading(true);

setPingoState(
"thinking"
);

setFeedback(null);

if(
!problem ||
!code
){

setFeedback({

error:
"❌ Please enter problem and code"

});

setLoading(false);

return;

}

try{

const token=
localStorage.getItem(
"token"
);

const res=
await fetch(

"http://localhost:5000/api/reviews",

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

const data=
await res.json();

if(
!data.success
){

throw new Error(
data.message
);

}

const review=
data.review;


// STREAK

setStreak(
(prev)=>
prev+1
);


// XP

const earnedXp=
review.earnedXp;

const previousLevel=
level;

addXP(
earnedXp
);


// LEVEL UP

const nextLevel=

Math.floor(
(xp+earnedXp)
/100
)+1;


if(
nextLevel >
previousLevel
){

setShowLevelUp(
true
);

setPingoState(
"happy"
);

setTimeout(()=>{

setShowLevelUp(
false
);

},2000);

}


// LEADERBOARD

await updateScore(
earnedXp
);


// FEEDBACK

setFeedback({

message:
`🎉 +${earnedXp} XP Earned`,

status:
review.status,

summary:
review.feedback.summary,

bugs:
review.feedback.bugs,

optimization:
review.feedback.optimization,

readability:
review.feedback.readability,

bestPractices:
review.feedback.bestPractices

});

setPingoState(
"happy"
);

}

catch(error){

console.log(
error
);

setFeedback({

error:
"❌ Review failed"

});

setPingoState(
"idle"
);

}

finally{

setLoading(false);

}

};

return{

feedback,
loading,
pingoState,
showLevelUp,

setPingoState,

handleReview

};

}