import React, { useState } from "react";
import {
  Sparkles,
  Plus,
  Trash2,
  Play,
  RotateCcw,
  BookOpen,
  Sliders,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Layers,
  ArrowRight,
  Scale,
} from "lucide-react";
import { CUSTOM_BUILDER_STARTER_PRESETS } from "../../data/realityModelData";
import { RealityModelEvidencePanel } from "./RealityModelEvidencePanel";
import { ConservationAccountingWidget } from "./ConservationAccountingWidget";
import { SystemBoundaryWidget } from "./SystemBoundaryWidget";
import { FeedbackEngineWidget } from "./FeedbackEngineWidget";

export interface CustomInput {
  name: string;
  icon: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  description: string;
}

export interface CustomProcess {
  name: string;
  icon: string;
  description: string;
  formula?: string;
}

export interface CustomOutput {
  name: string;
  icon: string;
  unit: string;
  description: string;
  formulaType: "proportional" | "inverse" | "balanced" | "custom";
}

export const CustomSystemBuilder: React.FC = () => {
  // Active Starter Template
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("plant");

  // System Identity
  const [systemName, setSystemName] = useState<string>("A Living Houseplant");
  const [systemIcon, setSystemIcon] = useState<string>("🪴");
  const [systemCategory, setSystemCategory] = useState<string>("BOTANY & PLANT BIOLOGY");
  const [systemDescription, setSystemDescription] = useState<string>(
    "A self-nourishing plant system capturing solar photons and water to build cellulose stems and release oxygen."
  );

  // Inputs
  const [inputs, setInputs] = useState<CustomInput[]>([
    { name: "Sunlight (Hours/Day)", icon: "☀️", unit: "hrs", value: 6, min: 0, max: 14, step: 1, description: "Hours of direct window light" },
    { name: "Watering Frequency", icon: "💧", unit: "ml/wk", value: 250, min: 0, max: 800, step: 50, description: "Weekly moisture added to soil" },
    { name: "Soil Nutrients", icon: "🌱", unit: "% quality", value: 70, min: 10, max: 100, step: 5, description: "Fertilizer minerals (N, P, K)" },
  ]);

  // Processes
  const [processes, setProcesses] = useState<CustomProcess[]>([
    { name: "Chloroplast Photosynthesis", icon: "🍃", description: "Leaf cells capture photons to synthesize glucose.", formula: "Light + CO₂ + H₂O ➔ Sugar + O₂" },
    { name: "Root Nutrient Uptake", icon: "🪵", description: "Osmosis pulls water and dissolved minerals up xylem vessels." },
    { name: "Stomatal Transpiration", icon: "🫧", description: "Leaf pores release water vapor and oxygen gas." },
  ]);

  // Outputs
  const [outputs, setOutputs] = useState<CustomOutput[]>([
    { name: "New Leaf Growth Rate", icon: "🌿", unit: "mm/week", description: "Speed of stem elongation and new leaf sprouting.", formulaType: "balanced" },
    { name: "Oxygen Exhaled", icon: "🫧", unit: "L/day", description: "Fresh oxygen gas released into the room.", formulaType: "proportional" },
    { name: "Plant Health Score", icon: "💚", unit: "/100", description: "Overall vitality and leaf turgor pressure.", formulaType: "balanced" },
  ]);

  // Feedback & Equilibrium
  const [feedbackRule, setFeedbackRule] = useState<string>(
    "If underwatered, leaf stomata close to save moisture, slowing photosynthesis and oxygen release until rain returns."
  );
  const [homeostasisTarget, setHomeostasisTarget] = useState<string>(
    "Leaf Turgor & Hydration Equilibrium"
  );

  // Live input modulation values
  const [liveValues, setLiveValues] = useState<Record<string, number>>({
    "Sunlight (Hours/Day)": 6,
    "Watering Frequency": 250,
    "Soil Nutrients": 70,
  });

  const [hasSavedToJournal, setHasSavedToJournal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"testbench" | "builder" | "conservation" | "boundaries" | "epistemology">("testbench");

  // Load starter template
  const handleLoadTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setHasSavedToJournal(false);

    if (templateId === "blank") {
      setSystemName("My Custom System");
      setSystemIcon("⚙️");
      setSystemCategory("GENERAL SYSTEM ARCHITECTURE");
      setSystemDescription("A unique system model designed by a young scientist to test inputs, transformations, and outputs.");
      setInputs([
        { name: "Primary Energy Input", icon: "⚡", unit: "Joules", value: 50, min: 0, max: 100, step: 5, description: "Raw thermodynamic energy entering system" },
        { name: "Raw Material Input", icon: "📦", unit: "kg", value: 20, min: 0, max: 100, step: 5, description: "Physical matter passing through boundary" },
      ]);
      setProcesses([
        { name: "Core Transformation Process", icon: "🔄", description: "The internal mechanism converting incoming energy and matter.", formula: "Input Energy + Matter ➔ Work + Waste Heat" },
      ]);
      setOutputs([
        { name: "Useful Work Output", icon: "✨", unit: "Work Units", description: "Net beneficial output produced by the system.", formulaType: "proportional" },
        { name: "System Stability", icon: "⚖️", unit: "%", description: "Equilibrium state under current input flux.", formulaType: "balanced" },
      ]);
      setFeedbackRule("When output drops below threshold, the system triggers internal adjustments to stabilize.");
      setHomeostasisTarget("Steady-State Dynamic Equilibrium");
      setLiveValues({ "Primary Energy Input": 50, "Raw Material Input": 20 });
      return;
    }

    const tpl = CUSTOM_BUILDER_STARTER_PRESETS.find((p) => p.id === templateId);
    if (!tpl) return;

    setSystemName(tpl.name);
    setSystemIcon(tpl.icon);
    setSystemCategory(tpl.category);
    setSystemDescription(tpl.description);
    setInputs(tpl.suggestedInputs);
    setProcesses(tpl.processes);
    setOutputs(tpl.outputs.map(o => ({
      name: o.name,
      icon: o.icon,
      unit: o.unit,
      description: o.description,
      formulaType: "balanced"
    })));
    setFeedbackRule(tpl.feedbackRule);
    setHomeostasisTarget(tpl.homeostasisTarget);

    const initVals: Record<string, number> = {};
    tpl.suggestedInputs.forEach((i) => {
      initVals[i.name] = i.value;
    });
    setLiveValues(initVals);
  };

  // Helper calculation for custom outputs
  const calculateOutputValue = (out: CustomOutput): number => {
    const inputEntries = Object.entries(liveValues);
    if (inputEntries.length === 0) return 50;

    const firstVal = Number(inputEntries[0][1]) || 50;
    const secondVal = Number(inputEntries.length > 1 ? inputEntries[1][1] : firstVal) || 50;

    if (out.formulaType === "proportional") {
      return Number(((firstVal * 0.7 + secondVal * 0.3) * 0.9).toFixed(1));
    }
    if (out.formulaType === "inverse") {
      return Number((100 - (firstVal * 0.6 + secondVal * 0.4)).toFixed(1));
    }
    // Balanced peak around midpoint
    const avg = (firstVal + secondVal) / 2;
    const balance = Math.max(10, 100 - Math.abs(avg - 50) * 1.5);
    return Math.round(balance);
  };

  // Save to Field Journal
  const handleSaveToJournal = () => {
    try {
      const saved = localStorage.getItem("young_scientist_journal");
      const entries = saved ? JSON.parse(saved) : [];
      const newEntry = {
        id: `sys_build_${Date.now()}`,
        moduleId: "systems",
        lessonTitle: `System Builder: ${systemName}`,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        question: `How does the system "${systemName}" maintain balance when inputs change?`,
        hypothesis: `If inputs are modulated, the processes (${processes.map((p) => p.name).join(", ")}) will adjust outputs to maintain ${homeostasisTarget}.`,
        observation: `Tested inputs with live slider adjustments. Observed dynamic output responsiveness: ${outputs.map((o) => `${o.name} = ${calculateOutputValue(o)} ${o.unit}`).join("; ")}.`,
        conclusion: `Verified that "${systemName}" obeys the Universal System Pipeline (Inputs ➔ System ➔ Processes ➔ Outputs ➔ Feedback ➔ Equilibrium).`,
        confidenceRating: 5,
      };
      entries.unshift(newEntry);
      localStorage.setItem("young_scientist_journal", JSON.stringify(entries));
      setHasSavedToJournal(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/60 shadow-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
              YOUNG SCIENTIST ARCHITECTURE STUDIO
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            Build Your Own Scientific System
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Construct any system in the universe from scratch: choose what enters, what transforms inside, what leaves, and how feedback maintains balance.
          </p>
        </div>

        {/* Mode Tabs */}
        <div className="flex flex-wrap items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto gap-1">
          <button
            onClick={() => setActiveTab("testbench")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "testbench"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>1. Run & Test</span>
          </button>
          <button
            onClick={() => setActiveTab("builder")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "builder"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>2. Customize Blueprint</span>
          </button>
          <button
            onClick={() => setActiveTab("conservation")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "conservation"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>3. ⚖️ Conservation Budget</span>
          </button>
          <button
            onClick={() => setActiveTab("boundaries")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "boundaries"
                ? "bg-cyan-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4. 🌐 Boundaries & Feedback</span>
          </button>
          <button
            onClick={() => setActiveTab("epistemology")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "epistemology"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>5. 🔬 Reality vs Model</span>
          </button>
        </div>
      </div>

      {/* Starter Template Selector */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Select Starter Architecture Template:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {CUSTOM_BUILDER_STARTER_PRESETS.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => handleLoadTemplate(tpl.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                selectedTemplateId === tpl.id
                  ? "bg-indigo-600 border-indigo-400 text-white shadow-md ring-2 ring-indigo-400/40"
                  : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750"
              }`}
            >
              <div className="text-2xl mb-1">{tpl.icon}</div>
              <div className="font-extrabold text-xs text-white">{tpl.name}</div>
              <div className="text-[10px] opacity-75">{tpl.category.split(" ")[0]}</div>
            </button>
          ))}
          <button
            onClick={() => handleLoadTemplate("blank")}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
              selectedTemplateId === "blank"
                ? "bg-purple-600 border-purple-400 text-white shadow-md ring-2 ring-purple-400/40"
                : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-750"
            }`}
          >
            <div className="text-2xl mb-1">🛠️</div>
            <div className="font-extrabold text-xs text-white">Start From Scratch</div>
            <div className="text-[10px] opacity-75">Custom Blank Model</div>
          </button>
        </div>
      </div>

      {/* TAB 1: RUN & TEST INTERACTIVE WORKBENCH */}
      {activeTab === "testbench" && (
        <div className="space-y-6">
          {/* Active System Card */}
          <div className="p-5 rounded-2xl bg-indigo-950/60 border border-indigo-800/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{systemIcon}</span>
                <div>
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    {systemCategory}
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white">{systemName}</h4>
                </div>
              </div>
              <p className="text-xs text-indigo-200 mt-1 max-w-2xl">{systemDescription}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveToJournal}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{hasSavedToJournal ? "Saved in Journal!" : "Log to Field Notebook"}</span>
              </button>
            </div>
          </div>

          {hasSavedToJournal && (
            <div className="p-3 rounded-xl bg-teal-900/60 border border-teal-500 text-teal-200 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                System "{systemName}" successfully logged into your Young Scientist Field Notebook with full empirical measurements!
              </span>
            </div>
          )}

          {/* 3 Pillar Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PILLAR 1: CUSTOM INPUTS */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5" /> 1. What Enters? (Inputs)
                  </span>
                  <span className="text-[10px] text-slate-400">Modulate</span>
                </div>

                <div className="space-y-3.5">
                  {inputs.map((inp) => {
                    const currentVal = liveValues[inp.name] ?? inp.value;
                    return (
                      <div key={inp.name} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="font-bold text-slate-200 flex items-center gap-1.5">
                            <span>{inp.icon}</span>
                            <span>{inp.name}</span>
                          </span>
                          <span className="font-mono text-cyan-400 font-bold bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                            {currentVal} {inp.unit}
                          </span>
                        </div>

                        <input
                          type="range"
                          min={inp.min}
                          max={inp.max}
                          step={inp.step}
                          value={currentVal}
                          onChange={(e) =>
                            setLiveValues((prev) => ({
                              ...prev,
                              [inp.name]: parseFloat(e.target.value),
                            }))
                          }
                          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                        <p className="text-[10px] text-slate-400 mt-1">{inp.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center font-bold">
                Energy & matter cross system boundary
              </div>
            </div>

            {/* PILLAR 2: CUSTOM PROCESSES */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> 2. What Happens Inside?
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Transforming</span>
                </div>

                <div className="space-y-3">
                  {processes.map((proc, pIdx) => (
                    <div key={pIdx} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
                        <span className="text-base">{proc.icon}</span>
                        <span>{proc.name}</span>
                      </div>
                      <p className="text-[10px] text-slate-300">{proc.description}</p>
                      {proc.formula && (
                        <div className="mt-1.5 font-mono text-[10px] text-emerald-300 bg-slate-950 p-1.5 rounded-lg border border-emerald-950">
                          {proc.formula}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400 text-center font-bold">
                Chemical reactions & mechanical transformations
              </div>
            </div>

            {/* PILLAR 3: CUSTOM OUTPUTS */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-amber-900/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> 3. What Leaves? (Outputs)
                  </span>
                  <span className="text-[10px] text-slate-400">Live Result</span>
                </div>

                <div className="space-y-3">
                  {outputs.map((out, oIdx) => {
                    const val = calculateOutputValue(out);
                    return (
                      <div key={oIdx} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                            <span>{out.icon}</span>
                            <span>{out.name}</span>
                          </span>
                          <span className="text-sm font-black font-mono text-amber-300">
                            {val} {out.unit}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400">{out.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-amber-300 text-center font-bold">
                Observable states, work done & waste heat
              </div>
            </div>
          </div>

          {/* Feedback & Equilibrium Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-rose-950/40 to-slate-950 border border-rose-900/60 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="font-bold text-rose-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-rose-400" />
                4. Feedback & Homeostasis:
              </span>
              <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                🎯 Equilibrium Target: {homeostasisTarget}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">{feedbackRule}</p>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMIZE BLUEPRINT FORM */}
      {activeTab === "builder" && (
        <div className="space-y-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">System Name</label>
              <input
                type="text"
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">System Icon & Category</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={systemIcon}
                  onChange={(e) => setSystemIcon(e.target.value)}
                  className="w-16 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center text-lg focus:outline-none"
                />
                <input
                  type="text"
                  value={systemCategory}
                  onChange={(e) => setSystemCategory(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">System Boundary & Description</label>
            <textarea
              value={systemDescription}
              onChange={(e) => setSystemDescription(e.target.value)}
              className="w-full h-16 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
            />
          </div>

          {/* Feedback loop settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Homeostasis Target</label>
              <input
                type="text"
                value={homeostasisTarget}
                onChange={(e) => setHomeostasisTarget(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Self-Regulating Feedback Rule</label>
              <input
                type="text"
                value={feedbackRule}
                onChange={(e) => setFeedbackRule(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveTab("testbench")}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Save & Launch Test Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: CONSERVATION BUDGET ACCOUNTING */}
      {activeTab === "conservation" && (
        <ConservationAccountingWidget
          systemName={systemName}
          totalEnergyInput={100}
          totalMatterInput={100}
        />
      )}

      {/* TAB 4: SYSTEM BOUNDARIES & DUAL FEEDBACK LOOPS */}
      {activeTab === "boundaries" && (
        <div className="space-y-6">
          <SystemBoundaryWidget />
          <FeedbackEngineWidget />
        </div>
      )}

      {/* TAB 5: EPISTEMOLOGY (REALITY VS MODEL) */}
      {activeTab === "epistemology" && (
        <RealityModelEvidencePanel
          epistemology={{
            reality: `A real ${systemName} interacts with hundreds of environmental micro-factors, thermodynamic losses, and surrounding ecosystems.`,
            model: `Our custom ${systemName} model simplifies these complex factors into ${inputs.length} key input variables, ${processes.length} transformation steps, and ${outputs.length} output metrics.`,
            whySimplify:
              "Simplifying allows us to directly test hypotheses, identify the core feedback mechanisms, and predict how the system responds to environmental changes.",
            evidence:
              "Scientists gather real sensor readings, mass measurements, and energetic rates to verify that the model's equations accurately reflect physical reality.",
            explanation:
              "Every physical system conserves energy and mass while using feedback to maintain equilibrium in an open universe.",
          }}
          topicTitle={systemName}
          defaultExpanded={true}
        />
      )}
    </div>
  );
};
