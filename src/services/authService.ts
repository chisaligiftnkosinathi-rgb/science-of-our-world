import { supabase } from "./supabaseClient";
import { analyticsService } from "./analyticsService";

export interface ParentSession {
  userId: string;
  email: string;
  parentProfileId?: string;
  accountType?: "parent" | "teacher";
}

class SupabaseAuthService {
  /**
   * Register a new Parent / Guardian Account
   */
  public async signUpParent(
    email: string,
    password: string,
    accountType: "parent" | "teacher" = "parent"
  ) {
    if (!supabase) {
      throw new Error("Supabase client is not initialized. Please verify VITE_SUPABASE_ANON_KEY in .env");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Ensure parent_profiles entry exists
      const { data: parentProfile, error: profileErr } = await supabase
        .from("parent_profiles")
        .upsert(
          {
            auth_user_id: data.user.id,
            account_type: accountType,
            status: "active",
          },
          { onConflict: "auth_user_id" }
        )
        .select()
        .single();

      if (profileErr) {
        console.warn("Notice creating parent_profile entry:", profileErr.message);
      }

      await analyticsService.trackEvent("TERMS_ACCEPTED", undefined, {
        registeredParent: true,
        accountType,
      });

      return { user: data.user, parentProfile };
    }

    return { user: data.user, parentProfile: null };
  }

  /**
   * Authenticate existing Parent / Guardian Account
   */
  public async signInParent(email: string, password: string) {
    if (!supabase) {
      throw new Error("Supabase client is not initialized.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    let parentProfile = null;
    if (data.user) {
      const { data: prof } = await supabase
        .from("parent_profiles")
        .select("*")
        .eq("auth_user_id", data.user.id)
        .single();
      parentProfile = prof;
    }

    return { user: data.user, session: data.session, parentProfile };
  }

  /**
   * Log out active Parent session
   */
  public async signOutParent() {
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  /**
   * Fetch current active session
   */
  public async getCurrentSession(): Promise<ParentSession | null> {
    if (!supabase) return null;
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) return null;

    const { data: prof } = await supabase
      .from("parent_profiles")
      .select("*")
      .eq("auth_user_id", data.session.user.id)
      .single();

    return {
      userId: data.session.user.id,
      email: data.session.user.email || "",
      parentProfileId: prof?.id,
      accountType: prof?.account_type || "parent",
    };
  }

  /**
   * Listen to auth state changes
   */
  public onAuthStateChange(callback: (session: ParentSession | null) => void) {
    if (!supabase) return () => {};
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: prof } = await supabase
          .from("parent_profiles")
          .select("*")
          .eq("auth_user_id", session.user.id)
          .single();

        callback({
          userId: session.user.id,
          email: session.user.email || "",
          parentProfileId: prof?.id,
          accountType: prof?.account_type || "parent",
        });
      } else {
        callback(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }
}

export const authService = new SupabaseAuthService();
