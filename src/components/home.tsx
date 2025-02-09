import BetSlipUploader from "./dashboard/BetSlipUploader";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-background dark:to-muted/50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-8">
            <img
              src="/logo.png"
              alt="WaterDown Sports Betting Assistant"
              className="h-40 w-auto"
            />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your bet slip and we'll find smarter, lower-risk alternatives
            while maintaining potential profits
          </p>
        </div>
        <div className="flex justify-center">
          <BetSlipUploader />
        </div>
      </div>
    </div>
  );
}

export default Home;
