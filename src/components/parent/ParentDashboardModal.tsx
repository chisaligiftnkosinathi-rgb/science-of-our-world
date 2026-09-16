import React, { useState } from "react";
import {
  Users,
  Award,
  BookOpen,
  CheckCircle2,
  Download,
  Upload,
  ShieldCheck,
  Brain,
  FlaskConical,
  X,
  FileText,
  Lock,
  UserCheck,
  TrendingUp,
  Trash2,
} from "lucide-react";
import { useLearner } from "../../context/LearnerContext";
import { analyticsService } from "../../services/analyticsService";
import { syncEngine } from "../../services/syncEngine";
import { COURSE_MODULES } from "../../data/courseData";

interface ParentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLegal: () => void;
}

export const ParentDashboardModal: React.FC<ParentDashboardModalProps> = ({
  isOpen,
  onClose,
  onOpenLegal,
}) => {
  const { profile, updateProfile, completedModules, exportData, importData } = useLearner();
  const [activeTab, setActiveTab] = useState<"overview" | "profiles" | "reports" | "account">("overview");
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalLessons = COURSE_MODULES.length;
  const completedCount = completedModules.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));
  const analyticsSummary = analyticsService.getEventsSummary();

  const handleModeSwitch = async (newMode: "guest" | "parent" | "teacher") => {
    await updateProfile({ accountMode: newMode });
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const text = evt.target?.result as string;
        const success = await importData(text);
        if (success) {
          setImportStatus("✓ Progress data imported successfully!");
        } else {
          setImportStatus("⚠️ Failed to parse import file.");
        }
      };
      reader.readAsText(file);
    } catch {
      setImportStatus("⚠️ Error reading import file.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-white overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-950 border border-indigo-800 text-indigo-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
                  PARENT & EDUCATOR GOVERNANCE HUB
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  ID: {profile.scientistId}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Nexus Science™ Parent Dashboard
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Account Ladder Switcher Bar */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-bold text-slate-300">
            Current Operating Identity Mode:
          </div>
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => handleModeSwitch("guest")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                profile.accountMode === "guest"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🟢 Guest Learner
            </button>
            <button
              onClick={() => handleModeSwitch("parent")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                profile.accountMode === "parent"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🔵 Parent Account
            </button>
            <button
              onClick={() => handleModeSwitch("teacher")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                profile.accountMode === "teacher"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🟣 Teacher / School
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-2 gap-2">
          {[
            { id: "overview", label: "Learning Analytics & Progress", icon: TrendingUp },
            { id: "profiles", label: "Child Profiles & Consent", icon: UserCheck },
            { id: "reports", label: "Report Cards & Data Export", icon: Download },
            { id: "account", label: "Legal Trust & POPIA Status", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 custom-scrollbar">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Learner Card Summary */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl p-3 bg-slate-900 rounded-2xl border border-slate-700">
                    {profile.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-white">{profile.nickname}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950 text-cyan-300 border border-blue-800 font-mono font-bold">
                        {profile.gradeLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Anonymous Scientist Code: <code>{profile.scientistId}</code> • Device Installation ID: <code>{profile.installationId}</code>
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-auto bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center gap-6">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Course Mastery
                    </span>
                    <span className="text-2xl font-black text-cyan-300">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-px h-8 bg-slate-800" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                      Lessons Mastered
                    </span>
                    <span className="text-2xl font-black text-emerald-400">
                      {completedCount} / {totalLessons}
                    </span>
                  </div>
                </div>
              </div>

              {/* Educational Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Telemetry Events Tracked
                  </span>
                  <div className="text-2xl font-black text-white">{analyticsSummary.totalEvents}</div>
                  <p className="text-[11px] text-slate-500">Anonymous educational milestones recorded locally.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Quizzes & Assessments
                  </span>
                  <div className="text-2xl font-black text-cyan-400">{analyticsSummary.quizzesCount}</div>
                  <p className="text-[11px] text-slate-500">Concept verification trials completed.</p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Virtual Lab Experiments
                  </span>
                  <div className="text-2xl font-black text-emerald-400">{analyticsSummary.experimentsCount}</div>
                  <p className="text-[11px] text-slate-500">Interactive simulations executed.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "profiles" && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-white">
                🧒 Child Profiles & Parent Governance
              </h3>
              <p className="text-xs text-slate-400">
                Under South Africa's POPIA framework, child learning profiles are isolated from commercial tracking and managed under parent consent.
              </p>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Active Learner Profile: {profile.nickname}</span>
                    <span className="text-[11px] text-slate-400">Grade Level: {profile.gradeLevel} • Language: {profile.language.toUpperCase()}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
                    ✓ Active Profile
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h3 className="text-base font-black text-white">
                📊 Report Cards & Local Data Export
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                    Export Full Progress JSON
                  </h4>
                  <p className="text-xs text-slate-400">
                    Download complete encrypted backup of learner progress, journal entries, and certificates for backup or device transfer.
                  </p>
                  <button
                    onClick={exportData}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Progress Backup</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                    Import Backup File
                  </h4>
                  <p className="text-xs text-slate-400">
                    Restore previously saved progress data onto this device.
                  </p>
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Choose Backup File</span>
                    <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                  </label>
                  {importStatus && <div className="text-xs font-bold text-cyan-400 mt-2">{importStatus}</div>}
                </div>

                {/* POPIA Data Subject Right: Permanent Account & Learner Data Deletion */}
                <div className="sm:col-span-2 p-5 rounded-2xl bg-rose-950/40 border border-rose-800/80 space-y-3">
                  <h4 className="font-bold text-rose-300 text-xs uppercase tracking-wider flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    <span>POPIA Data Subject Right: Permanent Account & Data Deletion</span>
                  </h4>
                  <p className="text-xs text-rose-200/80">
                    Completely purge all learner profiles, local IndexedDB progress stores, journal logs, and offline sync queues from this device and remote storage.
                  </p>
                  <button
                    onClick={async () => {
                      if (window.confirm("⚠️ Are you sure you want to PERMANENTLY PURGE all learner data, profiles, and sync queues? This action is irreversible.")) {
                        await syncEngine.purgeAllAccountData();
                        window.location.reload();
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Purge & Delete All Learner Data</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "account" && (
            <div className="space-y-4">
              <h3 className="text-base font-black text-white">
                🛡️ Privacy Safeguards & Consent Status (POPIA Aligned)
              </h3>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">POPIA Data Safeguards</span>
                    <span className="text-[11px] text-slate-400">Designed with POPIA-aligned privacy principles and child-data safeguards</span>
                  </div>
                  <button
                    onClick={onOpenLegal}
                    className="px-4 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Open Legal Center</span>
                  </button>
                </div>

                {profile.legalAcceptance ? (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold">
                    ✓ Terms 1.0 & POPIA Privacy Policy accepted on {new Date(profile.legalAcceptance.acceptedAt).toLocaleDateString()} by {profile.legalAcceptance.acceptedByRole}.
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-semibold">
                    ⚠️ Parent / Guardian consent pending for version 1.0. Please open Legal Center to accept.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-400">
            Publisher: <strong>Global IT and Business Solutions (Pty) Ltd.</strong>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
