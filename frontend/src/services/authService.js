import api from "../api/axios";

// LOGIN
export const loginUser = async (
  email,
  password
) => {

  const res = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return res.data;
};

// SIGNUP
export const signupUser = async (
  name,
  email,
  password
) => {

  const res = await api.post(
    "/auth/register",
    {
      name,
      email,
      password,
    }
  );

  return res.data;
};

// GET CURRENT USER
export const getCurrentUser =
  async () => {

    const res = await api.get(
      "/auth/me"
    );

    return res.data;
  };