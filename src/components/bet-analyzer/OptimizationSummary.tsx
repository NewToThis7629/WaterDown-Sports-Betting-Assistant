import { Card } from "@/components/ui/card";

export default function OptimizationSummary() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Optimization Summary</h2>
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Summary will be shown after analysis...
        </p>
      </div>
    </Card>
  );
}
