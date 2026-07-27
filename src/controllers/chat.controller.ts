import { Request, Response } from "express";
import { validateChatMessage } from "../validators/chat.validator";
import {
  getOrCreateChat,
  addMessage,
  getLast10Messages,
  deleteUserSession,
} from "../services/chat.service";
import * as plantService from "../services/plant.service";

import { chatWithPlant } from "../services/gemini.service";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const decoded = (req as any).user;
    const validation = validateChatMessage(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    const { plantScanId, question } = req.body;

    if (!plantScanId || !question) {
      return res.status(400).json({
        success: false,
        message: "plantScanId and question are required",
      });
    }

    const plantScan = (await plantService.getPlantScanById(plantScanId)) as any;

    if (!plantScan) {
      return res.status(404).json({
        success: false,
        message: "Plant scan not found",
      });
    }

    const chat = await getOrCreateChat(decoded.userId, plantScanId);
    await addMessage(chat._id.toString(), "user", question);
    const lastMessages = await getLast10Messages(chat._id.toString());

    const answer = await chatWithPlant(
      {
        plantName: plantScan.plantName,
        scientificName: plantScan.scientificName,
        description: plantScan.description,
        wateringTips: plantScan.wateringTips,
        sunlightRequirements: plantScan.sunlightRequirements,
        fertilizerSuggestions: plantScan.fertilizerSuggestions,
      },
      question,
      lastMessages,
    );

    await addMessage(chat._id.toString(), "assistant", answer);

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Chat Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to process chat",
    });
  }
};

export const logoutSession = async (req: Request, res: Response) => {
  try {
    const decoded = (req as any).user;
    await deleteUserSession(decoded.userId);

    return res.status(200).json({
      success: true,
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete session",
    });
  }
};

// ✅ New: simple ask without database lookup
export const askPlant = async (req: Request, res: Response) => {
  try {
    const { plantInfo, question } = req.body;

    if (!plantInfo || !question) {
      return res.status(400).json({
        success: false,
        message: "plantInfo and question are required",
      });
    }

    const answer = await chatWithPlant(
      {
        plantName: plantInfo.plantName,
        scientificName: plantInfo.scientificName,
        description: plantInfo.description,
        wateringTips: plantInfo.wateringTips,
        sunlightRequirements: plantInfo.sunlightRequirements,
        fertilizerSuggestions: plantInfo.fertilizerSuggestions,
      },
      question,
      [],
    );

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Ask Plant Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get answer",
    });
  }
};
