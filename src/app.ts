import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Plant AI Backend is running 🚀",
  });
});

// Routes
// app.use("/api/plants", plantRoutes);
app.use(
  "/api/auth",
  authRoutes
);

export default app;