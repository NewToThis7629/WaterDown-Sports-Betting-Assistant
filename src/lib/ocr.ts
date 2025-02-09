import { createWorker } from "tesseract.js";
import type { ExtractedBet } from "@/types/odds";

export async function extractTextFromImage(imageData: string): Promise<string> {
  console.log("Starting OCR processing...");
  const worker = await createWorker("eng");

  try {
    await worker.setParameters({
      tessedit_char_whitelist:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-./() '",
      tessedit_pageseg_mode: "6",
      preserve_interword_spaces: "1",
    });

    console.log("Running OCR recognition...");
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

function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u2013\u2014]/g, "-")
    .trim();
}

function extractPropDetails(
  line: string,
): { player: string; propType: string; value: number } | null {
  // Match patterns for FanDuel bet slip format
  const patterns = [
    // Pattern for yards
    /([A-Z][A-Za-z.]+(?:\s+[A-Z][A-Za-z.]+)*?)\s+(\d+(?:\.\d+)?)\+?\s*(?:Yards|Points|Rebounds|Assists)/i,
    // Pattern for receptions
    /([A-Z][A-Za-z.]+(?:\s+[A-Z][A-Za-z.]+)*?)\s+(\d+(?:\.\d+)?)\+?\s*Receptions/i,
    // Pattern for touchdowns
    /([A-Z][A-Za-z.]+(?:\s+[A-Z][A-Za-z.]+)*?)\s+(\d+(?:\.\d+)?)\+?\s*(?:Passing\s+)?Touchdowns/i,
    // Pattern for ANY TIME TOUCHDOWN SCORER
    /([A-Z][A-Za-z.]+(?:\s+[A-Z][A-Za-z.]+)*?)\s+ANY\s+TIME\s+TOUCHDOWN\s+SCORER/i,
    // Pattern for over/under
    /([A-Z][A-Za-z.]+(?:\s+[A-Z][A-Za-z.]+)*?)\s+(?:OVER|UNDER)\s+(\d+(?:\.\d+)?)/i,
  ];

  for (const pattern of patterns) {
    const match = line.match(pattern);
    if (match) {
      const [_, player, propOrValue] = match;
      const isValue = !isNaN(Number(propOrValue));
      const isTdScorer = line.toLowerCase().includes("touchdown scorer");
      const isReceptions = line.toLowerCase().includes("receptions");

      return {
        player: player.trim(),
        propType: isTdScorer
          ? "touchdown"
          : isReceptions
            ? "receptions"
            : "yards",
        value: isValue ? Number(propOrValue) : isTdScorer ? 0.5 : 0,
      };
    }
  }

  return null;
}

function findPropValue(line: string): number | null {
  // Look for numbers followed by + sign
  const valueMatch = line.match(/(\d+)\+/);
  if (valueMatch) return Number(valueMatch[1]);

  return null;
}

export function parseBetSlipText(text: string): ExtractedBet[] {
  console.log("Starting bet parsing...");
  const bets: ExtractedBet[] = [];

  const cleanedText = cleanText(text);
  console.log("Cleaned text:", cleanedText);

  // Split into sections by player name or prop type
  const sections = cleanedText.split(
    /(?=[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:\d+\+|ANY\s+TIME))/g,
  );

  for (const section of sections) {
    try {
      // Try to extract prop details from the section
      const propDetails = extractPropDetails(section);

      if (propDetails) {
        const bet: ExtractedBet = {
          id: Math.random().toString(36).substring(2, 9),
          player: propDetails.player,
          type: "over",
          value: propDetails.value,
          odds: -110,
          propType: propDetails.propType,
        };
        console.log("Extracted bet:", bet);
        bets.push(bet);
      }
    } catch (error) {
      console.error("Error parsing section:", section, error);
      continue;
    }
  }

  console.log("Final extracted bets:", bets);
  return bets;
}
