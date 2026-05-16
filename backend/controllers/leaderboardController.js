import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";

import { getIO } from "../socket/socket.js";

// ================= GET LEADERBOARD =================
export const getLeaderboard =
  asyncHandler(async (req, res) => {

    const leaderboard =
      await User.find()

        .select(
          "name score xp level"
        )

        .sort({
          xp: -1,
        })

        .limit(10);

    res.status(200).json(
      leaderboard
    );

  });

// ================= UPDATE SCORE / XP =================
export const updateScore =
  asyncHandler(async (req, res) => {

    const { points } = req.body;

    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {

      return res.status(404).json({

        success: false,

        msg: "User not found",

      });

    }

    // ================= UPDATE PROGRESSION =================
    user.score += points;

    user.xp += points;

    user.level =
      Math.floor(
        user.xp / 100
      ) + 1;

    user.lastActive =
      new Date();

    await user.save();

    // ================= REFRESH LEADERBOARD =================
    const leaderboard =
      await User.find()

        .select(
          "name score xp level"
        )

        .sort({
          xp: -1,
        })

        .limit(10);

    // ================= SOCKET EMIT =================
    const io = getIO();

    io.emit(
      "leaderboardUpdate",
      leaderboard
    );

    res.status(200).json({

      success: true,

      msg:
        "XP updated successfully",

      user: {

        score: user.score,

        xp: user.xp,

        level: user.level,

      },

    });

  });