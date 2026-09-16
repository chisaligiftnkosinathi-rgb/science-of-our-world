import React, { useState } from "react";
import { Activity, Heart, Wind, Brain, Apple, Flame, Dumbbell } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson02HumanBody: React.FC<LessonProps> = ({ onComplete }) => {
  const [selectedOrgan, setSelectedOrgan] = useState<string>("heart");

  const organs = [
    {
      id: "heart",
      icon: "❤️",
      name: "Circulatory System (Heart & Vessels)",
      subsystem: "Circulatory",
      job: "Pumps oxygen-rich blood, red blood cells, glucose, and immune cells through 60,000 miles of blood vessels.",
      inputs: "Oxygenated blood from lungs, chemical nutrients from intestines.",
      outputs: "Deoxygenated blood sent to lungs, metabolic waste sent to kidneys.",
      fact: "Beats ~100,000 times per day without stopping.",
    },
    {
      id: "lungs",
      icon: "🫁",
      name: "Respiratory System (Lungs & Trachea)",
      subsystem: "Respiratory",
      job: "Performs gas exchange in 300 million tiny alveoli sacs, bringing vital O₂ into capillaries and expelling waste CO₂.",
      inputs: "Inhaled atmospheric air (~21% Oxygen, 78% Nitrogen).",
      outputs: "Exhaled air (~16% Oxygen, ~4% Carbon Dioxide, plus water vapor).",
      fact: "Surface area of lungs unfolded is roughly the size of a tennis court!",
    },
    {
      id: "digestive",
      icon: "🍎",
      name: "Digestive System (Stomach & Intestines)",
      subsystem: "Digestive",
      job: "Mechanically and chemically breaks down complex food proteins, carbohydrates, and fats into absorbable cellular fuel.",
      inputs: "Solid food, water, electrolytes.",
      outputs: "Absorbed monosaccharides, amino acids, fatty acids; unabsorbed fiber waste.",
      fact: "Microscopic villi lining your small intestine absorb fuel directly into your bloodstream.",
    },
    {
      id: "brain",
      icon: "🧠",
      name: "Nervous System (Brain & Nerves)",
      subsystem: "Nervous / Control",
      job: "Coordinates sensory signals, regulates heartbeat, breathing rates, body temperature (thermoregulation), and consciousness.",
      inputs: "Sensory stimuli, glucose, oxygen (consumes ~20% of your body's resting energy).",
      outputs: "Electrical nerve impulses, hormones, muscle movement instructions.",
      fact: "Has around 86 billion neurons sending signals up to 260 mph.",
    },
  ];

  const activeOrgan = organs.find((o) => o.id === selectedOrgan) || organs[0];
  const pedagogy = LESSON_PEDAGOGIES.human;

  const quizQuestion: QuizQuestion = {
    id: "q2_human",
    concept: "Human Energy & Matter Flow",
    question: "When your muscles perform physical work (like running), what happens to the energy from your food?",
    options: [
      {
        text: "Chemical energy in food is converted into mechanical work (muscle movement) and thermal energy (heat radiated from skin).",
        isCorrect: true,
        explanation: "Correct! Cellular respiration converts glucose into ATP, which contracts muscle fibers; excess thermal energy leaves through your skin as heat and sweat.",
      },
      {
        text: "All food energy is destroyed and ceases to exist.",
        isCorrect: false,
        explanation: "Energy is conserved; it transforms into kinetic motion and thermal energy.",
      },
      {
        text: "Food only provides solid matter, but zero energy.",
        isCorrect: false,
        explanation: "Food contains high-energy chemical bonds in carbohydrates, fats, and proteins.",
      },
    ],
  };

  return (
    <section id="human" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm shadow-xs">
          02
        </span>
        <div>
          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
            BIOLOGY • HUMAN SYSTEMS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🧍 The Human Body
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="02"
        lessonTitle="The Human Body"
        category="BIOLOGY"
        onComplete={onComplete}
      >
        {/* Interactive Organ System Explorer Workbench */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {/* Energy & Matter Flow Diagram */}
          <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-orange-50 border border-amber-200/80 rounded-2xl p-5 mb-6">
            <div className="text-xs font-extrabold uppercase tracking-wider text-amber-800 mb-3 text-center">
              🔥 The Metabolic Energy & Matter Highway
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-amber-300 shadow-xs min-w-[100px]">
                <div className="text-2xl">🍎</div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">1. Food & O₂</div>
                <div className="text-[11px] text-slate-500">Chemical Input</div>
              </div>
              <div className="text-amber-600 font-bold text-lg">→</div>
              <div className="bg-white p-3 rounded-xl border border-rose-300 shadow-xs min-w-[100px]">
                <div className="text-2xl">🧍</div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">2. Cells</div>
                <div className="text-[11px] text-slate-500">Metabolic Engine</div>
              </div>
              <div className="text-rose-600 font-bold text-lg">→</div>
              <div className="bg-white p-3 rounded-xl border border-indigo-300 shadow-xs min-w-[100px]">
                <div className="text-2xl">💪</div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">3. Work / Motion</div>
                <div className="text-[11px] text-slate-500">Kinetic Output</div>
              </div>
              <div className="text-indigo-600 font-bold text-lg">+</div>
              <div className="bg-white p-3 rounded-xl border border-orange-300 shadow-xs min-w-[100px]">
                <div className="text-2xl">🌡️</div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm">4. Heat (37°C)</div>
                <div className="text-[11px] text-slate-500">Thermal Radiation</div>
              </div>
            </div>
          </div>

          {/* Interactive Organ System Explorer */}
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
            🔍 Click an Organ Subsystem to Inspect Its Role:
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {organs.map((organ) => (
              <button
                key={organ.id}
                onClick={() => {
                  setSelectedOrgan(organ.id);
                  onComplete();
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedOrgan === organ.id
                    ? "bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-300"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="text-xl mb-1">{organ.icon}</div>
                <div className="font-bold text-xs sm:text-sm leading-tight">{organ.subsystem}</div>
              </button>
            ))}
          </div>

          {/* Selected Organ Detail Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{activeOrgan.icon}</span>
              <h4 className="text-base font-bold text-slate-900">{activeOrgan.name}</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mb-3">{activeOrgan.job}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-2">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong className="text-emerald-700 block">📥 What Enters (Inputs):</strong>
                <span className="text-slate-600">{activeOrgan.inputs}</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <strong className="text-blue-700 block">📤 What Leaves (Outputs):</strong>
                <span className="text-slate-600">{activeOrgan.outputs}</span>
              </div>
            </div>

            <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-900">
              💡 <strong>Scientist Fact:</strong> {activeOrgan.fact}
            </div>
          </div>
        </div>
      </LessonPedagogyWrapper>

      {/* Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
