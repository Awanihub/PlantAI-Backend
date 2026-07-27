interface ReminderRequest {
  gardenPlantId?: string;
  action?: string;
  reminderDate?: string;
}

const allowedActions = [
  "Water",
  "Fertilize",
  "Prune",
  "Repot",
  "Mist",
];

export const validateReminder = (
  data: ReminderRequest
) => {
  const errors: string[] = [];

  if (!data.gardenPlantId) {
    errors.push("gardenPlantId is required");
  }

  if (!data.action) {
    errors.push("Action is required");
  } else if (!allowedActions.includes(data.action)) {
    errors.push("Invalid action");
  }

  if (!data.reminderDate) {
    errors.push("Reminder date is required");
  } else if (isNaN(Date.parse(data.reminderDate))) {
    errors.push("Invalid reminder date");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};