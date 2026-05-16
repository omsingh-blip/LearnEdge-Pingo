import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import BackgroundEffects
from "../components/layout/BackgroundEffects";

export default function Home() {

  const navigate =
    useNavigate();

  const features =
    useMemo(() => [

      {
        title:"🧠 AI Code Review",
        desc:"Instant feedback on your code."
      },

      {
        title:"🏆 Leaderboard",
        desc:"Compete globally in real-time."
      },

      {
        title:"⚡ Prep Planner",
        desc:"1-day smart strategy."
      },

      {
        title:"🎯 Gamified XP",
        desc:"Level up your learning."
      },

      {
        title:"🤖 AI Assistant",
        desc:"Your personal tutor."
      },

      {
        title:"📚 Smart Modules",
        desc:"Learn + test instantly."
      }

    ],[]);

  // Infinite loop source
  const infiniteFeatures =
    useMemo(
      ()=>[
        ...features,
        ...features,
        ...features
      ],
      [features]
    );

  return(

<div
className="
h-screen
bg-slate-900
text-white
overflow-hidden
relative
"
>

{/* Background */}

<BackgroundEffects />



{/* HERO */}

<div

className="
flex
flex-col

items-center
justify-center

text-center

pt-8
pb-2
px-6

relative
z-10
"

>

{/* Hero glow */}

<div

className="
absolute

w-72
h-72

bg-blue-500/20

blur-2xl

rounded-full
"

/>


{/* Mascot */}

<div

className="
relative

mb-6

flex
items-center
justify-center

animate-breathe
"

>

<div

className="
absolute

w-40
h-40

md:w-52
md:h-52

rounded-full

bg-cyan-500/10

blur-2xl
"

/>


<div

className="
relative

w-32 h-32
md:w-40 md:h-40

rounded-full
overflow-hidden

border
border-cyan-400/30

bg-slate-900

shadow-lg
shadow-cyan-500/20

animate-breathe

transition-transform
duration-300

hover:scale-[1.03]
"

>

<video

autoPlay
loop
muted
playsInline

className="
w-full
h-full
object-cover
"

>

<source
src="/mascot.mp4"
type="video/mp4"
/>

</video>

</div>

</div>


{/* Heading */}

<h1

className="
text-4xl
md:text-6xl

font-bold

mb-2

leading-tight
"

>

PingO

<span
className="
text-blue-400
"
>

{" "}AI

</span>

<img

src="/rocket.png"

className="
inline-block

w-14
md:w-16

ml-2
"

/>

</h1>


{/* Subtitle */}

<p

className="
text-gray-400

max-w-xl

mb-4

text-base
md:text-lg
"

>

Crack interviews & exams
with AI-powered learning,
real-time feedback,
and smart prep tools.

</p>


{/* Buttons */}

<div

className="
flex
gap-5
flex-wrap
justify-center
"

>

<button

onClick={()=>
navigate("/login")
}

className="
px-7 py-3

rounded-lg

bg-slate-800

border
border-slate-600

transition-transform
duration-300

hover:scale-[1.03]
"

>

Login

</button>


<button

onClick={()=>
navigate("/login")
}

className="
px-7 py-3

rounded-lg

bg-blue-600

transition-transform
duration-300

hover:scale-[1.03]

hover:shadow-lg
hover:shadow-blue-500/20
"

>

Get Started

</button>

</div>

</div>


{/* Features */}

<div

className="
overflow-hidden
py-2

relative
z-10
"

>

<div

className="
flex
gap-6

animate-scrollX

w-max

px-6
"

>

{

infiniteFeatures.map(

(f,i)=>(

<div

key={i}

className="
min-w-[260px]

bg-slate-800/70

backdrop-blur-sm

p-6

rounded-2xl

border
border-slate-700

transition-all
duration-300

hover:border-blue-400

hover:shadow-lg
hover:shadow-blue-500/20

hover:scale-[1.02]

flex-shrink-0
"

>

<h2

className="
text-lg
font-semibold

mb-2

text-blue-400
"

>

{f.title}

</h2>

<p

className="
text-gray-400
text-sm
"

>

{f.desc}

</p>

</div>

)

)

}

</div>

</div>


{/* CTA */}

<div

className="
text-center

pb-8

relative
z-10
"

>

<h2

className="
text-2xl
font-semibold
mb-5
"

>

Start your journey today

</h2>

<button

onClick={()=>
navigate("/login")
}

className="
px-8 py-3

rounded-lg

bg-blue-600

transition-transform
duration-300

hover:scale-[1.03]

hover:shadow-lg
hover:shadow-blue-500/20
"

>

Get Started

</button>

</div>

</div>

);

}