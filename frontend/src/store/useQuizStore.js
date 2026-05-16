import { create } from "zustand";

import {
  fetchQuizByDomain,
} from "../services/quizService";

export const useQuizStore =
  create((set) => ({

    quiz: null,

    loading: false,

    error: null,

    fetchQuiz: async (domain) => {

      try {

        set({
          loading: true,
          error: null,
        });

        const quiz =
          await fetchQuizByDomain(domain);

        set({
          quiz,
          loading: false,
        });

      } catch (error) {

        set({
          error: error.message,
          loading: false,
        });

      }
    },

}));