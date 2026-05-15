export default function FeedbackPanel({
  feedback,
  loading,
}) {

  return (
    <div
      className="bg-slate-800/70 backdrop-blur-lg rounded-xl p-3 flex flex-col overflow-hidden
      border border-slate-700
      shadow-[0_0_25px_rgba(168,85,247,0.2)]"
    >

      <h2 className="text-yellow-400 mb-2">
        🐧 AI Feedback
      </h2>

      <div className="flex-1 overflow-auto text-sm space-y-3">

        {loading && (
          <p>
            Analyzing your code...
          </p>
        )}

        {!loading && !feedback && (
          <p>
            Your feedback will appear here...
          </p>
        )}

        {!loading && feedback && (
          <>

            {feedback.message && (
              <p className="text-green-400 font-semibold">
                {feedback.message}
              </p>
            )}

            {feedback.error && (
              <p className="text-red-400">
                {feedback.error}
              </p>
            )}

            {feedback.issues?.length > 0 && (
              <div>

                <p className="text-red-400 font-semibold">
                  ❌ Issues:
                </p>

                <ul className="list-disc ml-5">

                  {feedback.issues.map(
                    (issue, i) => (
                      <li key={i}>
                        {issue}
                      </li>
                    )
                  )}

                </ul>

              </div>
            )}

            {feedback.hint && (
              <p className="text-yellow-400">
                💡 Hint:
                {" "}
                {feedback.hint}
              </p>
            )}

            {feedback.explanation && (
              <p className="text-blue-300">
                🧠 Explanation:
                {" "}
                {feedback.explanation}
              </p>
            )}

            {feedback.fixed_code && (
              <div>

                <p className="text-green-400">
                  ✅ Fixed Code:
                </p>

                <pre
                  className="bg-black p-2 rounded text-green-300 overflow-x-auto"
                >
                  {feedback.fixed_code}
                </pre>

              </div>
            )}

            {feedback.suggestion && (
              <p className="text-purple-300">
                🚀 Suggestion:
                {" "}
                {feedback.suggestion}
              </p>
            )}

          </>
        )}

      </div>

    </div>
  );
}