import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithGoogle, signUpWithEmail } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

export default function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
      });
      return;
    }

    try {
      setLoading(true);
      const { user, error } = await signUpWithEmail(email, password);
      if (error) throw error;
      if (user) {
        toast({
          title: "Welcome!",
          description: "Your account has been created successfully.",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Error signing up with email:", error);
      toast({
        variant: "destructive",
        title: "Error signing up",
        description:
          error.message ||
          "There was a problem creating your account. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const { user, error } = await signInWithGoogle();
      if (error) throw error;
      if (user) {
        toast({
          title: "Welcome!",
          description: "Successfully signed in with Google.",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast({
        variant: "destructive",
        title: "Error signing up",
        description:
          "There was a problem signing up with Google. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A3B] flex items-center justify-center p-4">
      <div className="w-full max-w-[1200px] grid lg:grid-cols-2 gap-8 items-center">
        {/* Signup Form */}
        <div className="bg-[#0A1A3B] p-8 rounded-lg w-full max-w-md mx-auto space-y-6">
          <div className="space-y-2 mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Sign up
            </h1>
            <p className="text-gray-400">Create your account to get started</p>
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
            {loading ? "Signing up..." : "Sign up with Google"}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0A1A3B] px-2 text-gray-400">or</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email<span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-[#0F2756] border-gray-700 text-white placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">
                Confirm Password<span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                className="bg-[#0F2756] border-gray-700 text-white placeholder:text-gray-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#60A5FA] hover:bg-blue-500 text-white py-6"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            <p className="text-center text-gray-400 text-sm">
              Already have an account?{" "}
              <Button
                variant="link"
                className="text-blue-500 hover:text-blue-400 p-0"
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </p>
          </form>
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
