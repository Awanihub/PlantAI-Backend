import { Request, Response } from "express";
import { validatePlantIdentification } from "../validators/plant.validator";
import { identifyPlant } from "../services/gemini.service";
import { createPlantScan } from "../services/plant.service";

export const identifyPlantController = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("Received plant identification request");
    const validation = validatePlantIdentification(req.file);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Plant image is required",
      });
    }

    const imageBase64 = req.file.buffer.toString("base64");

    console.log("Calling Gemini...");

    const geminiResponse = await identifyPlant(
      imageBase64,
      req.file.mimetype
    );

    console.log("Gemini Response:");
    console.log(geminiResponse);

    if (!geminiResponse) {
      return res.status(500).json({
        success: false,
        message: "No response received from Gemini",
      });
    }

    let plantData;

    try {
      const cleanResponse = geminiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      plantData = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw Gemini Response:", geminiResponse);

      return res.status(500).json({
        success: false,
        message: "Invalid JSON received from Gemini",
      });
    }

    if (!plantData.plantName) {
      return res.status(500).json({
        success: false,
        message: "Invalid plant data returned by Gemini",
      });
    }

    const decoded = (req as any).user;

    const plantScan = await createPlantScan(
      decoded.userId,
      req.file.buffer,
      req.file.mimetype,
      plantData
    );

    return res.status(200).json({
      success: true,

      scanId: plantScan._id,

      plantName: plantData.plantName,
      scientificName: plantData.scientificName,
      description: plantData.description,

      wateringTips: plantData.wateringTips,
      sunlightRequirements:
        plantData.sunlightRequirements,
      fertilizerSuggestions:
        plantData.fertilizerSuggestions,

      commonProblems:
        plantData.commonProblems || "",

      careInstructions:
        plantData.careInstructions || "",
    });
  } catch (error) {
    console.error(
      "Plant Identification Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to identify plant",
    });
  }
};