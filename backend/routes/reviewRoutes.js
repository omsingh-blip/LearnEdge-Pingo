import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createReview,
  getUserReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

// ================= CREATE =================
router.post(
  "/",
  authMiddleware,
  createReview
);

// ================= GET USER REVIEWS =================
router.get(
  "/my-reviews",
  authMiddleware,
  getUserReviews
);

export default router;