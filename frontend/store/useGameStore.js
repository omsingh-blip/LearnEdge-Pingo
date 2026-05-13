import { create } from "zustand";

const calculateLevel = (xp) => Math.floor(xp / 100) + 1;

export const useGameStore = create((set) => ({
  xp: Number(localStorage.getItem("xp")) || 0,
  streak: Number(localStorage.getItem("streak")) || 0,
  level: Number(localStorage.getItem("level")) || 1,

  addXP: (amount) =>
    set((state) => {
      const newXP = state.xp + amount;
      const newLevel = calculateLevel(newXP);

      localStorage.setItem("xp", newXP);
      localStorage.setItem("level", newLevel);

      return {
        xp: newXP,
        level: newLevel,
      };
    }),

  setStreak: (value) =>
    set(() => {
      localStorage.setItem("streak", value);

      return { streak: value };
    }),
}));