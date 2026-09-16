import React, { useState } from "react";
import { Layers, Zap, Atom, Globe, User, Sun, Shield, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export interface BoundaryCase {
  id: "human" | "earth" | "universe" | "ecosphere";
  name: string;
  icon: string;
  category: "OPEN SYSTEM" | "CLOSED SYSTEM" | "ISOLATED SYSTEM";
  energyCrosses: boolean;
  matterCrosses: boolean;
  boundaryDescription: string;
  energyFlowDetail: string;
  matterFlowDetail: string;
  scientificInsight: string;
}

export const BOUNDARY_CASES: BoundaryCase[] = [
  {
    id: "human",
    name: "Living Human Body",
    icon: "🧍",
    category: "OPEN SYSTEM",
    energyCrosses: true,
    matterCrosses: true,
    boundaryDescription: "The human skin, digestive tract lining, and lungs form the physical boundary.",
    energyFlowDetail: "Chemical energy in food enters ➔ Thermal heat and mechanical work radiate out.",
    matterFlowDetail: "Oxygen, water, and nutrients enter ➔ Carbon dioxide gas, water vapor, and metabolic wastes exit.",
    scientificInsight: "Matter & Energy both enter and leave. Living organisms MUST be open systems to exchange matter and energy with their surroundings to maintain life.",
  },
  {
    id: "earth",
    name: "Planet Earth",
    icon: "🌍",
    category: "CLOSED SYSTEM",
    energyCrosses: true,
    matterCrosses: false,
    boundaryDescription: "Outer edge of Earth's atmosphere (exosphere) bordering outer space.",
    energyFlowDetail: "Energy: Open. Receives high-energy solar radiation from the Sun, radiates thermal infrared heat out to cold space.",
    matterFlowDetail: "Matter: Approximately closed. A negligible amount of meteorite dust enters and trace hydrogen gas escapes.",
    scientificInsight: "Because Earth is approximately closed to matter, all carbon, water, and nitrogen atoms must cycle endlessly through the atmosphere, hydrosphere, lithosphere, and biosphere.",
  },
  {
    id: "ecosphere",
    name: "Sealed Glass Eco-Sphere Jar",
    icon: "🏺",
    category: "CLOSED SYSTEM",
    energyCrosses: true,
    matterCrosses: false,
    boundaryDescription: "A hermetically sealed glass sphere containing water, algae, shrimp, and bacteria.",
    energyFlowDetail: "Sunlight passes through clear glass to power photosynthesis ➔ Heat radiates out through glass.",
    matterFlowDetail: "No atoms of water, air, or minerals can enter or leave through the solid glass wall.",
    scientificInsight: "The shrimp and algae survive for years by cycling the exact same closed pool of carbon and oxygen atoms with zero external matter.",
  },
  {
    id: "universe",
    name: "The Entire Universe (Cosmos)",
    icon: "🌌",
    category: "ISOLATED SYSTEM",
    energyCrosses: false,
    matterCrosses: false,
    boundaryDescription: "Simplified classroom model: The total spacetime continuum of all known matter and energy.",
    energyFlowDetail: "No energy enters or leaves, as we have no known external system for it to exchange energy with.",
    matterFlowDetail: "Total mass and energy are conserved for all time within our cosmological framework.",
    scientificInsight: "Simplified classroom model: We treat the universe as an isolated system because we have no known external system to exchange matter or energy with. This is our model, not something we have directly measured from the outside!",
  },
];

export const SystemBoundaryWidget: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<"human" | "earth" | "ecosphere" | "universe">("earth");
  const [showBoundaryGlow, setShowBoundaryGlow] = useState<boolean>(true);

  const activeCase = BOUNDARY_CASES.find((c) => c.id === selectedCaseId) || BOUNDARY_CASES[1];

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/70 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              SYSTEM BOUNDARIES & THERMODYNAMICS
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white mt-1">
            "What Crosses the Boundary?"
          </h4>
          <p className="text-xs text-slate-400">
            Draw a boundary around anything in the cosmos to classify how energy and matter flow.
          </p>
        </div>

        {/* Boundary Cases Selector */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold self-start sm:self-auto gap-1">
          {BOUNDARY_CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCaseId(item.id)}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedCaseId === item.id
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <span>{item.icon}</span>
              <span className="hidden md:inline">{item.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Visual Boundary Diagram */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center text-center">
        {/* Boundary Container Visual */}
        <div
          className={`w-full max-w-md p-6 rounded-3xl border-2 transition-all duration-500 relative ${
            showBoundaryGlow
              ? activeCase.category === "OPEN SYSTEM"
                ? "border-emerald-500/80 bg-emerald-950/20 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                : activeCase.category === "CLOSED SYSTEM"
                ? "border-cyan-500/80 bg-cyan-950/20 shadow-[0_0_25px_rgba(6,182,212,0.2)]"
                : "border-purple-500/80 bg-purple-950/20 shadow-[0_0_25px_rgba(168,85,247,0.2)]"
              : "border-slate-700 bg-slate-950"
          }`}
        >
          {/* Boundary Tag */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
            System Boundary
          </div>

          <div className="text-4xl sm:text-5xl mb-2">{activeCase.icon}</div>
          <h5 className="text-base sm:text-lg font-black text-white">{activeCase.name}</h5>
          <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider bg-slate-800 border border-slate-700 text-indigo-300">
            {activeCase.category}
          </div>
          <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto">
            {activeCase.boundaryDescription}
          </p>
        </div>

        {/* Inflow / Outflow Flux Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-6">
          {/* Energy Flux Card */}
          <div
            className={`p-4 rounded-xl border text-left text-xs space-y-1.5 ${
              activeCase.energyCrosses
                ? "bg-amber-950/40 border-amber-800/80 text-amber-200"
                : "bg-slate-900/60 border-slate-800 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Zap className="w-4 h-4" />
                <span>ENERGY FLUX</span>
              </span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-950">
                {activeCase.energyCrosses ? "✅ CROSSES BOUNDARY" : "❌ TRAPPED INSIDE"}
              </span>
            </div>
            <p className="text-[11px] leading-snug">{activeCase.energyFlowDetail}</p>
          </div>

          {/* Matter Flux Card */}
          <div
            className={`p-4 rounded-xl border text-left text-xs space-y-1.5 ${
              activeCase.matterCrosses
                ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-200"
                : "bg-slate-900/60 border-slate-800 text-slate-400"
            }`}
          >
            <div className="flex items-center justify-between font-bold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Atom className="w-4 h-4" />
                <span>MATTER FLUX</span>
              </span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-950">
                {activeCase.matterCrosses ? "✅ CROSSES BOUNDARY" : "🔒 SEALED / TRAPPED"}
              </span>
            </div>
            <p className="text-[11px] leading-snug">{activeCase.matterFlowDetail}</p>
          </div>
        </div>
      </div>

      {/* Epistemological Deep Insight Banner */}
      <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs sm:text-sm text-indigo-200 flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold text-white mb-0.5">
            Systems Thinking Connection:
          </strong>
          <span>{activeCase.scientificInsight}</span>
        </div>
      </div>
    </div>
  );
};
