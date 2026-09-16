import React from "react";
import {
  CheckCircle2,
  Circle,
  Sparkles,
  Award,
  ArrowRight,
  X,
  FlaskConical,
  Globe,
  BookOpen,
  MapPin,
  Wifi,
  WifiOff,
  User,
  Lock,
  Users,
  ShieldCheck,
} from "lucide-react";
import { ModuleId } from "../types";
import { COURSE_MODULES } from "../data/courseData";
import { useLearner } from "../context/LearnerContext";
import { getModuleUnlockState } from "../utils/progressionEngine";

interface SidebarProps {
  currentSection: ModuleId;
  completedModules: string[];
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: ModuleId) => void;
  onOpenProfile?: () => void;
  onOpenCaps?: () => void;
  onOpenParentDashboard?: () => void;
  onOpenLegal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  completedModules,
  isOpen,
  onClose,
  onNavigate,
  onOpenProfile,
  onOpenCaps,
  onOpenParentDashboard,
  onOpenLegal,
}) => {
  const { profile, isOnline, pendingSyncCount } = useLearner();
  const totalSteps = COURSE_MODULES.length;
  const completedCount = completedModules.length;
  const progressPercent = Math.min(
    100,
    Math.round((completedCount / totalSteps) * 100)
  );

  let motivationalText = "Welcome, young scientist! Begin your journey.";
  if (progressPercent > 0 && progressPercent < 35) {
    motivationalText = "Great start! Keep asking questions and exploring.";
  } else if (progressPercent >= 35 && progressPercent < 70) {
    motivationalText = "Impressive work! You're connecting how nature works.";
  } else if (progressPercent >= 70 && progressPercent < 100) {
    motivationalText = "Almost there! Complete the final concepts.";
  } else if (progressPercent === 100) {
    motivationalText = "🎉 Certified Young Scientist! Outstanding discovery!";
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        id="sidebar"
        className={`fixed top-16 bottom-0 left-0 w-72 bg-slate-900 border-r border-slate-800 z-40 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Learner Identity & Offline Status Card */}
        <div className="p-3 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 text-left hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <div className="text-2xl p-1 bg-slate-900 rounded-xl border border-slate-700">
              {profile.avatar}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate max-w-[130px]">
                {profile.nickname}
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                {profile.scientistId}
              </div>
            </div>
          </button>

          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
              isOnline
                ? "bg-emerald-950/60 border-emerald-800 text-emerald-300"
                : "bg-amber-950/60 border-amber-800 text-amber-300"
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-2.5 h-2.5 text-emerald-400" />
                <span>Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-2.5 h-2.5 text-amber-400" />
                <span>Offline</span>
              </>
            )}
          </div>
        </div>

        {/* Local South Africa & CAPS Quick Banners */}
        <div className="p-3 border-b border-slate-800 bg-slate-950/30 space-y-1.5">
          <button
            onClick={() => {
              const el = document.getElementById("sa-science");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              onClose();
            }}
            className="w-full px-3 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span>🇿🇦</span>
              <span>Mzansi Ecosystems</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">LOCAL</span>
          </button>

          {onOpenCaps && (
            <button
              onClick={() => {
                onOpenCaps();
                onClose();
              }}
              className="w-full px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-750 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>CAPS Curriculum Map</span>
              </div>
              <span className="text-[10px] text-blue-300 font-mono">Gr 4-7</span>
            </button>
          )}

          {onOpenParentDashboard && (
            <button
              onClick={() => {
                onOpenParentDashboard();
                onClose();
              }}
              className="w-full px-3 py-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/60 text-indigo-300 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>Parent & Educator Hub</span>
              </div>
              <span className="text-[10px] text-indigo-300 font-mono">GOVERN</span>
            </button>
          )}

          {onOpenLegal && (
            <button
              onClick={() => {
                onOpenLegal();
                onClose();
              }}
              className="w-full px-3 py-1 rounded-xl bg-slate-950/50 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Legal & POPIA Notice</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">v1.0</span>
            </button>
          )}
        </div>

        {/* Course Progress Card */}
        <div className="p-3.5 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Course Mastery
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-500/30">
              {progressPercent}%
            </span>
          </div>

          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-1.5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-teal-400 to-cyan-300 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-[10px] text-slate-400 leading-tight">
            {motivationalText}
          </p>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 py-1">
            Curriculum Map
          </div>

          {COURSE_MODULES.map((module) => {
            const isActive = currentSection === module.id;
            const { status, isUnlocked } = getModuleUnlockState(
              module.id,
              completedModules,
              profile.teacherDemoMode
            );
            const isCompleted = status === "MASTERED";

            return (
              <button
                key={module.id}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    onNavigate(module.id);
                    onClose();
                  }
                }}
                title={
                  !isUnlocked
                    ? `🔒 Complete prerequisite lesson to unlock ${module.shortTitle}`
                    : module.title
                }
                className={`w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 transition-all text-xs font-medium ${
                  !isUnlocked
                    ? "opacity-50 cursor-not-allowed bg-slate-950/40 border border-slate-800/50 text-slate-500"
                    : isActive
                    ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/30 cursor-pointer"
                    : "text-slate-300 hover:bg-slate-800/70 hover:text-slate-100 cursor-pointer"
                }`}
              >
                {/* Module Number or Icon */}
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0 font-bold ${
                    !isUnlocked
                      ? "bg-slate-900 text-slate-600 border border-slate-800"
                      : isActive
                      ? "bg-white/20 text-white"
                      : isCompleted
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800/60"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {!isUnlocked ? "🔒" : module.number === "00" ? "★" : module.number}
                </span>

                <span className="text-base shrink-0">{module.icon}</span>

                <div className="flex-1 truncate">
                  <div className="truncate leading-snug font-semibold">{module.shortTitle}</div>
                  <div
                    className={`text-[10px] truncate ${
                      !isUnlocked
                        ? "text-slate-600 font-mono"
                        : isActive
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {!isUnlocked ? "LOCKED" : module.category}
                  </div>
                </div>

                {isCompleted ? (
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-white" : "text-emerald-400"
                    }`}
                  />
                ) : !isUnlocked ? (
                  <Lock className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                ) : (
                  <Circle
                    className={`w-3.5 h-3.5 shrink-0 opacity-40 ${
                      isActive ? "text-white" : "text-slate-500"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-slate-400 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-slate-200">
              <FlaskConical className="w-3.5 h-3.5 text-cyan-400" />
              Nexus Science™
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">PWA Offline</span>
          </div>
          <div className="text-[10px] text-slate-500 truncate">
            Global IT and Business Solutions (Pty) Ltd.
          </div>
        </div>
      </aside>
    </>
  );
};
