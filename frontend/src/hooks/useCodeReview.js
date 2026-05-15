import { useState } from "react";

import {
  updateScore,
} from "../services/leaderboardService";

import {
  reviewCode,
} from "../services/reviewService";

import { useGameStore } from "../store/useGameStore";

import { useAuthStore } from "../store/authStore";

export default function useCodeReview() {

  const {
    xp,
    level,
    addXP,
    setStreak,
  } = useGameStore();

  const { user } = useAuthStore();

  // ================= STATE =================
  const [feedback, setFeedback] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [pingoState, setPingoState] =
    useState("idle");

  const [showLevelUp, setShowLevelUp] =
    useState(false);

  // ================= REVIEW =================
  const handleReview = async ({
    code,
    problem,
  }) => {

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
          problem ||
          "Unknown Problem",

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

        setTimeout(() => {
          setShowLevelUp(false);
        }, 2000);

      }

      // Sync leaderboard
      await updateScore(earnedXp);

      // Feedback
      setFeedback({
        message:
          `🎉 You earned +${earnedXp} XP!`,

        explanation:
          data.explanation,

        hint:
          data.hint,

        issues:
          data.issues,

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

  return {
    feedback,
    loading,
    pingoState,
    showLevelUp,

    setPingoState,

    handleReview,
  };
}