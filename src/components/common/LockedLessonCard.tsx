import React from "react";
import { Lock, ArrowRight, ShieldAlert, BookOpen } from "lucide-react";
import { ModuleId } from "../../types";

interface LockedLessonCardProps {
  moduleId: ModuleId;
  title: string;
  category: string;
  prerequisiteTitle?: string | null;
  prerequisiteId?: ModuleId | null;
  unlockRequirementText?: string;
  onNavigateToPrerequisite: (prereqId: ModuleId) => void;
}

export const LockedLessonCard: React.FC<LockedLessonCardProps> = ({
  title,
  category,
  prerequisiteTitle,
  prerequisiteId,
  unlockRequirementText,
  onNavigateToPrerequisite,
}) => {
  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl text-white my-6 max-w-4xl mx-auto animate-in fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-amber-950/80 border border-amber-600/80 text-amber-400 text-2xl shrink-0 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800">
                🔒 LOCKED CONTENT
              </span>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                {category}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {title}
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white font-bold block mb-1">
              Mastery Progression Prerequisite Required:
            </strong>
            {unlockRequirementText || `Complete and master the previous lesson to unlock this content.`}
          </div>
        </div>

        {prerequisiteId && prerequisiteTitle && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-950 border border-blue-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block mb-0.5">
                NEXT REQUIRED STEP
              </span>
              <div className="text-sm sm:text-base font-bold text-white">
                {prerequisiteTitle}
              </div>
            </div>

            <button
              onClick={() => onNavigateToPrerequisite(prerequisiteId)}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <BookOpen className="w-4 h-4" />
              <span>Jump to {prerequisiteTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
