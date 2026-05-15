import {
  useNavigate,
  useParams,
} from "react-router-dom";

export default function Modules() {

  const navigate =
    useNavigate();

  const { domain } =
    useParams();

  // ================= MODULE DATA =================
  const modulesData = {

    dsa: {
      title: "DSA",

      pdf: "/pdfs/dsa.pdf",

      quiz: [
        {
          q: "What is time complexity of binary search?",
          options: [
            "O(n)",
            "O(log n)",
            "O(n log n)",
            "O(1)",
          ],
          answer: "O(log n)",
        },
      ],
    },

    webdev: {
      title: "Web Dev",

      pdf: "/pdfs/web.pdf",

      quiz: [
        {
          q: "HTML stands for?",
          options: [
            "Hyper Trainer Marking Language",
            "Hyper Text Markup Language",
            "Hyper Text Marketing Language",
            "Hyper Text Machine Language",
          ],
          answer:
            "Hyper Text Markup Language",
        },
      ],
    },

    ml: {
      title: "Machine Learning",

      pdf: "/pdfs/ml.pdf",

      quiz: [
        {
          q: "ML stands for?",

          options: [
            "Machine Learning",
            "Model Learning",
            "Manual Learning",
            "Meta Learning",
          ],

          answer:
            "Machine Learning",
        },
      ],
    },

    agrinova: {
      title: "AgriNova",

      pdf: "/pdfs/agrinova.pdf",

      quiz: [
        {
          q: "Smart irrigation uses?",

          options: [
            "AI",
            "Water",
            "Soil",
            "Manual",
          ],

          answer: "AI",
        },
      ],
    },

  };

  // ================= SELECT MODULE =================
  const module =
    modulesData[domain];

  // ================= SAFETY =================
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

      {/* Back Button */}
      <button
        onClick={() =>
          navigate("/dashboard")
        }

        className="
          mb-8 px-5 py-2 rounded-xl

          bg-slate-800/80
          border border-slate-700

          hover:border-blue-400

          hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]

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

          {module.title} Module

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

              hover:border-blue-400

              transition-all duration-300
            "
          >

            <h2
              className="
                text-xl font-semibold
                mb-3 text-blue-400
              "
            >
              📄 Notes
            </h2>

            <p
              className="
                text-gray-400 mb-4
              "
            >
              Learn concepts before quiz.
            </p>

            <a
              href={module.pdf}

              target="_blank"

              rel="noreferrer"

              className="
                inline-block
                px-5 py-2 rounded-lg

                bg-blue-500

                hover:scale-105

                transition-all duration-300
              "
            >

              View PDF

            </a>

          </div>

          {/* Quiz */}
          <div
            className="
              bg-slate-800/70
              backdrop-blur-xl

              p-6 rounded-2xl

              border border-slate-700

              hover:border-green-400

              transition-all duration-300
            "
          >

            <h2
              className="
                text-xl font-semibold
                mb-3 text-green-400
              "
            >
              📝 Quick Quiz
            </h2>

            <p
              className="
                text-gray-400 mb-4
              "
            >
              Test your understanding.
            </p>

            <button
              onClick={() =>
                navigate("/quiz", {

                  state: {
                    quiz:
                      module.quiz,
                  },

                })
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