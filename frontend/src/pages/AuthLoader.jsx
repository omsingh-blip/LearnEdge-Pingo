import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";

export default function AuthLoader({

children

}){

const [loading,setLoading]=
useState(true);

const [authenticated,
setAuthenticated]=
useState(false);

useEffect(()=>{

const token =
localStorage.getItem(
"token"
);

setTimeout(()=>{

setAuthenticated(
!!token
);

setLoading(
false
);

},800);

},[]);


if(loading){

return(

<div
className="
min-h-screen
bg-slate-900
flex
flex-col
items-center
justify-center
text-white
"
>

{/* Mascot */}

<video
autoPlay
loop
muted
playsInline

className="
w-28
h-28
mb-6

animate-breathe
"
>

<source
src="/mascot.mp4"
type="video/mp4"
/>

</video>

<h2
className="
text-lg
font-semibold
animate-pulse
"
>

Loading PingO...

</h2>

</div>

);

}

if(authenticated){

return(

<Navigate
to="/dashboard"
replace
/>

);

}

return children;

}