// server.js

import app from "./src/app.js";
import {connectDB} from "./src/config/db.js";

const PORT = process.env.PORT || 5001;

let server;

// Connect DB first, then start server
const startServer = async () => {
  try {
    await connectDB();

    server = app.listen(PORT, () => {
      console.log(`Auth Service running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// ============================================
// GRACEFUL SHUTDOWN HANDLERS
// ============================================

// Unhandled Promise Rejection
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection:", reason);

  if (server) {
    server.close(() => {
      console.log("Server closed due to unhandled rejection");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Uncaught Exception
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);

  if (server) {
    server.close(() => {
      console.log("Server closed due to uncaught exception");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// SIGTERM (Render, Docker, Kubernetes, etc.)
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");

  if (server) {
    server.close(() => {
      console.log("Server closed gracefully");
      process.exit(0);
    });
  }
});

// SIGINT (Ctrl + C)
process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");

  if (server) {
    server.close(() => {
      console.log("Server closed gracefully");
      process.exit(0);
    });
  }
});