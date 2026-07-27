import express from "express";

import { protect } from "../middlewares/auth.middleware";

import { askLearnAI } from "../controllers/learn.controller";

const router = express.Router();

router.post(
  "/ask",
  protect,
  askLearnAI
);

export default router;