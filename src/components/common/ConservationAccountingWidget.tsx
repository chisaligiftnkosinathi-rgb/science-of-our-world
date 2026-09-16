import React, { useState } from "react";
import { Scale, Zap, Atom, HelpCircle, CheckCircle2, ArrowDown, Sparkles } from "lucide-react";

export interface ConservationBudgetProps {
  systemName?: string;
  totalEnergyInput?: number;
  totalMatterInput?: number;
}

export const ConservationAccountingWidget: React.FC<ConservationBudgetProps> = ({
  systemName = "Active System",
  totalEnergyInput = 100,
  totalMatterInput = 100,
}) => {
  // Energy Accounting Partition
  const [energyWorkPercent, setEnergyWorkPercent] = useState<number>(35);
  const [energyStoredPercent, setEnergyStoredPercent] = useState<number>(25);
  // Derived waste heat to strictly enforce 100% conservation
  const energyHeatPercent = Math.max(0, 100 - energyWorkPercent - energyStoredPercent);

  // Matter Accounting Partition
  const [matterBiomassPercent, setMatterBiomassPercent] = useState<number>(45);
  const [matterGasPercent, setMatterGasPercent] = useState<number>(35);
  // Derived waste / recycled soil nutrients to strictly enforce 100% conservation
  const matterWastePercent = Math.max(0, 100 - matterBiomassPercent - matterGasPercent);

  const [activeTab, setActiveTab] = useState<"energy" | "matter">("energy");

  return (
    <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/70 text-white space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
              <Scale className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              FUNDAMENTAL LAW OF CONSERVATION
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white mt-1">
            "Where Did That Energy or Matter Go?"
          </h4>
          <p className="text-xs text-slate-400">
            Inside <strong className="text-indigo-300">{systemName}</strong>, energy and matter are never created or destroyed — they only change form and location!
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("energy")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "energy"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>⚡ Energy Conservation</span>
          </button>
          <button
            onClick={() => setActiveTab("matter")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "matter"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>🧪 Matter & Atom Accounting</span>
          </button>
        </div>
      </div>

      {/* ENERGY BUDGET VIEW */}
      {activeTab === "energy" && (
        <div className="space-y-5">
          {/* Central Question & Equation Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-800/80 text-xs sm:text-sm">
            <div className="flex items-center justify-between font-bold text-amber-300 mb-1">
              <span>Energy Inflow = {totalEnergyInput} Joules (100%)</span>
              <span className="font-mono bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                Total Accounted = {energyWorkPercent + energyStoredPercent + energyHeatPercent}%
              </span>
            </div>
            <div className="font-mono text-xs text-amber-200 mt-2 bg-slate-950 p-2.5 rounded-lg border border-amber-950 flex flex-wrap items-center justify-between gap-2">
              <span>⚡ Input Energy (100 J)</span>
              <span>➔</span>
              <span className="text-cyan-300">Useful Work ({energyWorkPercent} J)</span>
              <span>+</span>
              <span className="text-emerald-300">Stored Biomass ({energyStoredPercent} J)</span>
              <span>+</span>
              <span className="text-rose-300">Dissipated Heat ({energyHeatPercent} J)</span>
            </div>
          </div>

          {/* Interactive Stacked Conservation Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Thermodynamic Energy Flow Breakdown</span>
              <span className="text-amber-400 font-mono">100% Balanced</span>
            </div>
            <div className="h-7 w-full bg-slate-900 rounded-xl overflow-hidden flex border border-slate-700 shadow-inner">
              <div
                style={{ width: `${energyWorkPercent}%` }}
                className="bg-cyan-500 flex items-center justify-center text-[10px] font-black text-slate-950 transition-all duration-300"
                title="Useful Mechanical/Biological Work"
              >
                {energyWorkPercent > 10 && `Work ${energyWorkPercent}%`}
              </div>
              <div
                style={{ width: `${energyStoredPercent}%` }}
                className="bg-emerald-500 flex items-center justify-center text-[10px] font-black text-slate-950 transition-all duration-300"
                title="Chemical/Biomass Energy Stored"
              >
                {energyStoredPercent > 10 && `Stored ${energyStoredPercent}%`}
              </div>
              <div
                style={{ width: `${energyHeatPercent}%` }}
                className="bg-rose-500 flex items-center justify-center text-[10px] font-black text-white transition-all duration-300"
                title="Dissipated Thermal Waste Heat"
              >
                {energyHeatPercent > 10 && `Heat ${energyHeatPercent}%`}
              </div>
            </div>
          </div>

          {/* Sliders to Modulate Efficiency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold text-cyan-300">
                <span>1. Useful Work / Motion</span>
                <span className="font-mono">{energyWorkPercent}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={70}
                value={energyWorkPercent}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val + energyStoredPercent <= 95) setEnergyWorkPercent(val);
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <p className="text-[10px] text-slate-400">
                Pumping blood, moving muscles, electrical transmission, chemical synthesis.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold text-emerald-300">
                <span>2. Stored Energy (Fat / Starch)</span>
                <span className="font-mono">{energyStoredPercent}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                value={energyStoredPercent}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val + energyWorkPercent <= 95) setEnergyStoredPercent(val);
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <p className="text-[10px] text-slate-400">
                Chemical bonds in plant cellulose, body adipose tissue, and battery charge.
              </p>
            </div>
          </div>

          {/* Core Principle Quote */}
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-900/60 text-xs text-amber-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-amber-300">First Law of Thermodynamics:</strong>
              <span>
                "Energy can move and change form, but it doesn't simply disappear." The remaining{" "}
                <strong className="text-rose-300">{energyHeatPercent}%</strong> always radiates away as subtle thermal vibration (waste heat).
              </span>
            </div>
          </div>
        </div>
      )}

      {/* MATTER & ATOM BUDGET VIEW */}
      {activeTab === "matter" && (
        <div className="space-y-5">
          {/* Central Question & Equation Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-800/80 text-xs sm:text-sm">
            <div className="flex items-center justify-between font-bold text-emerald-300 mb-1">
              <span>Matter Inflow = {totalMatterInput} kg (100% of Atoms)</span>
              <span className="font-mono bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                All Atoms Conserved: 100%
              </span>
            </div>
            <div className="font-mono text-xs text-emerald-200 mt-2 bg-slate-950 p-2.5 rounded-lg border border-emerald-950 flex flex-wrap items-center justify-between gap-2">
              <span>📦 Food/Nutrients In (100 kg)</span>
              <span>➔</span>
              <span className="text-emerald-300">Living Body Mass ({matterBiomassPercent} kg)</span>
              <span>+</span>
              <span className="text-cyan-300">Exhaled Gases ({matterGasPercent} kg)</span>
              <span>+</span>
              <span className="text-amber-300">Excretions & Waste ({matterWastePercent} kg)</span>
            </div>
          </div>

          {/* Interactive Stacked Matter Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-300">
              <span>Chemical Atom Distribution</span>
              <span className="text-emerald-400 font-mono">0 Atoms Lost</span>
            </div>
            <div className="h-7 w-full bg-slate-900 rounded-xl overflow-hidden flex border border-slate-700 shadow-inner">
              <div
                style={{ width: `${matterBiomassPercent}%` }}
                className="bg-emerald-500 flex items-center justify-center text-[10px] font-black text-slate-950 transition-all duration-300"
                title="Built into bones, muscles, leaves, and wood"
              >
                {matterBiomassPercent > 10 && `Body Mass ${matterBiomassPercent}%`}
              </div>
              <div
                style={{ width: `${matterGasPercent}%` }}
                className="bg-cyan-500 flex items-center justify-center text-[10px] font-black text-slate-950 transition-all duration-300"
                title="Exhaled CO2 gas & water vapor (transpiration)"
              >
                {matterGasPercent > 10 && `Gases ${matterGasPercent}%`}
              </div>
              <div
                style={{ width: `${matterWastePercent}%` }}
                className="bg-amber-500 flex items-center justify-center text-[10px] font-black text-slate-950 transition-all duration-300"
                title="Organic excretions recycled by soil decomposers"
              >
                {matterWastePercent > 10 && `Recycled ${matterWastePercent}%`}
              </div>
            </div>
          </div>

          {/* Sliders to Modulate Matter Allocation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold text-emerald-300">
                <span>1. New Tissue / Biomass</span>
                <span className="font-mono">{matterBiomassPercent}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={75}
                value={matterBiomassPercent}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val + matterGasPercent <= 95) setMatterBiomassPercent(val);
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <p className="text-[10px] text-slate-400">
                Carbon, Hydrogen, Oxygen, and Nitrogen bonded into cellular proteins and cellulose.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold text-cyan-300">
                <span>2. Exhaled Breath / Transpiration</span>
                <span className="font-mono">{matterGasPercent}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                value={matterGasPercent}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val + matterBiomassPercent <= 95) setMatterGasPercent(val);
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <p className="text-[10px] text-slate-400">
                When organisms "burn" glucose with oxygen, the carbon leaves as invisible CO₂ gas!
              </p>
            </div>
          </div>

          {/* Core Principle Quote */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/60 text-xs text-emerald-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-emerald-300">Law of Conservation of Mass:</strong>
              <span>
                "Matter can be rearranged, moved or transformed, but atoms don't simply vanish." Every single atom entering a tree or human is 100% accounted for in growth, breath, and soil cycling.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
