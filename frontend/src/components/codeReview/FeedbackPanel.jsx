export default function FeedbackPanel({
  feedback,
  loading,
}) {

  const renderList = (
    title,
    emoji,
    color,
    items
  ) => {

    if (
      !items ||
      items.length === 0
    ) return null;

    return (

      <div
        className="
          p-3 rounded-xl
          bg-slate-900/70
          border border-slate-700
        "
      >

        <p
          className={`font-semibold mb-2 ${color}`}
        >

          {emoji} {title}

        </p>

        <ul
          className="
            list-disc ml-5
            space-y-2
          "
        >

          {items.map(
            (item, i) => (

              <li
                key={i}
                className="
                  text-gray-300
                "
              >

                {item}

              </li>

            )
          )}

        </ul>

      </div>

    );

  };

  return (

    <div
      className="
        bg-slate-800/70
        backdrop-blur-lg
        rounded-xl
        p-4
        flex flex-col
        overflow-hidden

        border border-slate-700

        shadow-[0_0_25px_rgba(168,85,247,0.2)]
      "
    >

      <h2
        className="
          text-yellow-400
          mb-4
          text-xl
          font-bold
        "
      >

        🐧 AI Review

      </h2>

      <div
        className="
          flex-1
          overflow-auto
          space-y-4
        "
      >

        {loading && (

          <div
            className="
              text-center
              animate-pulse
              text-cyan-400
            "
          >

            🧠 Pingo is analyzing your code...

          </div>

        )}

        {!loading &&
        !feedback && (

          <div
            className="
              text-center
              text-gray-500
              mt-10
            "
          >

            Submit code for AI review 🚀

          </div>

        )}

        {!loading &&
        feedback && (

          <>

            {feedback.message && (

              <div
                className="
                  p-3 rounded-xl

                  bg-green-500/10
                  border border-green-500/30

                  text-green-300
                  font-semibold
                "
              >

                {feedback.message}

              </div>

            )}

            {feedback.error && (

              <div
                className="
                  p-3 rounded-xl

                  bg-red-500/10
                  border border-red-500/30

                  text-red-300
                "
              >

                {feedback.error}

              </div>

            )}

            {feedback.status && (

              <div
                className="
                  inline-block

                  px-4 py-2
                  rounded-xl

                  bg-blue-500/10
                  border border-blue-500/30

                  text-blue-300
                  font-semibold
                "
              >

                Status:
                {" "}
                {feedback.status}

              </div>

            )}

            {feedback.summary && (

              <div
                className="
                  p-4 rounded-xl
                  bg-slate-900/70
                  border border-slate-700
                "
              >

                <p
                  className="
                    text-cyan-400
                    font-semibold
                    mb-2
                  "
                >

                  🧠 Summary

                </p>

                <p
                  className="
                    text-gray-300
                  "
                >

                  {feedback.summary}

                </p>

              </div>

            )}

            {renderList(
              "Bugs",
              "❌",
              "text-red-400",
              feedback.bugs
            )}

            {renderList(
              "Optimization",
              "⚡",
              "text-yellow-400",
              feedback.optimization
            )}

            {renderList(
              "Readability",
              "📖",
              "text-blue-400",
              feedback.readability
            )}

            {renderList(
              "Best Practices",
              "🚀",
              "text-purple-400",
              feedback.bestPractices
            )}

          </>

        )}

      </div>

    </div>

  );

}