import { ModuleId } from "../types";

export type ModuleMasteryStatus = "NOT_STARTED" | "IN_PROGRESS" | "MASTERED";

export interface ModuleProgressionRule {
  id: ModuleId;
  prerequisiteId: ModuleId | null;
  title: string;
  shortTitle: string;
  category: string;
  unlockedByDefault?: boolean;
  unlockRequirementText?: string;
}

export const MODULE_PROGRESSION_RULES: Record<ModuleId, ModuleProgressionRule> = {
  home: { id: "home", prerequisiteId: null, title: "Overview", shortTitle: "Overview", category: "WELCOME", unlockedByDefault: true },
  map: { id: "map", prerequisiteId: null, title: "The Unifying Science Map", shortTitle: "Science Map", category: "MENTAL MODEL", unlockedByDefault: true },
  systems: { id: "systems", prerequisiteId: null, title: "Lesson 01: What Is a System?", shortTitle: "01. Systems", category: "FOUNDATIONS", unlockedByDefault: true },
  human: { id: "human", prerequisiteId: "systems", title: "Lesson 02: The Human Body as an Open System", shortTitle: "02. Human Body", category: "BIOLOGY", unlockRequirementText: "Master Lesson 01: Systems Thinking to unlock." },
  earth: { id: "earth", prerequisiteId: "human", title: "Lesson 03: Earth as a Connected System", shortTitle: "03. Earth System", category: "EARTH SCIENCE", unlockRequirementText: "Master Lesson 02: The Human Body to unlock." },
  food: { id: "food", prerequisiteId: "earth", title: "Lesson 04: Food Chains & Trophic Webs", shortTitle: "04. Food Chains", category: "ECOLOGY", unlockRequirementText: "Master Lesson 03: Earth System to unlock." },
  energy: { id: "energy", prerequisiteId: "food", title: "Lesson 05: Energy & Heat Transfer", shortTitle: "05. Energy", category: "PHYSICS", unlockRequirementText: "Master Lesson 04: Food Chains to unlock." },
  cycles: { id: "cycles", prerequisiteId: "energy", title: "Lesson 06: Natural Cycles: Water, Carbon, & Oxygen", shortTitle: "06. Cycles", category: "EARTH SYSTEMS", unlockRequirementText: "Master Lesson 05: Energy to unlock." },
  matter: { id: "matter", prerequisiteId: "cycles", title: "Lesson 07: States of Matter & Particles", shortTitle: "07. States of Matter", category: "CHEMISTRY", unlockRequirementText: "Master Lesson 06: Natural Cycles to unlock." },
  chemistry: { id: "chemistry", prerequisiteId: "matter", title: "Lesson 08: Chemistry in Life & Reactions", shortTitle: "08. Chemistry", category: "CHEMISTRY", unlockRequirementText: "Master Lesson 07: States of Matter to unlock." },
  forces: { id: "forces", prerequisiteId: "chemistry", title: "Lesson 09: Forces, Gravity & Motion", shortTitle: "09. Forces & Motion", category: "PHYSICS", unlockRequirementText: "Master Lesson 08: Chemistry in Life to unlock." },
  electricity: { id: "electricity", prerequisiteId: "forces", title: "Lesson 10: Electricity & Complete Circuits", shortTitle: "10. Electricity", category: "PHYSICS", unlockRequirementText: "Master Lesson 09: Forces & Motion to unlock." },
  laws: { id: "laws", prerequisiteId: "electricity", title: "Lesson 11: Laws of Nature & Scientific Discovery", shortTitle: "11. Nature Laws", category: "SCIENTIFIC THINKING", unlockRequirementText: "Master Lesson 10: Electricity to unlock." },
  connected: { id: "connected", prerequisiteId: "laws", title: "Lesson 12: One Connected World", shortTitle: "12. Connected World", category: "SYSTEMS THINKING", unlockRequirementText: "Master Lesson 11: Laws of Nature to unlock." },

  // Feature Hub Gates
  journal: { id: "journal", prerequisiteId: "systems", title: "Young Scientist Field Notebook", shortTitle: "Field Notes", category: "RESEARCH LOG", unlockRequirementText: "Master Lesson 01: Systems Thinking to unlock." },
  laboratory: { id: "laboratory", prerequisiteId: "earth", title: "Young Scientist Virtual Lab Hub", shortTitle: "Virtual Lab", category: "PRACTICAL LAB", unlockRequirementText: "Master Lesson 03: Earth System to unlock." },
  detective: { id: "detective", prerequisiteId: "cycles", title: "Scientific Detective Mode", shortTitle: "Detective Mode", category: "FORENSIC SCIENCE", unlockRequirementText: "Master Lesson 06: Natural Cycles to unlock." },
  sandbox: { id: "sandbox", prerequisiteId: "chemistry", title: "Ecosystem Sandbox & World Builder", shortTitle: "Sandbox", category: "INTERACTIVE SIMULATION", unlockRequirementText: "Master Lesson 08: Chemistry in Life to unlock." },
  capstone: { id: "capstone", prerequisiteId: "connected", title: "Young Scientist Capstone Defense", shortTitle: "Capstone Defense", category: "CAPSTONE DEFENSE", unlockRequirementText: "Master Lesson 12: One Connected World to unlock." },
  challenge: { id: "challenge", prerequisiteId: "capstone", title: "Young Scientist Challenge & Certificate", shortTitle: "Final Challenge", category: "ASSESSMENT", unlockRequirementText: "Complete the Young Scientist Capstone Defense to unlock." },
};

