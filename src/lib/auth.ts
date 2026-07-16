import { cookies } from "next/headers";
import { isSupabaseConfigured, supabase } from "./supabase";

const COOKIE_NAME = "portfolio_auth_token";
const FALLBACK_ADMIN_EMAIL = "admin@hassan.dev";
const FALLBACK_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function loginUser(email: string, password: string): Promise<boolean> {
  const cookieStore = await cookies();

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Supabase signin error:", error.message);
        return false;
      }
      if (data.session) {
        // Set the token cookie
        cookieStore.set(COOKIE_NAME, data.session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: data.session.expires_in,
          path: "/",
        });
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed Supabase auth:", e);
      return false;
    }
  } else {
    // Fallback Mock Auth
    if (email === FALLBACK_ADMIN_EMAIL && password === FALLBACK_ADMIN_PASSWORD) {
      cookieStore.set(COOKIE_NAME, "mock_session_active_hassan_javed", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      return true;
    }
    return false;
  }
}

export async function logoutUser(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Supabase logout error:", e);
    }
  }
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return false;

  if (isSupabaseConfigured && supabase) {
    try {
      // Set session on server client if needed, or query user
      const { data, error } = await supabase.auth.getUser(token);
      if (error || !data.user) {
        return false;
      }
      return true;
    } catch (e) {
      console.error("Error checking Supabase auth:", e);
      return false;
    }
  } else {
    // Fallback checks
    return token === "mock_session_active_hassan_javed";
  }
}
