-- ==============================================================================
-- 🧬 NEXUS SCIENCE™ SUPABASE MIGRATION 002: ROW-LEVEL SECURITY (RLS) POLICIES
-- Publisher: Global IT and Business Solutions (Pty) Ltd.
-- Description: Enforces defense-in-depth database authorization policies.
--              Ensures Parent A can ONLY query and manipulate their own children.
-- ==============================================================================

-- 1. ENABLE ROW LEVEL SECURITY ON ALL TABLES
ALTER TABLE parent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE learner_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_events ENABLE ROW LEVEL SECURITY;

-- 2. PARENT PROFILES POLICIES
-- A parent can only view and update their own parent_profile row.
CREATE POLICY "Parents can view their own profile"
  ON parent_profiles FOR SELECT
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Parents can update their own profile"
  ON parent_profiles FOR UPDATE
  USING (auth.uid() = auth_user_id);

CREATE POLICY "Parents can insert their profile on registration"
  ON parent_profiles FOR INSERT
  WITH CHECK (auth.uid() = auth_user_id);

-- 3. CHILD PROFILES POLICIES
-- A parent can manage only child profiles linked to their parent_profile id.
CREATE POLICY "Parents can view their linked child profiles"
  ON child_profiles FOR SELECT
  USING (
    parent_id IN (
      SELECT id FROM parent_profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can insert child profiles under their account"
  ON child_profiles FOR INSERT
  WITH CHECK (
    parent_id IN (
      SELECT id FROM parent_profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can update their linked child profiles"
  ON child_profiles FOR UPDATE
  USING (
    parent_id IN (
      SELECT id FROM parent_profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can delete their linked child profiles"
  ON child_profiles FOR DELETE
  USING (
    parent_id IN (
      SELECT id FROM parent_profiles WHERE auth_user_id = auth.uid()
    )
  );

-- 4. LEGAL ACCEPTANCES POLICIES
CREATE POLICY "Parents can view their legal consent records"
  ON legal_acceptances FOR SELECT
  USING (
    parent_id IN (
      SELECT id FROM parent_profiles WHERE auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can insert legal consent records"
  ON legal_acceptances FOR INSERT
  WITH CHECK (
    parent_id IN (
      SELECT id FROM parent_profiles WHERE auth_user_id = auth.uid()
    )
  );

-- 5. LEARNER PROGRESS POLICIES (Strict Child Isolation)
-- A parent can access learner_progress ONLY if learner_id belongs to a child profile under their parent account.
CREATE POLICY "Parents can view progress of their linked children"
  ON learner_progress FOR SELECT
  USING (
    learner_id IN (
      SELECT cp.id FROM child_profiles cp
      JOIN parent_profiles pp ON cp.parent_id = pp.id
      WHERE pp.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can insert progress for their linked children"
  ON learner_progress FOR INSERT
  WITH CHECK (
    learner_id IN (
      SELECT cp.id FROM child_profiles cp
      JOIN parent_profiles pp ON cp.parent_id = pp.id
      WHERE pp.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can update progress for their linked children"
  ON learner_progress FOR UPDATE
  USING (
    learner_id IN (
      SELECT cp.id FROM child_profiles cp
      JOIN parent_profiles pp ON cp.parent_id = pp.id
      WHERE pp.auth_user_id = auth.uid()
    )
  );

-- 6. SYNC EVENTS POLICIES
CREATE POLICY "Parents can insert sync events for their linked children"
  ON sync_events FOR INSERT
  WITH CHECK (
    learner_id IN (
      SELECT cp.id FROM child_profiles cp
      JOIN parent_profiles pp ON cp.parent_id = pp.id
      WHERE pp.auth_user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view sync events for their linked children"
  ON sync_events FOR SELECT
  USING (
    learner_id IN (
      SELECT cp.id FROM child_profiles cp
      JOIN parent_profiles pp ON cp.parent_id = pp.id
      WHERE pp.auth_user_id = auth.uid()
    )
  );
