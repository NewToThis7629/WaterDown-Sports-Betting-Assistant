import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Search, Filter, ExternalLink } from "lucide-react";

type BetHistory = {
  id: string;
  date: string;
  sportsbook: string;
  type: string;
  status: "active" | "won" | "lost";
  amount: number;
  odds: number;
  potentialPayout: number;
  link: string;
};

const MOCK_HISTORY: BetHistory[] = [
  {
    id: "1",
    date: "2024-03-20",
    sportsbook: "FanDuel",
    type: "Parlay",
    status: "won",
    amount: 50,
    odds: +450,
    potentialPayout: 275,
    link: "https://sportsbook.fanduel.com/betslip/123",
  },
  {
    id: "2",
    date: "2024-03-19",
    sportsbook: "DraftKings",
    type: "Straight",
    status: "lost",
    amount: 100,
    odds: -110,
    potentialPayout: 190.91,
    link: "https://sportsbook.draftkings.com/betslip/456",
  },
  {
    id: "3",
    date: "2024-03-19",
    sportsbook: "Caesars",
    type: "Parlay",
    status: "active",
    amount: 25,
    odds: +600,
    potentialPayout: 175,
    link: "https://sportsbook.caesars.com/betslip/789",
  },
];

export default function HistoryPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bet History</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Last synced: Just now</span>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bets..." className="pl-8" />
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Bets</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="settled">Settled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <ScrollArea className="h-[600px]">
              <div className="p-6 space-y-6">
                {MOCK_HISTORY.map((bet) => (
                  <div
                    key={bet.id}
                    className="flex items-center justify-between py-4 border-b last:border-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{bet.sportsbook}</span>
                        <Badge
                          variant="secondary"
                          className={`${
                            bet.status === "won"
                              ? "bg-green-500/10 text-green-500"
                              : bet.status === "lost"
                                ? "bg-red-500/10 text-red-500"
                                : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {bet.status.charAt(0).toUpperCase() +
                            bet.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{new Date(bet.date).toLocaleDateString()}</span>
                        <span>{bet.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <div className="font-medium">${bet.amount}</div>
                        <div className="text-sm text-muted-foreground">
                          {bet.odds > 0 ? "+" : ""}
                          {bet.odds}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ${bet.potentialPayout.toFixed(2)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Potential
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(bet.link, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <Card className="p-6">
            <p className="text-muted-foreground">
              Active bets will be shown here...
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="settled" className="mt-6">
          <Card className="p-6">
            <p className="text-muted-foreground">
              Settled bets will be shown here...
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
