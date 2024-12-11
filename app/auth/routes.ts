import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUser, deleteUser } from './controller';
import { body } from 'express-validator';
import { isAuthenticated } from '../../middleware/auth'; // Authentication middleware

const router = express.Router();

// Register Route
router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

// Login Route
router.post('/login', loginUser);

// Get User Profile (protected)
router.get('/profile', isAuthenticated, getUserProfile);

// Update User Details (protected)
router.put('/profile', isAuthenticated, updateUser);

// Delete User Account (protected)
router.delete('/profile', isAuthenticated, deleteUser);

export default router;
