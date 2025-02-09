import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { signInWithGoogle } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        variant: "destructive",
        title: "Error signing in",
        description:
          "There was a problem signing in with Google. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A3B] flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-8 items-center">
        {/* Login Form */}
        <div className="bg-[#0A1A3B] p-8 rounded-lg w-full max-w-md mx-auto space-y-6">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Log in
            </h1>
            <p className="text-gray-400">Sign in to access your account</p>
          </div>

          <Button
            variant="outline"
            className="w-full bg-white hover:bg-gray-100 text-gray-900 gap-2"
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-4 h-4"
            />
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0A1A3B] px-2 text-gray-400">or</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-[#0F2756] border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password<span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Min. 8 characters"
                className="bg-[#0F2756] border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-gray-700 data-[state=checked]:bg-blue-500"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep me logged in
                </label>
              </div>
              <Button
                variant="link"
                className="text-blue-500 hover:text-blue-400 p-0"
              >
                Forget password?
              </Button>
            </div>

            <Button className="w-full bg-[#60A5FA] hover:bg-blue-500 text-white py-6">
              Sign in
            </Button>

            <p className="text-center text-gray-400 text-sm">
              Not registered yet?{" "}
              <Button
                variant="link"
                className="text-blue-500 hover:text-blue-400 p-0"
                onClick={() => navigate("/signup")}
              >
                Create an Account
              </Button>
            </p>
          </div>
        </div>

        {/* Logo Section */}
        <div className="hidden lg:flex flex-col items-center justify-center p-8">
          <img
            src="/logo.png"
            alt="Water Down Sports Betting Assistant"
            className="w-96 h-auto mb-4"
          />
        </div>
      </div>
    </div>
  );
}
