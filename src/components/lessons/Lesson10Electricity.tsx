import React, { useState } from "react";
import { Zap, ToggleLeft, ToggleRight, Lightbulb, BatteryCharging, Sparkles } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson10Electricity: React.FC<LessonProps> = ({ onComplete }) => {
  const [isSwitchClosed, setIsSwitchClosed] = useState<boolean>(false);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(9);
  const [hasBuzzer, setHasBuzzer] = useState<boolean>(false);

  const pedagogy = LESSON_PEDAGOGIES.electricity;

  const handleToggleSwitch = () => {
    const newState = !isSwitchClosed;
    setIsSwitchClosed(newState);
    if (newState) {
      onComplete();
    }
  };

  const quizQuestion: QuizQuestion = {
    id: "q10_electricity",
    concept: "Complete Circuits",
    question: "What must exist for electrical current (electrons) to flow and illuminate a lamp?",
    options: [
      {
        text: "A continuous, uninterrupted closed conductive path connecting the positive and negative terminals of a power source.",
        isCorrect: true,
        explanation: "Correct! If there is any break (like an open switch), electron flow stops everywhere in the series circuit.",
      },
      {
        text: "The wire must be dipped in sugar water.",
        isCorrect: false,
        explanation: "Wires rely on conductive metals like copper with free valence electrons.",
      },
      {
        text: "The circuit only works when pointed north.",
        isCorrect: false,
        explanation: "Circuits depend on voltage potential and conductive loops, not compass orientation.",
      },
    ],
  };

  return (
    <section id="electricity" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 font-bold flex items-center justify-center text-sm shadow-xs">
          10
        </span>
        <div>
          <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">
            PHYSICS • ELECTRICAL CIRCUITS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ⚡ Electricity & Complete Circuits
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="10"
        lessonTitle="Electricity & Complete Circuits"
        category="PHYSICS"
        onComplete={onComplete}
      >
        {/* Interactive Circuit Workbench */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Interactive Circuit Workbench
              </h3>
              <p className="text-xs text-slate-400">
                Click the switch below to complete or open the circuit loop:
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Add Sound Buzzer:</span>
              <button
                onClick={() => setHasBuzzer(!hasBuzzer)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  hasBuzzer ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-400"
                }`}
              >
                {hasBuzzer ? "🔔 Buzzer Added" : "+ Add Buzzer"}
              </button>
            </div>
          </div>

          {/* Simulated Circuit Board Graphic */}
          <div className="relative p-6 bg-slate-950 rounded-2xl border-2 border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6 my-4">
            {/* Battery Component */}
            <div className="flex flex-col items-center p-3 bg-slate-900 rounded-xl border border-slate-700 shadow-sm min-w-[90px]">
              <div className="text-3xl">🔋</div>
              <div className="text-xs font-bold text-slate-200 mt-1">DC Battery</div>
              <div className="text-[10px] text-amber-400 font-mono font-bold">{batteryVoltage}V Potential</div>
            </div>

            {/* Wire Loop Indicator */}
            <div
              className={`hidden md:block h-1 flex-1 transition-all duration-500 ${
                isSwitchClosed ? "bg-amber-400 shadow-[0_0_12px_#f59e0b]" : "bg-slate-700"
              }`}
            />

            {/* Interactive Switch Component */}
            <button
              onClick={handleToggleSwitch}
              className={`flex flex-col items-center p-3 rounded-xl border transition-all cursor-pointer ${
                isSwitchClosed
                  ? "bg-emerald-950/80 border-emerald-500 shadow-md"
                  : "bg-slate-900 border-rose-700/80 hover:border-rose-500"
              }`}
            >
              <div className="text-3xl">{isSwitchClosed ? "🔒" : "🔓"}</div>
              <div className="text-xs font-bold text-slate-200 mt-1">
                Switch: {isSwitchClosed ? "CLOSED (ON)" : "OPEN (OFF)"}
              </div>
              <span className="text-[10px] text-slate-400 underline mt-0.5">Click to toggle</span>
            </button>

            {/* Wire Loop Indicator */}
            <div
              className={`hidden md:block h-1 flex-1 transition-all duration-500 ${
                isSwitchClosed ? "bg-amber-400 shadow-[0_0_12px_#f59e0b]" : "bg-slate-700"
              }`}
            />

            {/* Lightbulb Component */}
            <div
              className={`flex flex-col items-center p-3 rounded-xl border transition-all duration-500 ${
                isSwitchClosed
                  ? "bg-yellow-950/60 border-yellow-400 shadow-[0_0_35px_#facc15]"
                  : "bg-slate-900 border-slate-800 opacity-60"
              }`}
            >
              <div className={`text-4xl transition-all ${isSwitchClosed ? "scale-110 drop-shadow-[0_0_20px_#fde047]" : "grayscale"}`}>
                💡
              </div>
              <div className="text-xs font-bold text-slate-200 mt-1">
                {isSwitchClosed ? "Lamp Glowing! ✨" : "Lamp Off"}
              </div>
              <div className="text-[10px] text-slate-400">Load Component</div>
            </div>

            {/* Optional Buzzer Component */}
            {hasBuzzer && (
              <>
                <div
                  className={`hidden md:block h-1 flex-1 transition-all duration-500 ${
                    isSwitchClosed ? "bg-amber-400 shadow-[0_0_12px_#f59e0b]" : "bg-slate-700"
                  }`}
                />
                <div
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                    isSwitchClosed
                      ? "bg-cyan-950/70 border-cyan-400 shadow-[0_0_20px_#06b6d4]"
                      : "bg-slate-900 border-slate-800 opacity-60"
                  }`}
                >
                  <div className={`text-3xl ${isSwitchClosed ? "animate-bounce" : ""}`}>🔔</div>
                  <div className="text-xs font-bold text-slate-200 mt-1">
                    {isSwitchClosed ? "BEEPING! 🎵" : "Buzzer Idle"}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Circuit Status Message Banner */}
          <div
            className={`p-3.5 rounded-xl text-xs leading-relaxed border transition-all ${
              isSwitchClosed
                ? "bg-emerald-950/60 border-emerald-600 text-emerald-200"
                : "bg-slate-800/90 border-slate-700 text-slate-300"
            }`}
          >
            {isSwitchClosed ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
                <strong>Circuit is Complete (Closed Loop):</strong> Electrons flow continuously through the copper wires from negative to positive terminals, transforming electrical potential into photon light and heat!
              </span>
            ) : (
              <span>
                <strong>Circuit is Open (Broken Loop):</strong> The gap in the switch prevents electric charges from crossing. Zero current flows, so components remain inactive.
              </span>
            )}
          </div>
        </div>
      </LessonPedagogyWrapper>

      {/* Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
