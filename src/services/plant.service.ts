import PlantScan from "../models/plantScan.model";

export const createPlantScan =
  async (
    userId: string,

    imageBuffer: Buffer,

    contentType: string,

    plantData: any
  ) => {
    const expiresAt =
      new Date(
        Date.now() +
          24 * 60 * 60 * 1000
      );

    return await PlantScan.create({
      userId,

      image: {
        data: imageBuffer,
        contentType,
      },

      plantName:
        plantData.plantName,

      scientificName:
        plantData.scientificName,

      description:
        plantData.description,

      wateringTips:
        plantData.wateringTips,

      sunlightRequirements:
        plantData.sunlightRequirements,

      fertilizerSuggestions:
        plantData.fertilizerSuggestions,

      expiresAt,
    });
  };

export const getPlantScanById =
  async (
    plantScanId: string
  ) => {
    return await PlantScan.findById(
      plantScanId
    );
  };

export const refreshPlantScanTTL =
  async (
    plantScanId: string
  ) => {
    return await PlantScan.findByIdAndUpdate(
      plantScanId,
      {
        expiresAt: new Date(
          Date.now() +
            24 * 60 * 60 * 1000
        ),
      }
    );
  };