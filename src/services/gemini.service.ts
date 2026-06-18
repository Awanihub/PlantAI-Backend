import { GoogleGenAI } from "@google/genai";
import { IMessage } from "../interfaces/chat.interface";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const identifyPlant = async (
  imageBase64: string,
  mimeType: string
): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: [
      {
        role: "user",

        parts: [
          {
            inlineData: {
              data: imageBase64,
              mimeType,
            },
          },

          {
            text: `
You are an expert botanist.

Analyze the plant image and identify the plant.

Return ONLY valid JSON.

Rules:
- Do not include markdown
- Do not include \`\`\`json
- Do not include explanations
- Do not include extra text
- If identification confidence is low, use "Unknown"

Expected JSON format:

{
  "plantName":"",
  "scientificName":"",
  "description":"",
  "wateringTips":"",
  "sunlightRequirements":"",
  "fertilizerSuggestions":"",
  "commonProblems":"",
  "careInstructions":""
}
`,
          },
        ],
      },
    ],
  });

  return response.text ?? "";
};

export const chatWithPlant = async (
  plantInfo: {
    plantName: string;
    scientificName: string;
    description: string;
    wateringTips: string;
    sunlightRequirements: string;
    fertilizerSuggestions: string;
  },
  question: string,
  lastMessages: IMessage[]
): Promise<string> => {
  const history = lastMessages
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const prompt = `
You are an expert botanist.

Plant Information:

Plant Name:
${plantInfo.plantName}

Scientific Name:
${plantInfo.scientificName}

Description:
${plantInfo.description}

Watering Tips:
${plantInfo.wateringTips}

Sunlight Requirements:
${plantInfo.sunlightRequirements}

Fertilizer Suggestions:
${plantInfo.fertilizerSuggestions}

Conversation History:
${history}

User Question:
${question}

Instructions:
- Answer naturally
- Keep answers simple and beginner friendly
- Give practical plant care advice
- Use plant information as context
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text ?? "";
};