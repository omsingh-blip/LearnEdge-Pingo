import express from "express";

import {
  loginUser,
  registerUser,
  getMe,
} from "../controllers/authController.js";

import {
  loginValidation,
  registerValidation,
} from "../validators/authValidator.js";

import validateMiddleware from "../middleware/validateMiddleware.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= REGISTER =================
router.post(
  "/register",
  registerValidation,
  validateMiddleware,
  registerUser
);

// ================= LOGIN =================
router.post(
  "/login",
  loginValidation,
  validateMiddleware,
  loginUser
);

// ================= CURRENT USER =================
router.get(
  "/me",
  authMiddleware,
  getMe
);

export default router;