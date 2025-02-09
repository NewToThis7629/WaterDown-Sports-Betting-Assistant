import { ExtractedBet } from "@/types/odds";

type Sportsbook = "fanduel" | "draftkings" | "caesars" | "betmgm";

const SPORTSBOOK_URLS = {
  fanduel: "https://sportsbook.fanduel.com/share",
  draftkings: "https://sportsbook.draftkings.com/r",
  caesars: "https://sportsbook.caesars.com/share",
  betmgm: "https://sports.betmgm.com/share",
};

// Store original bet slip URL and format
let originalBetSlipUrl: string | null = null;
let originalBetSlipFormat: string | null = null;

// Parse and store original format
export function setOriginalBetSlip(url: string) {
  originalBetSlipUrl = url;
  // Extract format from URL
  const urlParts = url.split("/");
  originalBetSlipFormat = urlParts[urlParts.length - 1];
}

// Generate new bet slip using original format
function generateBetSlipFromFormat(
  bets: ExtractedBet[],
  format: string,
): string {
  let newFormat = format;

  // Replace values in format with new values
  bets.forEach((bet, index) => {
    // Replace player name if it exists in format
    const playerRegex = new RegExp(`player${index + 1}`, "g");
    newFormat = newFormat.replace(playerRegex, bet.player);

    // Replace value if it exists in format
    const valueRegex = new RegExp(`value${index + 1}`, "g");
    newFormat = newFormat.replace(valueRegex, bet.value.toString());

    // Replace odds if they exist in format
    const oddsRegex = new RegExp(`odds${index + 1}`, "g");
    newFormat = newFormat.replace(oddsRegex, bet.odds.toString());
  });

  return newFormat;
}

function generateFanduelLink(bets: ExtractedBet[]): string {
  if (originalBetSlipUrl?.includes("fanduel")) {
    return `${SPORTSBOOK_URLS.fanduel}/${generateBetSlipFromFormat(bets, originalBetSlipFormat!)}`;
  }
  return `${SPORTSBOOK_URLS.fanduel}/unavailable`;
}

function generateDraftkingsLink(bets: ExtractedBet[]): string {
  if (originalBetSlipUrl?.includes("draftkings")) {
    return `${SPORTSBOOK_URLS.draftkings}/${generateBetSlipFromFormat(bets, originalBetSlipFormat!)}`;
  }
  return `${SPORTSBOOK_URLS.draftkings}/unavailable`;
}

function generateCaesarsLink(bets: ExtractedBet[]): string {
  if (originalBetSlipUrl?.includes("caesars")) {
    return `${SPORTSBOOK_URLS.caesars}/${generateBetSlipFromFormat(bets, originalBetSlipFormat!)}`;
  }
  return `${SPORTSBOOK_URLS.caesars}/unavailable`;
}

function generateBetMGMLink(bets: ExtractedBet[]): string {
  if (originalBetSlipUrl?.includes("betmgm")) {
    return `${SPORTSBOOK_URLS.betmgm}/${generateBetSlipFromFormat(bets, originalBetSlipFormat!)}`;
  }
  return `${SPORTSBOOK_URLS.betmgm}/unavailable`;
}

export function generateBetSlipLinks(
  bets: ExtractedBet[],
): Record<Sportsbook, string> {
  return {
    fanduel: generateFanduelLink(bets),
    draftkings: generateDraftkingsLink(bets),
    caesars: generateCaesarsLink(bets),
    betmgm: generateBetMGMLink(bets),
  };
}
