import { ExtractedBet } from "@/types/odds";

export function detectAndParseBets(text: string): ExtractedBet[] {
  console.log("Raw text to parse:", text);
  const bets: ExtractedBet[] = [];

  // Split into lines and clean up
  const lines = text.split("\n").map((line) => line.trim());

  // Look for lines with player names and points
  for (const line of lines) {
    // Match patterns like "Player Name Over X.X Points" or "Player Name To Score X+ Points"
    const pointsMatch = line.match(
      /([A-Za-z.\s]+?)(?:Over|To Score)\s*(\d+(?:\.\d+)?)/i,
    );

    if (pointsMatch) {
      const [, player, points] = pointsMatch;
      bets.push({
        id: Math.random().toString(36).slice(2),
        player: player.trim(),
        type: "over",
        value: parseFloat(points),
        odds: -110,
        propType: "points",
      });
    }
  }

  console.log("Parsed bets:", bets);
  return bets;
}
