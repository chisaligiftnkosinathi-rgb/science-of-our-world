import React, { createContext, useContext, useState, useEffect } from "react";
import { storage, LearnerProfile, DEFAULT_LEARNER_PROFILE, AppStateExport } from "../services/storage";
import { AppLanguage, UI_I18N } from "../data/i18nData";
import { ModuleId, JournalEntry } from "../types";
import { authService, ParentSession } from "../services/authService";

interface LearnerContextType {
  profile: LearnerProfile;
  updateProfile: (updates: Partial<LearnerProfile>) => Promise<void>;
  completedModules: string[];
  markModuleComplete: (id: string) => Promise<void>;
  resetProgress: () => Promise<void>;
  journalEntries: JournalEntry[];
  saveJournalEntry: (entry: JournalEntry) => Promise<void>;
  isOnline: boolean;
  pendingSyncCount: number;
  installApp: () => Promise<void>;
  canInstall: boolean;
  exportBackup: () => Promise<AppStateExport>;
  importBackup: (data: AppStateExport) => Promise<boolean>;
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  t: (key: string) => string;
  parentSession: ParentSession | null;
  signOutParent: () => Promise<void>;
  setParentSession: (session: ParentSession | null) => void;
}

const LearnerContext = createContext<LearnerContextType | undefined>(undefined);

export const LearnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<LearnerProfile>(DEFAULT_LEARNER_PROFILE);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState<boolean>(false);
  const [language, setLanguageState] = useState<AppLanguage>("en");
  const [parentSession, setParentSession] = useState<ParentSession | null>(null);

  // Load from IndexedDB on mount
  useEffect(() => {
    async function loadData() {
      const p = await storage.getProfile();
      setProfile(p);
      setLanguageState(p.language || "en");

      const mods = await storage.getCompletedModules();
      setCompletedModules(mods);

      const j = await storage.getJournalEntries();
      setJournalEntries(j);

      const count = await storage.getPendingSyncCount();
      setPendingSyncCount(count);
    }
    loadData();
  }, []);

  // Subscribe to Supabase Auth state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((session) => {
      setParentSession(session);
    });
    // Also check existing session on mount
    authService.getCurrentSession().then(setParentSession);
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  // Online / Offline Listeners
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      // Refresh sync count
      const count = await storage.getPendingSyncCount();
      setPendingSyncCount(count);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // PWA Install Prompt Listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") {
      setCanInstall(false);
    }
    setDeferredPrompt(null);
  };

  const updateProfile = async (updates: Partial<LearnerProfile>) => {
    const newProfile: LearnerProfile = { ...profile, ...updates };
    setProfile(newProfile);
    if (updates.language) {
      setLanguageState(updates.language);
    }
    await storage.saveProfile(newProfile);
  };

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    updateProfile({ language: lang });
  };

  const markModuleComplete = async (id: string) => {
    if (!completedModules.includes(id)) {
      const updated = [...completedModules, id];
      setCompletedModules(updated);
      await storage.markModuleComplete(id);
      const count = await storage.getPendingSyncCount();
      setPendingSyncCount(count);
    }
  };

  const resetProgress = async () => {
    await storage.resetProgress();
    setCompletedModules([]);
    setJournalEntries([]);
    const freshProfile = await storage.getProfile();
    setProfile(freshProfile);
    setPendingSyncCount(0);
  };

  const saveJournalEntry = async (entry: JournalEntry) => {
    await storage.saveJournalEntry(entry);
    const updated = await storage.getJournalEntries();
    setJournalEntries(updated);
    const count = await storage.getPendingSyncCount();
    setPendingSyncCount(count);
  };

  const exportBackup = async () => {
    return await storage.exportFullData();
  };

  const importBackup = async (data: AppStateExport) => {
    const success = await storage.importFullData(data);
    if (success) {
      const p = await storage.getProfile();
      setProfile(p);
      const mods = await storage.getCompletedModules();
      setCompletedModules(mods);
      const j = await storage.getJournalEntries();
      setJournalEntries(j);
    }
    return success;
  };

  const signOutParent = async () => {
    await authService.signOutParent();
    setParentSession(null);
  };

  const t = (key: string): string => {
    if (UI_I18N[key] && UI_I18N[key][language]) {
      return UI_I18N[key][language];
    }
    return key;
  };

  return (
    <LearnerContext.Provider
      value={{
        profile,
        updateProfile,
        completedModules,
        markModuleComplete,
        resetProgress,
        journalEntries,
        saveJournalEntry,
        isOnline,
        pendingSyncCount,
        installApp,
        canInstall,
        exportBackup,
        importBackup,
        language,
        setLanguage,
        t,
        parentSession,
        setParentSession,
        signOutParent,
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
};

export const useLearner = () => {
  const context = useContext(LearnerContext);
  if (!context) {
    throw new Error("useLearner must be used within a LearnerProvider");
  }
  return context;
};
