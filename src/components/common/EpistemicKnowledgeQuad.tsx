import React from "react";
import { Eye, HelpCircle, Brain, Compass, Lightbulb, Sparkles } from "lucide-react";

export interface KnowledgeQuadProps {
  title?: string;
  observed: string[];
  inferred: string[];
  modelled: string[];
  unknown: string[];
}

export const EpistemicKnowledgeQuad: React.FC<KnowledgeQuadProps> = ({
  title = "Epistemological Synthesis: What Do You Actually Know?",
  observed,
  inferred,
  modelled,
  unknown,
}) => {
  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-900/70 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
            <Compass className="w-4 h-4" />
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
            {title}
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Epistemic Truth Sieve</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. OBSERVED */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <Eye className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">🟢 OBSERVED</span>
          </div>
          <p className="text-[10px] text-emerald-300/80 font-medium">
            What was directly measured, witnessed, or detected by sensors?
          </p>
          <ul className="space-y-1.5 pt-1">
            {observed.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-200 leading-snug flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. INFERRED */}
        <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/80 space-y-2">
          <div className="flex items-center gap-1.5 text-blue-400">
            <Lightbulb className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">🔵 INFERRED</span>
          </div>
          <p className="text-[10px] text-blue-300/80 font-medium">
            What does the empirical evidence suggest happened?
          </p>
          <ul className="space-y-1.5 pt-1">
            {inferred.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-200 leading-snug flex items-start gap-1.5">
                <span className="text-blue-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. MODELLED */}
        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Brain className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">🟠 MODELLED</span>
          </div>
          <p className="text-[10px] text-amber-300/80 font-medium">
            What does our conceptual / mathematical model predict?
          </p>
          <ul className="space-y-1.5 pt-1">
            {modelled.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-200 leading-snug flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. UNKNOWN */}
        <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/80 space-y-2">
          <div className="flex items-center gap-1.5 text-purple-400">
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">🟣 UNKNOWN</span>
          </div>
          <p className="text-[10px] text-purple-300/80 font-medium">
            What don't we know yet? (Future scientific investigations)
          </p>
          <ul className="space-y-1.5 pt-1">
            {unknown.map((item, idx) => (
              <li key={idx} className="text-xs text-slate-200 leading-snug flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
