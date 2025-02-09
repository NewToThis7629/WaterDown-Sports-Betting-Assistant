import axios from "axios";
import type { Sport, Market, Outcome, ExtractedBet } from "@/types/odds";

const API_KEY =
  import.meta.env.VITE_ODDS_API_KEY || "0642f15768e9fc148be3488917ed1351";
const BASE_URL = "https://api.the-odds-api.com/v4";

export async function getSports(): Promise<Sport[]> {
  const response = await axios.get(`${BASE_URL}/sports`, {
    params: { apiKey: API_KEY },
  });
  return response.data;
}

export async function getMarkets(
  sportKey: string,
  player: string,
  bet?: ExtractedBet,
): Promise<Market[]> {
  // For demo purposes, generate mock alternatives based on the bet type
  const generateAlternatives = (
    baseValue: number,
    propType: string,
  ): Outcome[] => {
    const alternatives: Outcome[] = [];
    let steps: number[] = [];

    // Different step sizes based on prop type
    switch (propType.toLowerCase()) {
      case "points":
        if (baseValue >= 30) {
          steps = [-6, -4, -2, -1, 1, 2, 4, 6];
        } else if (baseValue >= 20) {
          steps = [-4, -2, -1, -0.5, 0.5, 1, 2, 4];
        } else {
          steps = [-2, -1, -0.5, 0.5, 1, 2];
        }
        break;
      case "rebounds":
      case "assists":
        steps = [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2];
        break;
      case "yards":
        steps = [-20, -10, -5, 5, 10, 20];
        break;
      default:
        steps = [-2, -1, -0.5, 0.5, 1, 2];
    }

    for (const step of steps) {
      const newValue = baseValue + step;
      if (newValue > 0) {
        // Adjust odds based on the step size
        const oddsAdjustment = Math.abs(step) * 5;
        const price =
          step > 0 ? -(110 + oddsAdjustment) : -(110 - oddsAdjustment);

        alternatives.push({
          name: player,
          point: newValue,
          price: price,
        });
      }
    }

    return alternatives;
  };

  // Create a mock market with alternatives using the bet's actual prop type
  const mockMarket: Market = {
    key: "mock_market",
    last_update: new Date().toISOString(),
    outcomes: generateAlternatives(bet?.value || 150, bet?.propType || "yards"),
  };

  return [mockMarket];
}

export function findAlternativeProps(
  currentValue: number,
  outcomes: Outcome[],
): Outcome[] {
  // Sort alternatives by their point value
  return outcomes
    .filter((outcome) => outcome.point !== currentValue)
    .sort((a, b) => (a.point || 0) - (b.point || 0));
}
