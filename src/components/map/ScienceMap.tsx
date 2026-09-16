import React, { useState } from "react";
import {
  Compass,
  ArrowDown,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Flame,
  Globe,
  Atom,
  Brain,
  CheckCircle2,
  ListOrdered,
  Workflow,
  Cpu,
  Lock,
} from "lucide-react";
import { SCIENCE_MAP_NODES, STORYLINE_STEPS } from "../../data/scienceMapData";
import { ModuleId, ScienceMapNode } from "../../types";
import { UniversalSystemEngine } from "../common/UniversalSystemEngine";
import { useLearner } from "../../context/LearnerContext";
import { getModuleUnlockState } from "../../utils/progressionEngine";

interface ScienceMapProps {
  onNavigateTo: (id: ModuleId) => void;
}

export const ScienceMap: React.FC<ScienceMapProps> = ({ onNavigateTo }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("human");
  const [viewMode, setViewMode] = useState<"map" | "engine" | "story" | "epistemology">("map");

  const { completedModules, profile } = useLearner();
  const selectedNode =
    SCIENCE_MAP_NODES.find((n) => n.id === selectedNodeId) || SCIENCE_MAP_NODES[0];
  const targetGate = getModuleUnlockState(selectedNode.targetLesson, completedModules, profile.teacherDemoMode);

  return (
    <section id="map" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm shadow-xs">
          🗺️
        </span>
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            THE LIVING HEART OF THE APPLICATION • UNIFIED SCIENCE MAP
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🧠 The Science Map: How Reality Connects
          </h2>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Intro narrative */}
        <div className="max-w-3xl mb-6">
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Science is not 12 disconnected school subjects. It is <strong>one single, unified story</strong> about how the Sun's energy, planet Earth, living ecosystems, your human body, and physical laws work together.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-2xl mb-8 border border-slate-200">
          <button
            onClick={() => setViewMode("map")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "map"
                ? "bg-white text-purple-900 shadow-sm border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Workflow className="w-4 h-4" />
            <span>Interactive Map</span>
          </button>

          <button
            onClick={() => setViewMode("engine")}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "engine"
                ? "bg-white text-cyan-900 shadow-sm border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-600" />
            <span>Universal Engine</span>
          </button>

          <button
            onClick={() => setViewMode("story")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "story"
                ? "bg-white text-purple-900 shadow-sm border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>12-Step Story</span>
          </button>

          <button
            onClick={() => setViewMode("epistemology")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "epistemology"
                ? "bg-white text-purple-900 shadow-sm border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>How Do We Know?</span>
          </button>
        </div>

        {/* MODE 1: THE INTERACTIVE HIERARCHY MAP */}
        {viewMode === "map" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Diagram Tree (7 Cols) */}
            <div className="lg:col-span-7 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-900/60 text-white flex flex-col items-center">
              <div className="text-center mb-6">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400">
                  Nested Architecture of Nature
                </span>
                <p className="text-xs text-slate-300 mt-0.5">
                  Click any node to explore how it connects to your everyday life:
                </p>
              </div>

              {/* TIER 1: SUN */}
              <div className="w-full max-w-sm mb-2 text-center">
                <button
                  onClick={() => setSelectedNodeId("sun")}
                  className={`w-full py-2.5 px-4 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedNodeId === "sun"
                      ? "bg-amber-500 text-slate-950 border-amber-300 ring-2 ring-amber-300 shadow-lg scale-102 font-black"
                      : "bg-amber-950/80 border-amber-800 text-amber-200 hover:bg-amber-900"
                  }`}
                >
                  <span className="text-xl">☀️</span>
                  <span className="font-extrabold text-xs sm:text-sm">THE SUN (ENERGY ENGINE)</span>
                </button>
                <div className="w-0.5 h-3 bg-amber-500 mx-auto my-1" />
              </div>

              {/* TIER 2: ENERGY */}
              <div className="w-full max-w-sm mb-2 text-center">
                <button
                  onClick={() => setSelectedNodeId("energy")}
                  className={`w-full py-2.5 px-4 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedNodeId === "energy"
                      ? "bg-indigo-600 text-white border-cyan-400 ring-2 ring-cyan-400 shadow-lg scale-102"
                      : "bg-indigo-950/80 border-indigo-700 text-indigo-200 hover:bg-indigo-900"
                  }`}
                >
                  <span className="text-xl">⚡</span>
                  <span className="font-extrabold text-xs sm:text-sm">UNIVERSAL ENERGY</span>
                </button>
                <div className="w-0.5 h-3 bg-indigo-500 mx-auto my-1" />
              </div>

              {/* TIER 3: EARTH SPHERES (AIR, EARTH, WATER) */}
              <div className="w-full max-w-md grid grid-cols-3 gap-2 mb-2">
                {[
                  { id: "air", icon: "🌬️", label: "AIR (Atmosphere)" },
                  { id: "earth", icon: "🌍", label: "EARTH (Geosphere)" },
                  { id: "water", icon: "💧", label: "WATER (Hydrosphere)" },
                ].map((sphere) => (
                  <button
                    key={sphere.id}
                    onClick={() => setSelectedNodeId(sphere.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      selectedNodeId === sphere.id
                        ? "bg-cyan-600 text-white border-white ring-2 ring-cyan-300 scale-102"
                        : "bg-slate-900 border-slate-700 text-cyan-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-lg">{sphere.icon}</span>
                    <span className="text-[10px] font-bold mt-1 leading-tight">{sphere.label}</span>
                  </button>
                ))}
              </div>

              <div className="w-0.5 h-3 bg-emerald-600 my-1" />

              {/* TIER 4: LIFE / BIOSPHERE */}
              <div className="w-full max-w-sm mb-2 text-center">
                <button
                  onClick={() => setSelectedNodeId("life")}
                  className={`w-full py-2 px-4 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedNodeId === "life"
                      ? "bg-emerald-700 text-white border-emerald-300 ring-2 ring-emerald-400 shadow-lg scale-102"
                      : "bg-emerald-950/80 border-emerald-800 text-emerald-200 hover:bg-emerald-900"
                  }`}
                >
                  <span className="text-xl">🌱</span>
                  <span className="font-extrabold text-xs sm:text-sm">THE BIOSPHERE (LIFE)</span>
                </button>
                <div className="w-0.5 h-3 bg-emerald-600 mx-auto my-1" />
              </div>

              {/* TIER 5: PLANTS, ANIMALS, FUNGI */}
              <div className="w-full max-w-md grid grid-cols-3 gap-2 mb-2">
                {[
                  { id: "plants", icon: "🌿", label: "PLANTS (Producers)" },
                  { id: "animals", icon: "🐛", label: "ANIMALS (Consumers)" },
                  { id: "fungi", icon: "🍄", label: "FUNGI (Recyclers)" },
                ].map((bio) => (
                  <button
                    key={bio.id}
                    onClick={() => setSelectedNodeId(bio.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      selectedNodeId === bio.id
                        ? "bg-emerald-600 text-white border-white ring-2 ring-emerald-300 scale-102"
                        : "bg-slate-900 border-slate-700 text-emerald-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-lg">{bio.icon}</span>
                    <span className="text-[10px] font-bold mt-1 leading-tight">{bio.label}</span>
                  </button>
                ))}
              </div>

              <div className="w-0.5 h-3 bg-rose-600 my-1" />

              {/* TIER 6: YOU / HUMAN BODY */}
              <div className="w-full max-w-sm mb-2 text-center">
                <button
                  onClick={() => setSelectedNodeId("human")}
                  className={`w-full py-3 px-4 rounded-2xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedNodeId === "human"
                      ? "bg-rose-600 text-white border-rose-300 ring-4 ring-rose-400/50 shadow-xl scale-105"
                      : "bg-rose-950/90 border-rose-700 text-rose-200 hover:bg-rose-900"
                  }`}
                >
                  <span className="text-2xl">🧍</span>
                  <div>
                    <div className="font-black text-sm">YOU (THE HUMAN BODY)</div>
                    <div className="text-[10px] text-rose-200/90 font-medium">You Are Inside This Giant System!</div>
                  </div>
                </button>
                <div className="w-0.5 h-3 bg-rose-600 mx-auto my-1" />
              </div>

              {/* TIER 7: MATTER & FORCES */}
              <div className="w-full max-w-sm grid grid-cols-2 gap-2 mb-2">
                {[
                  { id: "matter_human", icon: "⚛️", label: "MATTER (Chemistry)" },
                  { id: "forces_human", icon: "⚙️", label: "FORCES (Electricity)" },
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setSelectedNodeId(sub.id)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      selectedNodeId === sub.id
                        ? "bg-purple-600 text-white border-white ring-2 ring-purple-300 scale-102"
                        : "bg-slate-900 border-slate-700 text-purple-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="text-lg">{sub.icon}</span>
                    <span className="text-[10px] font-bold mt-1 leading-tight">{sub.label}</span>
                  </button>
                ))}
              </div>

              <div className="w-0.5 h-3 bg-amber-500 my-1" />

              {/* TIER 8: SCIENCE / HOW DO WE KNOW */}
              <div className="w-full max-w-sm text-center">
                <button
                  onClick={() => setSelectedNodeId("science")}
                  className={`w-full py-3 px-4 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    selectedNodeId === "science"
                      ? "bg-amber-600 text-white border-amber-300 ring-4 ring-amber-400/50 shadow-xl scale-102"
                      : "bg-amber-950/80 border-amber-700 text-amber-200 hover:bg-amber-900"
                  }`}
                >
                  <span className="text-2xl">🔬</span>
                  <div>
                    <div className="font-extrabold text-xs sm:text-sm">SCIENCE: HOW DO WE KNOW?</div>
                    <div className="text-[10px] text-amber-200/80">Evidence ➔ Models ➔ Theories ➔ Laws</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Right: Inspector Node Card (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl p-3 bg-white rounded-2xl shadow-xs border border-slate-200">
                    {selectedNode.icon}
                  </span>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                      Tier {selectedNode.tier} • {selectedNode.category.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                      {selectedNode.label}
                    </h3>
                  </div>
                </div>

                {/* Tagline */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 mb-4">
                  ✨ {selectedNode.tagline}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {selectedNode.description}
                </p>

                {/* Story Snippet */}
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 mb-4">
                  <div className="text-xs font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>The Big Story Connection</span>
                  </div>
                  <p className="text-xs text-blue-950 leading-relaxed">
                    {selectedNode.storySnippet}
                  </p>
                </div>

                {/* Connection to the Child */}
                <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 mb-6">
                  <div className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-1">
                    <span>🧍</span>
                    <span>How This Connects To YOU</span>
                  </div>
                  <p className="text-xs text-rose-950 leading-relaxed">
                    {selectedNode.connectionToChild}
                  </p>
                </div>
              </div>

              {/* Fast Jump Button */}
              <button
                onClick={() => onNavigateTo(selectedNode.targetLesson)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  !targetGate.isUnlocked
                    ? "bg-slate-800 text-slate-400 hover:bg-slate-700"
                    : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/20"
                }`}
              >
                {!targetGate.isUnlocked ? (
                  <>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span>Jump to Lesson on {selectedNode.label.split("(")[0]} (Locked 🔒)</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>Jump to Lesson on {selectedNode.label.split("(")[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: THE UNIVERSAL SYSTEM ENGINE EMBEDDED */}
        {viewMode === "engine" && (
          <UniversalSystemEngine onNavigateTo={onNavigateTo} />
        )}

        {/* MODE 3: THE 12-STEP UNIFYING STORYLINE */}
        {viewMode === "story" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 mb-6">
              <h3 className="font-extrabold text-blue-900 text-sm sm:text-base flex items-center gap-2">
                <span>🌍</span>
                <span>The Story of How Reality Connects (From YOU to the Universe)</span>
              </h3>
              <p className="text-xs text-blue-950 mt-1 leading-relaxed">
                Follow the 12 steps below to see how your everyday life is woven into Earth's cycles, chemistry, energy, and scientific laws:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {STORYLINE_STEPS.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center">
                        {step.step}
                      </span>
                      <span className="text-2xl">{step.icon}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>

                  <button
                    onClick={() => onNavigateTo(step.lesson as ModuleId)}
                    className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore in Lesson →</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODE 4: HOW DO WE KNOW? (EPISTEMOLOGY & SCIENTIFIC METHOD) */}
        {viewMode === "epistemology" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
              <h3 className="font-extrabold text-amber-950 text-base flex items-center gap-2">
                <Brain className="w-5 h-5 text-amber-700" />
                <span>Epistemology: How Does Science Build Real Knowledge?</span>
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 mt-1 leading-relaxed">
                Science is not guessing. It is an honest, evidence-based method that transforms observations into verified models, theories, and laws.
              </p>
            </div>

            {/* The 8-Step Knowledge Engine */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block text-center mb-4">
                The 8-Step Scientific Knowledge Engine
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
                {[
                  { n: "1", label: "OBSERVE", icon: "👀" },
                  { n: "2", label: "ASK", icon: "❓" },
                  { n: "3", label: "MEASURE", icon: "📏" },
                  { n: "4", label: "HYPOTHESIZE", icon: "💡" },
                  { n: "5", label: "TEST (EXPERIMENT)", icon: "🧪" },
                  { n: "6", label: "REPEAT", icon: "🔁" },
                  { n: "7", label: "ANALYZE DATA", icon: "📊" },
                  { n: "8", label: "DISCOVER LAWS", icon: "🏆" },
                ].map((item, idx, arr) => (
                  <React.Fragment key={item.n}>
                    <div className="px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-1.5">
                      <span>{item.icon}</span>
                      <span className="text-slate-300">{item.n}.</span>
                      <span className="text-white">{item.label}</span>
                    </div>
                    {idx < arr.length - 1 && <span className="text-slate-500 font-normal">➔</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Laws vs Theories vs Models Comparison Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200">
                <div className="text-2xl mb-2">📐</div>
                <h4 className="font-extrabold text-blue-950 text-sm">1. Scientific Models</h4>
                <p className="text-xs text-blue-900 mt-1 leading-relaxed">
                  A conceptual, visual, or mathematical representation of something in nature (e.g. the Bohr model of the atom, weather prediction models).
                </p>
                <div className="mt-3 text-[11px] font-bold text-blue-700 bg-blue-100/60 p-2 rounded-lg">
                  Purpose: Helps us visualize & simulate complex systems.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-2xl mb-2">🧠</div>
                <h4 className="font-extrabold text-emerald-950 text-sm">2. Scientific Theories</h4>
                <p className="text-xs text-emerald-900 mt-1 leading-relaxed">
                  A comprehensive, deeply supported explanation of <strong>WHY and HOW</strong> nature behaves the way it does (e.g. Atomic Theory, Germ Theory).
                </p>
                <div className="mt-3 text-[11px] font-bold text-emerald-700 bg-emerald-100/60 p-2 rounded-lg">
                  Purpose: Explains the underlying mechanisms.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200">
                <div className="text-2xl mb-2">📜</div>
                <h4 className="font-extrabold text-purple-950 text-sm">3. Scientific Laws</h4>
                <p className="text-xs text-purple-900 mt-1 leading-relaxed">
                  A concise mathematical or physical statement describing <strong>WHAT happens</strong> under specific conditions (e.g. $F = ma$, Conservation of Mass).
                </p>
                <div className="mt-3 text-[11px] font-bold text-purple-700 bg-purple-100/60 p-2 rounded-lg">
                  Purpose: Summarizes constant repeatable patterns.
                </div>
              </div>
            </div>

            {/* Crucial Distinctions Callout */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-xs text-slate-700">
              💡 <strong>Key Takeaway:</strong> A scientific theory does not "grow up" to become a law! Laws describe <em>what</em> happens, while theories explain <em>why</em>. Both represent the highest levels of verified scientific knowledge.
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
