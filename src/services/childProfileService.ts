import { supabase } from "./supabaseClient";

export interface ChildProfile {
  id: string;
  parent_id: string;
  scientist_code: string;
  display_name: string;
  grade_level: string;
  language_preference: string;
  created_at: string;
  updated_at: string;
}

function generateScientistCode(): string {
  const chars = "0123456789ABCDEF";
  let code = "YSC-";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

class ChildProfileService {
  /**
   * Fetch all child profiles linked to the authenticated Parent Account
   */
  public async getChildProfiles(parentId: string): Promise<ChildProfile[]> {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("child_profiles")
      .select("*")
      .eq("parent_id", parentId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching child profiles:", error);
      return [];
    }

    return data || [];
  }

  /**
   * Create a new Child Profile linked to the authenticated Parent Account
   */
  public async createChildProfile(
    parentId: string,
    displayName: string,
    gradeLevel: string = "Grade 5",
    languagePreference: string = "en"
  ): Promise<ChildProfile | null> {
    if (!supabase) return null;

    const scientistCode = generateScientistCode();

    const { data, error } = await supabase
      .from("child_profiles")
      .insert({
        parent_id: parentId,
        scientist_code: scientistCode,
        display_name: displayName,
        grade_level: gradeLevel,
        language_preference: languagePreference,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating child profile:", error);
      throw error;
    }

    return data;
  }

  /**
   * Delete a Child Profile (POPIA Data Subject Right)
   */
  public async deleteChildProfile(childId: string): Promise<boolean> {
    if (!supabase) return false;
    const { error } = await supabase.from("child_profiles").delete().eq("id", childId);
    if (error) {
      console.error("Error deleting child profile:", error);
      return false;
    }
    return true;
  }
}

export const childProfileService = new ChildProfileService();
