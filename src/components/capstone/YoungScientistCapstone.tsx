import React, { useState } from "react";
import {
  Award,
  Compass,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  Send,
  Eye,
  Brain,
  TrendingUp,
  FlaskConical,
  Activity,
  Layers,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { EpistemicKnowledgeQuad } from "../common/EpistemicKnowledgeQuad";

export const YoungScientistCapstone: React.FC = () => {
  // Capstone stages: 1: OBSERVE -> 2: MODEL -> 3: PREDICT -> 4: EXPERIMENT -> 5: EVALUATE -> 6: DEFEND & GRADUATION
  const [capstoneStage, setCapstoneStage] = useState<number>(1);
  const [selectedEnergySource, setSelectedEnergySource] = useState<string | null>(null);
  const [selectedMatterFlow, setSelectedMatterFlow] = useState<string | null>(null);
  const [predictionHypothesis, setPredictionHypothesis] = useState<string | null>(null);
  const [experimentRan, setExperimentRan] = useState<boolean>(false);
  const [defenseAnswers, setDefenseAnswers] = useState<{ [key: string]: string }>({});
  const [isGraduated, setIsGraduated] = useState<boolean>(false);
  const [scientistName, setScientistName] = useState<string>("Alex");

  const handleRunExperiment = () => {
    setExperimentRan(true);
  };

  const handleCompleteGraduation = () => {
    setIsGraduated(true);
    try {
      localStorage.setItem("young_scientist_graduated", "true");
      localStorage.setItem("young_scientist_name", scientistName);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/60 shadow-2xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800">
              <Award className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
              THE YOUNG SCIENTIST CAPSTONE DEFENSE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            🎓 The Grand Scientific Investigation & Graduation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Real science isn't memorizing multiple-choice answers. Investigate an entirely unfamiliar alien system: <strong>Observe ➔ Model ➔ Predict ➔ Experiment ➔ Explain ➔ Defend</strong>.
          </p>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2">
          {isGraduated ? (
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold text-xs flex items-center gap-1.5 shadow-md">
              <CheckCircle2 className="w-4 h-4" /> Graduated Master Scientist
            </span>
          ) : (
            <span className="px-3.5 py-1.5 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold text-xs">
              Stage {capstoneStage} of 6
            </span>
          )}
        </div>
      </div>

      {/* STAGES PROGRESS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-bold">
        {[
          { num: 1, label: "1. Observe", icon: "👀" },
          { num: 2, label: "2. Build Model", icon: "🔵" },
          { num: 3, label: "3. Predict", icon: "🔮" },
          { num: 4, label: "4. Experiment", icon: "🧪" },
          { num: 5, label: "5. Evaluate", icon: "⚖️" },
          { num: 6, label: "6. Defend & Graduate", icon: "🏆" },
        ].map((st) => (
          <div
            key={st.num}
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-center gap-1.5 ${
              capstoneStage === st.num
                ? "bg-amber-900/80 border-amber-400 text-white shadow-lg ring-2 ring-amber-400/40"
                : capstoneStage > st.num
                ? "bg-emerald-950/70 border-emerald-800 text-emerald-300"
                : "bg-slate-950 border-slate-800 text-slate-500"
            }`}
          >
            <span>{st.icon}</span>
            <span className="truncate">{st.label}</span>
          </div>
        ))}
      </div>

      {/* EXPLICIT FICTIONAL SCIENTIFIC SCENARIO DISCLAIMER BOX */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-900/60 border border-amber-700 text-xl shrink-0">
          🪐
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300">
              🪐 FICTIONAL SCIENTIFIC SCENARIO
            </span>
            <span className="text-[10px] font-mono text-amber-400/80 border border-amber-800 px-1.5 py-0.5 rounded">
              Epistemic Distinction: Model vs Observed Evidence
            </span>
          </div>
          <p className="text-xs text-amber-200/90 leading-relaxed">
            <strong>Scientists have not discovered life on Europa.</strong> In this simulation, we imagine what an ecosystem around a hydrothermal vent might look like, based on Earth's deep ocean trench ecosystems. As real young scientists, we always distinguish: <strong>known empirical evidence → hypothesis → model → imagination</strong>.
          </p>
        </div>
      </div>

      {/* THE UNFAMILIAR SYSTEM DOSSIER */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
            UNFAMILIAR PHENOMENON DOSSIER: SIMULATED MISSION DEEP-ABYSS
          </span>
          <span className="text-xs text-slate-400">Environment: 0% Sunlight, 4,000m Depth</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <strong className="block text-white mb-1">📍 The Setting:</strong>
            Deep subterranean ocean beneath a 15-mile sheet of solid ice. Zero photons of solar light have ever touched this water.
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <strong className="block text-white mb-1">🌋 The Observation:</strong>
            A flourishing colony of giant tube worms, blind shrimp, and glowing crab organisms clusters around superheated mineral chimneys spewing hydrogen sulfide ($H_2S$) at 320°C.
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
            <strong className="block text-white mb-1">❓ The Scientific Mystery:</strong>
            How is an entire complex ecosystem thriving with huge biomass if there is ZERO sunlight for photosynthesis?
          </div>
        </div>
      </div>

      {/* STAGE 1: OBSERVE REALITY */}
      {capstoneStage === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Stage 1: Multi-Sensor Empirical Observations
            </span>
            <span className="text-xs text-slate-400">Collect baseline sensor readings</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Photon Flux (Light)</span>
              <div className="text-base font-black text-slate-200">0.00 Lux</div>
              <p className="text-[11px] text-slate-400">Total pitch black darkness.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Thermal Vent Flux</span>
              <div className="text-base font-black text-amber-400">318°C Vent Output</div>
              <p className="text-[11px] text-slate-400">Enormous geothermal heat release.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Chemical Inflow ($H_2S$)</span>
              <div className="text-base font-black text-purple-400">High Sulfide & Iron</div>
              <p className="text-[11px] text-slate-400">Abundant inorganic chemical bonds.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Microbial Biomass</span>
              <div className="text-base font-black text-emerald-400">Dense Chemosynthetic Mats</div>
              <p className="text-[11px] text-slate-400">Thick white mats of active bacteria.</p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCapstoneStage(2)}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Build Conceptual Scientific Model</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: BUILD CONCEPTUAL MODEL */}
      {capstoneStage === 2 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Stage 2: Model Energy & Matter Transformation
            </span>
            <span className="text-xs text-slate-400">Connect the physical mechanism</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Energy Mechanism Choice */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-200">
                1. What is the fundamental Primary Energy Source?
              </span>
              <div className="space-y-2">
                {[
                  { id: "e1", text: "Cosmic X-rays penetrating 15 miles of ice." },
                  { id: "e2", text: "Chemosynthesis: Energy released from breaking chemical bonds in volcanic $H_2S$ sulfide minerals." },
                  { id: "e3", text: "The tube worms create energy out of nothing (breaking conservation)." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedEnergySource(opt.id)}
                    className={`w-full p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                      selectedEnergySource === opt.id
                        ? "bg-amber-950 border-amber-400 text-white ring-2 ring-amber-400/40"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Matter Conservation Choice */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-200">
                2. Where do the Carbon atoms for animal bodies come from?
              </span>
              <div className="space-y-2">
                {[
                  { id: "m1", text: "Autotrophic chemosynthetic bacteria fix dissolved $CO_2$ carbon in seawater into sugar biomolecules." },
                  { id: "m2", text: "The animals eat rocks directly without any autotroph bacteria." },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedMatterFlow(opt.id)}
                    className={`w-full p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                      selectedMatterFlow === opt.id
                        ? "bg-amber-950 border-amber-400 text-white ring-2 ring-amber-400/40"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850"
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCapstoneStage(1)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
            >
              ← Back to Observations
            </button>
            <button
              disabled={selectedEnergySource !== "e2" || selectedMatterFlow !== "m1"}
              onClick={() => setCapstoneStage(3)}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Formulate Quantitative Prediction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: MAKE QUANTITATIVE PREDICTION */}
      {capstoneStage === 3 && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-cyan-400">
            <Brain className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              Stage 3: Deductive Prediction Test
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white">
            "If we deploy a thermal dampener to reduce the geothermal vent mineral flow by 60%, what MUST happen to the tube worm biomass according to your model?"
          </h3>

          <div className="space-y-2">
            {[
              {
                id: "p1",
                text: "PREDICTION A: Tube worm biomass will drop proportionally by ~60% because chemosynthetic energy input dropped (Conservation of Energy).",
              },
              {
                id: "p2",
                text: "PREDICTION B: Tube worms will switch to photosynthesis in complete darkness and increase by 200%.",
              },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPredictionHypothesis(p.id)}
                className={`w-full p-4 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                  predictionHypothesis === p.id
                    ? "bg-amber-950 border-amber-400 text-white ring-2 ring-amber-400/40"
                    : "bg-slate-900 border-slate-800 text-slate-300"
                }`}
              >
                {p.text}
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCapstoneStage(2)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
            >
              ← Back to Model
            </button>
            <button
              disabled={predictionHypothesis !== "p1"}
              onClick={() => setCapstoneStage(4)}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Run Controlled Experiment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: CONTROLLED EXPERIMENT WITH UNCERTAINTY */}
      {capstoneStage === 4 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Stage 4: Run Submersible Field Experiment
            </span>
            <span className="text-xs text-slate-400">Take repeated sensor trials</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-white">
                  Intervention: Reducing Vent Sulfide Inflow by -60%
                </h4>
                <p className="text-xs text-slate-400">
                  Submersible robotic probes collect 4 sequential biomass samples around the vent collar.
                </p>
              </div>
              <button
                onClick={handleRunExperiment}
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md self-start sm:self-auto"
              >
                <FlaskConical className="w-4 h-4" />
                <span>{experimentRan ? "Re-sample Readings" : "Activate Probes & Measure"}</span>
              </button>
            </div>

            {experimentRan && (
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Trial 1</span>
                    <strong className="text-amber-300">41.2 kg/m² (-59%)</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Trial 2</span>
                    <strong className="text-amber-300">39.8 kg/m² (-60%)</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Trial 3</span>
                    <strong className="text-amber-300">40.5 kg/m² (-59.5%)</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Trial 4</span>
                    <strong className="text-amber-300">40.1 kg/m² (-60%)</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-800 text-center text-xs">
                  <span className="text-slate-400">Mean Empirical Measurement:</span>{" "}
                  <strong className="text-teal-300 font-mono text-sm">
                    40.4 ± 0.7 kg/m² (Biomass dropped by 59.6% ± 0.7%)
                  </strong>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCapstoneStage(3)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
            >
              ← Back to Prediction
            </button>
            <button
              disabled={!experimentRan}
              onClick={() => setCapstoneStage(5)}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Evaluate Model Against Evidence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 5: EVALUATE & SYNTHESIZE */}
      {capstoneStage === 5 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">
                Stage 5: Scientific Model Evaluation
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white">
              "The experimental evidence matches our Chemosynthesis Model within experimental uncertainty (±0.7%)!"
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Because biomass dropped by ~60% when chemical energy inflow was reduced by 60%, we have validated that life in hydrothermal vents operates through <strong>Chemosynthetic Energy Transfer</strong> under strict <strong>First Law Conservation of Energy</strong>.
            </p>
          </div>

          {/* Epistemic Knowledge Quad: What Do You Actually Know? */}
          <EpistemicKnowledgeQuad
            title="Capstone Epistemic Truth Sieve: What Do You Actually Know?"
            observed={[
              "Photons of light = 0.00 Lux in the simulated abyss.",
              "Vents spew superheated mineral fluid (318°C) rich in H₂S and iron.",
              "Throttling vent flow by 60% caused measured biomass to drop to 40.4 ± 0.7 kg/m².",
            ]}
            inferred={[
              "Bacteria break inorganic chemical bonds in H₂S to synthesize organic glucose.",
              "The biomass carrying capacity is strictly bounded by chemical bond energy input.",
            ]}
            modelled={[
              "Chemosynthetic Thermodynamics Model: Energy In (Chemical) = Work + Thermal Dissipation. Energy cannot be created from nothing.",
            ]}
            unknown={[
              "Whether life exists on real moons like Europa (unverified; currently a scientific model based on Earth vents).",
              "The full biochemical genetic lineage of the simulated organisms.",
            ]}
          />

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setCapstoneStage(4)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
            >
              ← Back to Experiment
            </button>
            <button
              onClick={() => setCapstoneStage(6)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Proceed to Capstone Defense & Graduation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 6: SCIENTIFIC DEFENSE & GRADUATION */}
      {capstoneStage === 6 && (
        <div className="space-y-6 animate-in fade-in">
          {!isGraduated ? (
            <div className="p-6 rounded-2xl bg-slate-950 border border-amber-900/80 space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                <Award className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-wider">
                  Stage 6: The Young Scientist Board Defense
                </span>
              </div>

              <h3 className="text-lg font-black text-white">
                Defend your scientific discoveries to the Planetary Science Academy:
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-amber-300">
                    Question 1: Why is science called a self-correcting cycle?
                  </span>
                  <div className="text-xs text-slate-300">
                    "Because scientists constantly test models against empirical evidence. If experimental evidence contradicts a model, scientists must modify or reject the model, regardless of authority."
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-amber-300">
                    Question 2: What is the core difference between an Open and Closed system?
                  </span>
                  <div className="text-xs text-slate-300">
                    "Open systems exchange both matter and energy with their surroundings (like living humans). Closed systems exchange energy but not matter (like Earth's matter cycles)."
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-amber-300">
                    Question 3: Why do good scientists record measurement uncertainty?
                  </span>
                  <div className="text-xs text-slate-300">
                    "Because real-world instruments have precision limits. Averages over repeated trials reveal the true value and express confidence bounds honestly."
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter Your Name for Graduation Diploma"
                  value={scientistName}
                  onChange={(e) => setScientistName(e.target.value)}
                  className="w-full sm:w-72 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                />
                <button
                  onClick={handleCompleteGraduation}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-xl"
                >
                  🎓 Sign & Graduate
                </button>
              </div>
            </div>
          ) : (
            /* OFFICIAL GRADUATION DIPLOMA - MEANINGFUL COMPETENCY-BASED ATTESTATION */
            <div className="p-8 rounded-3xl bg-linear-to-b from-amber-950/80 via-slate-950 to-indigo-950/90 border-4 border-amber-500/80 shadow-2xl text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-amber-500/20 border-2 border-amber-400 text-4xl shadow-inner">
                  🏆
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
                  ACADEMY OF PLANETARY & SYSTEMS SCIENCES
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white">
                  YOUNG SCIENTIST
                </h2>
                <p className="text-xs text-slate-300 italic">
                  "Use science to investigate something you don't already understand."
                </p>
              </div>

              <div className="py-2">
                <span className="text-xs text-slate-400">This certifies that</span>
                <div className="text-2xl sm:text-3xl font-black text-amber-300 underline decoration-amber-500/60 underline-offset-8 mt-1">
                  {scientistName || "Young Scientist"}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                has proven they do not merely memorize facts, but think, experiment, and reason through the natural world like a true scientist.
              </p>

              {/* THE 12 SCIENTIFIC COMPETENCIES CHECKLIST */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/40 text-left space-y-3 max-w-2xl mx-auto">
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 block text-center">
                  You demonstrated that you can:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Observe carefully</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Ask testable questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Build models</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Make predictions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Design investigations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Measure repeatedly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Work with uncertainty</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Use evidence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Recognize feedback</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Track matter and energy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Explain system behaviour</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">☑</span>
                    <span>Identify what is still unknown</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <span className="px-4 py-1.5 rounded-full bg-amber-950/80 border border-amber-600 text-xs font-mono text-amber-300">
                  Authorized Scientific Epistemology Credential
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
