import React, { useState } from "react";
import { Plus, Trash2, CheckCircle2, AlertCircle, Sparkles, ArrowRight, Zap } from "lucide-react";
import { ORGANISMS_LIST } from "../../data/courseData";
import { Organism, QuizQuestion } from "../../types";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson04FoodChains: React.FC<LessonProps> = ({ onComplete }) => {
  const [chain, setChain] = useState<Organism[]>([]);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    energyPercent?: number;
  } | null>(null);

  const availableOrganisms = ORGANISMS_LIST.filter((o) => o.id !== "sun");
  const pedagogy = LESSON_PEDAGOGIES.food;

  const handleAddOrganism = (org: Organism) => {
    if (chain.length >= 5) return;
    const newChain = [...chain, org];
    setChain(newChain);
    setValidationResult(null);
  };

  const handleRemoveOrganism = (index: number) => {
    const newChain = chain.filter((_, i) => i !== index);
    setChain(newChain);
    setValidationResult(null);
  };

  const handleClear = () => {
    setChain([]);
    setValidationResult(null);
  };

  const handleCheckChain = () => {
    if (chain.length < 2) {
      setValidationResult({
        valid: false,
        message: "❌ Your food chain needs at least 2 or 3 living organisms to show energy flow!",
      });
      return;
    }

    // 1. Must start with a producer
    if (chain[0].type !== "producer") {
      setValidationResult({
        valid: false,
        message: "❌ A food chain must begin with a PRODUCER (like grass, oak tree, or algae) that generates food from sunlight.",
      });
      return;
    }

    // 2. Check logical consumer progression
    const hasConsumer = chain.slice(1).some((o) => o.type === "consumer" || o.type === "decomposer");
    if (!hasConsumer) {
      setValidationResult({
        valid: false,
        message: "❌ Add consumers (herbivores, carnivores) or decomposers after your producer.",
      });
      return;
    }

    // 3. Check for tier ordering
    let tierError = false;
    for (let i = 1; i < chain.length; i++) {
      if (chain[i].tier < chain[i - 1].tier && chain[i].type !== "decomposer") {
        tierError = true;
        break;
      }
    }

    if (tierError) {
      setValidationResult({
        valid: false,
        message: "⚠️ Note the trophic levels: A smaller predator or producer shouldn't typically eat an apex predator. Try: Producer → Herbivore → Carnivore → Apex!",
      });
      return;
    }

    // Valid chain! Calculate energy transfer educational rule of thumb
    const energyRemaining = Math.pow(0.1, chain.length - 1) * 100;

    setValidationResult({
      valid: true,
      message: `✅ Outstanding ecological chain! Radiant energy flows from ${chain[0].name} to ${chain[chain.length - 1].name}. Using the useful ~10% rule-of-thumb model, roughly ${energyRemaining.toFixed(2)}% of original solar captured energy reaches the top organism (real ecosystems vary by organism efficiency).`,
      energyPercent: energyRemaining,
    });

    onComplete();
  };

  const quizQuestion: QuizQuestion = {
    id: "q4_food",
    concept: "Trophic Levels & Energy",
    question: "Why are there usually only 4 or 5 levels in any natural food chain?",
    options: [
      {
        text: "Because a large fraction of energy is used for metabolism or lost as heat at each step, leaving very little energy to sustain higher levels.",
        isCorrect: true,
        explanation: "Correct! Only a small fraction of energy is passed along at each trophic level. Scientists use ~10% as a simple educational rule of thumb, though real ecosystems vary based on species metabolism and temperature.",
      },
      {
        text: "Because animals get tired of eating.",
        isCorrect: false,
        explanation: "The constraint is thermodynamic energy availability at each biological transition!",
      },
      {
        text: "Because all food chains run out of water.",
        isCorrect: false,
        explanation: "Water is recycled in the water cycle; energy availability is the limiting factor.",
      },
    ],
  };

  return (
    <section id="food" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-green-100 text-green-700 font-bold flex items-center justify-center text-sm shadow-xs">
          04
        </span>
        <div>
          <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
            ECOLOGY • FOOD CHAINS & WEBS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🌱 Food Chains & Trophic Webs
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="04"
        lessonTitle="Food Chains & Trophic Webs"
        category="ECOLOGY"
        onComplete={onComplete}
      >
        {/* Interactive Food Chain Builder */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                🎮 Interactive Food Chain Builder
              </h3>
              <p className="text-xs text-slate-500">
                Click organisms to build your ecosystem chain from producer to top predator:
              </p>
            </div>
            {chain.length > 0 && (
              <button
                onClick={handleClear}
                className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            )}
          </div>

          {/* Organism Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 mb-4">
            {availableOrganisms.map((org) => (
              <button
                key={org.id}
                onClick={() => handleAddOrganism(org)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-green-400 hover:bg-green-50/40 text-left transition-all text-xs flex items-center gap-2 group shadow-2xs cursor-pointer"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {org.icon}
                </span>
                <div className="truncate">
                  <div className="font-bold text-slate-800 truncate">{org.name}</div>
                  <div className="text-[10px] text-slate-400 uppercase">{org.type}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Builder Canvas Strip */}
          <div className="p-4 rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 min-h-[90px] flex flex-wrap items-center gap-2">
            {chain.length === 0 ? (
              <div className="text-xs text-slate-400 italic text-center w-full py-4">
                ✨ Click organisms above to construct your food chain... (e.g. Grass → Caterpillar → Bird → Eagle → Fungus)
              </div>
            ) : (
              chain.map((org, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-2xs">
                    <span>{org.icon}</span>
                    <span>{org.name}</span>
                    <button
                      onClick={() => handleRemoveOrganism(index)}
                      className="ml-1 text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                  {index < chain.length - 1 && (
                    <span className="text-green-600 font-extrabold text-sm">→</span>
                  )}
                </React.Fragment>
              ))
            )}
          </div>

          {/* Check Button */}
          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={handleCheckChain}
              disabled={chain.length === 0}
              className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" /> Check Ecological Chain
            </button>
            <span className="text-xs text-slate-500">{chain.length} / 5 links added</span>
          </div>

          {/* Validation Feedback */}
          {validationResult && (
            <div
              className={`mt-4 p-4 rounded-xl text-xs sm:text-sm border leading-relaxed ${
                validationResult.valid
                  ? "bg-emerald-50 border-emerald-300 text-emerald-950"
                  : "bg-amber-50 border-amber-300 text-amber-950"
              }`}
            >
              <p className="font-medium">{validationResult.message}</p>
            </div>
          )}
        </div>
      </LessonPedagogyWrapper>

      {/* Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