export interface ModuleUnlockState {
  status: ModuleMasteryStatus;
  isUnlocked: boolean;
  prerequisiteId: ModuleId | null;
  prerequisiteTitle: string | null;
  unlockRequirementText: string;
}

/**
 * Single Source of Truth for Progression & Unlock Logic.
 * Note: teacherDemoMode grants VISIBILITY for review, but NEVER mutates learner mastery state.
 */
export function getModuleUnlockState(
  id: ModuleId,
  completedModules: string[],
  teacherDemoMode: boolean = false
): ModuleUnlockState {
  const rule = MODULE_PROGRESSION_RULES[id] || {
    id,
    prerequisiteId: null,
    title: id,
    shortTitle: id,
    category: "LEARNING",
  };
  
  const isMastered = completedModules.includes(id);
  const activeLessonId = getNextActiveLesson(completedModules);

  const status: ModuleMasteryStatus = isMastered
    ? "MASTERED"
    : id === activeLessonId
    ? "IN_PROGRESS"
    : "NOT_STARTED";

  let isUnlocked = false;

  if (teacherDemoMode) {
    // Teacher Demo Mode grants VISIBILITY/ACCESS for review, but NEVER grants mastery
    isUnlocked = true;
  } else if (rule.unlockedByDefault || !rule.prerequisiteId) {
    isUnlocked = true;
  } else {
    isUnlocked = completedModules.includes(rule.prerequisiteId);
  }

  const prereqRule = rule.prerequisiteId ? MODULE_PROGRESSION_RULES[rule.prerequisiteId] : null;

  return {
    status,
    isUnlocked,
    prerequisiteId: rule.prerequisiteId,
    prerequisiteTitle: prereqRule ? prereqRule.title : null,
    unlockRequirementText: rule.unlockRequirementText || (prereqRule ? `Master ${prereqRule.title} to unlock.` : ""),
  };
}

/**
 * Returns the next active sequential lesson a learner should focus on.
 */
export function getNextActiveLesson(completedModules: string[]): ModuleId {
  const sequentialLessons: ModuleId[] = [
    "systems",
    "human",
    "earth",
    "food",
    "energy",
    "cycles",
    "matter",
    "chemistry",
    "forces",
    "electricity",
    "laws",
    "connected",
  ];

  for (const lessonId of sequentialLessons) {
    if (!completedModules.includes(lessonId)) {
      return lessonId;
    }
  }

  return "capstone"; // All 12 mastered!
}

/**
 * Monotonic Mastery Sync Conflict Resolution Strategy.
 * Progression state is strictly monotonic: NOT_STARTED -> IN_PROGRESS -> MASTERED
 * Once MASTERED, a lesson is irreversible and can NEVER be downgraded by an older device state.
 * MASTERED + anything -> MASTERED
 * IN_PROGRESS + MASTERED -> MASTERED
 * NOT_STARTED + MASTERED -> MASTERED
 */
export function mergeMonotonicMastery(
  localCompleted: string[],
  remoteCompleted: string[]
): string[] {
  const mergedSet = new Set<string>([...localCompleted, ...remoteCompleted]);
  return Array.from(mergedSet);
}

/**
 * Idempotent Progress Event Deduplication.
 * Ensures duplicate delivery of event payloads (e.g. LESSON_COMPLETED) yields exactly 1 valid state change.
 */
export function mergeIdempotentEvents<T extends { id: string }>(
  existingItems: T[],
  incomingItems: T[]
): T[] {
  const map = new Map<string, T>();
  for (const item of existingItems) {
    if (item.id) map.set(item.id, item);
  }
  for (const item of incomingItems) {
    if (item.id && !map.has(item.id)) {
      map.set(item.id, item);
    }
  }
  return Array.from(map.values());
}
