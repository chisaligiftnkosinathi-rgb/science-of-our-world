-- ==============================================================================
-- 🧬 NEXUS SCIENCE™ SUPABASE MIGRATION 001: INITIAL SCHEMA
-- Publisher: Global IT and Business Solutions (Pty) Ltd.
-- Project: Nexus Science (https://ffmguaszznfrxpbjlcvf.supabase.co)
-- Description: Establishes Parent Profiles, Child Profiles, Legal Acceptances,
--              Learner Progress (Monotonic Mastery), and Sync Events.
-- ==============================================================================

-- 1. PARENT / GUARDIAN PROFILES (1:1 with auth.users)
CREATE TABLE IF NOT EXISTS parent_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type VARCHAR(50) NOT NULL DEFAULT 'parent', -- 'parent' | 'teacher'
  status VARCHAR(50) NOT NULL DEFAULT 'active',      -- 'active' | 'suspended' | 'deleted'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CHILD LEARNER PROFILES (1:N with parent_profiles)
-- Child does not possess an email address or password credentials.
CREATE TABLE IF NOT EXISTS child_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES parent_profiles(id) ON DELETE CASCADE,
  scientist_code VARCHAR(50) UNIQUE NOT NULL, -- Anonymous Code e.g. 'YSC-7F42'
  display_name VARCHAR(100) NOT NULL,        -- First name / nickname e.g. 'Thando'
  grade_level VARCHAR(50) NOT NULL DEFAULT 'Grade 5',
  language_preference VARCHAR(10) NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. VERSIONED LEGAL CONSENT RECORDS (POPIA Section 35 Compliant)
CREATE TABLE IF NOT EXISTS legal_acceptances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES parent_profiles(id) ON DELETE CASCADE,
  terms_version VARCHAR(20) NOT NULL,    -- '1.0'
  privacy_version VARCHAR(20) NOT NULL,  -- '1.0'
  consent_type VARCHAR(50) NOT NULL,     -- 'parent_guardian' | 'teacher_educator'
  accepted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. MONOTONIC LEARNER PROGRESS & REVISION COUNTER
CREATE TABLE IF NOT EXISTS learner_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  module_id VARCHAR(50) NOT NULL,        -- 'systems', 'earth', 'laboratory', etc.
  state VARCHAR(50) NOT NULL DEFAULT 'NOT_STARTED', -- 'NOT_STARTED' | 'IN_PROGRESS' | 'MASTERED'
  version INT NOT NULL DEFAULT 1,        -- Revision counter for multi-device sync
  mastery_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(learner_id, module_id)
);

-- 5. IDEMPOTENT SYNC EVENT QUEUE LOG
CREATE TABLE IF NOT EXISTS sync_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  learner_id UUID NOT NULL REFERENCES child_profiles(id) ON DELETE CASCADE,
  event_id VARCHAR(100) UNIQUE NOT NULL,  -- Idempotency key e.g. 'sync_9F412A'
  event_type VARCHAR(50) NOT NULL,        -- 'LESSON_COMPLETED', 'QUIZ_ATTEMPTED', etc.
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
