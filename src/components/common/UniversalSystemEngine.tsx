import React, { useState } from "react";
import {
  Cpu,
  ArrowRight,
  ArrowDown,
  RefreshCw,
  Zap,
  Activity,
  Sliders,
  Sparkles,
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Wrench,
  Globe,
  Compass,
} from "lucide-react";
import { SYSTEM_ENGINE_PRESETS } from "../../data/systemEngineData";
import { ModuleId, SystemEnginePreset } from "../../types";
import { RealityModelEvidencePanel } from "./RealityModelEvidencePanel";
import { CustomSystemBuilder } from "./CustomSystemBuilder";
import { PlanetaryWorldBuilder } from "../builder/PlanetaryWorldBuilder";
import { ScientificDiscoveryLoop } from "./ScientificDiscoveryLoop";
import { REALITY_MODEL_MAP } from "../../data/realityModelData";

interface UniversalSystemEngineProps {
  onNavigateTo?: (id: ModuleId) => void;
  defaultPresetId?: string;
}

export const UniversalSystemEngine: React.FC<UniversalSystemEngineProps> = ({
  onNavigateTo,
  defaultPresetId = "ecosystem",
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(defaultPresetId);
  const [activePreset, setActivePreset] = useState<SystemEnginePreset>(
    () => SYSTEM_ENGINE_PRESETS.find((p) => p.id === defaultPresetId) || SYSTEM_ENGINE_PRESETS[0]
  );

  // Maintain custom input values per preset
  const [inputValues, setInputValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    activePreset.inputs.forEach((inp) => {
      initial[inp.name] = inp.value;
    });
    return initial;
  });

  const [stressActive, setStressActive] = useState<boolean>(false);

  const handleSelectPreset = (preset: SystemEnginePreset) => {
    setSelectedPresetId(preset.id);
    setActivePreset(preset);
    const initial: Record<string, number> = {};
    preset.inputs.forEach((inp) => {
      initial[inp.name] = inp.value;
    });
    setInputValues(initial);
    setStressActive(false);
  };

  const handleSelectCustomBuilder = () => {
    setSelectedPresetId("custom_builder");
  };

  const handleInputChange = (name: string, val: number) => {
    setInputValues((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleResetInputs = () => {
    const reset: Record<string, number> = {};
    activePreset.inputs.forEach((inp) => {
      reset[inp.name] = inp.value;
    });
    setInputValues(reset);
    setStressActive(false);
  };

  const handleTriggerStress = () => {
    setStressActive(true);
    // Perturb the first 2 inputs
    const updated = { ...inputValues };
    if (activePreset.id === "ecosystem") {
      updated["Rainfall & Moisture"] = 20; // Drought!
      updated["Sunlight Flux"] = 100;
    } else if (activePreset.id === "human") {
      updated["Activity Level"] = 90; // Sprint!
      updated["Water Intake"] = 1.0;
    } else if (activePreset.id === "circuit") {
      updated["Switch State"] = 0; // Open switch!
    } else if (activePreset.id === "earth_system") {
      updated["Greenhouse Gas Level"] = 580; // High GHG
    }
    setInputValues(updated);
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl my-6">
      {/* Engine Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/80">
              <Cpu className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              THE UNIFIED SCIENCE ENGINE
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Universal System Architecture
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Every science subject — biology, chemistry, physics, and geology — uses this exact same underlying 6-stage engine.
          </p>
        </div>

        {/* Universal Engine Formula Badge */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center self-start md:self-auto">
          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block mb-1">
            The Universal Pipeline
          </span>
          <div className="font-mono text-xs text-amber-300 font-bold flex flex-wrap items-center justify-center gap-1">
            <span className="text-cyan-400">INPUTS</span>
            <span className="text-slate-500">➔</span>
            <span className="text-purple-400">SYSTEM</span>
            <span className="text-slate-500">➔</span>
            <span className="text-emerald-400">PROCESS</span>
            <span className="text-slate-500">➔</span>
            <span className="text-amber-400">OUTPUTS</span>
            <span className="text-slate-500">➔</span>
            <span className="text-rose-400">FEEDBACK</span>
          </div>
        </div>
      </div>

      {/* Preset System Switcher + Custom Builder Tab */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 custom-scrollbar">
        {SYSTEM_ENGINE_PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 rounded-2xl border text-left shrink-0 transition-all cursor-pointer min-w-[170px] ${
                isSelected
                  ? "bg-indigo-600 border-indigo-400 text-white shadow-lg ring-2 ring-indigo-400/40"
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">{preset.icon}</span>
                <div>
                  <div className="font-bold text-xs leading-tight text-white">{preset.name.split(" ")[0]}</div>
                  <div className="text-[10px] opacity-75">{preset.category.split(" ")[0]}</div>
                </div>
              </div>
            </button>
          );
        })}

        {/* BUILD YOUR OWN SYSTEM BUTTON */}
        <button
          onClick={handleSelectCustomBuilder}
          className={`p-3 rounded-2xl border text-left shrink-0 transition-all cursor-pointer min-w-[190px] ${
            selectedPresetId === "custom_builder"
              ? "bg-purple-600 border-purple-400 text-white shadow-lg ring-2 ring-purple-400/40"
              : "bg-purple-950/40 border-purple-800 text-purple-300 hover:bg-purple-900/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛠️</span>
            <div>
              <div className="font-black text-xs leading-tight text-white">Build Your Own System</div>
              <div className="text-[10px] text-purple-200">Custom Architecture</div>
            </div>
          </div>
        </button>

        {/* BUILD A WORLD (PLANETARY BIOSPERE) BUTTON */}
        <button
          onClick={() => setSelectedPresetId("world_builder")}
          className={`p-3 rounded-2xl border text-left shrink-0 transition-all cursor-pointer min-w-[190px] ${
            selectedPresetId === "world_builder"
              ? "bg-emerald-600 border-emerald-400 text-white shadow-lg ring-2 ring-emerald-400/40"
              : "bg-emerald-950/40 border-emerald-800 text-emerald-300 hover:bg-emerald-900/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-black text-xs leading-tight text-white">Build a World</div>
              <div className="text-[10px] text-emerald-200">Planetary Biosphere</div>
            </div>
          </div>
        </button>

        {/* SCIENTIFIC DISCOVERY REASONING LOOP BUTTON */}
        <button
          onClick={() => setSelectedPresetId("discovery_loop")}
          className={`p-3 rounded-2xl border text-left shrink-0 transition-all cursor-pointer min-w-[200px] ${
            selectedPresetId === "discovery_loop"
              ? "bg-cyan-600 border-cyan-400 text-white shadow-lg ring-2 ring-cyan-400/40"
              : "bg-cyan-950/40 border-cyan-800 text-cyan-300 hover:bg-cyan-900/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔄</span>
            <div>
              <div className="font-black text-xs leading-tight text-white">How Science Discovers</div>
              <div className="text-[10px] text-cyan-200">The 10-Step Loop</div>
            </div>
          </div>
        </button>
      </div>

      {/* Render Selected View */}
      {selectedPresetId === "discovery_loop" ? (
        <ScientificDiscoveryLoop />
      ) : selectedPresetId === "world_builder" ? (
        <PlanetaryWorldBuilder />
      ) : selectedPresetId === "custom_builder" ? (
        <CustomSystemBuilder />
      ) : (
        <>
          {/* Active System Overview Banner */}
          <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-800/60 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activePreset.icon}</span>
                <h4 className="text-base font-bold text-white">{activePreset.systemName}</h4>
              </div>
              <p className="text-xs text-indigo-200 mt-1 max-w-2xl">{activePreset.systemDescription}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleTriggerStress}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Stress Test System</span>
              </button>

              <button
                onClick={handleResetInputs}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* THE 3-PILLAR INTERACTIVE WORKBENCH */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PILLAR 1: INPUTS (Tunable Sliders) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> 1. System Inputs
                  </span>
                  <span className="text-[10px] text-slate-400">Drag to modulate</span>
                </div>

                <div className="space-y-4">
                  {activePreset.inputs.map((input) => {
                    const currentVal = inputValues[input.name] ?? input.value;
                    return (
                      <div key={input.name} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-slate-200 flex items-center gap-1.5">
                            <span>{input.icon}</span>
                            <span>{input.name}</span>
                          </span>
                          <span className="font-mono text-cyan-400 font-bold bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                            {currentVal} {input.unit}
                          </span>
                        </div>

                        {input.max === 1 ? (
                          // Binary switch toggle
                          <button
                            onClick={() => handleInputChange(input.name, currentVal === 1 ? 0 : 1)}
                            className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              currentVal === 1
                                ? "bg-emerald-600 text-white"
                                : "bg-rose-900/80 text-rose-200 border border-rose-700"
                            }`}
                          >
                            {currentVal === 1 ? "🔒 CLOSED (Circuit Active)" : "🔓 OPEN (Circuit Broken)"}
                          </button>
                        ) : (
                          <input
                            type="range"
                            min={input.min}
                            max={input.max}
                            step={input.step}
                            value={currentVal}
                            onChange={(e) => handleInputChange(input.name, parseFloat(e.target.value))}
                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                          />
                        )}

                        <p className="text-[10px] text-slate-400 mt-1 leading-snug">{input.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 text-center">
                Energy & Matter enter the system
              </div>
            </div>

            {/* PILLAR 2: PROCESSES (Internal Transformations) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> 2. Active Processes
                  </span>
                  <span className="text-[10px] text-emerald-400/80 font-mono">Running Real-Time</span>
                </div>

                <div className="space-y-3">
                  {activePreset.processes.map((proc, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
                        <span className="text-base">{proc.icon}</span>
                        <span>{proc.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-snug">{proc.description}</p>
                      {proc.formula && (
                        <div className="mt-1.5 font-mono text-[10px] text-emerald-300 bg-slate-950 p-1.5 rounded-lg border border-emerald-950">
                          {proc.formula}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400/90 text-center font-bold">
                ⚡ Chemical bonds, forces & equations execute
              </div>
            </div>

            {/* PILLAR 3: OUTPUTS & METRICS */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> 3. System Outputs
                  </span>
                  <span className="text-[10px] text-slate-400">Calculated State</span>
                </div>

                <div className="space-y-3">
                  {activePreset.outputs.map((out) => {
                    const val = out.calculate(inputValues);
                    return (
                      <div key={out.name} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <span>{out.icon}</span>
                            <span>{out.name}</span>
                          </span>
                          <span className="text-sm font-black font-mono text-amber-300">
                            {val} {out.unit}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-snug">{out.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-amber-300/80 text-center font-bold">
                ✨ Observable state & work done
              </div>
            </div>
          </div>

          {/* PILLAR 4: SYSTEM FEEDBACK & HOMEOSTASIS EQUILIBRIUM */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-950 border border-rose-900/60 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="font-bold text-rose-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-rose-400" />
                4. Self-Correcting Feedback Loop & Homeostasis:
              </span>
              <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                🎯 Target: {activePreset.homeostasisTarget}
              </span>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {activePreset.feedbackRule}
            </p>

            {onNavigateTo && (
              <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Want to master this system in detail?
                </span>
                <button
                  onClick={() => onNavigateTo(activePreset.targetLesson)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Explore Dedicated Lesson</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* EPISTEMOLOGY INSPECTOR: REALITY ➔ MODEL ➔ EVIDENCE ➔ EXPLANATION */}
          <div className="mt-6">
            <RealityModelEvidencePanel
              epistemology={
                activePreset.epistemology ||
                REALITY_MODEL_MAP[activePreset.id] ||
                REALITY_MODEL_MAP.systems
              }
              topicTitle={activePreset.systemName}
            />
          </div>
        </>
      )}
    </div>
  );
};

