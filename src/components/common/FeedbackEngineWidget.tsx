import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, RotateCcw, AlertTriangle, ShieldCheck, Play, Pause } from "lucide-react";

export interface FeedbackCase {
  id: string;
  type: "negative" | "positive";
  title: string;
  icon: string;
  category: string;
  initialState: string;
  trigger: string;
  steps: string[];
  outcome: string;
  equilibriumTarget?: string;
  dangerAlert?: string;
}

export const FEEDBACK_CASES: FeedbackCase[] = [
  {
    id: "sweat",
    type: "negative",
    title: "Body Temperature Regulation (Homeostasis)",
    icon: "🏃‍♂️",
    category: "HUMAN BIOLOGY",
    initialState: "Body resting at normal 37.0°C (98.6°F)",
    trigger: "Child runs a sprint on a hot summer day (+1.5°C body heat)",
    steps: [
      "Brain hypothalamus detects elevated blood temperature",
      "Sweat glands secrete water and salt onto the skin surface",
      "Evaporative cooling carries latent thermal heat away into the air",
      "Blood vessels dilate (vasodilation) to radiate excess heat",
    ],
    outcome: "Body temperature drops smoothly back to 37.0°C. Stable equilibrium restored!",
    equilibriumTarget: "37.0°C (Homeostatic Baseline)",
  },
  {
    id: "predator",
    type: "negative",
    title: "Predator & Prey Ecosystem Balance",
    icon: "🦊",
    category: "ECOSYSTEM STABILITY",
    initialState: "Stable forest with balanced rabbits and foxes",
    trigger: "Wet spring creates abundant grass, rabbit population surges",
    steps: [
      "Foxes find plentiful food, increasing fox kit survival rates",
      "More foxes hunt rabbits, reducing the rabbit population",
      "With fewer rabbits, food for foxes declines",
      "Fox population gently declines back to sustainable carrying capacity",
    ],
    outcome: "Ecosystem self-stabilizes in dynamic harmony!",
    equilibriumTarget: "Carrying Capacity Equilibrium",
  },
  {
    id: "ice_albedo",
    type: "positive",
    title: "Arctic Ice-Albedo Melting Feedback",
    icon: "🧊",
    category: "CLIMATE & EARTH SCIENCE",
    initialState: "Bright white Arctic sea ice reflecting 85% of solar radiation",
    trigger: "Slight global temperature rise (+0.5°C)",
    steps: [
      "White reflective sea ice begins to melt into dark ocean water",
      "Dark ocean water absorbs 90% of solar photons instead of reflecting them",
      "Warmer ocean water holds more thermal energy",
      "Warmer water causes even more surrounding ice to melt faster!",
    ],
    outcome: "Runaway warming loop! Change accelerates in the same direction until all ice is gone.",
    dangerAlert: "Self-Reinforcing Amplification Loop (Tipping Point)",
  },
  {
    id: "campfire",
    type: "positive",
    title: "Campfire Combustion Acceleration",
    icon: "🔥",
    category: "CHEMISTRY & THERMODYNAMICS",
    initialState: "A tiny match flame applied to dry kindling wood",
    trigger: "Initial spark ignites cellulose fibers",
    steps: [
      "Heat decomposes wood polymers into volatile hydrocarbon gases (pyrolysis)",
      "Gases mix with atmospheric oxygen and ignite violently",
      "Flame temperature surges from 300°C to 800°C",
      "Extreme heat radiates into adjacent wood logs, releasing massive fuel gases!",
    ],
    outcome: "Runaway fire growth! Accelerates rapidly until all combustible wood is consumed.",
    dangerAlert: "Exothermic Runaway Chain Reaction",
  },
];

