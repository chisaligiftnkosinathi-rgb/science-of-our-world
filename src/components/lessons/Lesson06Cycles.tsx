import React, { useState } from "react";
import { Droplets, Trees, Wind, RefreshCw, ArrowRight } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson06Cycles: React.FC<LessonProps> = ({ onComplete }) => {
  const [activeCycle, setActiveCycle] = useState<"water" | "carbon" | "oxygen">("water");
  const [activeStep, setActiveStep] = useState<number>(0);

  const cycleData = {
    water: {
      title: "💧 The Water Cycle (Hydrologic Cycle)",
      icon: "💧",
      description: "Driven by thermal solar energy, water continuously cycles through the atmosphere, oceans, land, and living tissues.",
      steps: [
        {
          name: "1. Evaporation & Transpiration",
          icon: "☀️ 🌊",
          desc: "Solar heat warms oceans, lakes, and plant leaves (transpiration), turning liquid H₂O into invisible water vapor gas that rises into the atmosphere.",
        },
        {
          name: "2. Condensation",
          icon: "☁️",
          desc: "As warm vapor ascends, it encounters cold upper atmospheric air, condensing around microscopic dust nuclei into billions of cloud droplets.",
        },
        {
          name: "3. Precipitation",
          icon: "🌧️ ❄️",
          desc: "When cloud droplets become dense and heavy enough, gravity pulls them down as rain, snow, sleet, or hail.",
        },
        {
          name: "4. Collection & Groundwater Infiltration",
          icon: "🏞️ 🪨",
          desc: "Precipitated water drains through rivers into oceans, lakes, and infiltrates deep subterranean aquifers, restarting the infinite cycle.",
        },
      ],
      color: "bg-cyan-50 border-cyan-300 text-cyan-950",
    },
    carbon: {
      title: "🌳 The Carbon Cycle",
      icon: "🌳",
      description: "Carbon is the primary chemical backbone of all biological life on Earth, moving through atmosphere, plants, animals, soil, and deep crust.",
      steps: [
        {
          name: "1. Atmospheric CO₂ Fixation",
          icon: "🌬️ 🌱",
          desc: "Plants, phytoplankton, and trees capture atmospheric carbon dioxide (CO₂) and fix it into biological organic molecules via photosynthesis.",
        },
        {
          name: "2. Trophic Consumption",
          icon: "🐄 🧍",
          desc: "Animals ingest plant carbohydrates and proteins. Carbon becomes structural tissue and cellular energy.",
        },
        {
          name: "3. Cellular Respiration Release",
          icon: "🫁 🌬️",
          desc: "All aerobic organisms metabolize food sugars, breathing CO₂ back out into the surrounding atmosphere.",
        },
        {
          name: "4. Decomposition & Geological Storage",
          icon: "🍄 🪨",
          desc: "When living organisms die, decomposers release carbon back into soil and air; over millions of years, some forms fossil fuels and limestone rocks.",
        },
      ],
      color: "bg-emerald-50 border-emerald-300 text-emerald-950",
    },
    oxygen: {
      title: "🌬️ The Oxygen Cycle",
      icon: "🌬️",
      description: "Tightly interwoven with the carbon cycle, oxygen fuels cellular respiration in aerobic life and forms the protective ozone layer (O₃).",
      steps: [
        {
          name: "1. Photosynthetic Oxygen Release",
          icon: "🌱 🌿",
          desc: "Photosynthetic plants and marine phytoplankton split water molecules (H₂O), releasing diatomic oxygen gas (O₂) into the atmosphere and ocean waters.",
        },
        {
          name: "2. Atmospheric Distribution",
          icon: "🌬️ 🌎",
          desc: "Atmospheric winds distribute oxygen across the globe (~21% of Earth's atmosphere). In the stratosphere, UV rays convert some O₂ into protective ozone (O₃).",
        },
        {
          name: "3. Aerobic Respiration Intake",
          icon: "🧍 🦌",
          desc: "Animals, humans, and microorganisms inhale O₂ to burn food fuel in cellular mitochondria, extracting usable ATP energy.",
        },
        {
          name: "4. Carbon Dioxide & Water Re-formation",
          icon: "💧 🌬️",
          desc: "Oxygen atoms bind with hydrogen and carbon, forming water (H₂O) and CO₂ that return to the ecosystem for the next cycle.",
        },
      ],
      color: "bg-sky-50 border-sky-300 text-sky-950",
    },
  };

  const current = cycleData[activeCycle];
  const pedagogy = LESSON_PEDAGOGIES.cycles;

  const quizQuestion: QuizQuestion = {
    id: "q6_cycles",
    concept: "Biogeochemical Cycles",
    question: "What powers the water cycle to continuously lift billions of tons of water into the sky each day?",
    options: [
      {
        text: "Solar radiant thermal energy from the Sun.",
        isCorrect: true,
        explanation: "Correct! The Sun provides the massive thermal energy needed to evaporate surface water and drive atmospheric wind patterns.",
      },
      {
        text: "Underground volcanic battery magnets.",
        isCorrect: false,
        explanation: "While geothermal energy exists, sunlight drives 99.9% of atmospheric evaporation.",
      },
      {
        text: "The rotation of the moon only.",
        isCorrect: false,
        explanation: "The moon influences ocean tides, but solar thermal heat drives evaporation.",
      },
    ],
  };

  return (
    <section id="cycles" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center text-sm shadow-xs">
          06
        </span>
        <div>
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
            EARTH SYSTEMS • BIOGEOCHEMICAL CYCLES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ♻️ Earth's Natural Cycles
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="06"
        lessonTitle="Earth's Natural Cycles"
        category="EARTH SYSTEMS"
        onComplete={onComplete}
      >
        {/* Interactive Cycles Workbench */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2 mb-5">
            <button
              onClick={() => {
                setActiveCycle("water");
                setActiveStep(0);
                onComplete();
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeCycle === "water"
                  ? "bg-cyan-600 text-white shadow-md ring-2 ring-cyan-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Droplets className="w-4 h-4" /> Water Cycle
            </button>

            <button
              onClick={() => {
                setActiveCycle("carbon");
                setActiveStep(0);
                onComplete();
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeCycle === "carbon"
                  ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Trees className="w-4 h-4" /> Carbon Cycle
            </button>

            <button
              onClick={() => {
                setActiveCycle("oxygen");
                setActiveStep(0);
                onComplete();
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                activeCycle === "oxygen"
                  ? "bg-sky-600 text-white shadow-md ring-2 ring-sky-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Wind className="w-4 h-4" /> Oxygen Cycle
            </button>
          </div>

          {/* Cycle Detail Box */}
          <div className={`p-5 rounded-2xl border transition-all ${current.color}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{current.icon}</span>
              <h3 className="text-lg font-extrabold text-slate-900">{current.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mb-5">{current.description}</p>

            {/* Interactive Step Navigator */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {current.steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeStep === idx
                      ? "bg-white border-slate-900 text-slate-900 shadow-md ring-2 ring-slate-900/20 font-bold"
                      : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                  }`}
                >
                  <div className="text-lg mb-1">{step.icon}</div>
                  <div className="text-xs leading-tight">{step.name}</div>
                </button>
              ))}
            </div>

            {/* Active Step Showcase */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 mb-1">
                <span>{current.steps[activeStep].icon}</span>
                <span>{current.steps[activeStep].name}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {current.steps[activeStep].desc}
              </p>
            </div>
          </div>
        </div>
      </LessonPedagogyWrapper>

      {/* Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
