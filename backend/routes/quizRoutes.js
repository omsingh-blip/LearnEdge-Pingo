import express from "express";

import authMiddleware
from "../middleware/authMiddleware.js";

import adminMiddleware
from "../middleware/adminMiddleware.js";

import {

getAllQuizzes,

getQuizByDomain,

createQuiz,

updateQuiz,

deleteQuiz

}
from "../controllers/quizController.js";

const router =
express.Router();


// ================= USER =================

// Existing quiz usage
router.get(
"/:domain",
getQuizByDomain
);


// ================= ADMIN =================

// Get all quizzes
router.get(
"/",
authMiddleware,
adminMiddleware,
getAllQuizzes
);

// Create
router.post(
"/",
authMiddleware,
adminMiddleware,
createQuiz
);

// Update
router.patch(
"/:id",
authMiddleware,
adminMiddleware,
updateQuiz
);

// Delete
router.delete(
"/:id",
    authMiddleware,
    adminMiddleware,    
deleteQuiz
);

export default router;