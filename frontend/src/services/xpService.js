import api from "../api/axios";

export const updateXP =
  async (
    xp,
    level
  ) => {

    const res =
      await api.patch(
        "/leaderboard/xp",

        {
          xp,
          level,
        }
      );

    return res.data;
};