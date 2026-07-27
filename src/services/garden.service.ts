import PlantScan from "../models/plantScan.model";
import GardenPlant from "../models/garden.model";

export const addPlantToGarden = async (
  userId: string,
  scanId: string
) => {
  const plantScan = await PlantScan.findById(scanId);

  if (!plantScan) {
    throw new Error("Plant scan not found");
  }

  if (!plantScan.image) {
    throw new Error("Plant image not found");
  }

  const gardenPlant = await GardenPlant.create({
    userId,

    image: {
      data: plantScan.image.data,
      contentType: plantScan.image.contentType,
    },

    plantName: plantScan.plantName,
    scientificName: plantScan.scientificName,
    description: plantScan.description,

    wateringTips: plantScan.wateringTips,
    sunlightRequirements: plantScan.sunlightRequirements,
    fertilizerSuggestions: plantScan.fertilizerSuggestions,

    commonProblems: plantScan.commonProblems,
    careInstructions: plantScan.careInstructions,
  });

  return gardenPlant;
};

export const getGardenPlants = async (userId: string) => {
  const plants = await GardenPlant.find({ userId }).sort({
    createdAt: -1,
  });

  return plants.map((plant) => ({
    _id: plant._id,

    plantName: plant.plantName,
    scientificName: plant.scientificName,
    description: plant.description,

    wateringTips: plant.wateringTips,
    sunlightRequirements: plant.sunlightRequirements,
    fertilizerSuggestions: plant.fertilizerSuggestions,

    commonProblems: plant.commonProblems,
    careInstructions: plant.careInstructions,

    image: `data:${plant.image.contentType};base64,${plant.image.data.toString(
      "base64"
    )}`,
  }));
};

export const getGardenPlantById = async (plantId: string) => {
  return await GardenPlant.findById(plantId);
};

export const deleteGardenPlant = async (
  plantId: string,
  userId: string
) => {
  return await GardenPlant.findOneAndDelete({
    _id: plantId,
    userId,
  });
};