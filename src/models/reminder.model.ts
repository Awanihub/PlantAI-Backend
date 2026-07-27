import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    gardenPlantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GardenPlant",
      required: true,
    },

    action: {
      type: String,
      required: true,
      enum: [
        "Water",
        "Fertilize",
        "Prune",
        "Repot",
        "Mist",
      ],
    },

    reminderDate: {
      type: Date,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Reminder",
  reminderSchema
);