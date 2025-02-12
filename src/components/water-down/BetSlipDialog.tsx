import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExtractedBet } from "@/types/odds";
import { generateBetSlipLinks } from "@/lib/bet-slip-links";
import { ExternalLink } from "lucide-react";

interface BetSlipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bets: ExtractedBet[];
}

const SPORTSBOOKS = [
  { id: "fanduel", name: "FanDuel", color: "bg-blue-500 hover:bg-blue-600" },
  {
    id: "draftkings",
    name: "DraftKings",
    color: "bg-green-600 hover:bg-green-700",
  },
  {
    id: "caesars",
    name: "Caesars",
    color: "bg-yellow-600 hover:bg-yellow-700",
  },
  { id: "betmgm", name: "BetMGM", color: "bg-gray-800 hover:bg-gray-900" },
] as const;

const getAvailableSportsbooks = (links: Record<string, string>) => {
  return SPORTSBOOKS.filter((book) => !links[book.id].includes("unavailable"));
};

export function BetSlipDialog({
  open,
  onOpenChange,
  bets,
}: BetSlipDialogProps) {
  const links = generateBetSlipLinks(bets);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] max-h-[400px] p-4">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-lg">Alternative Bet Slip</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[180px] pr-4">
          <div className="space-y-2">
            {bets.map((bet) => (
              <div
                key={bet.id}
                className="flex flex-col py-2 border-b last:border-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{bet.player}</span>
                  <span className="text-xs text-muted-foreground">
                    {bet.propType}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm">Over {bet.value}</span>
                  <span className="text-sm text-blue-500">
                    {bet.odds > 0 ? "+" : ""}
                    {bet.odds}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {SPORTSBOOKS.map((book) => (
            <Button
              key={book.id}
              className={`${book.color} text-white`}
              onClick={() => window.open(links[book.id], "_blank")}
            >
              {book.name}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
