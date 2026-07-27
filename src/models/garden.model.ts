import mongoose, { Schema, Document } from "mongoose";

export interface IGardenPlant extends Document {
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
  commonProblems?: string;
  careInstructions?: string;

  createdAt: Date;
  updatedAt: Date;
}

const gardenPlantSchema = new Schema<IGardenPlant>(
  {
    userId: {
      type: Schema.Types.ObjectId,
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

    commonProblems: {
      type: String,
      default: "",
    },

    careInstructions: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const GardenPlant = mongoose.model<IGardenPlant>(
  "GardenPlant",
  gardenPlantSchema
);

export default GardenPlant;