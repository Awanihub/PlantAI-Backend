import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const askPlantTutor = async (
  question: string
): Promise<string> => {

  const prompt = `
You are PlantAI's Learning Assistant.

Your job is to teach beginners about plants.

Rules:

- Answer only plant-related questions.
- Use simple English.
- Keep answers under 300 words.
- Use headings.
- Use bullet points.
- Give practical advice.
- End with one useful gardening tip.
- If the question is unrelated to plants, politely explain that you only answer plant-related questions.

Question:
${question}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text ?? "";
};