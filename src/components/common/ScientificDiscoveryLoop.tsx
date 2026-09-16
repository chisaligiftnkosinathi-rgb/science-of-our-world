import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  HelpCircle,
  Activity,
  Compass,
  Lightbulb,
} from "lucide-react";

export interface DiscoveryStep {
  id: string;
  number: number;
  label: string;
  icon: string;
  tagline: string;
  description: string;
  color: string;
  bgLight: string;
  borderLight: string;
  exampleStory: {
    plant: string;
    earth: string;
    gravity: string;
  };
}

export const DISCOVERY_STEPS: DiscoveryStep[] = [
  {
    id: "world",
    number: 1,
    label: "Real World",
    icon: "🌍",
    tagline: "Nature in all its magnificent complexity",
    description: "The universe is filled with trillions of interconnected interactions, substances, and living creatures.",
    color: "text-blue-600",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-200",
    exampleStory: {
      plant: "A vast temperate forest with millions of tall trees and soil microbes.",
      earth: "Planet Earth bathed in sunshine while radiating heat out into cold dark space.",
      gravity: "Objects falling through the air from the tops of cliffs and buildings.",
    },
  },
  {
    id: "observe",
    number: 2,
    label: "Observe",
    icon: "👀",
    tagline: "Careful looking & pattern noticing",
    description: "Scientists use their senses and instruments (microscopes, telescopes, sensors) to spot patterns.",
    color: "text-indigo-600",
    bgLight: "bg-indigo-50",
    borderLight: "border-indigo-200",
    exampleStory: {
      plant: "You notice that houseplant leaves in a dark corner turn pale yellow and stop growing.",
      earth: "Satellite radiometers detect that Earth's surface is 33°C warmer than a bare rock in space.",
      gravity: "A heavy stone and a light pebble seem to hit the ground almost simultaneously.",
    },
  },
  {
    id: "question",
    number: 3,
    label: "Ask a Question",
    icon: "❓",
    tagline: "Curiosity sparks the journey",
    description: "Formulating a clear, testable question about what causes the pattern.",
    color: "text-purple-600",
    bgLight: "bg-purple-50",
    borderLight: "border-purple-200",
    exampleStory: {
      plant: "Does the quantity of sunlight directly dictate how much sugar a leaf can manufacture?",
      earth: "How do atmospheric gases trap infrared radiation to keep our planet habitable?",
      gravity: "Do all falling objects accelerate at the exact same rate regardless of their mass?",
    },
  },
  {
    id: "model",
    number: 4,
    label: "Build a Model",
    icon: "🔵",
    tagline: "A simplified picture to test ideas",
    description: "Scientists create a mental, physical, or computer model that isolates the most important variables.",
    color: "text-cyan-600",
    bgLight: "bg-cyan-50",
    borderLight: "border-cyan-200",
    exampleStory: {
      plant: "Model: Solar Photons + Water + CO₂ ➔ Glucose Sugar + Oxygen Gas.",
      earth: "Model: Solar Inflow (100%) = Reflected Albedo (30%) + Outgoing Thermal Radiation (70%).",
      gravity: "Model: Downward Force = Mass × Gravitational Field Strength (F = mg).",
    },
  },
  {
    id: "predict",
    number: 5,
    label: "Make a Prediction",
    icon: "🔮",
    tagline: "What should happen if the model is right?",
    description: "A logical forecast of what will occur under specific experimental conditions.",
    color: "text-teal-600",
    bgLight: "bg-teal-50",
    borderLight: "border-teal-200",
    exampleStory: {
      plant: "If we double light intensity from 200 to 400 lux, leaf oxygen bubble production will double.",
      earth: "If greenhouse gases increase by 20%, surface temperature will rise measurably.",
      gravity: "In a vacuum chamber without air drag, a 5kg iron ball and a 0.001kg feather will land at the exact same millisecond.",
    },
  },
  {
    id: "test",
    number: 6,
    label: "Test It (Experiment)",
    icon: "🧪",
    tagline: "Controlled testing with one variable changed",
    description: "Running fair experiments and simulations while keeping control variables constant.",
    color: "text-emerald-600",
    bgLight: "bg-emerald-50",
    borderLight: "border-emerald-200",
    exampleStory: {
      plant: "Submerging Elodea water plants under tunable LED lamps and counting released oxygen bubbles.",
      earth: "Running climate chamber simulations and analyzing planetary radiation spectra.",
      gravity: "Dropping a feather and a bowling ball inside NASA's giant vacuum test chamber.",
    },
  },
  {
    id: "evidence",
    number: 7,
    label: "Collect Evidence",
    icon: "🟠",
    tagline: "Empirical measurements & sensor data",
    description: "Gathering hard numbers, sensor logs, photographs, and repeatable measurements.",
    color: "text-amber-600",
    bgLight: "bg-amber-50",
    borderLight: "border-amber-200",
    exampleStory: {
      plant: "At 200 lux: 14 bubbles/min. At 400 lux: 27 bubbles/min. At 0 lux: 0 bubbles/min.",
      earth: "Surface thermometer network records a 1.1°C rise corresponding to a 420 ppm CO₂ concentration.",
      gravity: "High-speed 10,000 FPS cameras record both feather and sphere hitting the floor at tick 1.428s.",
    },
  },
  {
    id: "analyze",
    number: 8,
    label: "Analyze Results",
    icon: "📊",
    tagline: "Comparing predictions to evidence",
    description: "Plotting graphs, computing error margins, and testing if the hypothesis holds up.",
    color: "text-orange-600",
    bgLight: "bg-orange-50",
    borderLight: "border-orange-200",
    exampleStory: {
      plant: "The linear correlation matches our photosynthesis equation with 96% mathematical accuracy.",
      earth: "Radiation absorption spectra perfectly match the quantum absorption bands of CO₂ and H₂O molecules.",
      gravity: "Both objects accelerated at exactly 9.81 m/s², proving air resistance was the only difference outside.",
    },
  },
  {
    id: "evaluate",
    number: 9,
    label: "Model Evaluation",
    icon: "⚖️",
    tagline: "Does the model work well or need changes?",
    description: "Evidence helps scientists decide whether a model works well, needs improvement, or should be rejected.",
    color: "text-rose-600",
    bgLight: "bg-rose-50",
    borderLight: "border-rose-200",
    exampleStory: {
      plant: "Model works well for moderate light, but needs refinement for extreme light where enzymes saturate.",
      earth: "Model works well, but cloud feedback mechanisms must be added for finer regional forecasts.",
      gravity: "Newtonian gravity model works beautifully for daily speeds, later refined by Einstein for cosmic speeds.",
    },
  },
  {
    id: "explanation",
    number: 10,
    label: "Scientific Explanation",
    icon: "🔴",
    tagline: "Deep mechanistic understanding of WHY",
    description: "Synthesizing the validated model into a coherent scientific law, generating brand new questions!",
    color: "text-red-600",
    bgLight: "bg-red-50",
    borderLight: "border-red-200",
    exampleStory: {
      plant: "Chlorophyll pigments absorb specific photon wavelengths, driving electron transport to synthesize sugar.",
      earth: "Atmospheric greenhouse effect keeps Earth's oceans liquid, allowing life to flourish.",
      gravity: "All mass creates a gravitational field causing uniform acceleration in the absence of friction.",
    },
  },
];

