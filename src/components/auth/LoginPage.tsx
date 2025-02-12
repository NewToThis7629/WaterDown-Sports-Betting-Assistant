import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Just log in directly with default credentials
    localStorage.setItem(
      "mockUser",
      JSON.stringify({
        id: "1",
        email: "demo@example.com",
        created_at: new Date().toISOString(),
        user_metadata: {
          name: "Demo User",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
        },
      }),
    );

    // Dispatch auth event
    const event = new CustomEvent("authStateChange", {
      detail: JSON.parse(localStorage.getItem("mockUser")),
    });
    window.dispatchEvent(event);

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[300px] p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Welcome</h1>
        <p className="text-sm text-center text-muted-foreground">
          Click below to log in with demo credentials
        </p>
        <Button className="w-full" size="lg" onClick={handleLogin}>
          Login as Demo User
        </Button>
      </Card>
    </div>
  );
}
