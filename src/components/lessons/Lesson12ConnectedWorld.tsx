import React, { useState } from "react";
import { Globe, AlertTriangle, Sparkles, RefreshCw, Layers, Check } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson12ConnectedWorld: React.FC<LessonProps> = ({ onComplete }) => {
  const [removedElement, setRemovedElement] = useState<string | null>(null);

  const pedagogy = LESSON_PEDAGOGIES.connected;

  const systemNodes = [
    { id: "sun", icon: "☀️", name: "Sun (Energy Engine)", tier: "Energy" },
    { id: "water", icon: "💧", name: "Water Cycle (Hydrosphere)", tier: "Cycle" },
    { id: "plants", icon: "🌱", name: "Plants & Producers", tier: "Biosphere" },
    { id: "animals", icon: "🐄", name: "Herbivores & Wildlife", tier: "Biosphere" },
    { id: "humans", icon: "🧍", name: "Human Societies", tier: "Biosphere" },
    { id: "decomposers", icon: "🍄", name: "Soil Decomposers", tier: "Biosphere" },
  ];

  const cascadeEffects: Record<string, string> = {
    sun: "⚠️ Without solar radiant photons, photosynthesis stops worldwide within hours. Earth drops to freezing temperatures, collapsing plant growth and animal food chains.",
    water: "⚠️ Without clean water cycles and precipitation, plants wilt, biological cellular processes halt, and animal dehydration leads to catastrophic ecological collapse.",
    plants: "⚠️ Without primary producers fixing carbon and producing oxygen (O₂), atmospheric oxygen drops, herbivores starve, and secondary consumers lose all food sustenance.",
    animals: "⚠️ Without consumers and pollinators, plant reproduction drops, seed dispersal stops, and nutrient recycling slows drastically.",
    humans: "⚠️ As conscious stewards with planetary impact, human decisions directly influence atmosphere greenhouse gases, forest biodiversity, and ocean chemistry.",
    decomposers: "⚠️ Without fungi and bacteria breaking down dead matter, forest floors would pile miles high in undecayed logs, and vital nitrogen/carbon soil minerals would remain permanently trapped.",
  };

  const handleToggle = (id: string) => {
    if (removedElement === id) {
      setRemovedElement(null);
    } else {
      setRemovedElement(id);
      onComplete();
    }
  };

  const quizQuestion: QuizQuestion = {
    id: "q12_connected",
    concept: "Systems Thinking & Interdependence",
    question: "What is the core takeaway of viewing our world through Systems Thinking?",
    options: [
      {
        text: "You are not an isolated spectator; you are a living sub-system nested within Earth's greater biological, physical, and chemical super-system.",
        isCorrect: true,
        explanation: "Bravo! Everything in our world connects—from the water you drink to the oxygen trees breathe for you. Science illuminates these beautiful connections.",
      },
      {
        text: "Things only happen by pure magic with no natural rules.",
        isCorrect: false,
        explanation: "Natural physical laws govern all matter and energy flows.",
      },
      {
        text: "Each animal lives in its own completely separate universe.",
        isCorrect: false,
        explanation: "All organisms share Earth's single connected biosphere.",
      },
    ],
  };

  return (
    <section id="connected" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-sm shadow-xs">
          12
        </span>
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            SYNTHESIS • SYSTEMS THINKING & STEWARDSHIP
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🌎 One Connected World
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="12"
        lessonTitle="One Connected World"
        category="SYNTHESIS"
        onComplete={onComplete}
      >
        {/* The Grand Connected Mega-System Graphic */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white border border-indigo-900/50 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              The Grand Ecological & Physical Web
            </span>
            <h3 className="text-xl font-black text-white mt-1">
              Earth's Mega-System Interdependence
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Click any element below to simulate an ecological stress perturbation:
            </p>
          </div>

          {/* Connected Grid Nodes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 mb-6">
            {systemNodes.map((node) => {
              const isDisrupted = removedElement === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => handleToggle(node.id)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isDisrupted
                      ? "bg-rose-950/90 border-rose-500 text-rose-300 ring-2 ring-rose-500/50 scale-95"
                      : "bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700 hover:border-cyan-400"
                  }`}
                >
                  <div className="text-2xl mb-1">{node.icon}</div>
                  <div className="font-bold text-xs leading-tight">{node.name.split(" ")[0]}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{node.tier}</div>
                  <div
                    className={`text-[9px] mt-1 font-bold uppercase ${
                      isDisrupted ? "text-rose-400" : "text-emerald-400"
                    }`}
                  >
                    {isDisrupted ? "⚠️ Disrupted" : "✓ Active"}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Perturbation Effect Box */}
          {removedElement ? (
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-600/80 text-xs sm:text-sm text-rose-200 leading-relaxed">
              <div className="flex items-center justify-between font-bold text-rose-300 mb-1">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Cascading Ecosystem Feedback Impact:</span>
                </span>
                <button
                  onClick={() => setRemovedElement(null)}
                  className="text-xs text-rose-300 underline hover:text-white cursor-pointer"
                >
                  Restore All Systems
                </button>
              </div>
              <p>{cascadeEffects[removedElement]}</p>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/60 text-xs sm:text-sm text-indigo-200 text-center">
              ✨ <strong>Ecosystem Equilibrium Stable:</strong> All cycles, energy inputs, and food webs are in harmony.
            </div>
          )}
        </div>
      </LessonPedagogyWrapper>

      {/* Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
