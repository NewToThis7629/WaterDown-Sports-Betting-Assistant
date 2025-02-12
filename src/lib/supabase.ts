import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
  },
  global: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});

// User profiles functions
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: {
    username?: string;
    display_name?: string;
    avatar_url?: string;
    bio?: string;
  },
) {
  const { data, error } = await supabase
    .from("user_profiles")
    .update(updates)
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

// User settings functions
export async function getUserSettings(userId: string) {
  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateUserSettings(
  userId: string,
  updates: {
    theme?: string;
    language?: string;
    timezone?: string;
    date_format?: string;
    notifications_enabled?: boolean;
    betting_preferences?: Record<string, any>;
  },
) {
  const { data, error } = await supabase
    .from("user_settings")
    .update(updates)
    .eq("user_id", userId);

  if (error) throw error;
  return data;
}

// Delete account and all associated data
export async function deleteUserAccount(userId: string) {
  const { error } = await supabase
    .from("user_profiles")
    .delete()
    .eq("user_id", userId);

  if (error) throw error;

  // User auth record will be automatically deleted by Supabase's cascade delete
}
