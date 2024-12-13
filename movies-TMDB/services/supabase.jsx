import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import "react-native-url-polyfill";

const supabaseUrl = "https://sdqylbyzxsnigybullis.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNkcXlsYnl6eHNuaWd5YnVsbGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNDIxMjAsImV4cCI6MjA0OTYxODEyMH0.ANdNQkF8agjV_xQj6vdMF8clh8uX1tYXrG3vktrVnNw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
