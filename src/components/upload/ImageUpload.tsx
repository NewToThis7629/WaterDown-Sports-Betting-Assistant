import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full h-64 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center bg-muted/50">
          {image ? (
            <img
              src={image}
              alt="Uploaded bet slip"
              className="max-h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload size={40} />
              <p>Upload your bet slip screenshot</p>
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <Button asChild className="w-full">
          <label htmlFor="image-upload" className="cursor-pointer">
            Select Image
          </label>
        </Button>
      </div>
    </div>
  );
}
