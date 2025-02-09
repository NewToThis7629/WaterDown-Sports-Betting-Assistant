import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, TrendingUp, Clock } from "lucide-react";

type Game = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  time: string;
  odds: {
    home: number;
    away: number;
    draw?: number;
  };
};

const MOCK_GAMES: Game[] = [
  {
    id: "1",
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeScore: 89,
    awayScore: 92,
    time: "Q4 2:45",
    odds: { home: -110, away: -110 },
  },
  {
    id: "2",
    homeTeam: "Celtics",
    awayTeam: "Nets",
    time: "7:30 PM ET",
    odds: { home: -150, away: +130 },
  },
  {
    id: "3",
    homeTeam: "Bucks",
    awayTeam: "76ers",
    time: "8:00 PM ET",
    odds: { home: -120, away: +100 },
  },
];

export default function ScoresPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Scores & Live Odds</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last updated: Just now</span>
        </div>
      </div>

      <Tabs defaultValue="nba" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="nba" className="gap-2">
            <Trophy className="h-4 w-4" /> NBA
          </TabsTrigger>
          <TabsTrigger value="nfl" className="gap-2">
            <Trophy className="h-4 w-4" /> NFL
          </TabsTrigger>
          <TabsTrigger value="mlb" className="gap-2">
            <Trophy className="h-4 w-4" /> MLB
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nba" className="mt-6">
          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {MOCK_GAMES.map((game) => (
                <Card key={game.id} className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{game.homeTeam}</span>
                        <div className="flex items-center gap-2">
                          {game.homeScore !== undefined && (
                            <span className="text-lg font-bold">
                              {game.homeScore}
                            </span>
                          )}
                          <span
                            className={`text-sm ${game.odds.home > 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {game.odds.home > 0 ? "+" : ""}
                            {game.odds.home}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{game.awayTeam}</span>
                        <div className="flex items-center gap-2">
                          {game.awayScore !== undefined && (
                            <span className="text-lg font-bold">
                              {game.awayScore}
                            </span>
                          )}
                          <span
                            className={`text-sm ${game.odds.away > 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {game.odds.away > 0 ? "+" : ""}
                            {game.odds.away}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {game.time}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="nfl" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              NFL Scores Coming Soon
            </h2>
            <p className="text-muted-foreground">
              NFL scores and odds will be available here during the season.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="mlb" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              MLB Scores Coming Soon
            </h2>
            <p className="text-muted-foreground">
              MLB scores and odds will be available when the season starts.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
