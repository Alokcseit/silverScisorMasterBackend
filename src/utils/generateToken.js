// src/utils/generateToken.js

import jwt from "jsonwebtoken";
import crypto from "crypto";
import env from "../config/env.js";

// Generate Access Token (short-lived)
export const generateAccessToken = (userId, userType) => {
  return jwt.sign(
    { id: userId, userType },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRE }
  );
};

// Generate Refresh Token (long-lived)
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRE }
  );
};

// Generate Random Reset Token
export const generateResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return { resetToken, hashedToken };
}; 