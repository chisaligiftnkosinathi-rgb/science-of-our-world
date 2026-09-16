import React, { useState } from "react";
import {
  Sparkles,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Activity,
  Plus,
  Compass,
  AlertCircle,
  Lightbulb,
} from "lucide-react";

export interface MeasurementTrial {
  id: number;
  value: number;
  timestamp: string;
  notes?: string;
}

export interface UncertaintyLabScenario {
  id: "temp" | "plant" | "gravity" | "current";
  title: string;
  unit: string;
  targetTrueValue: number;
  noiseRange: number;
  description: string;
  apparatus: string;
  scientificContext: string;
}

export const UNCERTAINTY_SCENARIOS: UncertaintyLabScenario[] = [
  {
    id: "temp",
    title: "Thermal Water Temperature",
    unit: "°C",
    targetTrueValue: 24.2,
    noiseRange: 0.35,
    description: "Measuring the temperature of an insulated flask of water using a laboratory digital thermometer.",
    apparatus: "Digital probe thermometer (precision ±0.1°C)",
    scientificContext: "Microscopic thermal turbulence, convection currents, and sensor reaction time create slight variations between readings.",
  },
  {
    id: "plant",
    title: "Plant Growth Rate",
    unit: "mm/day",
    targetTrueValue: 4.8,
    noiseRange: 0.6,
    description: "Measuring daily stem elongation on bean seedlings grown under identical LED lights.",
    apparatus: "Precision optical caliper (precision ±0.1 mm)",
    scientificContext: "Natural biological variability across seeds and slight differences in soil moisture cause individual plants to grow at slightly different rates.",
  },
  {
    id: "gravity",
    title: "Pendulum Swing Period",
    unit: "seconds",
    targetTrueValue: 1.42,
    noiseRange: 0.08,
    description: "Timing 1 full oscillation period of a 50cm pendulum bob released from 15 degrees.",
    apparatus: "Photogate timer & human stopwatch cross-check",
    scientificContext: "Human reaction time at the release point and tiny air draft friction add measurable uncertainty to single stopwatch clicks.",
  },
  {
    id: "current",
    title: "Solar Cell Current Output",
    unit: "mA",
    targetTrueValue: 86.5,
    noiseRange: 2.2,
    description: "Measuring electric current produced by a mini photovoltaic panel under lamp illumination.",
    apparatus: "Digital multimeter (precision ±0.5 mA)",
    scientificContext: "Minor fluctuations in lamp voltage and angle of incidence create small variations across sequential multimeter samples.",
  },
];

