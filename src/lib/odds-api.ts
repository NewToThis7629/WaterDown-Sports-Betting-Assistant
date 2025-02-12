import type { Sport, Market, Outcome, ExtractedBet } from "@/types/odds";

export async function getMarkets(
  sportKey: string,
  player: string,
  bet: ExtractedBet,
): Promise<Market[]> {
  // Generate alternatives around the current value
  const alternatives: Outcome[] = [];
  const steps = [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2];

  for (const step of steps) {
    const newValue = bet.value + step;
    if (newValue > 0) {
      // Adjust odds based on the step
      const oddsAdjustment = Math.abs(step) * 15;
      const newOdds =
        step < 0 ? bet.odds + oddsAdjustment : bet.odds - oddsAdjustment;

      alternatives.push({
        name: player,
        point: newValue,
        price: newOdds,
      });
    }
  }

  return [
    {
      key: "mock_market",
      last_update: new Date().toISOString(),
      outcomes: alternatives,
    },
  ];
}
