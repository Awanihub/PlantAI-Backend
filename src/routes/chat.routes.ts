import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { sendMessage, logoutSession, askPlant } from "../controllers/chat.controller"; // add askPlant

// existing routes stay as-is


const router = express.Router();

router.post("/ask", protect, askPlant);
router.post("/message", protect, sendMessage);
router.delete("/logout", protect, logoutSession);


export default router;