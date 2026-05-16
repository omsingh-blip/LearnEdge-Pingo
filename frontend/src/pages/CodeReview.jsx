import { useState, useEffect } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import Button from "../components/ui/Button";

import CodeEditorPanel from "../components/codeReview/CodeEditorPanel";

import FeedbackPanel from "../components/codeReview/FeedbackPanel";

import OutputPanel from "../components/codeReview/OutputPanel";

import ReviewAssistant from "../components/codeReview/ReviewAssistant";

import useCodeReview from "../hooks/useCodeReview";

export default function CodeReview() {

  // ================= STATE =================
  const [code, setCode] =
    useState("");

  const [problem, setProblem] =
    useState("");

  const [output, setOutput] =
    useState("");

  const [running, setRunning] =
    useState(false);

  const [language, setLanguage] =
    useState("javascript");

  const [hasWelcomed, setHasWelcomed] =
    useState(false);

  // ================= CUSTOM HOOK =================
  const {
    feedback,
    loading,
    pingoState,
    showLevelUp,

    setPingoState,

    handleReview,
  } = useCodeReview();

  // ================= WELCOME =================
  useEffect(() => {

    if (!hasWelcomed) {

      setPingoState("happy");

      setHasWelcomed(true);

      setTimeout(() => {
        setPingoState("idle");
      }, 3000);

    }

  }, []);

  // ================= LANGUAGE MAP =================
  const getLanguageId = () => {

    switch (language) {

      case "python":
        return 71;

      case "cpp":
        return 54;

      case "java":
        return 62;

      default:
        return 63;

    }

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

      {/* Level Up */}
      {showLevelUp && (
        <div
          className="fixed top-20 right-10
          text-yellow-400 font-bold text-2xl
          animate-floatUp z-50"
        >
          🎉 LEVEL UP!
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-6">

        <img
          src="/code-editor-logo.png"
          alt="Pingo"
          className="w-20 h-20 object-contain
          drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]
          transition hover:scale-110"
        />

        <h1
          className="text-3xl font-bold
          transition-all duration-300
          hover:scale-105
          hover:drop-shadow-[0_0_25px_rgba(96,165,250,0.9)]"
        >
          Pingo Code Review Assistant
        </h1>

      </div>

      {/* Problem */}
      <textarea
        value={problem}
        placeholder="🧠 Enter Problem Statement..."
        className="w-full p-3 text-black rounded-lg mb-4
        focus:ring-2 focus:ring-blue-400
        outline-none transition"
        onChange={(e) =>
          setProblem(e.target.value)
        }
      />

      {/* Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 min-h-[70vh]">

        <CodeEditorPanel
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
        />

        <FeedbackPanel
          feedback={feedback}
          loading={loading}
        />

      </div>

      {/* Output */}
      <OutputPanel output={output} />

      {/* Actions */}
      <div className="mt-4 flex gap-4 justify-center">

        <Button
          onClick={handleRunCode}
          disabled={running}
          className="max-w-[180px] bg-green-600"
        >
          ▶ Run Code
        </Button>

        <Button
          onClick={() =>
            handleReview({
              code,
              problem,
              language,
            })
          }
          disabled={loading}
          className="max-w-[180px]"
        >
          🧠 Review Code
        </Button>

      </div>

      {/* Assistant */}
      <ReviewAssistant
        pingoState={pingoState}
        hasWelcomed={hasWelcomed}
      />

    </DashboardLayout>
  );
}