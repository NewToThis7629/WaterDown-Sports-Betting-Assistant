import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { getCurrentUser, onAuthStateChange } from "@/lib/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user
    getCurrentUser().then((user) => {
      setUser(user);
      setLoading(false);
    });

    // Listen for auth changes
    const { subscription } = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
