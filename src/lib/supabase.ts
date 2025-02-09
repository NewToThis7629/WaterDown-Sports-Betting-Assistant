import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aqxvkjpvbhkxqvtjfwdm.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxeHZranB2YmhreHF2dGpmd2RtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4OTI4MDAsImV4cCI6MjAyNjQ2ODgwMH0.Rl0uWn-9HHO0obCfU1Zw7Qo_zGLlOHaicEv_PaYXx_I";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
