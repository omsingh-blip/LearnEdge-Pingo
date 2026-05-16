import { useState, useEffect } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Confetti from "react-confetti";

import { useGameStore } from "../store/useGameStore";

import {
  useQuizStore,
} from "../store/useQuizStore";

export default function Quiz() {

  const navigate =
    useNavigate();

  const { domain } =
    useParams();

  const {
    addXP,
    xp,
  } = useGameStore();

  const {
    quiz,
    loading,
    error,
    fetchQuiz,
  } = useQuizStore();

  // ================= STATES =================
  const [current, setCurrent] =
    useState(0);

  const [answers, setAnswers] =
    useState([]);

  const [time, setTime] =
    useState(300);

  const [showResult, setShowResult] =
    useState(false);

  const [showHint, setShowHint] =
    useState("");

  const [levelUp, setLevelUp] =
    useState(false);

  const [xpGiven, setXpGiven] =
    useState(false);

  // ================= FETCH QUIZ =================
  useEffect(() => {

    fetchQuiz(domain);

  }, [domain]);

  // ================= TIMER =================
  useEffect(() => {

    if (time <= 0) {

      setShowResult(true);

      return;
    }

    const timer = setInterval(() => {

      setTime((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [time]);

  // ================= QUESTIONS =================
  const questions =
    quiz?.questions || [];

  // ================= SCORE =================
  const correct =
    questions.filter(
      (q, i) =>
        q.answer === answers[i]
    ).length;

  const earnedXP =
    correct * 5;

  // ================= BACKEND SCORE =================
  const updateScoreBackend =
    async (points) => {

      try {

        const token =
          localStorage.getItem("token");

        await fetch(
          "https://learnedge-backend-raxx.onrender.com/api/leaderboard/update-score",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: token,
            },

            body: JSON.stringify({
              points,
            }),
          }
        );

      } catch (err) {

        console.error(
          "Score sync failed:",
          err
        );
      }
    };

  // ================= XP UPDATE =================
  useEffect(() => {

    if (
      showResult &&
      questions.length > 0 &&
      !xpGiven
    ) {

      addXP(earnedXP);

      if (
        Math.floor(xp / 100) <
        Math.floor(
          (xp + earnedXP) / 100
        )
      ) {

        setLevelUp(true);

        setTimeout(() => {

          setLevelUp(false);

        }, 3000);
      }

      updateScoreBackend(earnedXP);

      setXpGiven(true);
    }

  }, [showResult]);

  // ================= ANSWER =================
  const handleAnswer =
    (option) => {

      const newAnswers =
        [...answers];

      newAnswers[current] =
        option;

      setAnswers(newAnswers);
    };

  // ================= NEXT =================
  const nextQuestion = () => {

    if (
      current <
      questions.length - 1
    ) {

      setCurrent(current + 1);

      setShowHint("");

    } else {

      setShowResult(true);

    }
  };

  // ================= LOADING =================
  if (loading) {

    return (
      <div
        className="
          min-h-screen
          bg-slate-900
          text-cyan-400

          flex items-center
          justify-center

          text-2xl
          animate-pulse
        "
      >

        Loading Quiz...

      </div>
    );
  }

  // ================= ERROR =================
  if (error) {

    return (
      <div
        className="
          min-h-screen
          bg-slate-900
          text-red-400

          flex items-center
          justify-center

          text-xl
        "
      >

        Failed to load quiz

      </div>
    );
  }

  // ================= RESULT =================
  if (showResult) {

    return (
      <div
        className="
          min-h-screen
          flex flex-col
          items-center
          justify-center

          bg-slate-900
          text-white
          relative
        "
      >

        <Confetti />

        {levelUp && (

          <div
            className="
              absolute top-20

              text-3xl
              font-bold

              text-yellow-400

              animate-bounce
            "
          >

            🎮 LEVEL UP!

          </div>
        )}

        <h1
          className="
            text-3xl
            font-bold
            mb-4
          "
        >

          🎉 Quiz Completed

        </h1>

        <p
          className="
            text-lg
            mb-2
          "
        >

          Score:
          {" "}
          {correct}
          {" / "}
          {questions.length}

        </p>

        <p
          className="
            text-yellow-400
            font-bold
            mb-6
            text-xl
          "
        >

          +{earnedXP} XP Earned

        </p>

        <button
          onClick={() =>
            navigate("/dashboard")
          }

          className="
            bg-blue-500
            px-6 py-3
            rounded

            hover:bg-blue-600

            transition
          "
        >

          Back to Dashboard

        </button>

      </div>
    );
  }

  // ================= MAIN UI =================
  return (
    <div
      className="
        min-h-screen
        bg-slate-900
        text-white

        flex items-center
        justify-center

        px-6
      "
    >

      <div
        className="
          w-full max-w-3xl

          bg-slate-800/70
          backdrop-blur-xl

          p-8 rounded-2xl

          shadow-[0_0_40px_rgba(59,130,246,0.2)]
        "
      >

        {/* Top */}
        <div
          className="
            flex items-center
            justify-between

            mb-8
          "
        >

          {/* Timer */}
          <div
            className="
              flex items-center
              gap-3
            "
          >

            <div
              className="
                w-12 h-12

                rounded-full

                border-4
                border-blue-400

                flex items-center
                justify-center

                animate-pulse

                shadow-[0_0_20px_rgba(59,130,246,0.6)]
              "
            >

              ⏱️

            </div>

            <p
              className="
                text-lg
                font-semibold
                tracking-wide
              "
            >

              {Math.floor(time / 60)}
              :
              {String(
                time % 60
              ).padStart(2, "0")}

            </p>

          </div>

          {/* Progress */}
          <div
            className="
              w-48
              bg-gray-700
              h-2
              rounded
              overflow-hidden
            "
          >

            <div
              className="
                bg-green-400
                h-2
                rounded

                transition-all
                duration-500

                shadow-[0_0_10px_rgba(34,197,94,0.7)]
              "

              style={{
                width:
                  `${(
                    (current + 1) /
                    questions.length
                  ) * 100}%`,
              }}
            />

          </div>

        </div>

        {/* Question */}
        <h2
          className="
            text-xl
            mb-6
            font-semibold

            transition-all
            duration-300

            hover:scale-[1.02]
          "
        >

          Q{current + 1}.
          {" "}
          {questions[current]?.q}

        </h2>

        {/* Options */}
        <div
          className="
            space-y-3
          "
        >

          {questions[current]?.options.map(
            (opt, i) => (

              <button
                key={i}

                onClick={() =>
                  handleAnswer(opt)
                }

                className={`
                  block
                  w-full
                  text-left

                  p-4
                  rounded-lg
                  border

                  transition-all
                  duration-300

                  ${
                    answers[current] === opt

                      ? `
                        bg-blue-500
                        border-blue-300

                        shadow-[0_0_20px_rgba(59,130,246,0.7)]

                        scale-[1.02]
                      `

                      : `
                        bg-slate-800
                        border-slate-700

                        hover:border-blue-400

                        hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]

                        hover:scale-[1.02]
                      `
                  }
                `}
              >

                {opt}

              </button>
            )
          )}

        </div>

        {/* Hint */}
        <button
          onClick={() => {

            const hints = [

              "💡 Think about basics!",

              "🧠 Eliminate wrong options!",

              "⚡ Recall concepts!",

              "📚 You saw this in notes!",

            ];

            const random =
              hints[
                Math.floor(
                  Math.random() *
                  hints.length
                )
              ];

            setShowHint(random);

          }}

          className="
            mt-6
            px-5 py-2
            rounded-lg

            bg-purple-500

            transition-all
            duration-300

            hover:scale-105
          "
        >

          🐧 Hint

        </button>

        {showHint && (

          <div
            className="
              mt-4

              bg-white
              text-black

              px-4 py-2

              rounded-lg
            "
          >

            {showHint}

          </div>
        )}

        {/* Next */}
        <button
          onClick={nextQuestion}

          className="
            mt-8
            w-full

            px-6 py-3
            rounded-lg

            bg-green-500

            transition-all
            duration-300

            hover:scale-105
          "
        >

          {current ===
          questions.length - 1

            ? "Finish"

            : "Next"}

        </button>

      </div>

    </div>
  );
}