import { useOutlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const outlet = useOutlet();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] dark:from-background dark:to-muted/50">
        {outlet}
      </main>
    </div>
  );
}
