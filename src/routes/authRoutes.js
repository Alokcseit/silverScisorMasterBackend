// src/routes/authRoutes.js

import express from "express";
import rateLimit from "express-rate-limit";

import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  refreshToken,
  logout,
  getMe,
  updateProfile,
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rate limiters
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: "Too many reset attempts. Try again after 1 hour.",
  },
});

// Public routes
router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPassword
);
router.post("/reset-password", resetPassword);
router.post("/refresh-token", refreshToken);

// Protected routes
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.post("/logout", protect, logout);

export default router; 