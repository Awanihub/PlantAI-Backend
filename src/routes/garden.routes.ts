import express from "express";

import { protect } from "../middlewares/auth.middleware";

import {
  addGardenPlant,
  getMyGarden,
  removeGardenPlant,
} from "../controllers/garden.controller";

const router = express.Router();

router.post(
  "/add",
  protect,
  addGardenPlant
);

router.get(
  "/",
  protect,
  getMyGarden
);

router.delete(
  "/:id",
  protect,
  removeGardenPlant
);

export default router;