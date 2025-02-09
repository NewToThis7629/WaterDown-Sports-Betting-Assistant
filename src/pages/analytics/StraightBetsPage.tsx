import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, Clock, Target } from "lucide-react";

type BetSuggestion = {
  id: string;
  player: string;
  team: string;
  prop: string;
  line: number;
  odds: number;
  confidence: number;
  analysis: string;
  matchup: string;
  timestamp: string;
};

const MOCK_SUGGESTIONS: BetSuggestion[] = [
  {
    id: "1",
    player: "Stephen Curry",
    team: "GSW",
    prop: "Points",
    line: 28.5,
    odds: -110,
    confidence: 85,
    analysis:
      "Curry has hit this over in 7 of his last 10 games. Favorable matchup against a weak perimeter defense.",
    matchup: "GSW vs LAL",
    timestamp: "2h ago",
  },
  {
    id: "2",
    player: "Nikola Jokic",
    team: "DEN",
    prop: "Assists",
    line: 9.5,
    odds: -115,
    confidence: 92,
    analysis:
      "Jokic averaging 11.2 assists in his last 5 games. High pace game expected.",
    matchup: "DEN vs PHX",
    timestamp: "4h ago",
  },
];

export default function StraightBetsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Bet Suggestions</h1>
        <Button className="gap-2">
          <Brain className="h-4 w-4" />
          Generate New Suggestions
        </Button>
      </div>

      <Tabs defaultValue="props" className="w-full">
        <TabsList>
          <TabsTrigger value="props">Player Props</TabsTrigger>
          <TabsTrigger value="spreads">Game Spreads</TabsTrigger>
          <TabsTrigger value="totals">Game Totals</TabsTrigger>
        </TabsList>

        <TabsContent value="props" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Today's Top Props
                </h2>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    {MOCK_SUGGESTIONS.map((suggestion) => (
                      <Card
                        key={suggestion.id}
                        className="p-4 hover:border-blue-500/20 transition-colors"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">
                                  {suggestion.player}
                                </h3>
                                <Badge variant="secondary" className="text-xs">
                                  {suggestion.team}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {suggestion.matchup}
                              </p>
                            </div>
                            <Badge
                              className={`${suggestion.confidence >= 90 ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}
                            >
                              {suggestion.confidence}% Confidence
                            </Badge>
                          </div>

                          <div className="flex items-center gap-8 py-2 border-y">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Prop
                              </p>
                              <p className="font-medium">{suggestion.prop}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Line
                              </p>
                              <p className="font-medium">{suggestion.line}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Odds
                              </p>
                              <p className="font-medium text-blue-500">
                                {suggestion.odds > 0 ? "+" : ""}
                                {suggestion.odds}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Analysis</h4>
                            <p className="text-sm text-muted-foreground">
                              {suggestion.analysis}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{suggestion.timestamp}</span>
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
                <h3 className="font-semibold mb-4">Model Performance</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Win Rate</span>
                    <span className="font-medium">72%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Avg Odds</span>
                    <span className="font-medium">-110</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ROI</span>
                    <span className="font-medium text-green-500">+18.2%</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Trending Props</h3>
                <div className="space-y-4">
                  {[
                    { prop: "Points", trend: "+5.2% hit rate" },
                    { prop: "Rebounds", trend: "+3.8% hit rate" },
                    { prop: "Assists", trend: "+2.1% hit rate" },
                  ].map((item) => (
                    <div
                      key={item.prop}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium">{item.prop}</span>
                      <span className="text-sm text-green-500">
                        {item.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="spreads" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Game Spreads</h2>
            <p className="text-muted-foreground">
              Game spread predictions will be available soon...
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="totals" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Game Totals</h2>
            <p className="text-muted-foreground">
              Game total predictions will be available soon...
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
