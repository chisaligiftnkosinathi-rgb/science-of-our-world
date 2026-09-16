import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Sun,
  CloudRain,
  Trees,
  Bug,
  Bird,
  ShieldAlert,
  Sliders,
  TrendingUp,
  Info,
  CheckCircle2,
} from "lucide-react";

interface SimulationHistoryPoint {
  tick: number;
  plants: number;
  herbivores: number;
  predators: number;
  status: string;
}

export const EcosystemSandbox: React.FC = () => {
  // Environmental sliders
  const [sunlight, setSunlight] = useState<number>(75);
  const [rainfall, setRainfall] = useState<number>(70);
  const [plants, setPlants] = useState<number>(80);
  const [herbivores, setHerbivores] = useState<number>(40);
  const [predators, setPredators] = useState<number>(10);
  const [hasDecomposers, setHasDecomposers] = useState<boolean>(true);

  // Simulation running state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [tick, setTick] = useState<number>(0);
  const [history, setHistory] = useState<SimulationHistoryPoint[]>([
    { tick: 0, plants: 80, herbivores: 40, predators: 10, status: "Equilibrium" },
  ]);

  // Scenarios including South African Ecosystems
  const applyPreset = (
    preset: "balanced" | "drought" | "overgraze" | "predators" | "bushveld" | "fynbos" | "karoo"
  ) => {
    setIsRunning(false);
    setTick(0);
    if (preset === "balanced") {
      setSunlight(80);
      setRainfall(75);
      setPlants(85);
      setHerbivores(40);
      setPredators(12);
      setHasDecomposers(true);
      setHistory([{ tick: 0, plants: 85, herbivores: 40, predators: 12, status: "Balanced Meadow" }]);
    } else if (preset === "drought") {
      setSunlight(95);
      setRainfall(10);
      setPlants(25);
      setHerbivores(35);
      setPredators(8);
      setHasDecomposers(true);
      setHistory([{ tick: 0, plants: 25, herbivores: 35, predators: 8, status: "Severe Drought" }]);
    } else if (preset === "overgraze") {
      setSunlight(70);
      setRainfall(60);
      setPlants(50);
      setHerbivores(90);
      setPredators(2);
      setHasDecomposers(true);
      setHistory([{ tick: 0, plants: 50, herbivores: 90, predators: 2, status: "Overgrazing" }]);
    } else if (preset === "predators") {
      setSunlight(80);
      setRainfall(70);
      setPlants(60);
      setHerbivores(70);
      setPredators(25);
      setHasDecomposers(true);
      setHistory([{ tick: 0, plants: 60, herbivores: 70, predators: 25, status: "Predator Surge" }]);
    } else if (preset === "bushveld") {
      // 🇿🇦 South African Bushveld Savanna
      setSunlight(90);
      setRainfall(55);
      setPlants(75);
      setHerbivores(50);
      setPredators(14);
      setHasDecomposers(true);
      setHistory([{ tick: 0, plants: 75, herbivores: 50, predators: 14, status: "🇿🇦 Bushveld Savanna (Marula & Lions)" }]);
    } else if (preset === "fynbos") {
      // 🇿🇦 South African Fynbos Shrubland
      setSunlight(75);
      setRainfall(60);
      setPlants(80);
      setHerbivores(30);
      setPredators(8);
      setHasDecomposers(true);
      setHistory([{ tick: 0, plants: 80, herbivores: 30, predators: 8, status: "🇿🇦 Cape Fynbos (Proteas & Sunbirds)" }]);
    } else if (preset === "karoo") {
      // 🇿🇦 Succulent Karoo Arid Zone
      setSunlight(95);
      setRainfall(20);
      setPlants(40);
      setHerbivores(20);
      setPredators(5);
      setHasDecomposers(true);
      setHistory([{ tick: 0, plants: 40, herbivores: 20, predators: 5, status: "🇿🇦 Succulent Karoo (Aloes & Jackals)" }]);
    }
  };

  // Step the simulation forward one tick
  const stepSimulation = () => {
    setTick((prevTick) => {
      const nextTick = prevTick + 1;

      // 1. Plant growth based on sun, rain, decomposer soil fertility
      const soilMultiplier = hasDecomposers ? 1.0 : 0.4;
      const growthRate = (sunlight / 100) * (rainfall / 100) * 28 * soilMultiplier;
      const herbivoreConsumption = herbivores * 0.45;

      let newPlants = Math.max(
        0,
        Math.min(100, Math.round(plants + growthRate - herbivoreConsumption))
      );

      // 2. Herbivore population based on plant food availability vs predator hunting
      const foodPerHerbivore = newPlants / Math.max(1, herbivores);
      let herbivoreGrowth = 0;
      if (foodPerHerbivore > 1.2) {
        herbivoreGrowth = Math.round(herbivores * 0.15);
      } else if (foodPerHerbivore < 0.6) {
        herbivoreGrowth = -Math.round(herbivores * 0.25);
      }

      const predatorHunting = Math.round(predators * 0.5);
      let newHerbivores = Math.max(
        0,
        Math.min(120, herbivores + herbivoreGrowth - predatorHunting)
      );

      // 3. Predator population based on herbivore prey density
      let predatorGrowth = 0;
      if (newHerbivores > predators * 3) {
        predatorGrowth = Math.round(predators * 0.12);
      } else if (newHerbivores < predators * 1.5) {
        predatorGrowth = -Math.round(predators * 0.2);
      }

      let newPredators = Math.max(0, Math.min(50, predators + predatorGrowth));

      // Determine state message
      let status = "Balanced Equilibrium";
      if (rainfall < 25) status = "⚠️ Severe Drought (Low Plant Growth)";
      else if (newPlants < 15 && newHerbivores > 30) status = "⚠️ Overgrazing: Herbivores Starving";
      else if (newPredators <= 1 && newHerbivores > 80) status = "⚠️ Herbivore Outbreak (No Predators)";
      else if (!hasDecomposers) status = "⚠️ Soil Depletion (Decomposers Missing)";

      setPlants(newPlants);
      setHerbivores(newHerbivores);
      setPredators(newPredators);

      setHistory((prev) => {
        const next = [
          ...prev.slice(-24),
          {
            tick: nextTick,
            plants: newPlants,
            herbivores: newHerbivores,
            predators: newPredators,
            status,
          },
        ];
        return next;
      });

      return nextTick;
    });
  };

  // Timer loop when isRunning is true
  useEffect(() => {
    let interval: any = null;
    if (isRunning) {
      interval = setInterval(() => {
        stepSimulation();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, sunlight, rainfall, plants, herbivores, predators, hasDecomposers]);

  const handleReset = () => {
    setIsRunning(false);
    setTick(0);
    setSunlight(75);
    setRainfall(70);
    setPlants(80);
    setHerbivores(40);
    setPredators(10);
    setHasDecomposers(true);
    setHistory([{ tick: 0, plants: 80, herbivores: 40, predators: 10, status: "Reset" }]);
  };

  const chartHeight = 140;
  const chartWidth = 500;

  return (
    <section id="sandbox" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm shadow-xs">
          🌱
        </span>
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            LEVEL 4: BUILD • LIVE ECOSYSTEM SANDBOX
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🏗️ Ecosystem Sandbox: Construct Living Systems
          </h2>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6">
          Put on your ecosystem architect hat! Adjust sunlight, rainfall, plant density, herbivores, and apex predators. Run the live simulation to watch <strong>predator-prey balance, carrying capacity, and trophic energy flow</strong> in real time.
        </p>

        {/* Preset Experiments */}
        <div className="space-y-2 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-1">Global Presets:</span>
            <button
              onClick={() => applyPreset("balanced")}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              🌾 Balanced Meadow
            </button>
            <button
              onClick={() => applyPreset("drought")}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-800 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              🏜️ Severe Drought
            </button>
            <button
              onClick={() => applyPreset("overgraze")}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              🐛 Herbivore Outbreak
            </button>
            <button
              onClick={() => applyPreset("predators")}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-purple-700 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
            >
              🐺 Apex Predator Surge
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-xs font-bold text-emerald-700 mr-1 flex items-center gap-1">
              <span>🇿🇦</span>
              <span>Mzansi Biome Presets:</span>
            </span>
            <button
              onClick={() => applyPreset("bushveld")}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition-all cursor-pointer"
            >
              🦒 Bushveld Savanna
            </button>
            <button
              onClick={() => applyPreset("fynbos")}
              className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 text-xs font-bold transition-all cursor-pointer"
            >
              🌸 Cape Fynbos
            </button>
            <button
              onClick={() => applyPreset("karoo")}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-all cursor-pointer"
            >
              🌵 Succulent Karoo
            </button>
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Sunlight */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>☀️ Sunlight Energy</span>
              </span>
              <span className="font-mono text-xs font-extrabold text-amber-800">{sunlight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={sunlight}
              onChange={(e) => setSunlight(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <span className="text-[10px] text-amber-700 mt-1 block">
              Powers photosynthesis & primary plant productivity
            </span>
          </div>

          {/* Rainfall */}
          <div className="p-4 rounded-2xl bg-cyan-50/50 border border-cyan-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-cyan-900 flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-cyan-500" />
                <span>🌧️ Rainfall & Moisture</span>
              </span>
              <span className="font-mono text-xs font-extrabold text-cyan-800">{rainfall}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={rainfall}
              onChange={(e) => setRainfall(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <span className="text-[10px] text-cyan-700 mt-1 block">
              Supplies water from the Hydrosphere to roots
            </span>
          </div>

          {/* Decomposers Toggle */}
          <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                <span>🍄 Soil Decomposers</span>
              </span>
              <span
                className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                  hasDecomposers
                    ? "bg-purple-200 text-purple-900"
                    : "bg-rose-200 text-rose-900"
                }`}
              >
                {hasDecomposers ? "Active" : "Disabled"}
              </span>
            </div>
            <button
              onClick={() => setHasDecomposers(!hasDecomposers)}
              className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                hasDecomposers
                  ? "bg-purple-600 text-white border-purple-700"
                  : "bg-white text-slate-700 border-slate-300"
              }`}
            >
              {hasDecomposers ? "✓ Recycling Soil Nutrients" : "✕ Soil Infertile (Locked Matter)"}
            </button>
            <span className="text-[10px] text-purple-700 mt-1">
              Recycles nitrogen & carbon back into soil
            </span>
          </div>

          {/* Plant Biomass */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Trees className="w-4 h-4 text-emerald-600" />
                <span>🌱 Plant Biomass</span>
              </span>
              <span className="font-mono text-xs font-extrabold text-emerald-800">{plants} units</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={plants}
              onChange={(e) => setPlants(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <span className="text-[10px] text-emerald-700 mt-1 block">
              Primary producers providing base energy
            </span>
          </div>

          {/* Herbivores */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <Bug className="w-4 h-4 text-blue-600" />
                <span>🦓 Herbivores (Zebras/Impala/Insects)</span>
              </span>
              <span className="font-mono text-xs font-extrabold text-blue-800">{herbivores}</span>
            </div>
            <input
              type="range"
              min="0"
              max="120"
              value={herbivores}
              onChange={(e) => setHerbivores(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <span className="text-[10px] text-blue-700 mt-1 block">
              Primary consumers eating green vegetation
            </span>
          </div>

          {/* Apex Predators */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                <Bird className="w-4 h-4 text-rose-600" />
                <span>🦁 Apex Predators (Lions/Leopards)</span>
              </span>
              <span className="font-mono text-xs font-extrabold text-rose-800">{predators}</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={predators}
              onChange={(e) => setPredators(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <span className="text-[10px] text-rose-700 mt-1 block">
              Top carnivores balancing herbivore grazing
            </span>
          </div>
        </div>

        {/* Live Simulation Canvas & Graphs */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">
                  Live Population Dynamics Chart (Lotka-Volterra Engine)
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tick: <strong className="text-white font-mono">{tick}</strong> • Status:{" "}
                <span className="text-emerald-400 font-semibold">{history[history.length - 1]?.status}</span>
              </p>
            </div>

            {/* Sim controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer transition-all ${
                  isRunning
                    ? "bg-amber-600 hover:bg-amber-500 text-white"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white"
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? "Pause Sim" : "Run Live Sim"}</span>
              </button>

              <button
                onClick={stepSimulation}
                disabled={isRunning}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
              >
                Step +1
              </button>

              <button
                onClick={handleReset}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SVG Realtime Graph */}
          <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 relative overflow-hidden mb-4">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-36 overflow-visible"
            >
              {/* Grid lines */}
              <line x1="0" y1="20" x2={chartWidth} y2="20" stroke="#334155" strokeDasharray="3,3" />
              <line x1="0" y1="70" x2={chartWidth} y2="70" stroke="#334155" strokeDasharray="3,3" />
              <line x1="0" y1="120" x2={chartWidth} y2="120" stroke="#334155" strokeDasharray="3,3" />

              {/* Plant Line (Green) */}
              {history.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  points={history
                    .map((p, idx) => {
                      const x = (idx / Math.max(1, history.length - 1)) * chartWidth;
                      const y = chartHeight - (p.plants / 100) * (chartHeight - 20) - 10;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              )}

              {/* Herbivore Line (Blue) */}
              {history.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  points={history
                    .map((p, idx) => {
                      const x = (idx / Math.max(1, history.length - 1)) * chartWidth;
                      const y = chartHeight - (p.herbivores / 120) * (chartHeight - 20) - 10;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              )}

              {/* Predator Line (Rose) */}
              {history.length > 1 && (
                <polyline
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  points={history
                    .map((p, idx) => {
                      const x = (idx / Math.max(1, history.length - 1)) * chartWidth;
                      const y = chartHeight - (p.predators / 40) * (chartHeight - 20) - 10;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                />
              )}
            </svg>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold pt-2 border-t border-slate-900">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>🌱 Plants: {plants}</span>
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <span className="w-3 h-3 rounded-full bg-sky-500" />
                <span>🦓 Herbivores: {herbivores}</span>
              </span>
              <span className="flex items-center gap-1.5 text-rose-400">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span>🦁 Predators: {predators}</span>
              </span>
            </div>
          </div>

          {/* Ecological insights feedback */}
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong>Scientific Observation:</strong> Notice how changes in sunlight or rainfall directly regulate the maximum carrying capacity of the entire food web. Without apex predators (like African lions or leopards) to control herbivores, plant biomass quickly collapses from overgrazing!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
