// src/middleware/timeoutMiddleware.js

import timeout from "express-timeout-handler";

// Agar koi request 30 second mein complete nahi hui
const timeoutMiddleware = timeout.handler({
  timeout: 30000, // 30 seconds

  onTimeout: (req, res) => {
    res.status(408).json({
      success: false,
      message: "Request timed out. Please try again.",
    });
  },

  // Render functions ko skip karo
  disable: ["render"],
});

export default timeoutMiddleware;