import express from "express";

import { protect } from "../middlewares/auth.middleware";

import {
  addReminder,
  getReminders,
  markReminderCompleted,
  removeReminder,
} from "../controllers/reminder.controller";

const router = express.Router();

router.post(
  "/",
  protect,
  addReminder
);

router.get(
  "/",
  protect,
  getReminders
);

router.patch(
  "/:id/complete",
  protect,
  markReminderCompleted
);

router.delete(
  "/:id",
  protect,
  removeReminder
);

export default router;