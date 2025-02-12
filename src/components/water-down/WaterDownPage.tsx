import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { BetCard } from "./BetCard";
import { BetSlipDialog } from "./BetSlipDialog";
import { ExtractedBet, Outcome } from "@/types/odds";
import { analyzeBetSlipImage } from "@/lib/ai";
import { getMarkets } from "@/lib/odds-api";

export default function WaterDownPage() {
  const location = useLocation();
  const [images, setImages] = useState<string[]>(
    [location.state?.image].filter(Boolean),
  );
  const [bets, setBets] = useState<ExtractedBet[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 3 - images.length);

      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [...prev, reader.result as string]);
          setError(null);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const analyzeBets = async () => {
    if (images.length === 0) return;

    try {
      setLoading(true);
      setError(null);

      // Analyze all images with GPT-4V
      const allBets = await Promise.all(images.map(analyzeBetSlipImage));
      const extractedBets = allBets.flat();
      console.log("Extracted bets:", extractedBets);

      if (extractedBets.length === 0) {
        throw new Error("No bets could be extracted from the image");
      }

      // Get alternatives for each bet
      const betsWithAlternatives = await Promise.all(
        extractedBets.map(async (bet) => {
          const markets = await getMarkets("any", bet.player, bet);
          return {
            ...bet,
            alternatives: markets[0]?.outcomes || [],
          };
        }),
      );

      setBets(betsWithAlternatives);
    } catch (err) {
      console.error("Error analyzing bets:", err);
      setError(
        err instanceof Error ? err.message : "Failed to analyze bet slip",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAlternativeSelect = (betId: string, alternative: Outcome) => {
    setBets((prevBets) =>
      prevBets.map((bet) =>
        bet.id === betId
          ? {
              ...bet,
              value: alternative.point || bet.value,
              odds: alternative.price,
            }
          : bet,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-background dark:to-muted/50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Water Down Your Bets</h1>
          <p className="text-muted-foreground">
            Adjust your bet lines to find better odds and reduce risk
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Original Bet Slip</h2>
            <div
              className="w-full h-72 border-2 border-dashed rounded-xl flex items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer mb-4"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full h-full">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Bet slip ${index + 1}`}
                      className="max-h-32 object-contain mx-auto"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <Upload size={48} className="text-blue-500" />
                  <div className="text-center">
                    <p className="font-medium">
                      Drop up to 3 bet slip screenshots here
                    </p>
                    <p className="text-sm">or click to select a file</p>
                  </div>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              max="3"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <Button
              className="w-full"
              onClick={analyzeBets}
              disabled={images.length === 0 || loading}
            >
              {loading ? "Analyzing..." : "Analyze Bets"}
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Alternative Bets</h2>
            <div className="space-y-4">
              {bets.map((bet) => (
                <BetCard
                  key={bet.id}
                  bet={bet}
                  onAlternativeSelect={handleAlternativeSelect}
                />
              ))}
              {bets.length > 0 && (
                <Button
                  className="w-full mt-4"
                  onClick={() => setDialogOpen(true)}
                >
                  Generate Bet Slip
                </Button>
              )}
            </div>
          </Card>
        </div>

        <BetSlipDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          bets={bets}
        />
      </div>
    </div>
  );
}
