import OpenAI from "openai";
import { ExtractedBet } from "@/types/odds";
import { extractTextFromImage } from "./ocr";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function analyzeBetSlipImage(
  imageBase64: string,
): Promise<ExtractedBet[]> {
  try {
    // First extract text from image using OCR
    const extractedText = await extractTextFromImage(imageBase64);
    console.log("Extracted text:", extractedText);

    // Then analyze the text with GPT-4o
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a sports betting expert. Extract player props from bet slip text. Return ONLY a JSON array, nothing else. Do not include any markdown formatting or backticks.",
        },
        {
          role: "user",
          content: `Extract all player props from this bet slip text. Return ONLY a JSON array of objects with format: [{"player": "string", "type": "over", "value": number, "odds": number, "propType": "points"}]\n\nText: ${extractedText}`,
        },
      ],
      max_tokens: 500,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error("No content in response");

    // Remove any markdown formatting or backticks
    const cleanContent = content.replace(/```json\n?|```|\n/g, "").trim();
    console.log("Cleaned content:", cleanContent);

    // Parse the JSON response and add IDs
    const bets = JSON.parse(cleanContent);
    return bets.map((bet: Omit<ExtractedBet, "id">) => ({
      ...bet,
      id: Math.random().toString(36).slice(2),
    }));
  } catch (error) {
    console.error("Error analyzing bet slip:", error);
    throw error;
  }
}
