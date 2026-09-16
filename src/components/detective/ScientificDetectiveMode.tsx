import React, { useState } from "react";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Sun,
  Droplets,
  Thermometer,
  Wind,
  Trees,
  Bug,
  Activity,
  Compass,
  Lightbulb,
  ShieldAlert,
  Award,
  BookOpen,
  FlaskConical,
} from "lucide-react";
import { EpistemicKnowledgeQuad } from "../common/EpistemicKnowledgeQuad";

export interface DetectiveMysteryCase {
  id: string;
  title: string;
  badgeName: string;
  icon: string;
  incidentReport: string;
  location: string;
  sensors: {
    solar: { value: string; status: "normal" | "warning" | "danger"; detail: string };
    water: { value: string; status: "normal" | "warning" | "danger"; detail: string };
    temp: { value: string; status: "normal" | "warning" | "danger"; detail: string };
    co2: { value: string; status: "normal" | "warning" | "danger"; detail: string };
    nutrients: { value: string; status: "normal" | "warning" | "danger"; detail: string };
    plants: { value: string; status: "normal" | "warning" | "danger"; detail: string };
    herbivores: { value: string; status: "normal" | "warning" | "danger"; detail: string };
    predators: { value: string; status: "normal" | "warning" | "danger"; detail: string };
    decomposers: { value: string; status: "normal" | "warning" | "danger"; detail: string };
    oxygen: { value: string; status: "normal" | "warning" | "danger"; detail: string };
  };
  questionPrompt: string;
  hypotheses: {
    id: string;
    text: string;
    isRootCause: boolean;
    evidenceEvaluation: string;
  }[];
  scientificMechanism: string;
  correctRestorationAction: string;
  restorationOptions: {
    id: string;
    action: string;
    outcomeText: string;
    isCorrect: boolean;
  }[];
  epistemicBreakdown: {
    observed: string[];
    inferred: string[];
    modelled: string[];
    unknown: string[];
  };
}

