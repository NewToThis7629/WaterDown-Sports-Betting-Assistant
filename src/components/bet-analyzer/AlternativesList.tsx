import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AlternativesList() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Alternative Bets</h2>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4 pr-4">
          <p className="text-muted-foreground">
            Alternative bets will appear here after analysis...
          </p>
        </div>
      </ScrollArea>
    </Card>
  );
}
