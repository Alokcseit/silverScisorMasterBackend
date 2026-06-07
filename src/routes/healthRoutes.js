// src/routes/healthRoutes.js

import express from "express";
import mongoose from "mongoose";

import { checkConnection } from "../config/db.js";

const router = express.Router();

// Basic health check
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    service: "Silverscisor Auth Service",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

// Detailed health check (DB, memory, uptime)
router.get("/detailed", async (req, res) => {
  const dbStatus = checkConnection();
  const memoryUsage = process.memoryUsage();

  const health = {
    success: true,
    service: "Auth Service",
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())} seconds`,

    database: {
      status: dbStatus ? "connected" : "disconnected",

      // 0 = disconnected
      // 1 = connected
      // 2 = connecting
      // 3 = disconnecting
      state: mongoose.connection.readyState,
    },

    memory: {
      heapUsed: `${Math.round(
        memoryUsage.heapUsed / 1024 / 1024
      )} MB`,

      heapTotal: `${Math.round(
        memoryUsage.heapTotal / 1024 / 1024
      )} MB`,

      rss: `${Math.round(
        memoryUsage.rss / 1024 / 1024
      )} MB`,
    },

    status: dbStatus ? "healthy" : "degraded",
  };

  const statusCode = dbStatus ? 200 : 503;

  res.status(statusCode).json(health);
});

export default router;