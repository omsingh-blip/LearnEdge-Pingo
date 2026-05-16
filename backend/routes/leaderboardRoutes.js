import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {

  getLeaderboard,

  updateScore,

} from "../controllers/leaderboardController.js";

const router = express.Router();

// ================= GET LEADERBOARD =================
router.get(
  "/",
  getLeaderboard
);

// ================= UPDATE SCORE =================
router.post(
  "/update-score",
  authMiddleware,
  updateScore
);

router.patch(
  "/score",

  authMiddleware,

  updateScore
);

export default router;