export const MeasurementUncertaintyWidget: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<"temp" | "plant" | "gravity" | "current">("temp");
  const activeScenario = UNCERTAINTY_SCENARIOS.find((s) => s.id === selectedScenarioId) || UNCERTAINTY_SCENARIOS[0];

  // Store trials
  const [trials, setTrials] = useState<MeasurementTrial[]>([
    { id: 1, value: 24.1, timestamp: "Trial 1" },
    { id: 2, value: 24.3, timestamp: "Trial 2" },
    { id: 3, value: 24.0, timestamp: "Trial 3" },
    { id: 4, value: 24.2, timestamp: "Trial 4" },
  ]);

  // Switch scenario resets trials
  const handleScenarioChange = (scenarioId: "temp" | "plant" | "gravity" | "current") => {
    setSelectedScenarioId(scenarioId);
    const target = UNCERTAINTY_SCENARIOS.find((s) => s.id === scenarioId) || UNCERTAINTY_SCENARIOS[0];
    const initialTrials: MeasurementTrial[] = [1, 2, 3, 4].map((num) => {
      const offset = (Math.random() * 2 - 1) * target.noiseRange;
      const rounded = Number((target.targetTrueValue + offset).toFixed(2));
      return { id: num, value: rounded, timestamp: `Trial ${num}` };
    });
    setTrials(initialTrials);
  };

  // Add a new measurement trial
  const handleAddTrial = () => {
    if (trials.length >= 10) return;
    const offset = (Math.random() * 2 - 1) * activeScenario.noiseRange;
    const rounded = Number((activeScenario.targetTrueValue + offset).toFixed(2));
    const nextId = trials.length + 1;
    setTrials([...trials, { id: nextId, value: rounded, timestamp: `Trial ${nextId}` }]);
  };

  const handleResetTrials = () => {
    handleScenarioChange(selectedScenarioId);
  };

  // Statistical Calculations
  const values = trials.map((t) => t.value);
  const mean = values.length > 0 ? Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)) : 0;
  const minVal = values.length > 0 ? Math.min(...values) : 0;
  const maxVal = values.length > 0 ? Math.max(...values) : 0;
  const uncertainty = values.length > 0 ? Number(((maxVal - minVal) / 2).toFixed(2)) : 0;

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/70 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-950 text-teal-400 border border-teal-800">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              SCIENTIFIC MEASUREMENT & UNCERTAINTY LAB
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white mt-1">
            "Why Do Real Scientists Repeat Measurements?"
          </h4>
          <p className="text-xs text-slate-400">
            No measurement tool in the universe is infinitely perfect. Good scientists record what they measured, calculate averages, and state how certain they are.
          </p>
        </div>

        {/* Scenario Switcher */}
        <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
          {UNCERTAINTY_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleScenarioChange(sc.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedScenarioId === sc.id
                  ? "bg-teal-600 text-white shadow-xs ring-2 ring-teal-400/40"
                  : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              {sc.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Overview Box */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            Apparatus & Tool:
          </span>
          <span className="text-slate-200 font-medium">{activeScenario.apparatus}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            Physical Description:
          </span>
          <span className="text-slate-300">{activeScenario.description}</span>
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
            Why Variation Occurs:
          </span>
          <span className="text-teal-300">{activeScenario.scientificContext}</span>
        </div>
      </div>

      {/* Interactive Trials Table & Plotter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Trial Data Log */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              Recorded Data Points ({trials.length}/10 Trials)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddTrial}
                disabled={trials.length >= 10}
                className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Take Another Reading</span>
              </button>
              <button
                onClick={handleResetTrials}
                className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 cursor-pointer"
                title="Reset Trials"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {trials.map((t, idx) => (
              <div
                key={t.id}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
              >
                <span className="text-[11px] font-mono text-slate-400">{t.timestamp}</span>
                <span className="font-mono font-bold text-teal-300 text-sm">
                  {t.value} {activeScenario.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Scientific Analysis & Confidence Interval Box */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-teal-950/30 border border-teal-800/60 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-teal-300">
              Statistical Synthesis & Error Margin
            </span>
            <span className="text-[10px] font-mono text-slate-400">N = {trials.length} Samples</span>
          </div>

          {/* Big Scientific Result Display */}
          <div className="p-4 rounded-xl bg-slate-950 border border-teal-900/80 text-center space-y-1">
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Scientific Measurement Value (Mean ± Uncertainty)
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-teal-300">
              {mean} ± {uncertainty} {activeScenario.unit}
            </div>
            <div className="text-[11px] text-slate-400">
              Range: [{minVal} {activeScenario.unit} — {maxVal} {activeScenario.unit}]
            </div>
          </div>

          {/* Visual Dot Scatter & Mean Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Min: {minVal} {activeScenario.unit}</span>
              <span className="text-teal-300 font-bold">Mean: {mean} {activeScenario.unit}</span>
              <span>Max: {maxVal} {activeScenario.unit}</span>
            </div>
            <div className="h-6 w-full bg-slate-900 rounded-lg relative overflow-hidden border border-slate-800 flex items-center px-2">
              {trials.map((t, idx) => {
                const range = Math.max(0.01, maxVal - minVal);
                const percent = ((t.value - minVal) / range) * 85 + 7.5;
                return (
                  <div
                    key={idx}
                    style={{ left: `${percent}%` }}
                    className="absolute w-2.5 h-2.5 rounded-full bg-teal-400 -translate-x-1/2 shadow-xs ring-1 ring-teal-200"
                    title={`Trial ${t.id}: ${t.value} ${activeScenario.unit}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Epistemological Rule Quote */}
      <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs sm:text-sm text-indigo-200 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold text-white mb-0.5">
            The Golden Rule of Experimental Science:
          </strong>
          <span>
            "Measurements have uncertainty. We never rely on a single isolated observation. Repeating measurements helps us spot random errors, calculate trustworthy mean averages, and honestly communicate the limits of our experimental instruments."
          </span>
        </div>
      </div>
    </div>
  );
};
