import { Request, Response } from "express";

import {
  addPlantToGarden,
  getGardenPlants,
  deleteGardenPlant,
} from "../services/garden.service";

export const addGardenPlant = async (
  req: Request,
  res: Response
) => {
  try {
    const decoded = (req as any).user;

    const { scanId } = req.body;

    if (!scanId) {
      return res.status(400).json({
        success: false,
        message: "scanId is required",
      });
    }

    const plant = await addPlantToGarden(
      decoded.userId,
      scanId
    );

    return res.status(201).json({
      success: true,
      message: "Plant added to garden",
      plant,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add plant",
    });
  }
};
export const getMyGarden = async (
  req: Request,
  res: Response
) => {
  try {
    const decoded = (req as any).user;

    const plants = await getGardenPlants(decoded.userId);

    return res.status(200).json({
      success: true,
      plants,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch garden",
    });
  }
};

export const removeGardenPlant = async (
  req: Request,
  res: Response
) => {
  try {
    const decoded = (req as any).user;

    const id = req.params.id as string;

    const plant = await deleteGardenPlant(
      id,
      decoded.userId
    );
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: "Plant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Plant removed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove plant",
    });
  }
};