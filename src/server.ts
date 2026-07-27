import dotenv from "dotenv";
dotenv.config(); // call this immediately, before other imports execute their top-level code

import app from "./app";
import connectDB from "./config/db";
import { validateEnvironmentVariables } from "./config/env";
import gardenRoutes from "./routes/garden.routes";

validateEnvironmentVariables();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    app.use("/api/garden", gardenRoutes);
    app.listen(PORT, () => {
      console.log(
        `🚀 Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled Promise Rejection:", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught Exception:", error);
  process.exit(1);
});

startServer();