import mongoose from "mongoose";

export interface IPlantScan {
  _id?: mongoose.Types.ObjectId;

  userId: mongoose.Types.ObjectId;

  image: {
    data: Buffer;
    contentType: string;
  };

  plantName: string;

  scientificName: string;

  description: string;

  wateringTips: string;

  sunlightRequirements: string;

  fertilizerSuggestions: string;

  expiresAt: Date;

  createdAt?: Date;

  updatedAt?: Date;
}