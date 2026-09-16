import React, { useState } from "react";
import { CheckCircle2, Box } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson01Systems: React.FC<LessonProps> = ({ onComplete }) => {
  const [systemType, setSystemType] = useState<"open" | "closed" | "isolated">("open");

  const systemData = {
    open: {
      title: "🟢 Open System",
      badge: "Matter & Energy Cross Boundary",
      description: "Both matter (mass/substances) and energy (heat/work) can enter and exit across the boundary.",
      examples: "Humans, animals, trees, lakes, Earth's atmosphere, cooking pots with no lid.",
      matterFlow: "✅ Matter enters (food, water, air) and leaves (sweat, CO₂, waste)",
      energyFlow: "✅ Energy enters (chemical, light) and leaves (thermal heat, work)",
      borderColor: "border-emerald-400 bg-emerald-50/50",
    },
    closed: {
      title: "🔵 Closed System",
      badge: "Only Energy Crosses Boundary",
      description: "Energy can transfer in or out (as heat or radiation), but matter remains trapped inside the boundary.",
      examples: "A tightly sealed water bottle, a sealed terrarium, a glow stick, or planet Earth (as an introductory approximation).",
      matterFlow: "❌ Matter cannot cross the sealed boundary",
      energyFlow: "✅ Energy (heat, sunlight) warms or cools the contents inside",
      borderColor: "border-blue-400 bg-blue-50/50",
    },
    isolated: {
      title: "🔴 Isolated System",
      badge: "No Matter, No Energy Crosses",
      description: "Neither matter nor energy can cross the boundary. In the real physical world, this is an idealized theoretical model (a high-grade vacuum thermos flask is an approximation).",
      examples: "The entire physical Universe (in standard cosmology), an ideal vacuum insulated calorimeter.",
      matterFlow: "❌ No matter enters or leaves",
      energyFlow: "❌ No thermal heat or work crosses the boundary",
      borderColor: "border-rose-400 bg-rose-50/50",
    },
  };

  const quizQuestion: QuizQuestion = {
    id: "q1_systems",
    concept: "System Boundaries",
    question: "Which of the following is best classified as an OPEN system in nature?",
    options: [
      {
        text: "🧍 A living person breathing, eating, and radiating body heat.",
        isCorrect: true,
        explanation: "Correct! We intake food, water, and oxygen (matter) and emit heat and waste, making us quintessential open systems.",
      },
      {
        text: "🥤 A sealed, airtight plastic bottle of water on a table.",
        isCorrect: false,
        explanation: "A sealed bottle keeps matter inside, though it can still warm or cool (closed system).",
      },
      {
        text: "📦 A theoretical, infinitely thick vacuum box that lets zero heat or mass pass.",
        isCorrect: false,
        explanation: "That describes an idealized isolated system model.",
      },
    ],
  };

  const current = systemData[systemType];
  const pedagogy = LESSON_PEDAGOGIES.systems;

  return (
    <section id="systems" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm shadow-xs">
          01
        </span>
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            FOUNDATIONS • SYSTEMS THINKING
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🧩 What Is a System?
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="01"
        lessonTitle="What Is a System?"
        category="FOUNDATIONS"
        onComplete={onComplete}
      >
        {/* Interactive Boundary Classifier Workbench */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-indigo-100 text-indigo-700">
              <Box className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-slate-900">
              🧪 Interactive System Boundary Inspector
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            Click the boundary types below to observe how matter (particles) and energy (heat/light) interact with the system boundary:
          </p>

          {/* System Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
            <button
              onClick={() => {
                setSystemType("open");
                onComplete();
              }}
              className={`p-3 rounded-xl border text-left font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                systemType === "open"
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-400/30"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>🟢 Open System</span>
              {systemType === "open" && <CheckCircle2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                setSystemType("closed");
                onComplete();
              }}
              className={`p-3 rounded-xl border text-left font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                systemType === "closed"
                  ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/30"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>🔵 Closed System</span>
              {systemType === "closed" && <CheckCircle2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                setSystemType("isolated");
                onComplete();
              }}
              className={`p-3 rounded-xl border text-left font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                systemType === "isolated"
                  ? "bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-400/30"
                  : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>🔴 Isolated System</span>
              {systemType === "isolated" && <CheckCircle2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Dynamic Visual Boundary Box */}
          <div className={`p-5 rounded-2xl border-2 transition-all ${current.borderColor}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/80 pb-3 mb-3">
              <div>
                <h4 className="text-base font-extrabold text-slate-900">{current.title}</h4>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  {current.badge}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                <strong>Boundary:</strong>{" "}
                {systemType === "open"
                  ? "Permeable"
                  : systemType === "closed"
                  ? "Energy-only permeable"
                  : "Impermeable barrier"}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              {current.description}
            </p>

            {/* Flow Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-800 block mb-1">
                  Matter Transfer (Mass & Atoms):
                </span>
                <span className="text-slate-600">{current.matterFlow}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                <span className="font-bold text-slate-800 block mb-1">
                  Energy Transfer (Heat & Work):
                </span>
                <span className="text-slate-600">{current.energyFlow}</span>
              </div>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong>Real-World Examples:</strong> {current.examples}
            </div>
          </div>
        </div>
      </LessonPedagogyWrapper>

      {/* 8. Concept Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
