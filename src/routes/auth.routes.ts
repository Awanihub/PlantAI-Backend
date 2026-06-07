import express from "express";
import { protect } from "../middlewares/auth.middleware";

import {
  signup,
  signin,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);

router.post("/signin", signin);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/verify-otp",
  verifyOtp
);

router.post(
  "/reset-password",
  protect,
  resetPassword
);

export default router;