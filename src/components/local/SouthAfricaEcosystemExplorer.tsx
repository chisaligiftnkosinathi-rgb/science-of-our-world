import React, { useState } from "react";
import {
  SOUTH_AFRICAN_FLORA,
  SOUTH_AFRICAN_BIOMES,
  SouthAfricanBiome,
  SouthAfricanFlora,
} from "../../data/southAfricaData";
import { SCIENTIFIC_TERMS_I18N } from "../../data/i18nData";
import { useLearner } from "../../context/LearnerContext";
import {
  TreePine,
  Sun,
  Droplets,
  Flame,
  Shield,
  Layers,
  MapPin,
  Sparkles,
  ArrowRight,
  Info,
  BookOpen,
} from "lucide-react";

export const SouthAfricaEcosystemExplorer: React.FC = () => {
  const { language } = useLearner();
  const [selectedBiomeId, setSelectedBiomeId] = useState<string>("bushveld");
  const [selectedFloraId, setSelectedFloraId] = useState<string>("marula");
  const [activeTab, setActiveTab] = useState<"biomes" | "flora" | "dictionary">("biomes");

  const currentBiome =
    SOUTH_AFRICAN_BIOMES.find((b) => b.id === selectedBiomeId) ||
    SOUTH_AFRICAN_BIOMES[0];
  const currentFlora =
    SOUTH_AFRICAN_FLORA.find((f) => f.id === selectedFloraId) ||
    SOUTH_AFRICAN_FLORA[0];

  return (
    <section id="sa-science" className="scroll-mt-20 my-12">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Background Subtle Accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇿🇦</span>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Local Science Mode • Mzansi Ecosystems
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono">
                CAPS Aligned
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
              Investigate Your Local Environment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Science isn't something that only happens far away in foreign textbooks. Explore the extraordinary biomes, indigenous plants, and energy cycles of South Africa.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab("biomes")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "biomes"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🏞️ Biomes & Food Webs
            </button>
            <button
              onClick={() => setActiveTab("flora")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "flora"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              🌱 Indigenous Flora
            </button>
            <button
              onClick={() => setActiveTab("dictionary")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "dictionary"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              📖 Multilingual Dictionary
            </button>
          </div>
        </div>

        {/* TAB 1: SOUTH AFRICAN BIOMES & FOOD WEBS */}
        {activeTab === "biomes" && (
          <div className="mt-6 space-y-6 animate-in fade-in">
            {/* Biome Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {SOUTH_AFRICAN_BIOMES.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBiomeId(b.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedBiomeId === b.id
                      ? "bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/30"
                      : "bg-slate-950/70 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="text-2xl mb-1">{b.icon}</div>
                  <div className="font-bold text-xs sm:text-sm text-white line-clamp-1">
                    {b.name}
                  </div>
                  <div className="text-[10px] text-emerald-400/90 font-medium">
                    {b.rainfallPattern}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Biome Investigation Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-950/90 p-6 rounded-2xl border border-slate-800">
              {/* Left Column: Biome Profile & Physical Parameters */}
              <div className="space-y-4 lg:col-span-1 border-b lg:border-b-0 lg:border-r border-slate-800 lg:pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{currentBiome.icon}</span>
                  <div>
                    <h3 className="text-lg font-black text-white">{currentBiome.name}</h3>
                    <p className="text-xs text-emerald-400 font-medium">{currentBiome.localName}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentBiome.description}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span><strong>Provinces:</strong> {currentBiome.provinces.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span><strong>Rainfall:</strong> {currentBiome.rainfallPattern}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><strong>Solar Inflow:</strong> {currentBiome.solarIrradiance}</span>
                  </div>
                </div>

                {/* Conservation Alert */}
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs space-y-1">
                  <span className="font-bold text-rose-300 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Ecological Challenge:
                  </span>
                  <p className="text-[11px] text-rose-200/90 leading-snug">
                    {currentBiome.conservationChallenge}
                  </p>
                </div>
              </div>

              {/* Right Column: Local Trophic Food Chain */}
              <div className="space-y-4 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    Energy & Matter Flow in {currentBiome.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Sun ➔ Producer ➔ Consumer ➔ Decomposer</span>
                </div>

                {/* Trophic Chain Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/40 space-y-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      ☀️ Radiant Energy Inflow
                    </span>
                    <p className="text-xs font-semibold text-white">{currentBiome.trophicChain.sunEnergy}</p>
                    <p className="text-[10px] text-slate-400">Inflows drive C3/C4 photosynthesis</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      🌱 Primary Autotroph (Producer)
                    </span>
                    <p className="text-xs font-semibold text-white">{currentBiome.trophicChain.producer}</p>
                    <p className="text-[10px] text-slate-400">Builds organic glucose matter</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/40 space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                      🦓 Primary Consumer (Herbivore)
                    </span>
                    <p className="text-xs font-semibold text-white">{currentBiome.trophicChain.primaryConsumer}</p>
                    <p className="text-[10px] text-slate-400">Consumes plant cellulose & sugars</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-purple-500/40 space-y-1">
                    <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                      🦁 Apex Predator (Carnivore)
                    </span>
                    <p className="text-xs font-semibold text-white">{currentBiome.trophicChain.apexPredator}</p>
                    <p className="text-[10px] text-slate-400">Controls herbivore populations (negative feedback)</p>
                  </div>
                </div>

                {/* Decomposer Closed Loop */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-indigo-700/60 flex items-center gap-3">
                  <div className="text-2xl p-1.5 bg-slate-950 rounded-lg">🪲</div>
                  <div className="text-xs">
                    <span className="font-bold text-indigo-300">
                      Closed Loop Recycler (Decomposer):
                    </span>{" "}
                    <span className="text-slate-200">{currentBiome.trophicChain.decomposer}</span>
                    <p className="text-[10px] text-slate-400">
                      Recycles nitrogen, carbon, and phosphorus back into living soil.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INDIGENOUS SOUTH AFRICAN FLORA */}
        {activeTab === "flora" && (
          <div className="mt-6 space-y-6 animate-in fade-in">
            {/* Flora Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {SOUTH_AFRICAN_FLORA.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSelectedFloraId(f.id)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedFloraId === f.id
                      ? "bg-emerald-950 border-emerald-500 ring-2 ring-emerald-500/30"
                      : "bg-slate-950/80 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="text-3xl mb-1">{f.icon}</div>
                  <div className="font-bold text-xs text-white">{f.nameEnglish}</div>
                  <div className="text-[10px] text-emerald-400 italic">
                    {f.nameIsiZulu}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Flora Card */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="text-4xl p-2 rounded-2xl bg-emerald-950 border border-emerald-800">
                    {currentFlora.icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {currentFlora.nameEnglish}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-emerald-400 font-bold">
                        isiZulu: <em>{currentFlora.nameIsiZulu}</em>
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-cyan-400 font-bold">
                        siSwati: <em>{currentFlora.nameSiSwati}</em>
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400 italic font-mono text-[11px]">
                        {currentFlora.latinName}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                  📍 {currentFlora.biome}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    🛡️ Environmental Adaptation
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentFlora.adaptation}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    🐝 Ecological Role
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentFlora.ecosystemRole}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    ⚡ Matter & Energy Strategy
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {currentFlora.matterAndEnergyStrategy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MULTILINGUAL SCIENTIFIC DICTIONARY (English | isiZulu | siSwati) */}
        {activeTab === "dictionary" && (
          <div className="mt-6 space-y-4 animate-in fade-in">
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 flex items-center justify-between text-xs">
              <span className="text-indigo-200">
                <strong>Language bridge:</strong> Science belongs to all languages. Compare fundamental concepts in English, isiZulu, and siSwati.
              </span>
              <span className="text-[10px] font-mono text-indigo-400">Verified Indigenous Terms</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(SCIENTIFIC_TERMS_I18N).map(([key, item]) => (
                <div
                  key={key}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="font-black text-sm text-white">{item.en}</span>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      Scientific Concept
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-900 border border-emerald-900/50">
                      <span className="text-[9px] font-bold text-emerald-400 uppercase block">
                        isiZulu
                      </span>
                      <span className="font-bold text-emerald-200">{item.zu}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900 border border-cyan-900/50">
                      <span className="text-[9px] font-bold text-cyan-400 uppercase block">
                        siSwati
                      </span>
                      <span className="font-bold text-cyan-200">{item.ss}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug pt-1">
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
