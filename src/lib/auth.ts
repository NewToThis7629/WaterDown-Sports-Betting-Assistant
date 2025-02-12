import { User } from "@supabase/supabase-js";
import {
  mockSignInWithEmail,
  mockSignUpWithEmail,
  mockSignInWithGoogle,
  mockSignOut,
  mockGetCurrentUser,
  mockOnAuthStateChange,
} from "./mock-auth";

export interface AuthResponse {
  user: User | null;
  error: Error | null;
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthResponse> {
  try {
    const { user } = await mockSignInWithEmail(email, password);
    return { user, error: null };
  } catch (error) {
    console.error("Error signing in with email:", error);
    return { user: null, error: error as Error };
  }
}

export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<AuthResponse> {
  try {
    const { user } = await mockSignUpWithEmail(email, password);
    return { user, error: null };
  } catch (error) {
    console.error("Error signing up with email:", error);
    return { user: null, error: error as Error };
  }
}

export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    const { user } = await mockSignInWithGoogle();
    return { user, error: null };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return { user: null, error: error as Error };
  }
}

export async function signOut(): Promise<void> {
  return mockSignOut();
}

export async function getCurrentUser(): Promise<User | null> {
  return mockGetCurrentUser();
}

export function onAuthStateChange(callback: (user: User | null) => void) {
  return mockOnAuthStateChange(callback);
}
