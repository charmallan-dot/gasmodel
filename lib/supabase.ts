import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xtlrzksreklxffhwboqh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkZHlicnFvYnhsZGhoYmF3Z2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNDYyMzcsImV4cCI6MjA4ODYyMjIzN30.kXaBfTSQ5diqGkMja03-NuKim4L7c6gmf1ZyviNCYzI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
