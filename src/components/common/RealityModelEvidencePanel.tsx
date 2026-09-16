import React, { useState } from "react";
import {
  Globe2,
  Cpu,
  BarChart3,
  Lightbulb,
  Sparkles,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  X,
  Layers,
  ArrowRight,
  FlaskConical,
} from "lucide-react";
import { RealityModelEvidence } from "../../types";

interface Props {
  epistemology: RealityModelEvidence;
  topicTitle?: string;
  className?: string;
  defaultExpanded?: boolean;
}

export const RealityModelEvidencePanel: React.FC<Props> = ({
  epistemology,
  topicTitle = "This Scientific Simulation",
  className = "",
  defaultExpanded = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultExpanded);
  const [activePillar, setActivePillar] = useState<"reality" | "model" | "evidence" | "explanation">("reality");

  const pillars = [
    {
      id: "reality" as const,
      label: "The Real World",
      shortLabel: "1. The World",
      icon: "🟢",
      lucide: Globe2,
      tag: "REALITY (INFINITE COMPLEXITY)",
      color: "emerald",
      bgBorder: "border-emerald-300 bg-emerald-50/70 text-emerald-950",
      activeBadge: "bg-emerald-600 text-white",
      description: epistemology.reality,
      coreInsight: "What actually happens in nature — rich, vast, and containing countless interacting variables.",
    },
    {
      id: "model" as const,
      label: "The Scientific Model",
      shortLabel: "2. The Model",
      icon: "🔵",
      lucide: Cpu,
      tag: "SIMULATION / EQUATIONS",
      color: "blue",
      bgBorder: "border-blue-300 bg-blue-50/70 text-blue-950",
      activeBadge: "bg-blue-600 text-white",
      description: epistemology.model,
      coreInsight: "A simplified representation created by scientists to study cause-and-effect without being overwhelmed.",
    },
    {
      id: "evidence" as const,
      label: "Empirical Evidence",
      shortLabel: "3. Evidence",
      icon: "🟠",
      lucide: BarChart3,
      tag: "MEASUREMENTS & SENSORS",
      color: "amber",
      bgBorder: "border-amber-300 bg-amber-50/70 text-amber-950",
      activeBadge: "bg-amber-600 text-white",
      description: epistemology.evidence,
      coreInsight: "Real physical measurements and observational data that tell us if our model matches the world.",
    },
    {
      id: "explanation" as const,
      label: "Scientific Explanation",
      shortLabel: "4. Explanation",
      icon: "🔴",
      lucide: Lightbulb,
      tag: "THEORY & MECHANISM",
      color: "rose",
      bgBorder: "border-rose-300 bg-rose-50/70 text-rose-950",
      activeBadge: "bg-rose-600 text-white",
      description: epistemology.explanation,
      coreInsight: "Our fundamental understanding of WHY physical systems behave the way they do.",
    },
  ];

  const currentPillar = pillars.find((p) => p.id === activePillar) || pillars[0];

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs ${className}`}>
      {/* Header Button Toggle */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-lg">
            🔬
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300">
                SCIENTIFIC EPISTEMOLOGY
              </span>
              <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full font-bold">
                Crucial Habit
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-white">
              Reality ➔ Model ➔ Evidence ➔ Explanation
            </h4>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
        >
          <span>{isOpen ? "Collapse Inspector" : "Inspect Model vs Reality"}</span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-90" : ""}`} />
        </button>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="p-5 sm:p-6 space-y-6 bg-slate-50/50">
          {/* Epistemological Core Axiom */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium flex items-start gap-3">
            <span className="text-xl shrink-0">💡</span>
            <div>
              <strong className="text-amber-900 block font-bold mb-0.5">
                Golden Rule of Science: "The simulation is a model of reality, not reality itself."
              </strong>
              <span>
                Evidence helps scientists decide whether a model <strong>works well</strong>, <strong>needs improvement</strong>, or <strong>should be rejected</strong>. We always compare our model's predictions with real empirical measurements from nature.
              </span>
            </div>
          </div>

          {/* 4 Pillars Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {pillars.map((p) => {
              const isSelected = activePillar === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePillar(p.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? `${p.activeBadge} border-transparent shadow-md scale-[1.02]`
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm">{p.icon}</span>
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                    }`}>
                      {p.tag}
                    </span>
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm">{p.shortLabel}</div>
                </button>
              );
            })}
          </div>

          {/* Active Pillar Showcase */}
          <div className={`p-5 rounded-2xl border ${currentPillar.bgBorder} transition-all`}>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider mb-2">
              <span className="text-base">{currentPillar.icon}</span>
              <span>{currentPillar.label} for {topicTitle}</span>
            </div>

            <p className="text-xs sm:text-sm font-semibold leading-relaxed mb-3">
              {currentPillar.description}
            </p>

            <div className="p-3 rounded-xl bg-white/80 border border-slate-200 text-[11px] text-slate-700 font-medium">
              <strong>🔬 Scientific Principle:</strong> {currentPillar.coreInsight}
            </div>
          </div>

          {/* Why Simplify Section */}
          <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-900 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Why do scientists simplify the real world?</span>
            </div>
            <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
              {epistemology.whySimplify}
            </p>
          </div>

          {/* The Scientific Discovery Workflow Pipeline */}
          <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              THE SCIENTIFIC DISCOVERY LOOP
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[11px] text-center font-bold">
              <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300">
                1. REAL WORLD
                <span className="block text-[9px] font-normal text-emerald-400 mt-0.5">Observe Nature</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-950 border border-amber-700 text-amber-300">
                2. MEASURE
                <span className="block text-[9px] font-normal text-amber-400 mt-0.5">Collect Data</span>
              </div>
              <div className="p-2 rounded-lg bg-blue-950 border border-blue-700 text-blue-300">
                3. BUILD MODEL
                <span className="block text-[9px] font-normal text-blue-400 mt-0.5">Simplify Equations</span>
              </div>
              <div className="p-2 rounded-lg bg-purple-950 border border-purple-700 text-purple-300">
                4. SIMULATION
                <span className="block text-[9px] font-normal text-purple-400 mt-0.5">Run Predictions</span>
              </div>
              <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-300">
                5. TEST & COMPARE
                <span className="block text-[9px] font-normal text-cyan-400 mt-0.5">Model vs Evidence</span>
              </div>
              <div className="p-2 rounded-lg bg-rose-950 border border-rose-700 text-rose-300">
                6. EXPLAIN WHY
                <span className="block text-[9px] font-normal text-rose-400 mt-0.5">Refine Theory</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
