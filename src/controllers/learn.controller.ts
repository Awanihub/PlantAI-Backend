import { Request, Response } from "express";

import { validateLearnQuestion } from "../validators/learn.validator";

import { askPlantTutor } from "../services/learn.service";

export const askLearnAI = async (
  req: Request,
  res: Response
) => {
  try {

    const validation = validateLearnQuestion(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
      });
    }

    const { question } = req.body;

    const answer = await askPlantTutor(question);

    return res.status(200).json({
      success: true,
      answer,
    });

  } catch (error) {

    console.error("Learn AI Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate answer",
    });

  }
};