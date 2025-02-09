import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, DollarSign, Percent } from "lucide-react";

type StatCard = {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
};

const MOCK_STATS: StatCard[] = [
  {
    title: "Win Rate",
    value: "64.2%",
    change: 2.5,
    icon: <Percent className="h-4 w-4" />,
  },
  {
    title: "Total Profit",
    value: "$1,245",
    change: -120,
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "ROI",
    value: "12.8%",
    change: 1.2,
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: "Average Odds",
    value: "-110",
    change: 5,
    icon: <TrendingDown className="h-4 w-4" />,
  },
];

export default function StatsPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Advanced Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">{stat.title}</span>
              <div className="p-2 bg-blue-500/10 rounded-full text-blue-500">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <div
                className={`flex items-center ${stat.change >= 0 ? "text-green-500" : "text-red-500"}`}
              >
                {stat.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm">
                  {stat.change >= 0 ? "+" : ""}
                  {stat.change}%
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="props">Props Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Bet Type Distribution
              </h3>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart coming soon...
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Win/Loss Timeline</h3>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart coming soon...
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="props" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Props Performance</h3>
            <p className="text-muted-foreground">
              Detailed props analysis will be available soon...
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Betting Trends</h3>
            <p className="text-muted-foreground">
              Trend analysis will be available soon...
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