export const ScientificDiscoveryLoop: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(3); // start at "Build a Model"
  const [activeCaseStudy, setActiveCaseStudy] = useState<"plant" | "earth" | "gravity">("plant");
  const [isPlayingAutoTour, setIsPlayingAutoTour] = useState<boolean>(false);

  // Auto-tour timer
  useEffect(() => {
    if (!isPlayingAutoTour) return;
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % DISCOVERY_STEPS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPlayingAutoTour]);

  const activeStep = DISCOVERY_STEPS[activeStepIndex];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/60 shadow-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">
              THE CORE SCIENTIFIC REASONING ENGINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            How Science Discovers the World
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Science is not a collection of static facts to memorize. It is a <strong>circular, self-correcting process</strong> of building, testing, and improving useful explanations about reality.
          </p>
        </div>

        {/* Case Study Switcher & Tour Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveCaseStudy("plant")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeCaseStudy === "plant" ? "bg-emerald-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🪴 Plant Growth
            </button>
            <button
              onClick={() => setActiveCaseStudy("earth")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeCaseStudy === "earth" ? "bg-blue-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🌍 Earth's Climate
            </button>
            <button
              onClick={() => setActiveCaseStudy("gravity")}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                activeCaseStudy === "gravity" ? "bg-purple-600 text-white shadow-xs" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              🍎 Gravity
            </button>
          </div>

          <button
            onClick={() => setIsPlayingAutoTour(!isPlayingAutoTour)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
              isPlayingAutoTour
                ? "bg-amber-600 text-white animate-pulse"
                : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          >
            {isPlayingAutoTour ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Auto-Tour</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play Auto-Tour</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* THE CIRCULAR DISCOVERY PIPELINE (Interactive Stepper) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
          <span>Click any step to inspect the reasoning stage:</span>
          <span className="font-mono text-cyan-400">Step {activeStepIndex + 1} of 10</span>
        </div>

        {/* Grid of 10 Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {DISCOVERY_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setIsPlayingAutoTour(false);
                  setActiveStepIndex(idx);
                }}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between relative group ${
                  isSelected
                    ? "bg-indigo-600 border-indigo-300 text-white shadow-lg ring-2 ring-indigo-400/50 scale-[1.03]"
                    : "bg-slate-950/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="text-xl sm:text-2xl mb-1">{step.icon}</div>
                <div className="font-black text-[11px] leading-tight line-clamp-1">{step.label}</div>
                <div className="text-[9px] font-mono opacity-70 mt-0.5">#{step.number}</div>

                {isSelected && (
                  <div className="absolute -bottom-1.5 w-3 h-1.5 bg-indigo-300 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAILED ACTIVE STEP SPOTLIGHT */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Step Indicator & Concept */}
        <div className="lg:col-span-5 space-y-3 border-b lg:border-b-0 lg:border-r border-slate-800 pb-5 lg:pb-0 lg:pr-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-3 bg-slate-900 rounded-2xl border border-slate-800">
              {activeStep.icon}
            </span>
            <div>
              <div className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                STAGE {activeStep.number} OF 10
              </div>
              <h3 className="text-xl font-black text-white">{activeStep.label}</h3>
            </div>
          </div>

          <div className="text-xs font-bold text-indigo-300 italic">
            "{activeStep.tagline}"
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeStep.description}
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() =>
                setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : DISCOVERY_STEPS.length - 1))
              }
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer border border-slate-800"
            >
              ← Previous Stage
            </button>
            <button
              onClick={() =>
                setActiveStepIndex((prev) => (prev + 1) % DISCOVERY_STEPS.length)
              }
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer flex items-center gap-1 shadow-sm"
            >
              <span>Next Stage</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Live Case Study Walkthrough */}
        <div className="lg:col-span-7 space-y-3 bg-slate-900/90 p-5 rounded-2xl border border-indigo-950">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Applied Case Study:{" "}
              {activeCaseStudy === "plant" && "Photosynthesis & Plant Growth"}
              {activeCaseStudy === "earth" && "Earth's Greenhouse Climate Balance"}
              {activeCaseStudy === "gravity" && "Gravitational Acceleration"}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Empirical Example</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed">
            {activeStep.exampleStory[activeCaseStudy]}
          </div>

          {/* Decision Branch for Stage 9 (Evaluation) */}
          {activeStep.id === "evaluate" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-700 text-emerald-200 text-xs">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Case A: Model Works Well</span>
                </div>
                <p className="text-[11px] leading-snug">
                  Predictions match real data! We formulate a scientific law and explore deeper questions.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-700 text-amber-200 text-xs">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-300">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Case B: Model Needs Changing</span>
                </div>
                <p className="text-[11px] leading-snug">
                  Data contradicts prediction. We refine variables, update equations, or try a new model!
                </p>
              </div>
            </div>
          )}

          {/* Epistemological Rule Quote */}
          <div className="p-3 rounded-xl bg-indigo-950/50 border border-indigo-900 text-xs text-indigo-200 font-medium flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>Crucial Insight:</strong> Evidence helps scientists decide whether a model works well, needs improvement, or should be rejected. Science is never "finished" — new evidence brings new understanding!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
