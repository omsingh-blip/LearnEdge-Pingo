import { useState } from "react";

import Editor from "@monaco-editor/react";

import DashboardLayout from "../components/layout/DashboardLayout";

import Card from "../components/ui/Card";

import Button from "../components/ui/Button";

import { useGameStore } from "../store/useGameStore";

export default function Practice() {

  const { addXP } = useGameStore();

  const [language, setLanguage] =
    useState("javascript");

  const [code, setCode] =
    useState(
      `console.log("Hello LearnEdge");`
    );

  const [problem, setProblem] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [review, setReview] =
    useState(null);

  const [output, setOutput] =
    useState("");

  const [running, setRunning] =
    useState(false);

  // ================= REVIEW =================
  const handleReview = async () => {

    if (!code.trim()) return;

    setLoading(true);

    setTimeout(() => {

      const fakeReview = {

        status: "Good",

        explanation:
          "Your logic is clean and readable.",

        suggestion:
          "Try optimizing time complexity further.",

        earnedXP: 15,

      };

      setReview(fakeReview);

      addXP(fakeReview.earnedXP);

      setLoading(false);

    }, 1500);

  };

  // ================= RUN CODE =================
const handleRunCode = async () => {

  setRunning(true);

  setOutput("Running code...");

  try {

    if (
      language !== "javascript"
    ) {

      setOutput(
        "⚠️ Currently only JavaScript execution is supported locally."
      );

      setRunning(false);

      return;
    }

    let logs = [];

    const originalLog =
      console.log;

    console.log = (...args) => {

      logs.push(
        args.join(" ")
      );

    };

    // Execute user code
    eval(code);

    console.log =
      originalLog;

    setOutput(

      logs.length
        ? logs.join("\n")
        : "✅ Code executed successfully."

    );

  } catch (error) {

    setOutput(
      "❌ " + error.message
    );

  }

  setRunning(false);

};

  return (
    <DashboardLayout>

      <div
        className="
          max-w-7xl mx-auto
          grid grid-cols-1 lg:grid-cols-2
          gap-6
        "
      >

        {/* LEFT PANEL */}
        <Card
          className="
            p-5
            bg-slate-900/60
            backdrop-blur-xl
          "
        >

          {/* Header */}
          <div
            className="
              flex flex-col md:flex-row
              md:items-center
              md:justify-between
              gap-4 mb-5
            "
          >

            <div>

              <h1
                className="
                  text-2xl font-bold
                  mb-1
                "
              >
                Coding Practice
              </h1>

              <p className="text-gray-400 text-sm">
                Practice problems and get AI feedback
              </p>

            </div>

            {/* Language */}
            <select
              value={language}

              onChange={(e) =>
                setLanguage(
                  e.target.value
                )
              }

              className="
                bg-slate-800
                border border-slate-700
                px-4 py-2 rounded-xl
                outline-none
              "
            >

              <option value="javascript">
                JavaScript
              </option>

              <option value="cpp">
                C++
              </option>

              <option value="python">
                Python
              </option>

              <option value="java">
                Java
              </option>

            </select>

          </div>

          {/* Problem */}
          <input
            type="text"

            placeholder="Problem title..."

            value={problem}

            onChange={(e) =>
              setProblem(
                e.target.value
              )
            }

            className="
              w-full mb-4
              p-3 rounded-xl
              bg-slate-800
              border border-slate-700
              outline-none
            "
          />

          {/* Editor */}
          <div
            className="
              rounded-xl overflow-hidden
              border border-slate-700
            "
          >

            <Editor
              height="500px"

              theme="vs-dark"

              language={language}

              value={code}

              onChange={(value) =>
                setCode(value || "")
              }
            />

          </div>

          {/* Actions */}
          <div
            className="
              mt-5 flex flex-col sm:flex-row
              gap-4
            "
          >

            <Button
              onClick={handleRunCode}

              disabled={running}
            >

              {running
                ? "Running..."
                : "Run Code"}

            </Button>

            <Button
              onClick={handleReview}

              disabled={loading}
            >

              {loading
                ? "Reviewing..."
                : "Review Code"}

            </Button>

          </div>

          {/* Output Console */}
          <div
            className="
              mt-5 rounded-2xl
              border border-slate-700
              overflow-hidden
            "
          >

            <div
              className="
                bg-slate-800
                px-4 py-2
                border-b border-slate-700
                text-sm text-gray-300
                font-medium
              "
            >
              Output
            </div>

            <div
              className="
                bg-black/40
                min-h-[140px]
                p-4
                text-sm
                font-mono
                whitespace-pre-wrap
                text-green-400
              "
            >
              {output ||
                "Run your code to see output..."}
            </div>

          </div>

        </Card>

        {/* RIGHT PANEL */}
        <Card
          className="
            p-5
            bg-slate-900/60
            backdrop-blur-xl
            min-h-[700px]
          "
        >

          <h2
            className="
              text-2xl font-bold
              mb-5
            "
          >
            AI Review
          </h2>

          {!review ? (

            <div
              className="
                h-full flex items-center
                justify-center
                text-gray-500
              "
            >

              Submit your code to get feedback 🚀

            </div>

          ) : (

            <div className="space-y-5">

              {/* Status */}
              <div>

                <p className="text-sm text-gray-400 mb-1">
                  Status
                </p>

                <div
                  className="
                    inline-block
                    px-4 py-2 rounded-xl
                    bg-green-500/20
                    text-green-300
                    border border-green-500/30
                  "
                >
                  {review.status}
                </div>

              </div>

              {/* Explanation */}
              <div>

                <p className="text-sm text-gray-400 mb-2">
                  Explanation
                </p>

                <div
                  className="
                    p-4 rounded-xl
                    bg-slate-800
                    border border-slate-700
                  "
                >
                  {review.explanation}
                </div>

              </div>

              {/* Suggestion */}
              <div>

                <p className="text-sm text-gray-400 mb-2">
                  Suggestion
                </p>

                <div
                  className="
                    p-4 rounded-xl
                    bg-slate-800
                    border border-slate-700
                  "
                >
                  {review.suggestion}
                </div>

              </div>

              {/* XP */}
              <div
                className="
                  p-5 rounded-2xl
                  bg-yellow-500/10
                  border border-yellow-500/20
                "
              >

                <p
                  className="
                    text-yellow-300
                    text-xl font-bold
                  "
                >
                  +{review.earnedXP} XP Earned ⚡
                </p>

              </div>

            </div>

          )}

        </Card>

      </div>

    </DashboardLayout>
  );
}