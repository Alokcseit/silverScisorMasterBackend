// src/config/db.js

import mongoose from "mongoose";

let isConnected = false;
let retryCount = 0;

const MAX_RETRIES = 5;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 sec timeout
      socketTimeoutMS: 45000,         // 45 sec socket timeout
      maxPoolSize: 10,                // Max 10 connections
      minPoolSize: 2,                 // Min 2 connections always ready
    });

    isConnected = true;
    retryCount = 0;

    console.log(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);

    if (retryCount < MAX_RETRIES) {
      retryCount++;

      const delay = Math.min(
        1000 * Math.pow(2, retryCount),
        30000
      );

      // Exponential backoff
      console.log(
        `Retrying connection in ${delay / 1000}s... (${retryCount}/${MAX_RETRIES})`
      );

      setTimeout(() => {
        connectDB();
      }, delay);

    } else {
      console.error("Max retries reached. Exiting...");
      process.exit(1);
    }
  }
};

// Connection events
mongoose.connection.on("connected", () => {
  isConnected = true;
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.warn(
    "Mongoose disconnected from MongoDB. Reconnecting..."
  );
});

mongoose.connection.on("error", (err) => {
  isConnected = false;
  console.error("Mongoose connection error:", err);
});

// Connection status checker
export const checkConnection = () => isConnected;