import mongoose from "mongoose";
import dotenv from "dotenv";

import Quiz from "../models/Quiz.js";
import connectDB from "../config/db.js";

dotenv.config();

const quizzes = [
  {
    domain: "dsa",

    questions: [
      {
        q: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        answer: "O(log n)",
      },

      {
        q: "Which data structure uses FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue",
      },
    ],
  },

  {
    domain: "webdev",

    questions: [
      {
        q: "Which hook manages state in React?",
        options: ["useRef", "useEffect", "useState", "useMemo"],
        answer: "useState",
      },
    ],
  },
];

const seedQuiz = async () => {
  try {
    await connectDB();

    await Quiz.deleteMany();

    await Quiz.insertMany(quizzes);

    console.log("Quiz data seeded");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedQuiz();