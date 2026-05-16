import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {

  const navigate = useNavigate();

  const features = [
    {
      title: "🧠 AI Code Review",
      desc: "Instant feedback on your code.",
    },

    {
      title: "🏆 Leaderboard",
      desc: "Compete globally in real-time.",
    },

    {
      title: "⚡ Prep Planner",
      desc: "1-day smart strategy.",
    },

    {
      title: "🎯 Gamified XP",
      desc: "Level up your learning.",
    },

    {
      title: "🤖 AI Assistant",
      desc: "Your personal tutor.",
    },

    {
      title: "📚 Smart Modules",
      desc: "Learn + test instantly.",
    },
  ];

  // ================= CURSOR GLOW =================
  useEffect(() => {

    const glow =
      document.getElementById(
        "cursor-glow"
      );

    const move = (e) => {

      if (!glow) return;

      glow.style.left =
        e.clientX - 80 + "px";

      glow.style.top =
        e.clientY - 80 + "px";
    };

    window.addEventListener(
      "mousemove",
      move
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        move
      );

  }, []);

  return (
    <div
      className="
        h-screen
        bg-slate-900
        text-white
        overflow-hidden
        relative
      "
    >

      {/* Stars Background */}
      <div
        className="
          absolute inset-0
          z-0
          pointer-events-none
        "
      >

        <div className="stars"></div>

        <div
          className="
            stars
            opacity-40
          "
        ></div>

        <div className="stars2"></div>

        <div className="stars3"></div>

      </div>

      {/* Shooting Stars */}
      <div
        className="
          shooting-stars
          absolute inset-0
          z-0
          pointer-events-none
        "
      >

        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>

      </div>

      {/* Cursor Glow */}
      <div
        id="cursor-glow"

        className="
          pointer-events-none
          fixed

          w-40 h-40

          rounded-full
          blur-3xl

          opacity-20

          bg-blue-400

          z-0
        "
      ></div>

      {/* Overlay */}
      <div
        className="
          absolute inset-0

          bg-gradient-to-b
          from-transparent
          via-slate-900/40
          to-slate-900

          z-0
        "
      ></div>

      {/* HERO */}
      <div
       className="
  flex flex-col
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

        {/* Glow */}
        <div
          className="
            absolute

            w-80 h-80

            bg-blue-500

            opacity-30

            blur-3xl

            rounded-full
          "
        ></div>

        {/* Mascot */}
       {/* Mascot Video Only */}
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

  {/* Soft neon outer glow */}
  <div
    className="
      absolute

      w-40 h-40
      md:w-52 md:h-52

      rounded-full

      bg-cyan-500/20

      blur-3xl

      opacity-80
    "
  />

  {/* Circular frame */}
  <div
    className="
      relative

      w-32 h-32
      md:w-40 md:h-40

      rounded-full
      overflow-hidden

      border
      border-cyan-400/50

      bg-slate-900

      shadow-[0_0_40px_rgba(59,130,246,0.7)]

      animate-breathe

      transition-all
      duration-500

      hover:scale-105
      hover:shadow-[0_0_60px_rgba(59,130,246,1)]
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

        animate-breathe
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

            transition-all
            duration-500

            hover:scale-105

            hover:drop-shadow-[0_0_35px_rgba(96,165,250,1)]
          "
        >

          PingO
          {" "}

          <span
            className="
              text-blue-400
            "
          >
            AI
          </span>

          <img
            src="/rocket.png"

            className="
              inline-block

              w-12 md:w-16

              ml-2

              animate-breathe
            "
          />

        </h1>

        {/* Subtitle */}
        <p
          className="
            text-gray-400

            max-w-xl

            mb-4

            text-base md:text-lg

            leading-relaxed
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
            flex gap-5
            flex-wrap
            justify-center
          "
        >

          <button
            onClick={() =>
              navigate("/login")
            }

            className="
              group
              relative

              px-7 py-3

              rounded-lg

              bg-slate-800

              border border-slate-600

              transition-all
              duration-300

              hover:scale-105
            "
          >

            <span
              className="
                absolute inset-0

                rounded-lg

                bg-green-400

                opacity-0

                group-hover:opacity-20

                blur-xl

                transition
              "
            ></span>

            <span
              className="
                relative z-10
              "
            >

              Login

            </span>

          </button>

          <button
            onClick={() =>
              navigate("/login")
            }

            className="
              px-7 py-3

              rounded-lg

              bg-blue-600

              transition-all
              duration-300

              hover:scale-105

              hover:shadow-[0_0_30px_rgba(59,130,246,0.7)]
            "
          >

            Get Started

          </button>

        </div>

      </div>

      {/* FEATURES */}
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
            flex gap-6

            animate-scrollX

            w-max

            px-6
          "
        >

          {[...features, ...features]
            .map((f, i) => (

              <div
                key={i}

                className="
                  min-w-[260px]

                  bg-slate-800/70
                  backdrop-blur-lg

                  p-6

                  rounded-2xl

                  border
                  border-slate-700

                  transition-all
                  duration-300

                  hover:border-blue-400

                  hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]

                  hover:scale-[1.05]
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

                    leading-relaxed
                  "
                >

                  {f.desc}

                </p>

              </div>
            ))}

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

            transition-all
            duration-300

            hover:drop-shadow-[0_0_20px_rgba(96,165,250,0.7)]
          "
        >

          Start your journey today

          <img
            src="/rocket.png"

            className="
              inline-block

              w-7

              ml-2

              animate-bounce
            "
          />

        </h2>

        <button
          onClick={() =>
            navigate("/login")
          }

          className="
            group
            relative

            px-8 py-3

            rounded-lg

            bg-blue-600

            transition-all
            duration-300

            hover:scale-105
          "
        >

          <span
            className="
              absolute inset-0

              rounded-lg

              bg-green-400

              opacity-0

              group-hover:opacity-20

              blur-xl

              transition
            "
          ></span>

          <span
            className="
              relative z-10
            "
          >

            Get Started

          </span>

        </button>

      </div>

    </div>
  );
}