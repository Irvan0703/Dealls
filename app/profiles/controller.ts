// src/controllers/profileController.ts
import { Request, Response } from "express";
import Profile from "./model";
import User from "../users/model";

// Create a new profile
export const createProfile = async (req: Request, res: Response): Promise<void> => {
    const { userId, name, age, bio } = req.body;

    try {
        // Ensure the user exists
        const user = await User.findByPk(userId);
        if (!user) {
             res.status(404).json({ message: "User not found" });
        }

        // Create the profile
        const profile = await Profile.create({ userId, name, age, bio });

         res.status(201).json({ message: "Profile created", profile });
    } catch (error) {
         res.status(500).json({ message: "Error creating profile", error });
    }
};

// Get a user's profile by userId
export const getProfile = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const profile = await Profile.findOne({ where: { userId } });

        if (!profile) {
             res.status(404).json({ message: "Profile not found" });
        }

         res.status(200).json({ profile });
    } catch (error) {
         res.status(500).json({ message: "Error fetching profile", error });
    }
};

// Update a profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    const { name, age, bio } = req.body;

    try {
        const profile = await Profile.findOne({ where: { userId } });

        if (!profile) {
             res.status(404).json({ message: "Profile not found" });
             return;
        }

        // Update profile details
        profile.name = name ?? profile.name;
        profile.age = age ?? profile.age;
        profile.bio = bio ?? profile.bio;

        await profile.save();

         res.status(200).json({ message: "Profile updated", profile });
    } catch (error) {
         res.status(500).json({ message: "Error updating profile", error });
    }
};

// Delete a profile
export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const profile = await Profile.findOne({ where: { userId } });

        if (!profile) {
             res.status(404).json({ message: "Profile not found" });
             return;
        }

        await profile.destroy();

         res.status(200).json({ message: "Profile deleted" });
    } catch (error) {
         res.status(500).json({ message: "Error deleting profile", error });
    }
};
