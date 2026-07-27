import Reminder from "../models/reminder.model";
import GardenPlant from "../models/garden.model";

export const createReminder = async (
  userId: string,
  gardenPlantId: string,
  action: "Water" | "Fertilize" | "Prune" | "Repot" | "Mist",
  reminderDate: Date
) => {
  // Check if the plant belongs to the user
  const plant = await GardenPlant.findOne({
    _id: gardenPlantId,
    userId,
  });

  if (!plant) {
    throw new Error("Plant not found in your garden");
  }

  const reminder = await Reminder.create({
    userId,
    gardenPlantId,
    action,
    reminderDate,
  });

  return reminder;
};

export const getUserReminders = async (
  userId: string
) => {
  return await Reminder.find({ userId })
    .populate(
      "gardenPlantId",
      "plantName scientificName image"
    )
    .sort({
      reminderDate: 1,
    });
};

export const completeReminder = async (
  reminderId: string,
  userId: string
) => {
  return await Reminder.findOneAndUpdate(
    {
      _id: reminderId,
      userId,
    },
    {
      completed: true,
    },
    {
      new: true,
    }
  );
};

export const deleteReminder = async (
  reminderId: string,
  userId: string
) => {
  return await Reminder.findOneAndDelete({
    _id: reminderId,
    userId,
  });
};