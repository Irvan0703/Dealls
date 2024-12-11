// src/routes/profileRoutes.ts
import { Router } from "express";
import {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile,
} from "./controller";
import { isAuthenticated } from "../../middleware/auth"; // Assuming you have an authentication middleware

const router = Router();

// Route to create a new profile
router.post("/profiles", isAuthenticated, createProfile);

// Route to get a user's profile by userId
router.get("/profiles/:userId", isAuthenticated, getProfile);

// Route to update a user's profile by userId
router.put("/profiles/:userId", isAuthenticated, updateProfile);

// Route to delete a user's profile by userId
router.delete("/profiles/:userId", isAuthenticated, deleteProfile);

export default router;
