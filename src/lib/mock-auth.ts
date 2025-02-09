import { User } from "@supabase/supabase-js";

const MOCK_USER: User = {
  id: "mock-user-id",
  email: "demo@example.com",
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {
    name: "Demo User",
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
  },
  aud: "authenticated",
  role: "",
};

export async function mockSignInWithGoogle(): Promise<{ user: User | null }> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const user = MOCK_USER;
  localStorage.setItem("mockUser", JSON.stringify(user));
  const event = new CustomEvent("authStateChange", { detail: user });
  window.dispatchEvent(event);
  return { user };
}

export async function mockSignOut(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  localStorage.removeItem("mockUser");
  const event = new CustomEvent("authStateChange", { detail: null });
  window.dispatchEvent(event);
}

export async function mockGetCurrentUser(): Promise<User | null> {
  const stored = localStorage.getItem("mockUser");
  return stored ? JSON.parse(stored) : null;
}

export function mockOnAuthStateChange(callback: (user: User | null) => void) {
  // Initial check
  const stored = localStorage.getItem("mockUser");
  callback(stored ? JSON.parse(stored) : null);

  // Listen for auth state changes
  const handler = (event: CustomEvent) => {
    callback(event.detail);
  };

  window.addEventListener("authStateChange", handler as EventListener);

  return Promise.resolve({
    subscription: {
      unsubscribe: () => {
        window.removeEventListener("authStateChange", handler as EventListener);
      },
    },
  });
}
