import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

type LeaderboardEntry = {
  rank: number;
  username: string;
  avatar: string;
  winRate: number;
  profit: number;
  movement: "up" | "down" | "none";
};

const MOCK_ENTRIES: LeaderboardEntry[] = [
  {
    rank: 1,
    username: "BetMaster",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BetMaster",
    winRate: 68.5,
    profit: 12500,
    movement: "none",
  },
  {
    rank: 2,
    username: "ProPicker",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProPicker",
    winRate: 65.2,
    profit: 9800,
    movement: "up",
  },
  {
    rank: 3,
    username: "OddsKing",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=OddsKing",
    winRate: 62.8,
    profit: 7200,
    movement: "down",
  },
  // Add more mock entries as needed
];

export default function LeaderboardsPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Leaderboards</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Trophy className="h-4 w-4" />
          <span>Updated weekly</span>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="allTime">All Time</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="mt-6">
          <Card>
            <div className="p-6">
              <div className="space-y-4">
                {MOCK_ENTRIES.map((entry) => (
                  <div
                    key={entry.rank}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg w-6">
                        {entry.rank}
                      </span>
                      <Avatar>
                        <AvatarImage src={entry.avatar} />
                        <AvatarFallback>{entry.username[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{entry.username}</div>
                        <div className="text-sm text-muted-foreground">
                          Win Rate: {entry.winRate}%
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-medium text-green-500">
                          +${entry.profit.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          {entry.movement === "up" && (
                            <ArrowUp className="h-4 w-4 text-green-500" />
                          )}
                          {entry.movement === "down" && (
                            <ArrowDown className="h-4 w-4 text-red-500" />
                          )}
                          <span>
                            {entry.movement === "up"
                              ? "Up 1"
                              : entry.movement === "down"
                                ? "Down 1"
                                : "No change"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Leaders</h2>
            <p className="text-muted-foreground">
              Monthly leaderboard resets on the 1st of each month.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="allTime" className="mt-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">All-Time Leaders</h2>
            <p className="text-muted-foreground">
              View the most successful bettors of all time.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
