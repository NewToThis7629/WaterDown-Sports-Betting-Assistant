import { createWorker } from "tesseract.js";
import { detectAndParseBets } from "./bet-parsers";

export async function extractTextFromImage(imageData: string): Promise<string> {
  console.log("Starting OCR processing...");
  const worker = await createWorker();

  try {
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const {
      data: { text },
    } = await worker.recognize(imageData);
    console.log("Raw OCR result:", text);

    await worker.terminate();
    return text;
  } catch (error) {
    console.error("OCR error:", error);
    await worker.terminate();
    throw error;
  }
}

export function parseBetSlipText(text: string) {
  return detectAndParseBets(text);
}
