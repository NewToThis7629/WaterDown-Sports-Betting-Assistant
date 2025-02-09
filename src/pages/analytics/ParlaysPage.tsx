import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Clock, Trophy } from "lucide-react";

type ParlayBet = {
  id: string;
  legs: {
    player: string;
    prop: string;
    line: number;
    odds: number;
  }[];
  totalOdds: number;
  confidence: number;
  timestamp: string;
};

const MOCK_PARLAYS: ParlayBet[] = [
  {
    id: "1",
    legs: [
      {
        player: "Stephen Curry",
        prop: "Points",
        line: 28.5,
        odds: -110,
      },
      {
        player: "LeBron James",
        prop: "Assists",
        line: 8.5,
        odds: -115,
      },
      {
        player: "Joel Embiid",
        prop: "Rebounds",
        line: 11.5,
        odds: -105,
      },
    ],
    totalOdds: +525,
    confidence: 85,
    timestamp: "2h ago",
  },
  {
    id: "2",
    legs: [
      {
        player: "Luka Doncic",
        prop: "Points",
        line: 32.5,
        odds: -110,
      },
      {
        player: "Devin Booker",
        prop: "Points",
        line: 26.5,
        odds: -115,
      },
    ],
    totalOdds: +260,
    confidence: 92,
    timestamp: "4h ago",
  },
];

export default function ParlaysPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Parlay Builder</h1>
        <Button className="gap-2">
          <Sparkles className="h-4 w-4" />
          Generate New Parlay
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Today's Top Parlays</h2>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {MOCK_PARLAYS.map((parlay) => (
                  <Card
                    key={parlay.id}
                    className="p-4 hover:border-blue-500/20 transition-colors"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-muted-foreground">
                            {parlay.timestamp}
                          </span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="bg-blue-500/10 text-blue-500"
                        >
                          {parlay.legs.length} Leg Parlay
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {parlay.legs.map((leg, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b last:border-0"
                          >
                            <div>
                              <p className="font-medium">{leg.player}</p>
                              <p className="text-sm text-muted-foreground">
                                {leg.prop} Over {leg.line}
                              </p>
                            </div>
                            <span
                              className={`text-sm ${leg.odds >= 0 ? "text-green-500" : "text-red-500"}`}
                            >
                              {leg.odds > 0 ? "+" : ""}
                              {leg.odds}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Total Odds
                            </p>
                            <p className="font-semibold text-green-500">
                              +{parlay.totalOdds}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Confidence
                            </p>
                            <p className="font-semibold text-blue-500">
                              {parlay.confidence}%
                            </p>
                          </div>
                        </div>
                        <Button>Add to Bet Slip</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Parlay Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-medium">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Avg Odds</span>
                <span className="font-medium">+450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">ROI</span>
                <span className="font-medium text-green-500">+24.5%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Hot Players</h3>
            <div className="space-y-4">
              {[
                { name: "Stephen Curry", trend: "8/10 overs hit" },
                { name: "Luka Doncic", trend: "5 game point streak" },
                { name: "Joel Embiid", trend: "Double-double streak" },
              ].map((player) => (
                <div
                  key={player.name}
                  className="flex items-center justify-between"
                >
                  <span className="font-medium">{player.name}</span>
                  <span className="text-sm text-green-500">{player.trend}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
