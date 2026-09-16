import React, { useState } from "react";
import {
  Menu,
  RotateCcw,
  Award,
  Sparkles,
  BookOpen,
  Compass,
  Wifi,
  WifiOff,
  User,
  Download,
  Languages,
  Lock,
  Users,
  ShieldCheck,
  LogIn,
  LogOut,
  CheckCircle2,
} from "lucide-react";
import { ModuleId } from "../types";
import { COURSE_MODULES } from "../data/courseData";
import { useLearner } from "../context/LearnerContext";
import { AppLanguage } from "../data/i18nData";
import { getModuleUnlockState } from "../utils/progressionEngine";
import { ParentSession } from "../services/authService";

interface HeaderProps {
  completedModules: string[];
  totalModulesCount: number;
  currentSection: ModuleId;
  onNavigate: (id: ModuleId) => void;
  onToggleSidebar: () => void;
  onResetProgress: () => void;
  onOpenProfile?: () => void;
  onOpenCaps?: () => void;
  onOpenParentDashboard?: () => void;
  onOpenLegal?: () => void;
  onOpenAuth?: () => void;
  parentSession?: ParentSession | null;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedModules,
  totalModulesCount,
  currentSection,
  onNavigate,
  onToggleSidebar,
  onResetProgress,
  onOpenProfile,
  onOpenCaps,
  onOpenParentDashboard,
  onOpenLegal,
  onOpenAuth,
  parentSession,
  onSignOut,
}) => {
  const { profile, isOnline, pendingSyncCount, canInstall, installApp, language, setLanguage, t } =
    useLearner();

  const progressPercent = Math.min(
    100,
    Math.round((completedModules.length / totalModulesCount) * 100)
  );

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white flex items-center justify-between px-3 sm:px-6 lg:px-8 shadow-sm">
      {/* Left: Mobile Toggle & Brand */}
      <div className="flex items-center gap-3">
        <button
          id="menuButton"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
          className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors lg:hidden border border-slate-700"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0">
            🧬
          </div>
          <div>
            <div className="font-black tracking-tight text-slate-100 leading-tight text-xs sm:text-sm md:text-base flex items-center gap-1.5">
              <span>Nexus Science™</span>
              <span className="hidden sm:inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                🇿🇦 Mzansi
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium hidden md:block">
              Science of Our World
            </div>
          </div>
        </button>
      </div>

      {/* Center: Quick Shortcuts */}
      <div className="hidden xl:flex items-center gap-2">
        {/* Local Science Shortcut */}
        <button
          onClick={() => {
            const el = document.getElementById("sa-science");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-700/70 hover:bg-emerald-900/80 transition-colors cursor-pointer"
        >
          <span>🇿🇦</span>
          <span>Local Science</span>
        </button>

        {/* CAPS Curriculum Button */}
        <button
          onClick={onOpenCaps}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800/90 text-slate-200 border border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>CAPS Map</span>
        </button>

        {/* Lab Workbench Shortcut */}
        <button
          disabled={!getModuleUnlockState("laboratory", completedModules, profile.teacherDemoMode).isUnlocked}
          onClick={() => onNavigate("laboratory")}
          className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
            !getModuleUnlockState("laboratory", completedModules, profile.teacherDemoMode).isUnlocked
              ? "opacity-50 cursor-not-allowed bg-slate-900 text-slate-500 border border-slate-800"
              : "bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900/60 cursor-pointer"
          }`}
        >
          {!getModuleUnlockState("laboratory", completedModules, profile.teacherDemoMode).isUnlocked ? (
            <Lock className="w-3.5 h-3.5 text-slate-500" />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          )}
          <span>Lab Workbench</span>
        </button>

        {/* Final Challenge Shortcut */}
        <button
          disabled={!getModuleUnlockState("challenge", completedModules, profile.teacherDemoMode).isUnlocked}
          onClick={() => onNavigate("challenge")}
          className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors ${
            !getModuleUnlockState("challenge", completedModules, profile.teacherDemoMode).isUnlocked
              ? "opacity-50 cursor-not-allowed bg-slate-900 text-slate-500 border border-slate-800"
              : "bg-amber-950/70 text-amber-300 border border-amber-800/60 hover:bg-amber-900/60 cursor-pointer"
          }`}
        >
          {!getModuleUnlockState("challenge", completedModules, profile.teacherDemoMode).isUnlocked ? (
            <Lock className="w-3.5 h-3.5 text-slate-500" />
          ) : (
            <Award className="w-3.5 h-3.5 text-amber-400" />
          )}
          <span>Challenge</span>
        </button>
      </div>

      {/* Right: Language, PWA, Offline Status, Profile & Progress */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Switcher Pill */}
        <div className="relative flex items-center bg-slate-800/90 rounded-lg border border-slate-700 px-1 py-0.5">
          <Languages className="w-3 h-3 text-slate-400 ml-1.5 mr-0.5" />
          <select
            aria-label="Language selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value as AppLanguage)}
            className="appearance-none bg-transparent text-[11px] font-bold text-slate-200 py-1 pl-1 pr-3 focus:outline-none cursor-pointer"
          >
            <option value="en" className="bg-slate-900 text-white">EN</option>
            <option value="zu" className="bg-slate-900 text-white">isiZulu</option>
            <option value="ss" className="bg-slate-900 text-white">siSwati</option>
          </select>
        </div>

        {/* PWA Install Button (shows when installable) */}
        {canInstall && (
          <button
            onClick={installApp}
            className="hidden sm:flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors cursor-pointer animate-pulse"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
        )}

        {/* Online / Offline Status Badge */}
        <div
          title={isOnline ? "Connected & Synchronized" : "Working Offline (Saved in IndexedDB)"}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${
            isOnline
              ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
              : "bg-amber-950/60 border-amber-800 text-amber-300"
          }`}
        >
          {isOnline ? (
            <>
              <Wifi className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Online</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">Offline</span>
            </>
          )}
        </div>

        {/* Progress Mini Bar */}
        <div className="hidden md:flex items-center gap-2 bg-slate-800/90 px-2.5 py-1 rounded-full border border-slate-700">
          <span className="text-xs text-slate-400 font-medium">Progress</span>
          <div className="w-12 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-cyan-300 min-w-[24px] text-right">
            {progressPercent}%
          </span>
        </div>

        {/* Scientist Profile Button */}
        <button
          onClick={onOpenProfile}
          title={`Scientist Profile (${profile.scientistId})`}
          className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded-xl cursor-pointer transition-colors"
        >
          <span className="text-base">{profile.avatar}</span>
          <span className="text-xs font-bold text-slate-200 hidden lg:inline max-w-[80px] truncate">
            {profile.nickname}
          </span>
        </button>

        {/* Parent Area / Auth Button */}
        {parentSession ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenParentDashboard}
              title={`Signed in as ${parentSession.email}`}
              className="flex items-center gap-1.5 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-600/80 px-2.5 py-1 rounded-xl text-indigo-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline max-w-[100px] truncate">{parentSession.email.split("@")[0]}</span>
            </button>
            <button
              onClick={onSignOut}
              title="Sign out of Parent Account"
              className="p-1.5 rounded-xl bg-slate-800/90 hover:bg-rose-950/60 border border-slate-700 hover:border-rose-800 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            title="Sign in to your Parent Account"
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1 rounded-xl text-white text-xs font-bold shadow-md shadow-indigo-900/40 transition-colors cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Parent Sign In</span>
          </button>
        )}

        {/* Legal Trust Center Button */}
        {onOpenLegal && (
          <button
            onClick={onOpenLegal}
            title="Legal Trust & POPIA Privacy Center"
            className="flex items-center gap-1 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 p-1.5 rounded-xl text-slate-300 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        )}

        {/* Reset Course Progress Button */}
        <button
          onClick={onResetProgress}
          title="Reset your course progress"
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 p-1.5 rounded-lg border border-transparent hover:border-rose-900/50 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