export const MYSTERY_CASES: DetectiveMysteryCase[] = [
  {
    id: "case_decomposer",
    title: "Mystery #1: The Starving Forest Canopy",
    badgeName: "Master of Biogeochemical Cycles",
    icon: "🌲",
    location: "Whispering Pines Biosphere Station",
    incidentReport: "Two weeks ago, rangers noticed that green leaves turned pale yellow, stopped producing glucose, and dropped prematurely. Herbivore deer and insect populations collapsed by 85%. Solar energy and rainfall levels have remained perfectly constant.",
    sensors: {
      solar: { value: "98 W/m²", status: "normal", detail: "Abundant sunlight reaching leaves." },
      water: { value: "68% Moisture", status: "normal", detail: "Adequate soil hydration." },
      temp: { value: "21.5°C", status: "normal", detail: "Optimal temperate thermal range." },
      co2: { value: "415 ppm", status: "normal", detail: "Normal atmospheric carbon baseline." },
      nutrients: { value: "4 ppm (N/P)", status: "danger", detail: "CRITICAL: Soil nitrogen and phosphorus depleted!" },
      plants: { value: "12 kg/m²", status: "danger", detail: "Severe chlorosis and dying leaves." },
      herbivores: { value: "5 individuals", status: "danger", detail: "Near starvation and collapse." },
      predators: { value: "1 hawk", status: "warning", detail: "Forced to migrate due to prey shortage." },
      decomposers: { value: "0% (Sterilized)", status: "danger", detail: "CRITICAL: Soil fungi and bacteria wiped out by chemical spray." },
      oxygen: { value: "20.8%", status: "normal", detail: "Atmosphere stable." },
    },
    questionPrompt: "Why did the entire forest food web starve if sunlight, rain, and carbon dioxide were all normal?",
    hypotheses: [
      {
        id: "h1",
        text: "The herbivores were hunted to extinction by invasive apex predators.",
        isRootCause: false,
        evidenceEvaluation: "Sensor data shows predator count is only 1 hawk (low). Predators did not overhunt herbivores.",
      },
      {
        id: "h2",
        text: "Lack of decomposers prevented dead leaves from recycling into soil nutrients, starving plants of nitrogen.",
        isRootCause: true,
        evidenceEvaluation: "TRUE ROOT CAUSE: Decomposer activity is at 0%. Soil minerals dropped to 4 ppm. Without nitrogen, plants cannot synthesize chlorophyll or amino acids!",
      },
      {
        id: "h3",
        text: "Severe atmospheric drought caused plants to dehydrate.",
        isRootCause: false,
        evidenceEvaluation: "Sensor data shows water moisture is 68% (optimal). Dehydration was not the cause.",
      },
    ],
    scientificMechanism: "Matter is conserved in closed cycles. When decomposers were destroyed, organic carbon, nitrogen, and phosphorus remained locked inside dead fallen wood. Soil became sterile, causing primary autotroph collapse that rippled up the trophic food web.",
    correctRestorationAction: "Reintroduce diverse soil mycorrhizal fungi and nitrogen-fixing bacteria to restore the closed nutrient loop.",
    restorationOptions: [
      {
        id: "r1",
        action: "Spray massive chemical liquid nitrogen fertilizers across the entire forest.",
        outcomeText: "Temporary surge, but washes away in the next rain storm without sustained biological recycling.",
        isCorrect: false,
      },
      {
        id: "r2",
        action: "Inoculate soil with rich microbial compost and native mycorrhizal fungi.",
        outcomeText: "SUCCESS: Fungi break down leaf litter, restoring soil nitrogen to 75 ppm! Plants regrow, and herbivores rebound.",
        isCorrect: true,
      },
      {
        id: "r3",
        action: "Release 50 additional deer into the forest immediately.",
        outcomeText: "FAIL: The new deer starve immediately because there is no plant foliage to eat.",
        isCorrect: false,
      },
    ],
    epistemicBreakdown: {
      observed: [
        "Leaves turned yellow and dropped (chlorosis).",
        "Soil nitrogen/phosphorus dropped to 4 ppm.",
        "Decomposer bacterial/fungal activity measured at 0%.",
        "Sunlight (98 W/m²) and soil moisture (68%) stayed optimal.",
      ],
      inferred: [
        "Nutrient cycling broke down at the soil decomposer stage.",
        "Plants lacked nitrogen atoms necessary to build chlorophyll molecules.",
      ],
      modelled: [
        "Closed-loop matter cycling model: In an ecosystem, matter cannot enter from nowhere; it must be recycled from organic detritus by decomposers.",
      ],
      unknown: [
        "Which specific chemical spray originally killed the native soil microbiota.",
        "How many seasons it will take for rare fungal spore strains to naturally repopulate without inoculation.",
      ],
    },
  },
  {
    id: "case_pond",
    title: "Mystery #2: The Midnight Fish Suffocation",
    badgeName: "Aquatic Ecosystem Forensic Expert",
    icon: "🐟",
    location: "Crystal Lake Ecological Reserve",
    incidentReport: "Yesterday morning, thousands of trout and minnows were found floating lifeless at the water surface. No industrial chemical toxins were found. The water temperature was normal (18°C), and water pH was 7.2.",
    sensors: {
      solar: { value: "110 W/m²", status: "normal", detail: "Warm sunny week." },
      water: { value: "100% Full", status: "normal", detail: "Lake water level is normal." },
      temp: { value: "18.2°C", status: "normal", detail: "Normal lake surface temperature." },
      co2: { value: "580 ppm", status: "warning", detail: "Elevated dissolved carbon dioxide." },
      nutrients: { value: "140 ppm (Runoff)", status: "danger", detail: "CRITICAL: Severe agricultural phosphorus surge." },
      plants: { value: "Algal Bloom (+300%)", status: "danger", detail: "Dense green mat of cyanobacteria on surface." },
      herbivores: { value: "Zooplankton (Dead)", status: "danger", detail: "Planktonic crustaceans smothered." },
      predators: { value: "Fish (0 Alive)", status: "danger", detail: "Total fish suffocation." },
      decomposers: { value: "Bacterial Explosion", status: "danger", detail: "Decomposer bacteria multiplying exponentially." },
      oxygen: { value: "0.6 mg/L (Anoxic)", status: "danger", detail: "CRITICAL: Dissolved oxygen near zero! Normal is 8.0 mg/L." },
    },
    questionPrompt: "Why did the aquatic animals suffocate if plants and algae produce oxygen?",
    hypotheses: [
      {
        id: "h1",
        text: "The sun was too hot, boiling the water and cooking the fish.",
        isRootCause: false,
        evidenceEvaluation: "Sensor temp is 18.2°C (perfect for trout). Water was definitely not boiling.",
      },
      {
        id: "h2",
        text: "Nutrient runoff triggered an algal bloom; when algae died, massive bacterial decomposers consumed all dissolved oxygen overnight.",
        isRootCause: true,
        evidenceEvaluation: "TRUE ROOT CAUSE: Eutrophication! Decomposer bacteria consumed all dissolved O₂ during cellular respiration to digest dead algae, leaving 0.6 mg/L.",
      },
      {
        id: "h3",
        text: "Predatory birds dove into the water and consumed all fish within hours.",
        isRootCause: false,
        evidenceEvaluation: "Birds do not leave thousands of intact fish floating with zero dissolved oxygen.",
      },
    ],
    scientificMechanism: "Eutrophication creates an oxygen dead zone. Agricultural fertilizer runoff provides excessive nutrients, creating an unsustainable algal explosion. When algae die, billions of aerobic decomposers multiply, burning up all dissolved oxygen in cellular respiration ($C_6H_{12}O_6 + 6O_2 \\rightarrow 6CO_2 + 6H_2O$), suffocating the gill-breathing animals.",
    correctRestorationAction: "Install wetland riparian buffer zones to filter farm runoff and aerate the water column.",
    restorationOptions: [
      {
        id: "r1",
        action: "Pour chlorine bleach into the lake to kill all microorganisms.",
        outcomeText: "DISASTER: Destroys all life in the lake and poisons the regional aquifer.",
        isCorrect: false,
      },
      {
        id: "r2",
        action: "Install floating aerator bubblers and construct vegetative wetland buffers around farmland.",
        outcomeText: "SUCCESS: Dissolved oxygen surges to 8.4 mg/L, nutrient runoff is naturally filtered, and juvenile fry thrive!",
        isCorrect: true,
      },
    ],
    epistemicBreakdown: {
      observed: [
        "Dissolved oxygen crashed to 0.6 mg/L (anoxic dead zone).",
        "Agricultural phosphorus spiked to 140 ppm.",
        "Massive surface algae bloom followed by bacterial surge.",
        "Water temperature was 18.2°C and pH was 7.2 (normal).",
      ],
      inferred: [
        "Aerobic bacteria consumed all available oxygen during cellular respiration while decomposing dead algal matter.",
        "Oxygen depletion occurred during nighttime hours when photosynthesis ceased.",
      ],
      modelled: [
        "Eutrophication biochemical model: Excess Nutrients ➔ Algal Surge ➔ Algal Die-Off ➔ Microbial Respiration Surge ➔ Anoxic Dead Zone.",
      ],
      unknown: [
        "The exact farm upstream that experienced fertilizer overflow.",
        "Whether dormant fish eggs in the lake sediment will survive in anoxic mud.",
      ],
    },
  },
  {
    id: "case_island",
    title: "Mystery #3: The Vanishing Kelp Forest",
    badgeName: "Trophic Cascade Investigator",
    icon: "🦦",
    location: "Pacific Otter Cove Archipelago",
    incidentReport: "Within three seasons, a lush submarine kelp forest that supported hundreds of fish and crab species transformed into a barren underwater desert (an 'Urchin Barren'). Water temperature and salinity were completely unchanged.",
    sensors: {
      solar: { value: "85 W/m²", status: "normal", detail: "Submarine sunlight penetrating clearly." },
      water: { value: "100% Saline", status: "normal", detail: "Normal marine chemistry." },
      temp: { value: "13.0°C", status: "normal", detail: "Cool coastal upwelling currents." },
      co2: { value: "390 ppm", status: "normal", detail: "Normal ocean dissolved carbon." },
      nutrients: { value: "65 ppm", status: "normal", detail: "Abundant upwelling nitrate and silicate." },
      plants: { value: "Kelp Biomass 2%", status: "danger", detail: "Kelp holdfasts completely eaten away." },
      herbivores: { value: "Sea Urchins (+900%)", status: "danger", detail: "CRITICAL: Massive carpet of spiny sea urchins." },
      predators: { value: "Sea Otters (0 Count)", status: "danger", detail: "Apex predator sea otters disappeared!" },
      decomposers: { value: "Normal", status: "normal", detail: "Marine decomposers stable." },
      oxygen: { value: "8.5 mg/L", status: "normal", detail: "Well-aerated swell." },
    },
    questionPrompt: "Why did the kelp plants vanish if light, temperature, and water nutrients were completely normal?",
    hypotheses: [
      {
        id: "h1",
        text: "The kelp ran out of seawater to drink.",
        isRootCause: false,
        evidenceEvaluation: "Kelp lives fully submerged in the Pacific Ocean.",
      },
      {
        id: "h2",
        text: "Top-Down Trophic Cascade: Loss of sea otters allowed sea urchin herbivores to explode and overgraze the entire kelp forest.",
        isRootCause: true,
        evidenceEvaluation: "TRUE ROOT CAUSE: Without sea otters keeping urchins in check, urchin herbivores multiplied 9x and chewed through the roots of all giant kelp plants!",
      },
      {
        id: "h3",
        text: "Submarine volcanic eruptions boiled the kelp roots.",
        isRootCause: false,
        evidenceEvaluation: "Water temperature is 13.0°C. No thermal volcanic activity was detected.",
      },
    ],
    scientificMechanism: "A Top-Down Trophic Cascade. Sea otters are keystone predators. When otters are removed, their herbivorous prey (sea urchins) experience exponential growth without negative feedback regulation, overgrazing the primary autotrophs (kelp) to near extinction.",
    correctRestorationAction: "Reintroduce protected sea otters to re-establish natural negative feedback on the urchin population.",
    restorationOptions: [
      {
        id: "r1",
        action: "Plant millions of plastic synthetic kelp stalks.",
        outcomeText: "FAIL: Plastic provides no biological nutrition or real ecosystem function.",
        isCorrect: false,
      },
      {
        id: "r2",
        action: "Establish marine protected sanctuary and reintroduce 30 healthy sea otters.",
        outcomeText: "SUCCESS: Otters prey upon urchins, bringing urchin numbers down by 80%. Giant kelp regrows into towering underwater forests!",
        isCorrect: true,
      },
    ],
    epistemicBreakdown: {
      observed: [
        "Kelp biomass crashed from 100% to 2%.",
        "Sea urchin population exploded by +900%.",
        "Sea otter predator count was recorded at 0.",
        "Abiotic variables (light, temperature, salinity, O₂) were completely unchanged.",
      ],
      inferred: [
        "Sea otters served as a vital negative feedback controller on urchins.",
        "Urchin overgrazing directly consumed kelp holdfast anchors.",
      ],
      modelled: [
        "Trophic Cascade Model: Apex Predator (-) ➔ Herbivore (+) ➔ Primary Producer (-). Removing apex regulation destabilizes the entire food web.",
      ],
      unknown: [
        "Why the original sea otter population vanished (disease, migration, or human harvesting).",
        "Exact recovery time required for giant kelp holdfast spores to re-anchor across the rocky seabed.",
      ],
    },
  },
];

