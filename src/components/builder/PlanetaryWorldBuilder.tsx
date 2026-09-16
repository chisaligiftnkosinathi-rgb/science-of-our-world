import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Sun,
  Droplets,
  Wind,
  Mountain,
  Trees,
  Bug,
  Bird,
  Atom,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Activity,
  Sliders,
  BookOpen,
  Eye,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

interface PlanetaryState {
  tick: number;
  solarEnergy: number; // 0 to 150 W/m² (optimum ~100)
  waterMoisture: number; // 0 to 100% (optimum ~65)
  soilNutrients: number; // 0 to 100 ppm (optimum ~70)
  co2Level: number; // 100 to 1200 ppm (optimum ~420)
  plantsBiomass: number; // 0 to 100
  herbivoresCount: number; // 0 to 100
  predatorsCount: number; // 0 to 100
  decomposersActive: boolean;
  oxygenPercent: number; // 0 to 30% (optimum ~21%)
  stabilityScore: number; // 0 to 100
  statusMessage: string;
}

interface PlanetaryHistoryPoint {
  tick: number;
  plants: number;
  herbivores: number;
  predators: number;
  nutrients: number;
  co2: number;
  oxygen: number;
}

export const PlanetaryWorldBuilder: React.FC = () => {
  // Environmental & Biological Controls
  const [solarEnergy, setSolarEnergy] = useState<number>(100);
  const [waterMoisture, setWaterMoisture] = useState<number>(65);
  const [soilNutrients, setSoilNutrients] = useState<number>(75);
  const [co2Level, setCo2Level] = useState<number>(420);
  const [plantsBiomass, setPlantsBiomass] = useState<number>(70);
  const [herbivoresCount, setHerbivoresCount] = useState<number>(40);
  const [predatorsCount, setPredatorsCount] = useState<number>(12);
  const [decomposersActive, setDecomposersActive] = useState<boolean>(true);

  // Simulation Running State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [simSpeed, setSimSpeed] = useState<1 | 2 | 5>(1);
  const [tick, setTick] = useState<number>(0);
  const [history, setHistory] = useState<PlanetaryHistoryPoint[]>([
    { tick: 0, plants: 70, herbivores: 40, predators: 12, nutrients: 75, co2: 420, oxygen: 20.9 },
  ]);

  // Investigation & Forensic Diagnosis state
  const [activeInvestigation, setActiveInvestigation] = useState<{
    triggered: boolean;
    type: "plants_died" | "herbivores_died" | "suffocation" | "toxic_co2" | null;
    question: string;
    culpritOptions: { text: string; isCorrect: boolean; feedback: string }[];
    selectedAnswer: number | null;
    resolved: boolean;
  }>({
    triggered: false,
    type: null,
    question: "",
    culpritOptions: [],
    selectedAnswer: null,
    resolved: false,
  });

  const [hasSavedJournal, setHasSavedJournal] = useState<boolean>(false);

  // Apply Scenarios
  const applyPreset = (preset: "gaia" | "sterile_soil" | "desert" | "greenhouse_spike" | "predator_boom") => {
    setIsRunning(false);
    setTick(0);
    setActiveInvestigation({ triggered: false, type: null, question: "", culpritOptions: [], selectedAnswer: null, resolved: false });
    setHasSavedJournal(false);

    if (preset === "gaia") {
      setSolarEnergy(100);
      setWaterMoisture(65);
      setSoilNutrients(75);
      setCo2Level(420);
      setPlantsBiomass(75);
      setHerbivoresCount(40);
      setPredatorsCount(12);
      setDecomposersActive(true);
      setHistory([{ tick: 0, plants: 75, herbivores: 40, predators: 12, nutrients: 75, co2: 420, oxygen: 20.9 }]);
    } else if (preset === "sterile_soil") {
      // Decomposers OFF: soil nutrients will deplete to 0, causing collapse
      setSolarEnergy(100);
      setWaterMoisture(70);
      setSoilNutrients(20);
      setCo2Level(420);
      setPlantsBiomass(60);
      setHerbivoresCount(35);
      setPredatorsCount(10);
      setDecomposersActive(false);
      setHistory([{ tick: 0, plants: 60, herbivores: 35, predators: 10, nutrients: 20, co2: 420, oxygen: 20.5 }]);
    } else if (preset === "desert") {
      setSolarEnergy(130);
      setWaterMoisture(10);
      setSoilNutrients(30);
      setCo2Level(420);
      setPlantsBiomass(15);
      setHerbivoresCount(10);
      setPredatorsCount(2);
      setDecomposersActive(true);
      setHistory([{ tick: 0, plants: 15, herbivores: 10, predators: 2, nutrients: 30, co2: 420, oxygen: 20.0 }]);
    } else if (preset === "greenhouse_spike") {
      setSolarEnergy(110);
      setWaterMoisture(50);
      setSoilNutrients(60);
      setCo2Level(1100);
      setPlantsBiomass(50);
      setHerbivoresCount(30);
      setPredatorsCount(8);
      setDecomposersActive(true);
      setHistory([{ tick: 0, plants: 50, herbivores: 30, predators: 8, nutrients: 60, co2: 1100, oxygen: 18.5 }]);
    } else if (preset === "predator_boom") {
      setSolarEnergy(100);
      setWaterMoisture(65);
      setSoilNutrients(75);
      setCo2Level(420);
      setPlantsBiomass(70);
      setHerbivoresCount(50);
      setPredatorsCount(45);
      setDecomposersActive(true);
      setHistory([{ tick: 0, plants: 70, herbivores: 50, predators: 45, nutrients: 75, co2: 420, oxygen: 20.9 }]);
    }
  };

  // Step the simulation forward one tick
  const stepSimulation = () => {
    setTick((prevTick) => {
      const nextTick = prevTick + 1;

      // 1. Soil Nutrients Recycling
      let newNutrients = soilNutrients;
      if (decomposersActive) {
        // Decomposers recycle dead biomass back into soil minerals
        const recycled = (plantsBiomass * 0.05 + herbivoresCount * 0.08);
        newNutrients = Math.min(100, Math.round(newNutrients + recycled - (plantsBiomass * 0.08)));
      } else {
        // Without decomposers, soil nutrients steadily deplete to 0!
        newNutrients = Math.max(0, Math.round(newNutrients - (plantsBiomass * 0.12 + 2)));
      }
      setSoilNutrients(newNutrients);

      // 2. Plant Photosynthesis & Biomass
      const lightFactor = Math.min(1.2, solarEnergy / 100);
      const waterFactor = Math.min(1.2, waterMoisture / 60);
      const nutrientFactor = Math.min(1.3, newNutrients / 50);
      const co2Factor = Math.min(1.3, co2Level / 400);

      const photosynthGrowth = lightFactor * waterFactor * nutrientFactor * co2Factor * 14;
      const herbivoreGrazing = herbivoresCount * 0.45;
      let newPlants = Math.max(0, Math.min(100, Math.round(plantsBiomass + photosynthGrowth - herbivoreGrazing - 4)));
      setPlantsBiomass(newPlants);

      // 3. Herbivore Dynamics
      const foodPerHerbivore = newPlants / Math.max(1, herbivoresCount);
      let herbivoreGrowth = 0;
      if (foodPerHerbivore > 1.2 && newPlants > 10) {
        herbivoreGrowth = Math.round(herbivoresCount * 0.15);
      } else if (foodPerHerbivore < 0.6 || newPlants < 8) {
        herbivoreGrowth = -Math.round(herbivoresCount * 0.3 + 3);
      }
      const predatorKills = Math.round(predatorsCount * 0.35);
      let newHerbivores = Math.max(0, Math.min(100, herbivoresCount + herbivoreGrowth - predatorKills));
      setHerbivoresCount(newHerbivores);

      // 4. Apex Predator Dynamics
      const preyPerPredator = newHerbivores / Math.max(1, predatorsCount);
      let predatorGrowth = 0;
      if (preyPerPredator > 2.0 && newHerbivores > 10) {
        predatorGrowth = Math.round(predatorsCount * 0.12 + 1);
      } else if (preyPerPredator < 1.0 || newHerbivores < 5) {
        predatorGrowth = -Math.round(predatorsCount * 0.25 + 2);
      }
      let newPredators = Math.max(0, Math.min(50, predatorsCount + predatorGrowth));
      setPredatorsCount(newPredators);

      // 5. Atmosphere Gas Balance (Oxygen & CO2)
      const oxygenProduced = newPlants * 0.12;
      const oxygenConsumed = (newHerbivores * 0.08 + newPredators * 0.04 + (decomposersActive ? 2 : 0));
      const netOxygenChange = (oxygenProduced - oxygenConsumed) * 0.1;
      const currentOxygen = history[history.length - 1]?.oxygen || 20.9;
      const newOxygen = Math.max(5, Math.min(30, Number((currentOxygen + netOxygenChange).toFixed(1))));

      // 6. Record to History
      setHistory((prev) => [
        ...prev.slice(-25),
        {
          tick: nextTick,
          plants: newPlants,
          herbivores: newHerbivores,
          predators: newPredators,
          nutrients: newNutrients,
          co2: co2Level,
          oxygen: newOxygen,
        },
      ]);

      // 7. Check for Ecological Forensic Triggers
      if (newPlants === 0 && !activeInvestigation.triggered) {
        setIsRunning(false);
        setActiveInvestigation({
          triggered: true,
          type: "plants_died",
          question: "🌱 The Plant Population Has Collapsed to Zero! Why did this happen?",
          culpritOptions: [
            {
              text: "Soil nutrients depleted to 0 ppm because decomposers were missing or overwhelmed.",
              isCorrect: !decomposersActive || newNutrients < 10,
              feedback: !decomposersActive || newNutrients < 10
                ? "Correct! Without decomposers recycling dead biomass, plants ran out of vital nitrogen and phosphorus!"
                : "Nutrients were adequate. Check water or overgrazing.",
            },
            {
              text: "Herbivore population exploded and overgrazed every sprouting leaf.",
              isCorrect: herbivoresCount > 60 && plantsBiomass < 15,
              feedback: "Correct! The massive herbivore swarm ate vegetation faster than photosynthetic regrowth!",
            },
            {
              text: "Lack of moisture caused severe drought dehydration.",
              isCorrect: waterMoisture < 20,
              feedback: "Correct! Photosynthesis requires liquid H₂O for chloroplast electron transport.",
            },
          ],
          selectedAnswer: null,
          resolved: false,
        });
      } else if (newHerbivores === 0 && !activeInvestigation.triggered && tick > 3) {
        setIsRunning(false);
        setActiveInvestigation({
          triggered: true,
          type: "herbivores_died",
          question: "🐛 Herbivores Went Extinct! What broken link in the system caused this?",
          culpritOptions: [
            {
              text: "Trophic Starvation: Plant biomass plummeted, leaving herbivores without primary food.",
              isCorrect: newPlants < 10,
              feedback: "Correct! Herbivores are primary consumers entirely dependent on autotroph plants!",
            },
            {
              text: "Predator Overhunting: Apex predators multiplied excessively and hunted all herbivores.",
              isCorrect: predatorsCount > 25,
              feedback: "Correct! A predator surge exceeded sustainable carrying capacity!",
            },
          ],
          selectedAnswer: null,
          resolved: false,
        });
      }

      return nextTick;
    });
  };

  // Timer loop
  useEffect(() => {
    if (!isRunning) return;
    const intervalMs = Math.round(1000 / simSpeed);
    const interval = setInterval(() => {
      stepSimulation();
    }, intervalMs);
    return () => clearInterval(interval);
  }, [isRunning, simSpeed, solarEnergy, waterMoisture, soilNutrients, co2Level, plantsBiomass, herbivoresCount, predatorsCount, decomposersActive]);

  // Compute stability health score
  const computeStability = (): number => {
    let score = 100;
    if (plantsBiomass < 20 || plantsBiomass > 95) score -= 30;
    if (herbivoresCount < 10 || herbivoresCount > 85) score -= 25;
    if (predatorsCount < 2 && herbivoresCount > 50) score -= 20;
    if (soilNutrients < 20) score -= 25;
    if (!decomposersActive) score -= 20;
    return Math.max(0, score);
  };

  const stabilityScore = computeStability();

  // Save to Field Journal
  const handleSaveToJournal = () => {
    try {
      const saved = localStorage.getItem("young_scientist_journal");
      const entries = saved ? JSON.parse(saved) : [];
      const newEntry = {
        id: `world_build_${Date.now()}`,
        moduleId: "sandbox",
        lessonTitle: `Planetary Biosphere Experiment (Tick ${tick})`,
        timestamp: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        question: "How do interconnected abiotic spheres (Sun, Water, Atmosphere, Soil) sustain a multi-tier living biosphere?",
        hypothesis: "A stable planetary system requires continuous solar energy, closed-loop biogeochemical matter recycling via decomposers, and balanced predator-prey trophic ratios.",
        observation: `Tested planetary balance at Tick ${tick}. Stability Score: ${stabilityScore}%. Plants: ${plantsBiomass}, Herbivores: ${herbivoresCount}, Predators: ${predatorsCount}, Soil Nutrients: ${soilNutrients} ppm, Decomposers: ${decomposersActive ? "Active" : "Disabled"}.`,
        conclusion: `Discovered that if any single link breaks (e.g. missing decomposers ➔ nutrient depletion), the entire trophic pyramid collapses downstream. Verified universal system conservation and dynamic equilibrium.`,
        confidenceRating: 5,
      };
      entries.unshift(newEntry);
      localStorage.setItem("young_scientist_journal", JSON.stringify(entries));
      setHasSavedJournal(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-emerald-900/60 shadow-xl space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              THE ULTIMATE CAPSTONE MISSION
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
            🏆 BUILD A WORLD: Planetary Biosphere Simulator
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            You are in charge of a complete living planet! Balance energy, water, atmosphere, soil minerals, plants, herbivores, predators, and decomposers into a thriving, self-sustaining living world.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all ${
              isRunning
                ? "bg-amber-600 hover:bg-amber-500 text-white animate-pulse"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Planet</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Run Planet Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={() => stepSimulation()}
            disabled={isRunning}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer border border-slate-700"
          >
            <span>Step +1</span>
          </button>

          <button
            onClick={() => applyPreset("gaia")}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
            title="Reset to Balanced Gaia Earth"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSaveToJournal}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{hasSavedJournal ? "Logged in Notebook!" : "Log to Notebook"}</span>
          </button>
        </div>
      </div>

      {/* Preset Planet Templates */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-400 font-bold">
          <span>Choose a Planetary Experiment Scenario:</span>
          <span className="font-mono text-cyan-400">Simulation Tick: #{tick}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <button
            onClick={() => applyPreset("gaia")}
            className="p-2.5 rounded-2xl bg-slate-950 border border-emerald-800/80 hover:bg-emerald-950/40 text-left transition-all cursor-pointer"
          >
            <div className="text-xl mb-0.5">🌍</div>
            <div className="font-black text-xs text-emerald-300">Gaia Earth</div>
            <div className="text-[10px] text-slate-400">Balanced Equilibrium</div>
          </button>

          <button
            onClick={() => applyPreset("sterile_soil")}
            className="p-2.5 rounded-2xl bg-slate-950 border border-amber-800/80 hover:bg-amber-950/40 text-left transition-all cursor-pointer"
          >
            <div className="text-xl mb-0.5">🦠❌</div>
            <div className="font-black text-xs text-amber-300">No Decomposers</div>
            <div className="text-[10px] text-slate-400">Broken Nutrient Cycle</div>
          </button>

          <button
            onClick={() => applyPreset("desert")}
            className="p-2.5 rounded-2xl bg-slate-950 border border-yellow-800/80 hover:bg-yellow-950/40 text-left transition-all cursor-pointer"
          >
            <div className="text-xl mb-0.5">🏜️</div>
            <div className="font-black text-xs text-yellow-300">Desert Planet</div>
            <div className="text-[10px] text-slate-400">Water Deprivation</div>
          </button>

          <button
            onClick={() => applyPreset("greenhouse_spike")}
            className="p-2.5 rounded-2xl bg-slate-950 border border-rose-800/80 hover:bg-rose-950/40 text-left transition-all cursor-pointer"
          >
            <div className="text-xl mb-0.5">🌋</div>
            <div className="font-black text-xs text-rose-300">CO₂ Volcano Spike</div>
            <div className="text-[10px] text-slate-400">Atmosphere Overload</div>
          </button>

          <button
            onClick={() => applyPreset("predator_boom")}
            className="p-2.5 rounded-2xl bg-slate-950 border border-purple-800/80 hover:bg-purple-950/40 text-left transition-all cursor-pointer"
          >
            <div className="text-xl mb-0.5">🦅</div>
            <div className="font-black text-xs text-purple-300">Predator Surge</div>
            <div className="text-[10px] text-slate-400">Top-Down Trophic Wave</div>
          </button>
        </div>
      </div>

      {/* ACTIVE FORENSIC INVESTIGATION MODAL */}
      {activeInvestigation.triggered && (
        <div className="p-6 rounded-2xl bg-rose-950/90 border-2 border-rose-500 shadow-2xl space-y-4 animate-in fade-in">
          <div className="flex items-center gap-2.5 text-rose-300">
            <ShieldAlert className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <div className="text-[11px] font-black uppercase tracking-widest text-rose-300">
                YOUNG SCIENTIST FORENSIC INVESTIGATION
              </div>
              <h4 className="text-base sm:text-lg font-black text-white">
                {activeInvestigation.question}
              </h4>
            </div>
          </div>

          <p className="text-xs text-slate-200">
            Inspect your sensor records, discover what broke the universal balance, and choose the true causal explanation:
          </p>

          <div className="space-y-2.5">
            {activeInvestigation.culpritOptions.map((opt, idx) => {
              const isSelected = activeInvestigation.selectedAnswer === idx;
              return (
                <button
                  key={idx}
                  onClick={() =>
                    setActiveInvestigation((prev) => ({
                      ...prev,
                      selectedAnswer: idx,
                      resolved: opt.isCorrect,
                    }))
                  }
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? opt.isCorrect
                        ? "bg-emerald-900 border-emerald-400 text-emerald-100 shadow-md ring-2 ring-emerald-400/40"
                        : "bg-rose-900 border-rose-400 text-rose-100 shadow-md ring-2 ring-rose-400/40"
                      : "bg-slate-900/90 border-slate-700 text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt.text}</span>
                    {isSelected && (
                      <span className="font-black ml-2">
                        {opt.isCorrect ? "✅ SCIENTIFIC TRUTH!" : "❌ RECHECK EVIDENCE"}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <div className="mt-2 text-[11px] font-normal opacity-90 pt-2 border-t border-white/20">
                      {opt.feedback}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {activeInvestigation.resolved && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Discovery complete! You identified the scientific root cause!
              </span>
              <button
                onClick={() => {
                  applyPreset("gaia");
                  setActiveInvestigation({ triggered: false, type: null, question: "", culpritOptions: [], selectedAnswer: null, resolved: false });
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md"
              >
                Restore Biosphere & Continue Experimenting
              </button>
            </div>
          )}
        </div>
      )}

      {/* PLANETARY DASHBOARD: 2-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: THE 7 SPHERES & CONTROLLERS */}
        <div className="lg:col-span-7 space-y-4">
          {/* ABIOTIC SPHERES (ENERGY, WATER, ATMOSPHERE, SOIL) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-900/60 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sun className="w-4 h-4" /> 1. Abiotic Environment (Physical Spheres)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Solar Energy */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-1">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Solar Flux (Energy)</span>
                  </span>
                  <span className="font-mono text-amber-400">{solarEnergy} W/m²</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={160}
                  value={solarEnergy}
                  onChange={(e) => setSolarEnergy(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              {/* Water & Hydrosphere */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Hydrosphere (Water)</span>
                  </span>
                  <span className="font-mono text-cyan-400">{waterMoisture}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={waterMoisture}
                  onChange={(e) => setWaterMoisture(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Soil Minerals (Lithosphere) */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-1">
                    <Mountain className="w-3.5 h-3.5 text-yellow-600" />
                    <span>Soil Minerals (N, P)</span>
                  </span>
                  <span className="font-mono text-yellow-400">{soilNutrients} ppm</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={soilNutrients}
                  onChange={(e) => setSoilNutrients(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                />
              </div>

              {/* Atmosphere CO2 */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-purple-400" />
                    <span>Atmosphere CO₂</span>
                  </span>
                  <span className="font-mono text-purple-400">{co2Level} ppm</span>
                </div>
                <input
                  type="range"
                  min={150}
                  max={1200}
                  step={50}
                  value={co2Level}
                  onChange={(e) => setCo2Level(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
              </div>
            </div>
          </div>

          {/* BIOTIC SPHERES (PLANTS, HERBIVORES, PREDATORS, DECOMPOSERS) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Trees className="w-4 h-4" /> 2. Living Biosphere (Trophic Web)
              </span>
              <button
                onClick={() => setDecomposersActive(!decomposersActive)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  decomposersActive
                    ? "bg-emerald-600 text-white"
                    : "bg-rose-900/80 text-rose-200 border border-rose-700"
                }`}
              >
                <span>🦠 Decomposers:</span>
                <span>{decomposersActive ? "Active (Recycling)" : "Disabled (No Soil Cycle)"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* Plants */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-emerald-300">
                  <span className="flex items-center gap-1">
                    <span>🌱</span>
                    <span>Autotrophs</span>
                  </span>
                  <span className="font-mono">{plantsBiomass} kg/m²</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={plantsBiomass}
                  onChange={(e) => setPlantsBiomass(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <p className="text-[10px] text-slate-400">Primary Producers</p>
              </div>

              {/* Herbivores */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-amber-300">
                  <span className="flex items-center gap-1">
                    <span>🐛</span>
                    <span>Herbivores</span>
                  </span>
                  <span className="font-mono">{herbivoresCount}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={herbivoresCount}
                  onChange={(e) => setHerbivoresCount(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <p className="text-[10px] text-slate-400">Primary Consumers</p>
              </div>

              {/* Predators */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-rose-300">
                  <span className="flex items-center gap-1">
                    <span>🦅</span>
                    <span>Apex Predators</span>
                  </span>
                  <span className="font-mono">{predatorsCount}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={predatorsCount}
                  onChange={(e) => setPredatorsCount(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
                <p className="text-[10px] text-slate-400">Secondary Consumers</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE PLANETARY TELEMETRY & CHARTS */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          {/* Health & Stability Gauge */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Planetary Equilibrium Health:
              </span>
              <span
                className={`font-mono text-xs font-black px-2.5 py-0.5 rounded-full ${
                  stabilityScore > 75
                    ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                    : stabilityScore > 40
                    ? "bg-amber-950 text-amber-300 border border-amber-800"
                    : "bg-rose-950 text-rose-300 border border-rose-800"
                }`}
              >
                {stabilityScore}% Stability
              </span>
            </div>

            {/* Health Bar */}
            <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                style={{ width: `${stabilityScore}%` }}
                className={`h-full transition-all duration-300 ${
                  stabilityScore > 75
                    ? "bg-emerald-500"
                    : stabilityScore > 40
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
              />
            </div>

            {/* Live Atmosphere Readings */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Oxygen Level</span>
                <span className="font-mono font-bold text-cyan-300">
                  {history[history.length - 1]?.oxygen || 20.9}% O₂
                </span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Soil Nutrient Flux</span>
                <span className="font-mono font-bold text-yellow-300">
                  {soilNutrients} ppm N/P
                </span>
              </div>
            </div>
          </div>

          {/* HISTORICAL POPULATION TELEMETRY (Mini Sparklines) */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex-1">
            <div className="flex justify-between items-center text-xs font-bold text-slate-300">
              <span>Living Biomass Timeline (Last 25 Ticks)</span>
              <span className="text-[10px] text-slate-500 font-mono">Real-Time Data</span>
            </div>

            {/* Visual multi-curve bar chart */}
            <div className="h-28 flex items-end gap-1 bg-slate-900/80 p-2 rounded-xl border border-slate-800 overflow-hidden">
              {history.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end gap-0.5 h-full">
                  <div
                    style={{ height: `${Math.min(100, (h.plants / 100) * 80)}%` }}
                    className="w-full bg-emerald-500 rounded-t-xs"
                    title={`Tick ${h.tick}: Plants ${h.plants}`}
                  />
                  <div
                    style={{ height: `${Math.min(100, (h.herbivores / 100) * 80)}%` }}
                    className="w-full bg-amber-500"
                    title={`Tick ${h.tick}: Herbivores ${h.herbivores}`}
                  />
                  <div
                    style={{ height: `${Math.min(100, (h.predators / 50) * 80)}%` }}
                    className="w-full bg-rose-500 rounded-b-xs"
                    title={`Tick ${h.tick}: Predators ${h.predators}`}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Plants
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Herbivores
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Predators
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
