import express from "express";

import { protect } from "../middlewares/auth.middleware";

import { upload } from "../middlewares/upload.middleware";

import {
  identifyPlantController,
} from "../controllers/plant.controller";

const router = express.Router();

router.post(
  "/identify",
  protect,
  upload.single("image"),
  identifyPlantController
);

export default router;