export const ScientificDetectiveMode: React.FC = () => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState<number>(0);
  const activeCase = MYSTERY_CASES[selectedCaseIndex];

  // Investigation Pipeline Steps: 1: OBSERVE -> 2: QUESTION -> 3: HYPOTHESIZE -> 4: EVIDENCE -> 5: RESTORE -> 6: DEFENDED
  const [investigationStage, setInvestigationStage] = useState<number>(1);
  const [selectedHypothesisId, setSelectedHypothesisId] = useState<string | null>(null);
  const [selectedRestorationId, setSelectedRestorationId] = useState<string | null>(null);
  const [solvedCases, setSolvedCases] = useState<string[]>([]);
  const [hasLoggedNotebook, setHasLoggedNotebook] = useState<boolean>(false);

  const activeHypothesis = activeCase.hypotheses.find((h) => h.id === selectedHypothesisId);
  const activeRestoration = activeCase.restorationOptions.find((r) => r.id === selectedRestorationId);

  const handleResetInvestigation = () => {
    setInvestigationStage(1);
    setSelectedHypothesisId(null);
    setSelectedRestorationId(null);
    setHasLoggedNotebook(false);
  };

  const handleSwitchCase = (idx: number) => {
    setSelectedCaseIndex(idx);
    handleResetInvestigation();
  };

  const handleCompleteCase = () => {
    if (!solvedCases.includes(activeCase.id)) {
      setSolvedCases([...solvedCases, activeCase.id]);
    }
  };

  const handleLogToNotebook = () => {
    try {
      const saved = localStorage.getItem("young_scientist_journal");
      const entries = saved ? JSON.parse(saved) : [];
      const newEntry = {
        id: `detective_${activeCase.id}_${Date.now()}`,
        moduleId: "detective",
        lessonTitle: `Forensic Science Case: ${activeCase.title}`,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        question: activeCase.questionPrompt,
        hypothesis: activeHypothesis?.text || "Hypothesis tested against sensor logs.",
        observation: `Incident at ${activeCase.location}. Sensor anomalies detected in ${
          Object.entries(activeCase.sensors)
            .filter(([_, s]) => s.status === "danger")
            .map(([k, _]) => k.toUpperCase())
            .join(", ")
        }.`,
        conclusion: `${activeCase.scientificMechanism} Successfully restored system with: ${activeCase.correctRestorationAction}.`,
        confidenceRating: 5,
      };
      entries.unshift(newEntry);
      localStorage.setItem("young_scientist_journal", JSON.stringify(entries));
      setHasLoggedNotebook(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/60 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800">
              <Search className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-purple-300 uppercase tracking-widest">
              FORENSIC ECOSYSTEM INVESTIGATION SUITE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <span>🔎 Scientific Detective Mode</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Something is wrong with an ecosystem! Use your sensor array to collect hard evidence, evaluate hypotheses, discover the root mechanism, and restore balance.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap gap-2 self-start md:self-auto">
          {MYSTERY_CASES.map((c, idx) => {
            const isSolved = solvedCases.includes(c.id);
            const isCurrent = selectedCaseIndex === idx;
            return (
              <button
                key={c.id}
                onClick={() => handleSwitchCase(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isCurrent
                    ? "bg-purple-600 text-white shadow-lg ring-2 ring-purple-400/50"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{c.icon}</span>
                <span className="hidden sm:inline">Case #{idx + 1}</span>
                {isSolved && <span className="text-emerald-400 font-bold ml-1">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6-STAGE SCIENTIFIC REASONING PROGRESS PIPELINE */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold text-slate-400 px-1">
          <span>The Scientific Investigation Pipeline</span>
          <span className="font-mono text-cyan-400">Stage {investigationStage} of 5</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[
            { num: 1, name: "1. Observe Sensors", icon: "👀" },
            { num: 2, name: "2. Ask Question", icon: "❓" },
            { num: 3, name: "3. Test Hypotheses", icon: "🧠" },
            { num: 4, name: "4. Prove Mechanism", icon: "🧪" },
            { num: 5, name: "5. Restore System", icon: "🏆" },
          ].map((st) => (
            <div
              key={st.num}
              className={`p-2.5 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                investigationStage === st.num
                  ? "bg-purple-900/80 border-purple-400 text-white font-bold ring-2 ring-purple-400/40"
                  : investigationStage > st.num
                  ? "bg-emerald-950/60 border-emerald-800 text-emerald-300 font-bold"
                  : "bg-slate-950 border-slate-800 text-slate-500"
              }`}
            >
              <span>{st.icon}</span>
              <span className="text-xs">{st.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* INCIDENT REPORT BANNER */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 text-[10px] font-black uppercase tracking-wider">
              CRITICAL INCIDENT REPORT
            </span>
            <span className="text-xs text-slate-400 font-mono">📍 {activeCase.location}</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">{activeCase.title}</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {activeCase.incidentReport}
          </p>
        </div>

        <button
          onClick={handleResetInvestigation}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 cursor-pointer self-start sm:self-auto shrink-0"
          title="Restart Case"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* STAGE 1: SENSOR TELEMETRY ARRAY */}
      {investigationStage === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Comprehensive Multi-Sensor Telemetry Log
            </span>
            <span className="text-[11px] text-slate-400">Click anomalies to inspect</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(activeCase.sensors).map(([key, sensor]) => {
              const isDanger = sensor.status === "danger";
              const isWarning = sensor.status === "warning";
              return (
                <div
                  key={key}
                  className={`p-3.5 rounded-2xl border transition-all text-left space-y-1.5 ${
                    isDanger
                      ? "bg-rose-950/60 border-rose-600 text-rose-200 ring-2 ring-rose-500/30"
                      : isWarning
                      ? "bg-amber-950/40 border-amber-600 text-amber-200"
                      : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                      {key}
                    </span>
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded ${
                        isDanger
                          ? "bg-rose-600 text-white"
                          : isWarning
                          ? "bg-amber-600 text-white"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                      }`}
                    >
                      {sensor.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-white">{sensor.value}</div>
                  <p className="text-[11px] text-slate-300 leading-tight">{sensor.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setInvestigationStage(2)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Proceed to Scientific Questioning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 2: FORMULATE TESTABLE QUESTION */}
      {investigationStage === 2 && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-purple-900/80 space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-purple-400">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              STAGE 2: FORMULATE THE INVESTIGATIVE QUESTION
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-black text-white">
            "{activeCase.questionPrompt}"
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every scientific investigation begins by framing a precise, testable question based on anomalous evidence. We need to formulate hypotheses to explain what underlying mechanism broke the system!
          </p>

          <div className="flex justify-between pt-3">
            <button
              onClick={() => setInvestigationStage(1)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
            >
              ← Back to Sensor Readings
            </button>
            <button
              onClick={() => setInvestigationStage(3)}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Formulate & Test Hypotheses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: HYPOTHESIS TESTING & EVIDENCE EVALUATION */}
      {investigationStage === 3 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4" /> Test Plausible Hypotheses Against Sensor Records
            </span>
            <span className="text-[11px] text-slate-400">Select a hypothesis to evaluate against data</span>
          </div>

          <div className="space-y-3">
            {activeCase.hypotheses.map((hyp) => {
              const isSelected = selectedHypothesisId === hyp.id;
              return (
                <button
                  key={hyp.id}
                  onClick={() => setSelectedHypothesisId(hyp.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? hyp.isRootCause
                        ? "bg-emerald-950/80 border-emerald-400 text-white shadow-lg ring-2 ring-emerald-400/40"
                        : "bg-rose-950/80 border-rose-400 text-white shadow-lg ring-2 ring-rose-400/40"
                      : "bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs sm:text-sm">
                    <span>{hyp.text}</span>
                    {isSelected && (
                      <span className="font-mono text-xs px-2.5 py-0.5 rounded ml-2 shrink-0">
                        {hyp.isRootCause ? "✅ TRUE CAUSAL LINK" : "❌ DISPROVED BY DATA"}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 leading-relaxed">
                      <strong>Empirical Evidence Check:</strong> {hyp.evidenceEvaluation}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setInvestigationStage(2)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
            >
              ← Back to Question
            </button>
            <button
              disabled={!activeHypothesis?.isRootCause}
              onClick={() => setInvestigationStage(4)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Synthesize Scientific Mechanism</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 4: MECHANISTIC UNDERSTANDING (WHY IT HAPPENED) */}
      {investigationStage === 4 && (
        <div className="p-6 rounded-2xl bg-slate-950 border border-indigo-900/80 space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2 text-cyan-400">
            <Lightbulb className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-wider">
              STAGE 4: SCIENTIFIC EXPLANATION & MECHANISM
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white">
            The Deep Systemic Cause Revealed:
          </h3>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-indigo-200 leading-relaxed">
            {activeCase.scientificMechanism}
          </div>

          <div className="flex justify-between pt-2">
            <button
              onClick={() => setInvestigationStage(3)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold cursor-pointer"
            >
              ← Back to Hypothesis Testing
            </button>
            <button
              onClick={() => setInvestigationStage(5)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Design System Restoration Plan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STAGE 5: SYSTEM RESTORATION & BADGE CLAIM */}
      {investigationStage === 5 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Apply Corrective Restoration & Validate
            </span>
            <span className="text-[11px] text-slate-400">Choose the scientifically valid intervention</span>
          </div>

          <div className="space-y-3">
            {activeCase.restorationOptions.map((opt) => {
              const isSelected = selectedRestorationId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedRestorationId(opt.id);
                    if (opt.isCorrect) handleCompleteCase();
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? opt.isCorrect
                        ? "bg-emerald-950 border-emerald-400 text-white ring-2 ring-emerald-400/40"
                        : "bg-rose-950 border-rose-400 text-white ring-2 ring-rose-400/40"
                      : "bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs sm:text-sm">
                    <span>{opt.action}</span>
                    {isSelected && (
                      <span className="font-mono text-xs px-2 py-0.5 rounded ml-2">
                        {opt.isCorrect ? "✅ SUCCESS" : "❌ FAILED INTERVENTION"}
                      </span>
                    )}
                  </div>

                  {isSelected && (
                    <div className="mt-2.5 p-3 rounded-xl bg-slate-900 text-xs text-slate-200">
                      {opt.outcomeText}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {activeRestoration?.isCorrect && (
            <div className="space-y-4 mt-4">
              {/* Epistemic Knowledge Quad: What Do You Actually Know? */}
              <EpistemicKnowledgeQuad
                title={`Forensic Synthesis: What Do You Actually Know? (${activeCase.title})`}
                observed={activeCase.epistemicBreakdown.observed}
                inferred={activeCase.epistemicBreakdown.inferred}
                modelled={activeCase.epistemicBreakdown.modelled}
                unknown={activeCase.epistemicBreakdown.unknown}
              />

              <div className="p-5 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="text-3xl sm:text-4xl p-2 bg-slate-950 rounded-2xl border border-emerald-700">
                    🏆
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-emerald-300 uppercase tracking-wider">
                      CASE SOLVED & ECOSYSTEM RESTORED!
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-white">
                      Awarded Badge: {activeCase.badgeName}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLogToNotebook}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{hasLoggedNotebook ? "Saved to Field Journal!" : "Log Case to Journal"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
