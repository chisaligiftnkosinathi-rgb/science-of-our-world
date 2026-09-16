import React, { useState, useRef } from "react";
import { useLearner } from "../../context/LearnerContext";
import {
  X,
  ShieldCheck,
  Download,
  Upload,
  Cloud,
  Wifi,
  WifiOff,
  User,
  Sparkles,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { AppLanguage } from "../../data/i18nData";

interface LearnerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATARS = ["🦁", "🌱", "🦅", "🔬", "🪐", "⚡", "🐘", "🔭", "🌍", "🪲"];

export const LearnerProfileModal: React.FC<LearnerProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    profile,
    updateProfile,
    isOnline,
    pendingSyncCount,
    exportBackup,
    importBackup,
    language,
    setLanguage,
  } = useLearner();

  const [nickname, setNickname] = useState(profile.nickname);
  const [gradeLevel, setGradeLevel] = useState(profile.gradeLevel);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [cloudConnectStep, setCloudConnectStep] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      nickname,
      gradeLevel,
      avatar,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExport = async () => {
    const data = await exportBackup();
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute(
      "download",
      `science_of_our_world_backup_${profile.scientistId}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = async (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          const success = await importBackup(parsed);
          if (success) {
            setSyncStatusMsg("Backup imported successfully!");
            setTimeout(() => setSyncStatusMsg(""), 3000);
          } else {
            setSyncStatusMsg("Failed to parse backup format.");
          }
        } catch (err) {
          setSyncStatusMsg("Invalid JSON file.");
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-blue-500/80 rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl text-white overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="text-3xl p-2 rounded-2xl bg-blue-950 border border-blue-700">
              {profile.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                  NEXUS SCIENCE™ • YOUNG SCIENTIST
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700">
                  {profile.scientistId}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {profile.nickname}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Privacy Guarantee Box */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-emerald-300 block">
                Local-First & Child-Safe Storage (IndexedDB)
              </span>
              <p className="text-slate-300 leading-relaxed">
                Your progress, experiments, and field journal are stored securely in your browser's IndexedDB. We never ask for your real name, email, or personal details to use 100% of this course.
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Choose Scientist Avatar
              </label>
              <div className="flex flex-wrap gap-2">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setAvatar(av)}
                    className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                      avatar === av
                        ? "bg-blue-600 border-blue-400 scale-110 shadow-md"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Scientist Nickname
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  maxLength={24}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Young Explorer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Grade / Phase
                </label>
                <select
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="Grade 4">Grade 4 (Intermediate Phase)</option>
                  <option value="Grade 5">Grade 5 (Intermediate Phase)</option>
                  <option value="Grade 6">Grade 6 (Intermediate Phase)</option>
                  <option value="Grade 7">Grade 7 (Senior Phase)</option>
                  <option value="Young Explorer">Young Explorer (Self-paced)</option>
                </select>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Preferred Language
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { code: "en", label: "English" },
                  { code: "zu", label: "isiZulu" },
                  { code: "ss", label: "siSwati" },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code as AppLanguage)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      language === lang.code
                        ? "bg-blue-600 border-blue-400 text-white"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Teacher / Parent Demo Mode Toggle */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">
                    Teacher / Parent Demo Mode
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Bypasses prerequisite locks for review. (Does not mutate genuine learner progress).
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newMode = !profile.teacherDemoMode;
                    updateProfile({ teacherDemoMode: newMode });
                  }}
                  className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer flex items-center shrink-0 ${
                    profile.teacherDemoMode ? "bg-cyan-600 justify-end" : "bg-slate-800 justify-start"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Profile Locally</span>
              </button>

              {saveSuccess && (
                <span className="text-xs font-bold text-emerald-400 animate-in fade-in">
                  ✓ Profile saved in IndexedDB!
                </span>
              )}
            </div>
          </form>

          {/* Offline & Sync Engine Status */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                Network & Sync Engine
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                {isOnline ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Wifi className="w-3.5 h-3.5" /> Online
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <WifiOff className="w-3.5 h-3.5" /> Offline Mode (Fully Operational)
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>Local Sync Queue:</span>
              <span className="font-mono text-slate-200">
                {pendingSyncCount === 0
                  ? "✓ Up-to-date (0 pending)"
                  : `${pendingSyncCount} changes queued`}
              </span>
            </div>

            {/* Cross-Device Cloud Sync Options */}
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleExport}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export Backup (JSON)</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span>Import Backup</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
              />
            </div>

            {syncStatusMsg && (
              <p className="text-xs text-emerald-400 font-bold">{syncStatusMsg}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
