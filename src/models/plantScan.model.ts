import mongoose from "mongoose";

const plantScanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      data: {
        type: Buffer,
        required: true,
      },

      contentType: {
        type: String,
        required: true,
      },
    },

    plantName: {
      type: String,
      required: true,
    },

    scientificName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    wateringTips: {
      type: String,
      required: true,
    },

    sunlightRequirements: {
      type: String,
      required: true,
    },

    fertilizerSuggestions: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: {
        expires: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "PlantScan",
  plantScanSchema
);