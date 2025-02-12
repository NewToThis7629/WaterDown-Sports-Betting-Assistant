import { ExtractedBet } from "@/types/odds";

type Sportsbook = "fanduel" | "draftkings" | "caesars" | "betmgm" | "bet365";

interface BetSlipLink {
  sportsbook: Sportsbook;
  link: string;
}

// Parse original bet slip link to extract format
export function parseBetSlipLink(link: string): BetSlipLink | null {
  if (link.includes("fanduel.com")) {
    return { sportsbook: "fanduel", link };
  } else if (link.includes("draftkings.com")) {
    return { sportsbook: "draftkings", link };
  } else if (link.includes("caesars.com")) {
    return { sportsbook: "caesars", link };
  } else if (link.includes("betmgm.com")) {
    return { sportsbook: "betmgm", link };
  } else if (link.includes("bet365.com")) {
    return { sportsbook: "bet365", link };
  }
  return null;
}

// Generate FanDuel bet slip link
function generateFanduelLink(bets: ExtractedBet[]): string {
  const params = bets
    .map((bet, index) => {
      return `marketId[${index}]=42.${Math.random().toString().slice(2, 9)}&selectionId[${index}]=${Math.random().toString().slice(2, 8)}`;
    })
    .join("&");

  return `https://sportsbook.fanduel.com/addToBetslip?${params}`;
}

// Generate DraftKings bet slip link
function generateDraftKingsLink(bets: ExtractedBet[]): string {
  const params = bets
    .map((bet) => {
      const outcomeId = Math.random().toString().slice(2, 11);
      return `0QA${outcomeId}%23${Math.random().toString().slice(2, 9)}_${bet.value}L42648Q${Math.random().toString().slice(2, 10)}Q20`;
    })
    .join("+");

  return `https://sportsbook.draftkings.com/event/31740286?outcomes=${params}`;
}

// Generate Caesars bet slip link
function generateCaesarsLink(bets: ExtractedBet[]): string {
  const params = bets
    .map((bet) => {
      return `168971792-${Math.random().toString().slice(2, 9)}~${bet.odds}/1`;
    })
    .join("|");

  return `https://www.caesars.com/sportsbook/betslip?bs=${params}`;
}

// Generate BetMGM bet slip link
function generateBetMGMLink(bets: ExtractedBet[]): string {
  const params = bets
    .map((bet) => {
      return `16807891-${Math.random().toString().slice(2, 10)}--${Math.random().toString().slice(2, 9)}`;
    })
    .join(",");

  return `https://sports.betmgm.com/en/sports/events/16807891?options=${params}`;
}

// Generate Bet365 bet slip link
function generateBet365Link(bets: ExtractedBet[]): string {
  const params = bets
    .map((bet) => {
      return `168971792-${Math.random().toString().slice(2, 9)}~${bet.odds}/1`;
    })
    .join("|");

  return `https://www.bet365.com/betslip?bs=${params}`;
}

// Generate all bet slip links
export function generateBetSlipLinks(
  bets: ExtractedBet[],
): Record<Sportsbook, string> {
  return {
    fanduel: generateFanduelLink(bets),
    draftkings: generateDraftKingsLink(bets),
    caesars: generateCaesarsLink(bets),
    betmgm: generateBetMGMLink(bets),
    bet365: generateBet365Link(bets),
  };
}
