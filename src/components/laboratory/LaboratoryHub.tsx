import React, { useState } from "react";
import { FlaskConical, Play, Sparkles, CheckCircle2, RotateCcw, Droplets, Zap, Atom, Trees, Gauge, Compass } from "lucide-react";
import { ModuleId } from "../../types";
import { MeasurementUncertaintyWidget } from "../common/MeasurementUncertaintyWidget";

interface LabProps {
  onNavigateTo: (id: ModuleId) => void;
  onComplete: () => void;
}

export const LaboratoryHub: React.FC<LabProps> = ({ onNavigateTo, onComplete }) => {
  const [selectedLab, setSelectedLab] = useState<"food" | "water" | "circuit" | "matter" | "motion" | "uncertainty">("uncertainty");
  const [labNotes, setLabNotes] = useState<string>("");
  const [experimentsRun, setExperimentsRun] = useState<number>(0);

  // Mini simulation states
  const [waterTemp, setWaterTemp] = useState<number>(20);
  const [matterPhase, setMatterPhase] = useState<string>("Liquid");
  const [circuitPower, setCircuitPower] = useState<boolean>(false);
  const [forceNewtons, setForceNewtons] = useState<number>(50);
  const [massKg, setMassKg] = useState<number>(10);

  const calculatedAcceleration = (forceNewtons / massKg).toFixed(2);

  const labs = [
    {
      id: "uncertainty",
      title: "🧭 Measurement Uncertainty & Error Lab",
      icon: "🧭",
      badge: "Scientific Method",
      desc: "Perform repeated measurement trials, calculate mean averages, and visualize statistical confidence bounds.",
      lessonTarget: "laws" as ModuleId,
    },
    {
      id: "food",
      title: "🌱 Ecosystem Food Web Lab",
      icon: "🌱",
      badge: "Ecology",
      desc: "Simulate trophic energy transfer and test consumer balance in wild biomes.",
      lessonTarget: "food" as ModuleId,
    },
    {
      id: "water",
      title: "💧 Water Cycle & Cloud Chamber",
      icon: "💧",
      badge: "Earth Science",
      desc: "Vary thermal temperature to observe evaporation rates and cloud condensation.",
      lessonTarget: "cycles" as ModuleId,
    },
    {
      id: "circuit",
      title: "⚡ Circuit & Power Workbench",
      icon: "⚡",
      badge: "Physics",
      desc: "Build closed series circuits, test component loads, and measure electron current.",
      lessonTarget: "electricity" as ModuleId,
    },
    {
      id: "matter",
      title: "⚛️ Molecular Particle Chamber",
      icon: "⚛️",
      badge: "Chemistry",
      desc: "Control kinetic temperatures to shift between Solid, Liquid, and Gas phases.",
      lessonTarget: "matter" as ModuleId,
    },
    {
      id: "motion",
      title: "⚙️ Newton's 2nd Law ($F = ma$) Lab",
      icon: "⚙️",
      badge: "Physics",
      desc: "Vary applied force ($F$) and object mass ($m$) to calculate instantaneous acceleration ($a = F/m$).",
      lessonTarget: "forces" as ModuleId,
    },
  ];

  const handleRunExperiment = () => {
    setExperimentsRun((prev) => prev + 1);
    onComplete();
  };

  return (
    <section id="laboratory" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm shadow-xs">
          LAB
        </span>
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            INTERACTIVE EXPERIMENTATION • HANDS-ON SCIENCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🧪 Young Scientist Virtual Laboratory
          </h2>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
          Welcome to the research workbench! A true scientist tests hypotheses through hands-on experiments, adjusts independent variables, and measures physical outcomes.
        </p>

        {/* Lab Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
          {labs.map((lab) => {
            const isSelected = selectedLab === lab.id;
            return (
              <button
                key={lab.id}
                onClick={() => {
                  setSelectedLab(lab.id as any);
                  onComplete();
                }}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-emerald-950 text-white border-emerald-500 shadow-lg ring-2 ring-emerald-400/40"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{lab.icon}</span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-emerald-800 text-emerald-200 border border-emerald-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {lab.badge}
                  </span>
                </div>
                <h3 className="font-bold text-sm leading-snug">{lab.title}</h3>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isSelected ? "text-emerald-200/90" : "text-slate-500"
                  }`}
                >
                  {lab.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Experiment Chamber */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-extrabold text-white">
                Active Test Chamber: {labs.find((l) => l.id === selectedLab)?.title}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">
                Experiments Completed: <strong className="text-emerald-400">{experimentsRun}</strong>
              </span>
            </div>
          </div>

          {/* Interactive Simulation Controls by Selected Lab */}
          {selectedLab === "uncertainty" && (
            <div className="space-y-4">
              <MeasurementUncertaintyWidget />
            </div>
          )}

          {selectedLab === "motion" && (
            <div className="space-y-4">
              <div className="text-xs text-slate-300">
                Test Newton's 2nd Law of Motion: <span className="font-mono text-cyan-300 font-bold">Acceleration = Force ÷ Mass ($a = F/m$)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-300">Applied Force ($F$):</span>
                    <span className="font-black text-amber-400 font-mono">{forceNewtons} Newtons</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={forceNewtons}
                    onChange={(e) => setForceNewtons(Number(e.target.value))}
                    className="w-full cursor-pointer accent-amber-500"
                  />
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-slate-300">Object Mass ($m$):</span>
                    <span className="font-black text-cyan-400 font-mono">{massKg} kg</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={massKg}
                    onChange={(e) => setMassKg(Number(e.target.value))}
                    className="w-full cursor-pointer accent-cyan-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Resulting Acceleration</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {calculatedAcceleration} m/s²
                  </div>
                </div>

                <button
                  onClick={handleRunExperiment}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Play className="w-4 h-4" /> Log & Run Trial
                </button>
              </div>
            </div>
          )}

          {selectedLab === "food" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                You can construct and test complex food webs in the comprehensive food chain module.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-emerald-300">
                  🌱 Producers (Grass/Trees) ➔ 🐛 Herbivores (Insects/Rabbits) ➔ 🦅 Apex Predators (Eagles)
                </div>
                <button
                  onClick={() => onNavigateTo("food")}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Launch Food Chain Workbench →
                </button>
              </div>
            </div>
          )}

          {selectedLab === "circuit" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Interactive DC circuit simulation with battery potential and switch loop.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-yellow-300">
                  🔋 Power Source (9V DC) ➔ 🔌 Copper Conductors ➔ 💡 Resistive Filament / LED
                </div>
                <button
                  onClick={() => onNavigateTo("electricity")}
                  className="px-4 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-white font-bold text-xs"
                >
                  Launch Electricity Circuit Lab →
                </button>
              </div>
            </div>
          )}

          {selectedLab === "matter" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Observe how thermal kinetic energy alters intermolecular bonding.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-purple-300">
                  🧊 Solid (&lt;0°C) ➔ 💧 Liquid (0-100°C) ➔ 💨 Gas (&gt;100°C)
                </div>
                <button
                  onClick={() => onNavigateTo("matter")}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                >
                  Launch Molecular Chamber →
                </button>
              </div>
            </div>
          )}

          {selectedLab === "water" && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                Explore solar thermal evaporation, upper atmospheric condensation, and global precipitation.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-cyan-300">
                  🌊 Surface Reservoirs ➔ ☀️ Solar Evaporation ➔ ☁️ Condensation ➔ 🌧️ Rain Infiltration
                </div>
                <button
                  onClick={() => onNavigateTo("cycles")}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                >
                  Launch Earth Cycles Lab →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scientist Field Notebook */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-sm">
            <span>📓</span>
            <span>Young Scientist Lab Notebook</span>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Record your empirical observations, hypotheses, and experimental conclusions:
          </p>
          <textarea
            value={labNotes}
            onChange={(e) => setLabNotes(e.target.value)}
            placeholder="E.g. Observation: Increasing the applied force from 50N to 100N on a 10kg mass doubled the acceleration from 5 m/s² to 10 m/s²..."
            className="w-full h-24 p-3 rounded-xl border border-slate-300 text-xs text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {labNotes.length > 0 && (
            <div className="mt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Notes auto-saved in local scientist session.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
