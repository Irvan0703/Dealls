// src/controllers/swipeController.ts
import { Request, Response } from "express";
import Swipe from "./model";
import User from "../users/model";

// Create a new swipe (like or pass)
export const createSwipe = async (req: Request, res: Response): Promise<void> => {
    const { swiperId, swipedUserId, type } = req.body;

    // Validate the type of swipe (like or pass)
    if (!['like', 'pass'].includes(type)) {
         res.status(400).json({ message: "Invalid swipe type. Must be 'like' or 'pass'." });
    }

    try {
        // Ensure both users exist
        const swiper = await User.findByPk(swiperId);
        const swipedUser = await User.findByPk(swipedUserId);

        if (!swiper || !swipedUser) {
             res.status(404).json({ message: "User(s) not found" });
        }

        // Create the swipe
        const swipe = await Swipe.create({ swiperId, swipedUserId, type });

         res.status(201).json({ message: "Swipe recorded", swipe });
    } catch (error) {
         res.status(500).json({ message: "Error creating swipe", error });
    }
};

// Get swipes made by a user (swiped user)
export const getSwipesMade = async (req: Request, res: Response): Promise<void> => {
    const { swiperId } = req.params;

    try {
        const swipes = await Swipe.findAll({ where: { swiperId }, include: ['swipedUser'] });

        if (!swipes || swipes.length === 0) {
             res.status(404).json({ message: "No swipes found for this user" });
        }

         res.status(200).json({ swipes });
    } catch (error) {
         res.status(500).json({ message: "Error fetching swipes", error });
    }
};

// Get swipes received by a user
export const getSwipesReceived = async (req: Request, res: Response): Promise<void> => {
    const { swipedUserId } = req.params;

    try {
        const swipes = await Swipe.findAll({ where: { swipedUserId }, include: ['swiper'] });

        if (!swipes || swipes.length === 0) {
             res.status(404).json({ message: "No swipes found for this user" });
        }

         res.status(200).json({ swipes });
    } catch (error) {
         res.status(500).json({ message: "Error fetching swipes", error });
    }
};
