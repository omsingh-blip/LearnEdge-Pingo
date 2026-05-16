import {
  useNavigate,
  useParams,
} from "react-router-dom";

export default function Modules() {

  const navigate =
    useNavigate();

  const { domain } =
    useParams();

  const modulesData = {

    dsa: {
      title:
        "Data Structures & Algorithms",
    },

    webdev: {
      title: "Web Development",
    },

    ml: {
      title: "Machine Learning",
    },

    agrinova: {
      title: "AgriNova",
    },

  };

  const module =
    modulesData[domain];

  if (!module) {

    return (
      <div
        className="
          min-h-screen
          bg-slate-900
          text-white
          flex items-center
          justify-center
        "
      >

        Domain not found

      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-slate-900
        text-white
        px-6 py-10
      "
    >

      {/* Back */}
      <button
        onClick={() =>
          navigate("/dashboard")
        }

        className="
          mb-8 px-5 py-2 rounded-xl

          bg-slate-800/80
          border border-slate-700

          hover:border-blue-400

          transition-all duration-300
        "
      >

        ← Back to Dashboard

      </button>

      <div
        className="
          w-full max-w-5xl
          mx-auto
        "
      >

        {/* Heading */}
        <h1
          className="
            text-4xl font-bold mb-10

            text-center

            flex items-center
            justify-center gap-3
          "
        >

          {module.title}

          <img
            src="/pingo-thinking.png"

            alt="pingo"

            className="
              w-20 h-20
            "
          />

        </h1>

        {/* Cards */}
        <div
          className="
            grid md:grid-cols-2
            gap-8
          "
        >

          {/* Notes */}
          <div
            className="
              bg-slate-800/70
              backdrop-blur-xl

              p-6 rounded-2xl

              border border-slate-700

              hover:border-cyan-400

              hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]

              transition-all duration-300
            "
          >

            <h2
              className="
                text-xl font-semibold
                mb-3 text-cyan-400
              "
            >
              📘 Smart Notes
            </h2>

            <p
              className="
                text-gray-400 mb-4
              "
            >
              Interactive markdown notes.
            </p>

            <button
              onClick={() =>
                navigate(
                  `/modules/${domain}/notes`
                )
              }

              className="
                inline-block
                px-5 py-2 rounded-lg

                bg-cyan-500

                hover:scale-105

                transition-all duration-300
              "
            >

              Open Notes

            </button>

          </div>

          {/* Quiz */}
          <div
            className="
              bg-slate-800/70
              backdrop-blur-xl

              p-6 rounded-2xl

              border border-slate-700

              hover:border-green-400

              hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]

              transition-all duration-300
            "
          >

            <h2
              className="
                text-xl font-semibold
                mb-3 text-green-400
              "
            >
              🧠 Dynamic Quiz
            </h2>

            <p
              className="
                text-gray-400 mb-4
              "
            >
              Real-time backend powered quiz.
            </p>

            <button
              onClick={() =>
                navigate(
                  `/modules/${domain}/quiz`
                )
              }

              className="
                px-5 py-2 rounded-lg

                bg-green-500

                hover:scale-105

                transition-all duration-300
              "
            >

              Start Quiz

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}