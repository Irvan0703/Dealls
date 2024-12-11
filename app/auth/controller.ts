import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../users/model';
import config from '../config'; // For JWT secret
import { validationResult } from 'express-validator';

// Register User Controller
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, email, password } = req.body;

  // Input validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
       res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create the user and hash the password before saving
    const user = await User.create({ username, email, password });
     res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Login User Controller
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
       res.status(400).json({ message: 'Invalid email or password' });
       return;
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
       res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, config.secret_key!, { expiresIn: '1h' });

     res.json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Get User Profile Controller
export const getUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req?.userId; // Assuming `userId` is set by the `isAuthenticated` middleware

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }

     res.json({
      message: 'User profile fetched successfully',
      user: { id: user?.id, username: user?.username, email: user?.email },
    });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Update User Controller
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.userId;
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
       res.status(404).json({ message: 'User not found' });
       return;
    }

    // If password is being updated, hash it before saving
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Update user details
    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

     res.json({
      message: 'User details updated successfully',
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};

// Delete User Controller
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.userId;

  try {
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
       res.status(404).json({ message: 'User not found' });
       return; 
    }

    await user.destroy();

     res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error); // Pass error to the error handler
  }
};
