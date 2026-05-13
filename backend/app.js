import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import leaderboardRoutes from "./routes/leaderboard.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/leaderboard", leaderboardRoutes);

// Health route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Global Error Middleware
app.use(errorMiddleware);

export default app;