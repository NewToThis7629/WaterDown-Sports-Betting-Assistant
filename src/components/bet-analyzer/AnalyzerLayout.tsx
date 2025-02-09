import { ReactNode } from "react";

interface AnalyzerLayoutProps {
  children: ReactNode;
}

export default function AnalyzerLayout({ children }: AnalyzerLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-background dark:to-muted/50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">{children}</div>
    </div>
  );
}
