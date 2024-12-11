// src/routes/swipeRoutes.ts
import { Router } from "express";
import {
    createSwipe,
    getSwipesMade,
    getSwipesReceived,
} from "./controller";
import { isAuthenticated } from "../../middleware/auth"; // Assuming you have an authentication middleware

const router = Router();

// Route to create a new swipe (like or pass)
router.post("/swipes", isAuthenticated, createSwipe);

// Route to get all swipes made by a user (swipes made by the swiper)
router.get("/swipes/made/:swiperId", isAuthenticated, getSwipesMade);

// Route to get all swipes received by a user
router.get("/swipes/received/:swipedUserId", isAuthenticated, getSwipesReceived);

export default router;
