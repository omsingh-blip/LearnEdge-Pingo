import { create } from "zustand";

import {
  updateScore,
} from "../services/leaderboardService";

const calculateLevel = (xp) =>
  Math.floor(xp / 100) + 1;

export const useGameStore =
  create((set, get) => ({

    // ================= STATE =================
    xp:
      Number(
        localStorage.getItem("xp")
      ) || 0,

    streak:
      Number(
        localStorage.getItem("streak")
      ) || 0,

    level:
      Number(
        localStorage.getItem("level")
      ) || 1,

    syncing: false,

    // ================= ADD XP =================
    addXP: async (amount) => {

      const currentXP =
        get().xp;

      const newXP =
        currentXP + amount;

      const newLevel =
        calculateLevel(
          newXP
        );

      // Optimistic update
      set({

        xp: newXP,

        level: newLevel,

        syncing: true,

      });

      localStorage.setItem(
        "xp",
        newXP
      );

      localStorage.setItem(
        "level",
        newLevel
      );

      try {

        // Backend sync
        await updateScore(
          amount
        );

      } catch (error) {

        console.error(
          "XP sync failed",
          error
        );

      }

      set({
        syncing: false,
      });

    },

    // ================= STREAK =================
    setStreak: (value) => {

      localStorage.setItem(
        "streak",
        value
      );

      set({
        streak: value,
      });

    },

    // ================= RESET =================
    resetGame: () => {

      localStorage.removeItem(
        "xp"
      );

      localStorage.removeItem(
        "level"
      );

      localStorage.removeItem(
        "streak"
      );

      set({

        xp: 0,

        level: 1,

        streak: 0,

      });

    },

  }));