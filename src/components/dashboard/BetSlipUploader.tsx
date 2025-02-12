import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function BetSlipUploader() {
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const [betSlipLink, setBetSlipLink] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).slice(0, 3 - images.length);

      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleWaterDown = () => {
    if (images.length > 0 || betSlipLink) {
      navigate("/water-down", { state: { images, betSlipLink } });
    }
  };

  return (
    <Card className="w-full max-w-2xl p-8 shadow-lg border-2 hover:border-[#3B82F6]/20 transition-colors">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Upload Bet Slip</h2>
          <p className="text-muted-foreground">
            Upload up to 3 screenshots or paste your bet slip link to get
            started
          </p>
        </div>

        <div className="space-y-6">
          <div
            className="w-full h-72 border-2 border-dashed rounded-xl flex items-center justify-center bg-[#3B82F6]/5 hover:bg-[#3B82F6]/10 transition-colors cursor-pointer overflow-hidden"
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
                <Upload size={48} className="text-[#3B82F6]" />
                <div className="text-center">
                  <p className="font-medium">
                    Drop up to 3 bet slip screenshots here
                  </p>
                  <p className="text-sm">or click to select files</p>
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
          disabled={images.length === 0 && !betSlipLink}
        >
          Water Down My Bets
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <input
          type="file"
          accept="image/*"
          multiple
          max="3"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
      </div>
    </Card>
  );
}
