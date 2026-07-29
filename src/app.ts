import express from "express";
import cors from "cors";
import multer from "multer";
import { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import plantRoutes from "./routes/plant.routes";
import chatRoutes from "./routes/chat.routes";
import learnRoutes from "./routes/learn.routes";
import reminderRoutes from "./routes/reminder.routes";

const app = express();


app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (_req, res) => {
  console.log("Health check endpoint hit");
  res.status(200).json({
    success: true,
    message: "Plant AI Backend is running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/chat", chatRoutes); 
app.use("/api/user", userRoutes);
app.use("/api/learn", learnRoutes);
app.use(
  "/api/reminders",
  reminderRoutes
);

// Global Error Handler
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
      console.error("Multer error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    if (err) {
      console.error("Unhandled error:", err);
      return res.status(400).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    }

    next();
  }
);

export default app;