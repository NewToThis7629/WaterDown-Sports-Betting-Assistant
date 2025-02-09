export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

export interface Market {
  key: string;
  last_update: string;
  outcomes: Outcome[];
}

export interface Outcome {
  name: string;
  price: number;
  point?: number;
}

export interface ExtractedBet {
  id: string;
  player: string;
  type: string;
  value: number;
  odds: number;
  propType: string;
  alternatives?: Outcome[];
}

export interface BetSlip {
  bets: ExtractedBet[];
  totalOdds: number;
  potentialPayout?: number;
}
