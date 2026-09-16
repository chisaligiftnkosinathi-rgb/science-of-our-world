import React, { useState } from "react";
import { FlaskConical, ArrowRight, Sun, Sparkles, Sprout, Heart } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson08Chemistry: React.FC<LessonProps> = ({ onComplete }) => {
  const [reactionView, setReactionView] = useState<"photosynthesis" | "respiration">("photosynthesis");
  const pedagogy = LESSON_PEDAGOGIES.chemistry;

  const quizQuestion: QuizQuestion = {
    id: "q8_chemistry",
    concept: "Biochemical Reactions",
    question: "How are plant Photosynthesis and animal Cellular Respiration related in nature?",
    options: [
      {
        text: "They are exact chemical complementary counterparts: the products of photosynthesis (sugars + O₂) become the reactants for cellular respiration!",
        isCorrect: true,
        explanation: "Outstanding! Plants produce oxygen and glucose using sunlight, which animals consume to produce ATP, releasing CO₂ and water right back to the plants.",
      },
      {
        text: "They use the exact same ingredients to make plastic.",
        isCorrect: false,
        explanation: "They balance Earth's carbon and oxygen cycles between life forms.",
      },
      {
        text: "Photosynthesis only happens on the moon.",
        isCorrect: false,
        explanation: "Photosynthesis is the foundational energy engine of Earth's biosphere.",
      },
    ],
  };

  return (
    <section id="chemistry" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm shadow-xs">
          08
        </span>
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
            CHEMISTRY • REACTIONS IN LIVING SYSTEMS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🧪 Chemistry in Life
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="08"
        lessonTitle="Chemistry in Life"
        category="CHEMISTRY"
        onComplete={onComplete}
      >
        {/* Interactive Reaction Explorer Workbench */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {/* Reaction Switcher */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => {
                setReactionView("photosynthesis");
                onComplete();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                reactionView === "photosynthesis"
                  ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Sprout className="w-4 h-4" /> 1. Photosynthesis (In Plants)
            </button>

            <button
              onClick={() => {
                setReactionView("respiration");
                onComplete();
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                reactionView === "respiration"
                  ? "bg-rose-600 text-white shadow-md ring-2 ring-rose-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Heart className="w-4 h-4" /> 2. Cellular Respiration (In Cells)
            </button>
          </div>

          {/* Detailed Reaction Card */}
          {reactionView === "photosynthesis" ? (
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🌱</span>
                <h3 className="text-base font-bold text-emerald-950">
                  Photosynthesis: Making Food From Solar Energy
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900 mb-4">
                Inside microscopic chloroplast organelles, chlorophyll pigments absorb sunlight photons to chemically combine carbon dioxide gas and water into energy-rich glucose sugar and breathable oxygen.
              </p>

              {/* Chemical Equation Box */}
              <div className="bg-slate-900 text-white p-4 rounded-xl font-mono text-xs sm:text-sm text-center overflow-x-auto mb-4 border border-emerald-500/40">
                <span className="text-cyan-300">6 CO₂</span> (Carbon Dioxide) +{" "}
                <span className="text-blue-300">6 H₂O</span> (Water) +{" "}
                <span className="text-amber-300">☀️ Light Energy</span>
                <br className="sm:hidden" />
                <span className="text-emerald-400 font-bold mx-2">➔</span>
                <span className="text-yellow-300 font-bold">C₆H₁₂O₆</span> (Glucose Sugar) +{" "}
                <span className="text-teal-300 font-bold">6 O₂</span> (Oxygen Gas)
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/80 p-3 rounded-lg border border-emerald-200">
                  <strong className="text-emerald-950 block mb-0.5">📥 Reactants:</strong>
                  Carbon Dioxide (from air) + Water (from soil)
                </div>
                <div className="bg-white/80 p-3 rounded-lg border border-emerald-200">
                  <strong className="text-emerald-950 block mb-0.5">📤 Products:</strong>
                  Glucose (food for plant growth) + Oxygen (released to air)
                </div>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚡</span>
                <h3 className="text-base font-bold text-rose-950">
                  Cellular Respiration: Unlocking Usable Biological Energy (ATP)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-rose-900 mb-4">
                Inside cellular mitochondria, oxygen oxidizes glucose food molecules, unlocking high-energy chemical bonds to synthesize ATP (adenosine triphosphate) that powers heartbeats, brain thoughts, and muscle movement.
              </p>

              {/* Chemical Equation Box */}
              <div className="bg-slate-900 text-white p-4 rounded-xl font-mono text-xs sm:text-sm text-center overflow-x-auto mb-4 border border-rose-500/40">
                <span className="text-yellow-300 font-bold">C₆H₁₂O₆</span> (Glucose) +{" "}
                <span className="text-teal-300 font-bold">6 O₂</span> (Oxygen)
                <br className="sm:hidden" />
                <span className="text-rose-400 font-bold mx-2">➔</span>
                <span className="text-cyan-300">6 CO₂</span> +{" "}
                <span className="text-blue-300">6 H₂O</span> +{" "}
                <span className="text-amber-300 font-bold">⚡ ~36 ATP (Usable Energy) + Heat</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/80 p-3 rounded-lg border border-rose-200">
                  <strong className="text-rose-950 block mb-0.5">📥 Reactants:</strong>
                  Glucose (from digested food) + Oxygen (from inhaled air)
                </div>
                <div className="bg-white/80 p-3 rounded-lg border border-rose-200">
                  <strong className="text-rose-950 block mb-0.5">📤 Products:</strong>
                  ATP Cellular Energy + Carbon Dioxide (exhaled) + Water + Heat
                </div>
              </div>
            </div>
          )}
        </div>
      </LessonPedagogyWrapper>

      {/* Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
