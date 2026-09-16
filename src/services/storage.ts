import { ModuleId, JournalEntry } from "../types";

export interface LegalAcceptance {
  termsVersion: string;
  privacyVersion: string;
  acceptedAt: string;
  consentType: "parent_guardian" | "teacher_educator" | "guest_learner";
  acceptedByRole: string;
}

export interface AnalyticsEvent {
  id: string;
  installationId: string;
  eventType:
    | "SESSION_STARTED"
    | "LESSON_STARTED"
    | "LESSON_COMPLETED"
    | "MASTERY_ACHIEVED"
    | "QUIZ_ATTEMPTED"
    | "EXPERIMENT_COMPLETED"
    | "LAB_OPENED"
    | "DETECTIVE_CASE_COMPLETED"
    | "CAPSTONE_COMPLETED"
    | "TERMS_ACCEPTED";
  moduleId?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface LearnerProfile {
  scientistId: string; // e.g. "YSC-7F42"
  installationId: string; // e.g. "inst_9F412A" (anonymous device identifier)
  nickname: string;
  avatar: string; // emoji e.g. "🦁", "🌱", "🦅", "🔬", "🪐"
  gradeLevel: string; // "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Young Explorer"
  language: "en" | "zu" | "ss"; // English | isiZulu | siSwati
  createdAt: string;
  lastActive: string;
  isCloudLinked: boolean;
  cloudEmail?: string;
  accountMode: "guest" | "parent" | "teacher"; // 3 Tier Identity Ladder
  teacherDemoMode?: boolean; // Demo unlock toggle for review (never mutates genuine mastery)
  legalAcceptance?: LegalAcceptance;
}

export interface QuizRecord {
  id: string;
  moduleId: string;
  score: number;
  totalQuestions: number;
  timestamp: string;
}

export interface DetectiveRecord {
  caseId: string;
  solvedAt: string;
  badgeName: string;
}

export interface SyncQueueItem {
  id: string;
  action: "COMPLETE_MODULE" | "LOG_JOURNAL" | "RECORD_QUIZ" | "SOLVE_DETECTIVE" | "SAVE_PROFILE" | "CAPSTONE_GRADUATION";
  payload: any;
  timestamp: number;
  synced: boolean;
}

export interface AppStateExport {
  version: number;
  profile: LearnerProfile;
  completedModules: string[];
  journalEntries: JournalEntry[];
  quizRecords: QuizRecord[];
  detectiveRecords: DetectiveRecord[];
  capstoneCompleted: boolean;
  timestamp: string;
}

const DB_NAME = "ScienceOfOurWorldDB";
const DB_VERSION = 1;
const LOCAL_STORAGE_BACKUP_KEY = "science_of_our_world_data_v2";

function generateAnonymousId(): string {
  const chars = "0123456789ABCDEF";
  let code = "YSC-";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function generateInstallationId(): string {
  const chars = "0123456789ABCDEF";
  let code = "inst_";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export const DEFAULT_LEARNER_PROFILE: LearnerProfile = {
  scientistId: generateAnonymousId(),
  installationId: generateInstallationId(),
  nickname: "Young Scientist",
  avatar: "🦁",
  gradeLevel: "Grade 5",
  language: "en",
  createdAt: new Date().toISOString(),
  lastActive: new Date().toISOString(),
  isCloudLinked: false,
  accountMode: "guest",
  teacherDemoMode: false,
};

class IndexedDBStorageService {
  private dbPromise: Promise<IDBDatabase | null>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  private initDB(): Promise<IDBDatabase | null> {
    if (typeof window === "undefined" || !window.indexedDB) {
      console.warn("IndexedDB not supported in this environment, falling back to localStorage.");
      return Promise.resolve(null);
    }

    return new Promise((resolve) => {
      try {
        const request = window.indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
          const db = (event.target as IDBOpenDBRequest).result;
          
          if (!db.objectStoreNames.contains("profile")) {
            db.createObjectStore("profile", { keyPath: "key" });
          }
          if (!db.objectStoreNames.contains("progress")) {
            db.createObjectStore("progress", { keyPath: "moduleId" });
          }
          if (!db.objectStoreNames.contains("journal")) {
            db.createObjectStore("journal", { keyPath: "id" });
          }
          if (!db.objectStoreNames.contains("quizzes")) {
            db.createObjectStore("quizzes", { keyPath: "id" });
          }
          if (!db.objectStoreNames.contains("detectives")) {
            db.createObjectStore("detectives", { keyPath: "caseId" });
          }
          if (!db.objectStoreNames.contains("syncQueue")) {
            db.createObjectStore("syncQueue", { keyPath: "id" });
          }
        };

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = (e) => {
          console.warn("IndexedDB open error:", e);
          resolve(null);
        };
      } catch (err) {
        console.warn("IndexedDB initialization exception:", err);
        resolve(null);
      }
    });
  }

  // Generic helper for transaction
  private async getStore(storeName: string, mode: IDBTransactionMode): Promise<IDBObjectStore | null> {
    const db = await this.dbPromise;
    if (!db) return null;
    try {
      const tx = db.transaction(storeName, mode);
      return tx.objectStore(storeName);
    } catch (e) {
      console.warn(`Error getting store ${storeName}`, e);
      return null;
    }
  }

  // PROFILE
  async getProfile(): Promise<LearnerProfile> {
    try {
      const store = await this.getStore("profile", "readonly");
      if (store) {
        const req = store.get("current_learner");
        const res = await new Promise<{ key: string; value: LearnerProfile } | undefined>((resolve) => {
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => resolve(undefined);
        });
        if (res && res.value) return res.value;
      }
    } catch (e) {
      console.warn("IndexedDB getProfile failed", e);
    }

    // Fallback to localStorage
    try {
      const backup = localStorage.getItem(LOCAL_STORAGE_BACKUP_KEY + "_profile");
      if (backup) {
        return JSON.parse(backup);
      }
    } catch (e) {
      // ignore
    }

    // Save default
    const newProfile = { ...DEFAULT_LEARNER_PROFILE, scientistId: generateAnonymousId() };
    await this.saveProfile(newProfile);
    return newProfile;
  }

  async saveProfile(profile: LearnerProfile): Promise<void> {
    const updated = { ...profile, lastActive: new Date().toISOString() };
    try {
      const store = await this.getStore("profile", "readwrite");
      if (store) {
        store.put({ key: "current_learner", value: updated });
      }
    } catch (e) {
      console.warn("IndexedDB saveProfile failed", e);
    }

    try {
      localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY + "_profile", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }
  }

  // PROGRESS
  async getCompletedModules(): Promise<string[]> {
    try {
      const store = await this.getStore("progress", "readonly");
      if (store) {
        const req = store.getAll();
        const res = await new Promise<{ moduleId: string; completedAt: string }[]>((resolve) => {
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
        if (res.length > 0) {
          return res.map((r) => r.moduleId);
        }
      }
    } catch (e) {
      console.warn("IndexedDB getCompletedModules failed", e);
    }

    try {
      const backup = localStorage.getItem("scienceOfOurWorld.v1");
      if (backup) {
        const parsed = JSON.parse(backup);
        if (Array.isArray(parsed.completed)) return parsed.completed;
      }
    } catch (e) {
      // ignore
    }

    return [];
  }

  async markModuleComplete(moduleId: string): Promise<void> {
    try {
      const store = await this.getStore("progress", "readwrite");
      if (store) {
        store.put({ moduleId, completedAt: new Date().toISOString() });
      }
    } catch (e) {
      console.warn("IndexedDB markModuleComplete failed", e);
    }

    // Also backup in localStorage
    try {
      const current = await this.getCompletedModules();
      if (!current.includes(moduleId)) {
        const updated = [...current, moduleId];
        localStorage.setItem("scienceOfOurWorld.v1", JSON.stringify({ completed: updated }));
      }
    } catch (e) {
      // ignore
    }

    // Add to sync queue
    await this.addToSyncQueue("COMPLETE_MODULE", { moduleId, completedAt: new Date().toISOString() });
  }

  async resetProgress(): Promise<void> {
    try {
      const store = await this.getStore("progress", "readwrite");
      if (store) store.clear();
      const journalStore = await this.getStore("journal", "readwrite");
      if (journalStore) journalStore.clear();
      const quizStore = await this.getStore("quizzes", "readwrite");
      if (quizStore) quizStore.clear();
      const detectiveStore = await this.getStore("detectives", "readwrite");
      if (detectiveStore) detectiveStore.clear();
    } catch (e) {
      console.warn("IndexedDB resetProgress failed", e);
    }

    try {
      localStorage.removeItem("scienceOfOurWorld.v1");
      localStorage.removeItem(LOCAL_STORAGE_BACKUP_KEY + "_profile");
      localStorage.removeItem("scienceOfOurWorld_journal_v1");
    } catch (e) {
      // ignore
    }
  }

  async clearAllData(): Promise<void> {
    await this.resetProgress();
    try {
      const profileStore = await this.getStore("profile", "readwrite");
      if (profileStore) profileStore.clear();
      const syncStore = await this.getStore("syncQueue", "readwrite");
      if (syncStore) syncStore.clear();
    } catch (e) {
      console.warn("IndexedDB clearAllData failed", e);
    }
  }

  // JOURNAL ENTRIES
  async getJournalEntries(): Promise<JournalEntry[]> {
    try {
      const store = await this.getStore("journal", "readonly");
      if (store) {
        const req = store.getAll();
        const res = await new Promise<JournalEntry[]>((resolve) => {
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
        if (res.length > 0) return res;
      }
    } catch (e) {
      console.warn("IndexedDB getJournalEntries failed", e);
    }

    try {
      const backup = localStorage.getItem("scienceOfOurWorld_journal_v1");
      if (backup) {
        return JSON.parse(backup);
      }
    } catch (e) {
      // ignore
    }

    return [];
  }

  async saveJournalEntry(entry: JournalEntry): Promise<void> {
    try {
      const store = await this.getStore("journal", "readwrite");
      if (store) {
        store.put(entry);
      }
    } catch (e) {
      console.warn("IndexedDB saveJournalEntry failed", e);
    }

    try {
      const current = await this.getJournalEntries();
      const exists = current.some((e) => e.id === entry.id);
      const updated = exists ? current.map((e) => (e.id === entry.id ? entry : e)) : [entry, ...current];
      localStorage.setItem("scienceOfOurWorld_journal_v1", JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    await this.addToSyncQueue("LOG_JOURNAL", entry);
  }

  // SYNC QUEUE
  async addToSyncQueue(action: SyncQueueItem["action"], payload: any): Promise<void> {
    const item: SyncQueueItem = {
      id: "sync_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      action,
      payload,
      timestamp: Date.now(),
      synced: false,
    };

    try {
      const store = await this.getStore("syncQueue", "readwrite");
      if (store) {
        store.put(item);
      }
    } catch (e) {
      console.warn("Failed to add to syncQueue in IndexedDB", e);
    }
  }

  async getPendingSyncCount(): Promise<number> {
    try {
      const store = await this.getStore("syncQueue", "readonly");
      if (store) {
        const req = store.getAll();
        const items = await new Promise<SyncQueueItem[]>((resolve) => {
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        });
        return items.filter((i) => !i.synced).length;
      }
    } catch (e) {
      // ignore
    }
    return 0;
  }

  // EXPORT / BACKUP JSON
  async exportFullData(): Promise<AppStateExport> {
    const profile = await this.getProfile();
    const completedModules = await this.getCompletedModules();
    const journalEntries = await this.getJournalEntries();

    return {
      version: 1,
      profile,
      completedModules,
      journalEntries,
      quizRecords: [],
      detectiveRecords: [],
      capstoneCompleted: completedModules.includes("capstone"),
      timestamp: new Date().toISOString(),
    };
  }

  async importFullData(data: AppStateExport): Promise<boolean> {
    try {
      if (data.profile) {
        await this.saveProfile(data.profile);
      }
      if (Array.isArray(data.completedModules)) {
        for (const mod of data.completedModules) {
          await this.markModuleComplete(mod);
        }
      }
      if (Array.isArray(data.journalEntries)) {
        for (const j of data.journalEntries) {
          await this.saveJournalEntry(j);
        }
      }
      return true;
    } catch (e) {
      console.error("Failed to import data", e);
      return false;
    }
  }
}

export const storage = new IndexedDBStorageService();
