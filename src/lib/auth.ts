import { User } from "@supabase/supabase-js";
import {
  mockSignInWithGoogle,
  mockSignOut,
  mockGetCurrentUser,
  mockOnAuthStateChange,
} from "./mock-auth";

export async function signInWithGoogle(): Promise<{ user: User | null }> {
  return mockSignInWithGoogle();
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
