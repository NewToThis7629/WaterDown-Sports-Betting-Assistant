import AnalyzerLayout from "@/components/bet-analyzer/AnalyzerLayout";
import UploadPanel from "@/components/bet-analyzer/UploadPanel";
import ResultsPanel from "@/components/bet-analyzer/ResultsPanel";
import AlternativesList from "@/components/bet-analyzer/AlternativesList";
import OptimizationSummary from "@/components/bet-analyzer/OptimizationSummary";

export default function BetSlipAnalyzer() {
  return (
    <AnalyzerLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UploadPanel />
        <ResultsPanel />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AlternativesList />
        <OptimizationSummary />
      </div>
    </AnalyzerLayout>
  );
}
