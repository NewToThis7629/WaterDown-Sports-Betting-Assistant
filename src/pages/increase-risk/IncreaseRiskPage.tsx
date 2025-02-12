import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";

export default function IncreaseRiskPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-background dark:to-muted/50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Increase Risk</h1>
          <p className="text-muted-foreground">
            Find higher-risk, higher-reward betting opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Risk Analysis</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Current Risk Level</span>
                <span className="text-blue-500">Moderate</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="font-medium">Potential Return</span>
                <span className="text-green-500">+350%</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="font-medium">Recommended Action</span>
                <span className="text-amber-500">Increase Stakes</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Suggested Actions</h2>
            <div className="space-y-4">
              <Button className="w-full gap-2">
                <TrendingUp className="h-4 w-4" />
                Analyze High-Risk Options
              </Button>
              <p className="text-sm text-muted-foreground">
                Our AI will analyze your current bets and suggest higher-risk
                alternatives with potentially greater returns.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
