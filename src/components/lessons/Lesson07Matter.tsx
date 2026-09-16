import React, { useState } from "react";
import { Atom, Flame, Snowflake, Sparkles } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson07Matter: React.FC<LessonProps> = ({ onComplete }) => {
  const [matterState, setMatterState] = useState<"solid" | "liquid" | "gas">("solid");

  const stateDetails = {
    solid: {
      name: "Solid (Ice / Crystal)",
      icon: "🧊",
      shape: "Definite Shape & Fixed Volume",
      particleMotion: "Vibrating in fixed, tightly packed lattice positions.",
      kineticEnergy: "Low thermal kinetic energy; strong intermolecular bonds hold particles in place.",
      example: "Ice at < 0°C, diamond, copper, bone.",
      particleColor: "bg-blue-400 border-blue-500",
      tempRange: "< 0°C",
    },
    liquid: {
      name: "Liquid (Water / Fluid)",
      icon: "💧",
      shape: "Definite Volume, Takes Shape of Container",
      particleMotion: "Flowing, rolling, and sliding over and around one another.",
      kineticEnergy: "Medium thermal kinetic energy; particles possess enough velocity to break rigid crystal bonds.",
      example: "Liquid water at 20°C, vegetable oil, blood.",
      particleColor: "bg-cyan-400 border-cyan-500",
      tempRange: "0°C – 100°C",
    },
    gas: {
      name: "Gas (Steam / Vapor)",
      icon: "💨",
      shape: "Fills Entire Volume & Shape of Any Container",
      particleMotion: "Flying in high-speed, random straight lines, colliding elastically.",
      kineticEnergy: "High thermal kinetic energy; particles completely overcome intermolecular attraction.",
      example: "Water vapor at > 100°C, oxygen, helium.",
      particleColor: "bg-purple-400 border-purple-500",
      tempRange: "> 100°C",
    },
  };

  const current = stateDetails[matterState];
  const pedagogy = LESSON_PEDAGOGIES.matter;

  const quizQuestion: QuizQuestion = {
    id: "q7_matter",
    concept: "Kinetic Molecular Theory",
    question: "When you heat a solid substance and it melts into a liquid, what are the particles physically doing?",
    options: [
      {
        text: "They absorb thermal energy, vibrate faster, and gain enough kinetic energy to break out of their fixed crystal grid.",
        isCorrect: true,
        explanation: "Correct! Heat increases microscopic kinetic energy, allowing molecules to overcome binding forces and slide past each other.",
      },
      {
        text: "The particles multiply in number and double in weight.",
        isCorrect: false,
        explanation: "Mass and particle count are conserved during a change of state.",
      },
      {
        text: "The particles stop moving completely.",
        isCorrect: false,
        explanation: "Particles move faster as temperature increases.",
      },
    ],
  };

  return (
    <section id="matter" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm shadow-xs">
          07
        </span>
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            CHEMISTRY • KINETIC MOLECULAR THEORY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ⚛️ States of Matter & Particle Motion
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="07"
        lessonTitle="States of Matter & Particle Motion"
        category="CHEMISTRY"
        onComplete={onComplete}
      >
        {/* Interactive Particle Thermal Simulator */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Atom className="w-4 h-4" /> Interactive Thermal Particle Chamber
              </h3>
              <p className="text-xs text-slate-400">
                Change temperature to observe particle velocity and spatial distribution:
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
              Chamber Temp: {current.tempRange}
            </span>
          </div>

          {/* State Switcher Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => {
                setMatterState("solid");
                onComplete();
              }}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                matterState === "solid"
                  ? "bg-blue-500 text-white shadow-md ring-2 ring-blue-400"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Snowflake className="w-3.5 h-3.5" /> 🧊 Solid (0°C)
            </button>

            <button
              onClick={() => {
                setMatterState("liquid");
                onComplete();
              }}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                matterState === "liquid"
                  ? "bg-cyan-500 text-white shadow-md ring-2 ring-cyan-400"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              💧 Liquid (25°C)
            </button>

            <button
              onClick={() => {
                setMatterState("gas");
                onComplete();
              }}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                matterState === "gas"
                  ? "bg-purple-500 text-white shadow-md ring-2 ring-purple-400"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Flame className="w-3.5 h-3.5" /> 💨 Gas (120°C)
            </button>
          </div>

          {/* Simulated Particle Grid Canvas */}
          <div className="relative h-48 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-4">
            {/* Visual Particle Cluster */}
            <div
              className={`transition-all duration-700 flex flex-wrap items-center justify-center ${
                matterState === "solid"
                  ? "w-36 h-36 gap-1 p-2 bg-blue-950/40 rounded-lg border border-blue-800/40"
                  : matterState === "liquid"
                  ? "w-64 h-28 gap-2.5 p-2 bg-cyan-950/30 rounded-b-2xl border-b-2 border-cyan-500/50 self-end mb-2"
                  : "w-full h-full gap-8 p-3"
              }`}
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${current.particleColor} shadow-sm transition-all duration-500 ${
                    matterState === "solid"
                      ? "animate-pulse"
                      : matterState === "liquid"
                      ? "animate-bounce"
                      : "animate-ping"
                  }`}
                  style={{
                    animationDuration:
                      matterState === "solid" ? "1.5s" : matterState === "liquid" ? "0.9s" : "0.5s",
                    animationDelay: `${(i % 5) * 0.15}s`,
                  }}
                />
              ))}
            </div>

            <div className="absolute bottom-2 right-3 text-[10px] text-slate-500 font-mono">
              Intermolecular distance:{" "}
              {matterState === "solid" ? "~0.28 nm" : matterState === "liquid" ? "~0.31 nm" : "> 3.5 nm"}
            </div>
          </div>

          {/* Properties Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <strong className="text-cyan-300 block mb-0.5">📐 Shape & Volume:</strong>
              <span className="text-slate-300">{current.shape}</span>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
              <strong className="text-cyan-300 block mb-0.5">⚡ Thermal Particle Behavior:</strong>
              <span className="text-slate-300">{current.particleMotion}</span>
            </div>
          </div>
        </div>
      </LessonPedagogyWrapper>

      {/* Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
