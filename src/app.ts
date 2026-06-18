import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import plantRoutes from "./routes/plant.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();


// Middlewares
app.use(cors());
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
// app.use("/api/plants", plantRoutes);
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/plants",
  plantRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use("/api/user", userRoutes);

export default app;