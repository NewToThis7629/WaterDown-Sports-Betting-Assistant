import { User } from "@supabase/supabase-js";

const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {
      name: "Demo User",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
    },
    aud: "authenticated",
    role: "",
  },
  {
    id: "2",
    email: "test@example.com",
    password: "test123",
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {
      name: "Test User",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=test",
    },
    aud: "authenticated",
    role: "",
  },
];

export async function mockSignInWithGoogle(): Promise<{ user: User | null }> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const user = MOCK_USERS[0]; // Use first mock user for Google sign in
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem("mockUser", JSON.stringify(userWithoutPassword));
  dispatchAuthEvent(userWithoutPassword);
  return { user: userWithoutPassword };
}

export async function mockSignInWithEmail(
  email: string,
  password: string,
): Promise<{ user: User | null }> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Remove password from user object before storing
  const { password: _, ...userWithoutPassword } = user;
  localStorage.setItem("mockUser", JSON.stringify(userWithoutPassword));
  dispatchAuthEvent(userWithoutPassword);
  return { user: userWithoutPassword };
}

export async function mockSignUpWithEmail(
  email: string,
  password: string,
): Promise<{ user: User | null }> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Check if user already exists
  const mockUsers = JSON.parse(localStorage.getItem("mockUsers") || "[]");
  if (mockUsers.some((u: any) => u.email === email)) {
    throw new Error("User already exists");
  }

  // Create new user
  const user = {
    id: Math.random().toString(36).substring(7),
    email,
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: {
      name: email.split("@")[0],
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    },
    aud: "authenticated",
    role: "",
  };

  // Save to mock storage
  mockUsers.push(user);
  localStorage.setItem("mockUsers", JSON.stringify(mockUsers));

  // Log user in
  localStorage.setItem("mockUser", JSON.stringify(user));
  dispatchAuthEvent(user);
  return { user };
}

export async function mockSignOut(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  localStorage.removeItem("mockUser");
  dispatchAuthEvent(null);
}

export async function mockGetCurrentUser(): Promise<User | null> {
  const stored = localStorage.getItem("mockUser");
  return stored ? JSON.parse(stored) : null;
}

export function mockOnAuthStateChange(callback: (user: User | null) => void) {
  const stored = localStorage.getItem("mockUser");
  callback(stored ? JSON.parse(stored) : null);

  const handler = (event: CustomEvent) => {
    callback(event.detail);
  };

  window.addEventListener("authStateChange", handler as EventListener);

  return {
    subscription: {
      unsubscribe: () => {
        window.removeEventListener("authStateChange", handler as EventListener);
      },
    },
  };
}

function dispatchAuthEvent(user: User | null) {
  const event = new CustomEvent("authStateChange", { detail: user });
  window.dispatchEvent(event);
}
