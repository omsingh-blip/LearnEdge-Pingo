import { useState, useEffect } from "react";

import Editor from "@monaco-editor/react";

import DashboardLayout from "../components/layout/DashboardLayout";

import Button from "../components/ui/Button";

import {
    updateScore,
} from "../services/leaderboardService";

import {
    reviewCode,
} from "../services/reviewService";

import { useGameStore } from "../store/useGameStore";
import { useAuthStore } from "../store/authStore";

export default function CodeReview() {

    const {
        xp,
        level,
        addXP,
        setStreak,
    } = useGameStore();

    const { user } = useAuthStore();

    const [code, setCode] = useState("");

    const [problem, setProblem] = useState("");

    const [output, setOutput] = useState("");

    const [feedback, setFeedback] = useState(null);

    const [loading, setLoading] = useState(false);

    const [pingoState, setPingoState] =
        useState("idle");

    const [hasWelcomed, setHasWelcomed] =
        useState(false);

    const [language, setLanguage] =
        useState("javascript");

    const [showLevelUp, setShowLevelUp] =
        useState(false);


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

    // ================= LEVEL UP =================
    useEffect(() => {

        if (showLevelUp) {

            setTimeout(() => {
                setShowLevelUp(false);
            }, 2000);

        }

    }, [showLevelUp]);

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
    const handleRun = async () => {

        setPingoState("running");

        setOutput("Running...");

        try {

            const response = await fetch(
                "https://ce.judge0.com/submissions?base64_encoded=false&wait=true",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        source_code: code,
                        language_id: getLanguageId(),
                    }),
                }
            );

            if (!response.ok) {

                const errorText =
                    await response.text();

                console.log(
                    "SERVER ERROR:",
                    errorText
                );

                setFeedback({
                    error:
                        "⚠️ Server error. Try again later.",
                });

                return;
            }

            const data = await response.json();

            const result =
                data.stderr ||
                data.compile_output ||
                data.stdout ||
                data.status?.description ||
                "Unknown error";

            setOutput(result);

            setPingoState("happy");

            setTimeout(() => {
                setPingoState("idle");
            }, 2000);

        } catch (error) {

            setOutput(
                "Error connecting to compiler"
            );

            setPingoState("idle");

        }

    };

    // ================= REVIEW CODE =================
    const handleReview = async () => {

        setLoading(true);

        setPingoState("thinking");

        setFeedback(null);

        // Validation
        if (!problem || !code) {

            setFeedback({
                error:
                    "❌ Please enter problem and code",
            });

            setLoading(false);

            setPingoState("idle");

            return;
        }

        try {

            const data = await reviewCode({
                question_name:
                    problem || "Unknown Problem",

                student_id:
                    user?.email ||
                    user?._id ||
                    "Unknown Student",

                student_solution:
                    code ||
                    "No solution provided",
            });

            // Streak
            if (data.status === "success") {
                setStreak((prev) => prev + 1);
            } else {
                setStreak(0);
            }

            // XP
            let earnedXp = 0;

            if (data.status === "success") {
                earnedXp = 50;
            } else if (
                data.status === "needs_work"
            ) {
                earnedXp = 20;
            } else {
                earnedXp = 10;
            }

            const previousLevel = level;

            addXP(earnedXp);

            const nextLevel =
                Math.floor((xp + earnedXp) / 100) + 1;

            // Level up
            if (nextLevel > previousLevel) {

                setShowLevelUp(true);

                setPingoState("happy");

            }

            // Backend sync
            await updateScoreBackend(
                earnedXp
            );

            // Feedback
            setFeedback({
                message: `🎉 You earned +${earnedXp} XP!`,

                explanation:
                    data.explanation,

                hint: data.hint,

                issues: data.issues,

                fixed_code:
                    data.fixed_code,

                suggestion:
                    data.suggestion,
            });

            setPingoState("happy");

        } catch (error) {

            setFeedback({
                error:
                    "❌ Error connecting to AI service",
            });

            setPingoState("idle");

        } finally {

            setLoading(false);

        }

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

            {/* Editor + Feedback */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[60vh]">

                {/* Editor */}
                <div
                    className="bg-black/80 backdrop-blur-lg rounded-xl p-3 flex flex-col
          border border-slate-700
          shadow-[0_0_25px_rgba(34,197,94,0.2)]"
                >

                    <h2 className="text-green-400 mb-2">
                        💻 Code Editor
                    </h2>

                    {/* Language */}
                    <select
                        value={language}
                        onChange={(e) =>
                            setLanguage(e.target.value)
                        }
                        className="mb-2 px-3 py-2 text-sm rounded-md
            bg-gray-800 text-white border border-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500
            w-40"
                    >

                        <option value="javascript">
                            JavaScript
                        </option>

                        <option value="python">
                            Python
                        </option>

                        <option value="cpp">
                            C++
                        </option>

                        <option value="java">
                            Java
                        </option>

                    </select>

                    {/* Monaco */}
                    <div className="flex-1 overflow-hidden rounded">

                        <Editor
                            height="100%"
                            language={language}
                            theme="vs-dark"
                            value={code}
                            onChange={(value) =>
                                setCode(value || "")
                            }
                        />

                    </div>
                </div>

                {/* Feedback */}
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

                        {!loading &&
                            !feedback && (
                                <p>
                                    Your feedback will appear here...
                                </p>
                            )}

                        {!loading &&
                            feedback && (
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

                                    {feedback.issues
                                        ?.length > 0 && (
                                            <div>

                                                <p className="text-red-400 font-semibold">
                                                    ❌ Issues:
                                                </p>

                                                <ul className="list-disc ml-5">

                                                    {feedback.issues.map(
                                                        (
                                                            issue,
                                                            i
                                                        ) => (
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
                                            {
                                                feedback.explanation
                                            }
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
                                                {
                                                    feedback.fixed_code
                                                }
                                            </pre>

                                        </div>
                                    )}

                                    {feedback.suggestion && (
                                        <p className="text-purple-300">
                                            🚀 Suggestion:
                                            {" "}
                                            {
                                                feedback.suggestion
                                            }
                                        </p>
                                    )}

                                </>
                            )}

                    </div>
                </div>
            </div>

            {/* Output */}
            <div
                className="mt-4 bg-slate-800/70 backdrop-blur-lg
        p-3 rounded-xl border border-slate-700"
            >

                <h2 className="text-blue-400">
                    ⚡ Output
                </h2>

                <pre className="text-red-300 whitespace-pre-wrap">

                    {output ||
                        "Run your code to see output..."}

                </pre>

            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-4 justify-center">

                <Button
                    onClick={handleRun}
                    className="max-w-[180px] bg-green-600"
                >
                    ▶ Run Code
                </Button>

                <Button
                    onClick={handleReview}
                    disabled={loading}
                    className="max-w-[180px]"
                >
                    🧠 Review Code
                </Button>

            </div>

            {/* Pingo */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

                {pingoState !== "idle" && (
                    <div
                        className="mb-2 mr-2 bg-white text-black text-xs
            px-3 py-2 rounded-xl shadow-lg
            max-w-[160px] relative animate-fadeIn"
                    >

                        <p>

                            {!hasWelcomed &&
                                "👋 Hi! Try some code!"}

                            {hasWelcomed &&
                                pingoState === "happy" &&
                                "🚀 Try some more!"}

                            {pingoState === "running" &&
                                "⚡ Running your code..."}

                            {pingoState === "thinking" &&
                                "🧠 Hmm... analyzing..."}

                        </p>

                        <div
                            className="absolute bottom-[-6px] right-4
              w-3 h-3 bg-white rotate-45"
                        ></div>

                    </div>
                )}

                <div className="relative">

                    <div
                        className={`absolute inset-0 rounded-full blur-3xl opacity-40
            ${pingoState === "running"
                                ? "bg-yellow-400"
                                : pingoState ===
                                    "thinking"
                                    ? "bg-purple-500"
                                    : pingoState ===
                                        "happy"
                                        ? "bg-green-400"
                                        : "bg-blue-500"
                            }`}
                    ></div>

                    <div
                        className="absolute inset-0 rounded-full border-2 border-blue-400
            opacity-60 animate-pulse"
                    ></div>

                    <img
                        src={
                            pingoState === "running"
                                ? "/pingo-running.png"
                                : pingoState ===
                                    "thinking"
                                    ? "/pingo-thinking.png"
                                    : pingoState ===
                                        "happy"
                                        ? "/pingo-happy.png"
                                        : "/pingo-idle.png"
                        }
                        className="relative w-16 md:w-20 animate-breathe
            drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
                    />

                </div>
            </div>

        </DashboardLayout>
    );
}