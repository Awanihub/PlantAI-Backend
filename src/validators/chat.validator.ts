export const validateChatMessage =
  (
    data: any
  ): {
    valid: boolean;
    errors: string[];
  } => {
    const errors: string[] = [];

    if (
      !data.plantScanId ||
      typeof data.plantScanId !==
        "string"
    ) {
      errors.push(
        "plantScanId is required"
      );
    }

    if (
      !data.question ||
      typeof data.question !==
        "string"
    ) {
      errors.push(
        "Question is required"
      );
    }

    if (
      data.question &&
      data.question.trim().length <
        2
    ) {
      errors.push(
        "Question must be at least 2 characters"
      );
    }

    if (
      data.question &&
      data.question.length > 1000
    ) {
      errors.push(
        "Question cannot exceed 1000 characters"
      );
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };