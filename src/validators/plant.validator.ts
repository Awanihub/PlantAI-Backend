export const validatePlantIdentification =
  (
    file?: Express.Multer.File
  ): {
    valid: boolean;
    errors: string[];
  } => {
    const errors: string[] = [];

    if (!file) {
      errors.push(
        "Plant image is required"
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      file &&
      !allowedTypes.includes(
        file.mimetype
      )
    ) {
      errors.push(
        "Only JPG, PNG and WEBP images are allowed"
      );
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  };