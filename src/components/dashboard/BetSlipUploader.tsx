import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function BetSlipUploader() {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [betSlipLink, setBetSlipLink] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWaterDown = () => {
    if (image || betSlipLink) {
      navigate("/water-down", { state: { image, betSlipLink } });
    }
  };

  return (
    <Card className="w-full max-w-2xl p-8 shadow-lg border-2 hover:border-[#3B82F6]/20 transition-colors">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Upload Bet Slip</h2>
          <p className="text-muted-foreground">
            Upload a screenshot or paste your bet slip link to get started
          </p>
        </div>

        <div className="space-y-6">
          <div
            className="w-full h-72 border-2 border-dashed rounded-xl flex items-center justify-center bg-[#3B82F6]/5 hover:bg-[#3B82F6]/10 transition-colors cursor-pointer overflow-hidden"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded bet slip"
                className="max-h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <Upload size={48} className="text-[#3B82F6]" />
                <div className="text-center">
                  <p className="font-medium">
                    Drop your bet slip screenshot here
                  </p>
                  <p className="text-sm">or click to select a file</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Or paste your bet slip link
            </p>
            <Input
              placeholder="https://sportsbook.fanduel.com/share/betslip/..."
              value={betSlipLink}
              onChange={(e) => setBetSlipLink(e.target.value)}
              className="font-mono text-sm"
            />
          </div>
        </div>

        <Button
          className="w-full text-lg py-6 bg-[#3B82F6] hover:bg-[#2563EB] transition-colors"
          onClick={handleWaterDown}
          disabled={!image && !betSlipLink}
        >
          Water Down My Bets
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
      </div>
    </Card>
  );
}