export const FeedbackEngineWidget: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>("sweat");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [metricValue, setMetricValue] = useState<number>(50);

  const activeCase = FEEDBACK_CASES.find((c) => c.id === selectedCaseId) || FEEDBACK_CASES[0];

  useEffect(() => {
    setCurrentStepIndex(0);
    setIsSimulating(false);
    setMetricValue(activeCase.type === "negative" ? 75 : 30);
  }, [selectedCaseId]);

  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < activeCase.steps.length - 1) {
          return prev + 1;
        } else {
          setIsSimulating(false);
          return prev;
        }
      });

      setMetricValue((prev) => {
        if (activeCase.type === "negative") {
          // Pulls back to 50
          return Math.round(prev + (50 - prev) * 0.4);
        } else {
          // Accelerates to 100
          return Math.min(100, Math.round(prev * 1.35 + 5));
        }
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [isSimulating, activeCase]);

  const handleStartSimulation = () => {
    setCurrentStepIndex(0);
    setMetricValue(activeCase.type === "negative" ? 85 : 25);
    setIsSimulating(true);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setCurrentStepIndex(0);
    setMetricValue(activeCase.type === "negative" ? 50 : 20);
  };

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/70 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-800">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
              FEEDBACK LOOPS & DYNAMIC EQUILIBRIUM
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white mt-1">
            Negative Feedback vs. Positive Feedback
          </h4>
          <p className="text-xs text-slate-400">
            Discover the two fundamental control mechanisms that steer every system in biology, climate, and physics.
          </p>
        </div>

        {/* Case Switcher */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          {FEEDBACK_CASES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCaseId === c.id
                  ? c.type === "negative"
                    ? "bg-blue-600 text-white shadow-xs ring-2 ring-blue-400/40"
                    : "bg-rose-600 text-white shadow-xs ring-2 ring-rose-400/40"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{c.icon}</span>
              <span className="hidden sm:inline">{c.type === "negative" ? "🔵 Negative:" : "🔴 Positive:"}</span>
              <span>{c.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Case Overview Card */}
      <div
        className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          activeCase.type === "negative"
            ? "bg-blue-950/40 border-blue-800/70"
            : "bg-rose-950/40 border-rose-800/70"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 rounded-2xl bg-slate-950 border border-slate-800">
            {activeCase.icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                  activeCase.type === "negative"
                    ? "bg-blue-500 text-white"
                    : "bg-rose-500 text-white"
                }`}
              >
                {activeCase.type === "negative"
                  ? "🔵 NEGATIVE FEEDBACK (STABILIZING)"
                  : "🔴 POSITIVE FEEDBACK (AMPLIFYING)"}
              </span>
              <span className="text-[10px] font-mono text-slate-400">{activeCase.category}</span>
            </div>
            <h5 className="text-base font-black text-white mt-1">{activeCase.title}</h5>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleStartSimulation}
            disabled={isSimulating}
            className={`px-4 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all ${
              activeCase.type === "negative"
                ? "bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                : "bg-rose-600 hover:bg-rose-500 disabled:opacity-50"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isSimulating ? "Simulating Feedback..." : "Trigger System Disturbance"}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4-Step Interactive Causal Chain */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span>Feedback Mechanism Chain:</span>
          <span className="text-slate-400 text-[11px]">
            {activeCase.type === "negative" ? "Self-Correcting Loop" : "Self-Accelerating Loop"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {activeCase.steps.map((step, idx) => {
            const isPassed = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? activeCase.type === "negative"
                      ? "bg-blue-900/60 border-blue-400 ring-2 ring-blue-400/40 text-white"
                      : "bg-rose-900/60 border-rose-400 ring-2 ring-rose-400/40 text-white"
                    : isPassed
                    ? "bg-slate-900 border-slate-700 text-slate-300"
                    : "bg-slate-950 border-slate-800 text-slate-500 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                  <span>STEP {idx + 1}</span>
                  {isPassed && <span>✓</span>}
                </div>
                <p className="text-xs leading-snug">{step}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outcome & Epistemological Definition Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            System Trajectory & Outcome:
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {activeCase.outcome}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <strong className="block text-slate-200 font-bold mb-1">
            {activeCase.type === "negative" ? "🔵 Negative Feedback Definition:" : "🔴 Positive Feedback Definition:"}
          </strong>
          <span className="text-slate-400 leading-snug">
            {activeCase.type === "negative"
              ? "A change triggers something that pushes the system back toward its usual baseline state (stabilizing homeostasis)."
              : "A change causes more change in the same direction (amplifying runaway acceleration)."}
          </span>
        </div>
      </div>
    </div>
  );
};
