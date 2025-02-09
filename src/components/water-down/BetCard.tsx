import { useState } from "react";
import { Minus, Plus, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExtractedBet, Outcome } from "@/types/odds";

interface BetCardProps {
  bet: ExtractedBet;
  onAlternativeSelect: (betId: string, alternative: Outcome) => void;
}

export function BetCard({ bet, onAlternativeSelect }: BetCardProps) {
  const [selectedAlternative, setSelectedAlternative] =
    useState<Outcome | null>(null);

  // Get sorted alternatives
  const sortedAlternatives = bet.alternatives
    ? [...bet.alternatives].sort((a, b) => (a.point || 0) - (b.point || 0))
    : [];

  const handleIncrement = () => {
    if (!sortedAlternatives.length) return;

    const currentValue = selectedAlternative?.point || bet.value;
    const nextAlt = sortedAlternatives.find((alt) => alt.point! > currentValue);

    if (nextAlt) {
      setSelectedAlternative(nextAlt);
      onAlternativeSelect(bet.id, nextAlt);
    }
  };

  const handleDecrement = () => {
    if (!sortedAlternatives.length) return;

    const currentValue = selectedAlternative?.point || bet.value;
    const prevAlt = [...sortedAlternatives]
      .reverse()
      .find((alt) => alt.point! < currentValue);

    if (prevAlt) {
      setSelectedAlternative(prevAlt);
      onAlternativeSelect(bet.id, prevAlt);
    }
  };

  const hasHigherAlternative = sortedAlternatives.some(
    (alt) => alt.point! > (selectedAlternative?.point || bet.value),
  );

  const hasLowerAlternative = sortedAlternatives.some(
    (alt) => alt.point! < (selectedAlternative?.point || bet.value),
  );

  return (
    <Card className="p-2 border hover:border-blue-500/20 transition-colors">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-sm truncate">{bet.player}</h3>
            <TrendingDown className="h-4 w-4 text-blue-500 shrink-0" />
          </div>
          <p className="text-xs text-muted-foreground">
            {bet.type.charAt(0).toUpperCase() + bet.type.slice(1)} {bet.value} (
            {bet.odds > 0 ? "+" : ""}
            {bet.odds})
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={handleDecrement}
            disabled={!hasLowerAlternative}
          >
            <Minus className="h-3 w-3" />
          </Button>

          <div className="w-20 text-center px-2 py-1 rounded bg-muted/50">
            {selectedAlternative ? (
              <div>
                <div className="text-xs font-medium">
                  {selectedAlternative.point}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {selectedAlternative.price > 0 ? "+" : ""}
                  {selectedAlternative.price}
                </div>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground">{bet.value}</div>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6"
            onClick={handleIncrement}
            disabled={!hasHigherAlternative}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
