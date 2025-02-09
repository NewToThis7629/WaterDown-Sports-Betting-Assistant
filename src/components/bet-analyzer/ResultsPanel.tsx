import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ResultsPanel() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
      <ScrollArea className="h-[400px]">
        <div className="space-y-4 pr-4">
          <p className="text-muted-foreground">
            Upload a bet slip to see analysis results...
          </p>
        </div>
      </ScrollArea>
    </Card>
  );
}
