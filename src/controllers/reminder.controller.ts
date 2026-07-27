import { Request, Response } from "express";

import {
  createReminder,
  getUserReminders,
  completeReminder,
  deleteReminder,
} from "../services/reminder.service";


type ReminderAction =
  | "Water"
  | "Fertilize"
  | "Prune"
  | "Repot"
  | "Mist";


export const addReminder = async (
  req: Request,
  res: Response
) => {
  try {
    console.log("Incoming reminder body:", req.body);
    const decoded = (req as any).user;

    const {
      gardenPlantId,
      action,
      reminderDate,
    } = req.body as {
      gardenPlantId: string;
      action: ReminderAction;
      reminderDate: string;
    };


    if (
      !gardenPlantId ||
      !action ||
      !reminderDate
    ) {
      return res.status(400).json({
        success: false,
        message:
          "gardenPlantId, action and reminderDate are required",
      });
    }


    const reminder = await createReminder(
      decoded.userId,
      gardenPlantId,
      action,
      new Date(reminderDate)
    );


    return res.status(201).json({
      success: true,
      reminder,
    });


  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getReminders = async (
  req: Request,
  res: Response
) => {

  try {

    const decoded = (req as any).user;


    const reminders =
      await getUserReminders(decoded.userId);


    return res.status(200).json({
      success: true,
      reminders,
    });


  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch reminders",
    });

  }
};




export const markReminderCompleted = async (
  req: Request,
  res: Response
) => {

  try {

    const decoded = (req as any).user;


    const reminderId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;


    const reminder =
      await completeReminder(
        reminderId,
        decoded.userId
      );


    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }


    return res.status(200).json({
      success: true,
      reminder,
    });


  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update reminder",
    });

  }
};




export const removeReminder = async (
  req: Request,
  res: Response
) => {

  try {

    const decoded = (req as any).user;


    const reminderId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;


    const reminder =
      await deleteReminder(
        reminderId,
        decoded.userId
      );


    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: "Reminder not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Reminder deleted successfully",
    });


  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete reminder",
    });

  }
};