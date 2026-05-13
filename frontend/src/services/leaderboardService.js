import api from "../api/axios";

// GET LEADERBOARD
export const getLeaderboard =
  async () => {

    const res = await api.get(
      "/leaderboard"
    );

    return res.data;
  };

// UPDATE SCORE
export const updateScore =
  async (points) => {

    const res = await api.post(
      "/leaderboard/update-score",
      {
        points,
      }
    );

    return res.data;
  };