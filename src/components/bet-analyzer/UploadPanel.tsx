import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function UploadPanel() {
  return (
    <Card className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Upload Bet Slip</h2>
      <div className="w-full h-72 border-2 border-dashed rounded-xl flex items-center justify-center bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Upload size={48} className="text-blue-500" />
          <div className="text-center">
            <p className="font-medium">Drop your bet slip screenshot here</p>
            <p className="text-sm">or click to select a file</p>
          </div>
        </div>
      </div>
      <Button className="w-full">Analyze Bet Slip</Button>
    </Card>
  );
}
