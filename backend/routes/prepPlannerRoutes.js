import express from "express";

import {
  generatePrepPlan,
} from "../controllers/prepPlannerController.js";

const router =
  express.Router();

router.post(
  "/",
  generatePrepPlan
);

export default router;