import React, { useState } from "react";
import { Sun, Flame, Zap, Wind, Battery, ArrowRight, Sparkles } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson05Energy: React.FC<LessonProps> = ({ onComplete }) => {
  const [selectedTransformation, setSelectedTransformation] = useState<number>(0);
  const [sourceTemp, setSourceTemp] = useState<number>(85);
  const [targetTemp, setTargetTemp] = useState<number>(20);

  const transformations = [
    {
      title: "Solar to Chemical to Muscle Kinetic",
      steps: [
        { icon: "☀️", label: "Solar Radiation", desc: "Photons from Sun" },
        { icon: "🌱", label: "Plant Glucose", desc: "Chemical bonds" },
        { icon: "🍎", label: "Food Fuel", desc: "Digested nutrients" },
        { icon: "🏃", label: "Muscle Motion", desc: "Kinetic work + heat" },
      ],
      principle: "Radiant solar energy converts into chemical potential energy in food, which your mitochondria convert into ATP for kinetic motion!",
    },
    {
      title: "Wind Kinetic to Electrical to Light",
      steps: [
        { icon: "🌬️", label: "Wind Kinetic", desc: "Moving air masses" },
        { icon: "💨", label: "Turbine Rotation", desc: "Mechanical torque" },
        { icon: "⚡", label: "Generator Electricity", desc: "Electron flow" },
        { icon: "💡", label: "LED Light", desc: "Illumination + minor heat" },
      ],
      principle: "Kinetic energy of moving air turns generator magnets, inducing electrical voltage that illuminates lightbulbs in our homes.",
    },
    {
      title: "Hydroelectric Potential to Power",
      steps: [
        { icon: "🌧️", label: "Rain / Evaporation", desc: "Solar hydrologic cycle" },
        { icon: "🏔️", label: "Elevated Dam Water", desc: "Gravitational potential" },
        { icon: "🌊", label: "Rushing Water", desc: "Kinetic flow through penstock" },
        { icon: "⚡", label: "Grid Power", desc: "Clean electrical energy" },
      ],
      principle: "Water stored high up has gravitational potential energy; flowing downward, it spins hydro-turbines.",
    },
  ];

  const currentTrans = transformations[selectedTransformation];
  const pedagogy = LESSON_PEDAGOGIES.energy;

  const heatDiff = sourceTemp - targetTemp;
  const heatRate = heatDiff > 0 ? (heatDiff / 10).toFixed(1) : "0";

  const quizQuestion: QuizQuestion = {
    id: "q5_energy",
    concept: "Thermal Energy Flow",
    question: "When you place an ice cube into a cup of warm tea, what physically happens to thermal heat?",
    options: [
      {
        text: "Heat energy spontaneously flows from the warmer tea into the cooler ice cube until thermal equilibrium is reached.",
        isCorrect: true,
        explanation: "Correct! The 2nd Law of Thermodynamics dictates that heat naturally transfers from warmer regions to cooler regions.",
      },
      {
        text: "'Coldness' leaves the ice cube and enters the tea.",
        isCorrect: false,
        explanation: "In physics, 'cold' is not a physical substance; it is simply the absence of thermal energy. Heat moves from hot to cold.",
      },
      {
        text: "Heat and coldness trade places in equal amounts.",
        isCorrect: false,
        explanation: "Thermal energy flows unidirectionally from higher temperature to lower temperature.",
      },
    ],
  };

  return (
    <section id="energy" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm shadow-xs">
          05
        </span>
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            PHYSICS • ENERGY & THERMODYNAMICS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ☀️ Energy & Heat Transfer
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="05"
        lessonTitle="Energy & Heat Transfer"
        category="PHYSICS"
        onComplete={onComplete}
      >
        <div className="space-y-6">
          {/* Interactive Transformation Pathways */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              🔄 Interactive Energy Transformation Pathways (Click to switch):
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {transformations.map((t, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTransformation(idx);
                    onComplete();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedTransformation === idx
                      ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>

            {/* Flow Visualizer */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-3">
              {currentTrans.steps.map((step, i) => (
                <React.Fragment key={i}>
                  <div className="p-3 rounded-xl bg-white border border-amber-200 text-center min-w-[100px] shadow-2xs">
                    <div className="text-2xl mb-1">{step.icon}</div>
                    <div className="font-bold text-slate-900 text-xs">{step.label}</div>
                    <div className="text-[10px] text-slate-500">{step.desc}</div>
                  </div>
                  {i < currentTrans.steps.length - 1 && (
                    <span className="text-amber-500 font-extrabold text-lg">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="text-xs text-slate-600 italic bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
              <strong>Scientific Mechanism:</strong> {currentTrans.principle}
            </p>
          </div>

          {/* Interactive Heat Transfer Demonstration */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                🔥 Directional Heat Transfer Simulation (Hot → Cold)
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Adjust the temperatures of the two connected bodies to see how thermal energy naturally flows:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Warm Object A: <span className="text-rose-600 font-extrabold">{sourceTemp}°C</span>
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={sourceTemp}
                  onChange={(e) => setSourceTemp(Number(e.target.value))}
                  className="w-full cursor-pointer accent-rose-600"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Cool Object B: <span className="text-blue-600 font-extrabold">{targetTemp}°C</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="29"
                  value={targetTemp}
                  onChange={(e) => setTargetTemp(Number(e.target.value))}
                  className="w-full cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            {/* Dynamic Heat Arrow Flow */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
              <div className="text-center p-3 rounded-lg bg-rose-100 border border-rose-300 min-w-[90px]">
                <div className="text-xs font-bold text-rose-900">Object A</div>
                <div className="text-lg font-black text-rose-700">{sourceTemp}°C</div>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <span className="text-xs font-bold text-slate-600 mb-1">
                  Heat Flux: {heatRate} kW/m²
                </span>
                <div className="w-full h-3 bg-gradient-to-r from-rose-500 via-amber-400 to-blue-500 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/30 animate-pulse" />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-semibold">
                  Natural Flow Direction: 🔴 Hot → 🔵 Cold
                </span>
              </div>

              <div className="text-center p-3 rounded-lg bg-blue-100 border border-blue-300 min-w-[90px]">
                <div className="text-xs font-bold text-blue-900">Object B</div>
                <div className="text-lg font-black text-blue-700">{targetTemp}°C</div>
              </div>
            </div>
          </div>
        </div>
      </LessonPedagogyWrapper>

      {/* Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
