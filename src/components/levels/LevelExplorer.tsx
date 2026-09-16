import React, { useState } from "react";
import { Sparkles, Compass, CheckCircle2, ArrowRight, BookOpen, Layers, FlaskConical, Play, Lock } from "lucide-react";
import { MasteryLevel, ModuleId } from "../../types";
import { useLearner } from "../../context/LearnerContext";
import { getModuleUnlockState } from "../../utils/progressionEngine";

interface LevelExplorerProps {
  onNavigateTo: (id: ModuleId) => void;
}

export const LevelExplorer: React.FC<LevelExplorerProps> = ({ onNavigateTo }) => {
  const { completedModules, profile } = useLearner();
  const [activeLevel, setActiveLevel] = useState<MasteryLevel>("discover");

  const levels = [
    {
      id: "discover" as MasteryLevel,
      color: "blue",
      badge: "🔵 Level 1 — Discover",
      ageRange: "Ages 8–10",
      tagline: "Core Foundations & Everyday Language",
      description: "Start with simple, intuitive questions about how the world around you works.",
      topics: [
        "What is a system? (Parts working as a team)",
        "What is matter? (Stuff you can touch and feel)",
        "What is energy? (The power to move and change things)",
        "What is life? (Organisms that grow and reproduce)",
        "What is a force? (A push or a pull)",
        "What is planet Earth? (Our living home in space)",
      ],
      actionLabel: "Explore Level 1 Lessons",
      target: "systems" as ModuleId,
    },
    {
      id: "explore" as MasteryLevel,
      color: "emerald",
      badge: "🟢 Level 2 — Explore",
      ageRange: "Ages 9–11",
      tagline: "Deeper Mechanisms & Scientific Concepts",
      description: "Look closer at the invisible mechanisms and molecular structures governing nature.",
      topics: [
        "Atoms & Molecules (The universal building blocks)",
        "Cells & Organs (Trillions of microscopic factories)",
        "Trophic Food Webs (Solar energy transfer across biomes)",
        "Chemical Reactions (Rearranging reactant atoms into products)",
        "Thermodynamic Heat Transfer (Kinetic vs Potential energy)",
        "Electric Closed Circuits (Electron current and power)",
      ],
      actionLabel: "Explore Level 2 Concepts",
      target: "matter" as ModuleId,
    },
    {
      id: "explain" as MasteryLevel,
      color: "amber",
      badge: "🟠 Level 3 — Explain & Investigate",
      ageRange: "Ages 10+",
      tagline: "Forensic Science & Measurement Uncertainty",
      description: "Master real scientific reasoning: collect sensor evidence, calculate averages with measurement error bounds, and diagnose collapsed systems.",
      topics: [
        "Scientific Detective Mode (Investigate mystery ecological collapses)",
        "Measurement Uncertainty & Error Margins (Why scientists repeat trials)",
        "Independent, Dependent & Control Variables",
        "Empirical Sensor Telemetry & Confidence Bounds",
        "Scientific Models vs Explanatory Theories vs Physical Laws",
        "Evaluating Hypotheses Against Quantitative Data",
      ],
      actionLabel: "Launch Detective Mode",
      target: "detective" as ModuleId,
    },
    {
      id: "build" as MasteryLevel,
      color: "purple",
      badge: "🔴 Level 4 — Build & Defend",
      ageRange: "All Ages",
      tagline: "World Building & Grand Capstone Defense",
      description: "Put universal systems thinking into action: balance planetary biospheres, break and repair ecological loops, and graduate through peer-reviewed defense.",
      topics: [
        "Planetary World Builder (Solar flux, water, atmosphere, lithosphere, trophic life)",
        "Predicting Carrying Capacity & Predator-Prey Feedback Cycles",
        "Testing Cascading Feedback Loops & Ecological Resilience",
        "The Young Scientist Capstone Defense (Alien vent system investigation)",
        "Official Young Scientist Graduation Diploma",
      ],
      actionLabel: "Launch Capstone Defense",
      target: "capstone" as ModuleId,
    },
  ];

  const current = levels.find((l) => l.id === activeLevel) || levels[0];
  const targetGate = getModuleUnlockState(current.target, completedModules, profile.teacherDemoMode);

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>4-Tier Mastery Progression</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              🎓 Choose Your Learning Path
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              From intuitive everyday discovery to deep atomic explanations and live system construction:
            </p>
          </div>
        </div>

        {/* Level Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {levels.map((lvl) => {
            const isSelected = activeLevel === lvl.id;
            const gate = getModuleUnlockState(lvl.target, completedModules, profile.teacherDemoMode);
            return (
              <button
                key={lvl.id}
                onClick={() => setActiveLevel(lvl.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-800 shadow-md ring-2 ring-indigo-500 scale-[1.02]"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800"
                }`}
              >
                <div className="font-extrabold text-xs mb-1 flex items-center justify-between">
                  <span>{lvl.badge}</span>
                  {!gate.isUnlocked && <span className="text-amber-500 font-mono text-[10px]">🔒 Locked</span>}
                </div>
                <div
                  className={`text-[11px] font-medium leading-tight ${
                    isSelected ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {lvl.ageRange} • {lvl.tagline.split("&")[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Level Display */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row justify-between gap-6 items-start">
          <div className="space-y-4 max-w-xl">
            <div>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200 uppercase tracking-wider">
                {current.badge}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                {current.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Topics Covered */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Core Conceptual Milestones:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {current.topics.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="shrink-0 w-full md:w-auto self-stretch md:self-center flex flex-col justify-center">
            <button
              onClick={() => onNavigateTo(current.target)}
              className={`w-full md:w-auto px-6 py-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                !targetGate.isUnlocked
                  ? "bg-slate-800 text-slate-300 hover:bg-slate-750"
                  : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {!targetGate.isUnlocked ? (
                <>
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>{current.actionLabel} (Locked 🔒)</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  <span>{current.actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
