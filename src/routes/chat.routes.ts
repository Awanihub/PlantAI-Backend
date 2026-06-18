import express from "express";

import { protect } from "../middlewares/auth.middleware";

import {
  sendMessage,
  logoutSession,
} from "../controllers/chat.controller";

const router = express.Router();

router.post(
  "/message",
  protect,
  sendMessage
);

router.delete(
  "/logout",
  protect,
  logoutSession
);

export default router;