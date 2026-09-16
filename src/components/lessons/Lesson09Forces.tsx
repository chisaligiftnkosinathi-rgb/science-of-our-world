import React, { useState } from "react";
import { Gauge, Play, RotateCcw, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson09Forces: React.FC<LessonProps> = ({ onComplete }) => {
  const [distance, setDistance] = useState<number>(60);
  const [time, setTime] = useState<number>(10);
  const [vehicle, setVehicle] = useState<"runner" | "bike" | "cheetah" | "rocket">("bike");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [cartPosition, setCartPosition] = useState<number>(0);

  const pedagogy = LESSON_PEDAGOGIES.forces;
  const speed = time > 0 ? distance / time : 0;
  const speedKmh = speed * 3.6;

  const vehicleIcons = {
    runner: "🏃",
    bike: "🚲",
    cheetah: "🐆",
    rocket: "🚀",
  };

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setCartPosition(0);

    const startTime = Date.now();
    const duration = Math.min(6000, Math.max(1200, time * 250));

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setCartPosition(progress * 100);

      if (progress >= 1) {
        clearInterval(interval);
        setIsSimulating(false);
        onComplete();
      }
    }, 30);
  };

  const quizQuestion: QuizQuestion = {
    id: "q9_forces",
    concept: "Speed & Friction",
    question: "If a skateboard travels across a rough gravel path vs a smooth ice rink, why does it stop much sooner on the gravel?",
    options: [
      {
        text: "Because the microscopic bumps on the gravel produce much higher frictional resistance force, rapidly converting kinetic energy into heat.",
        isCorrect: true,
        explanation: "Spot on! Friction opposes relative motion between surface interfaces, decelerating the skateboard much faster on rough textures.",
      },
      {
        text: "Because gravel has stronger gravity than ice.",
        isCorrect: false,
        explanation: "Gravitational attraction depends on mass, which is practically identical on both paths.",
      },
      {
        text: "Because the skateboard gets sleepy.",
        isCorrect: false,
        explanation: "Frictional resistance force is the physical mechanism.",
      },
    ],
  };

  return (
    <section id="forces" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm shadow-xs">
          09
        </span>
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            PHYSICS • FORCES & MOTION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ⚙️ Forces, Gravity & Motion
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="09"
        lessonTitle="Forces, Gravity & Motion"
        category="PHYSICS"
        onComplete={onComplete}
      >
        {/* Interactive Animated Motion & Speed Calculator */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-bold text-orange-300 uppercase tracking-wider flex items-center gap-1.5">
                <Gauge className="w-4 h-4" /> Motion & Speed Calculation Test Track
              </h3>
              <p className="text-xs text-slate-400">
                Formula: <span className="font-mono text-cyan-300 font-bold">Speed = Distance ÷ Time</span>
              </p>
            </div>

            {/* Vehicle Selector */}
            <div className="flex gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
              {(["runner", "bike", "cheetah", "rocket"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVehicle(v)}
                  className={`px-2 py-1 rounded-lg text-sm transition-all cursor-pointer ${
                    vehicle === v ? "bg-orange-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {vehicleIcons[v]}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-slate-300">Distance Travelled:</span>
                <span className="font-black text-orange-400 font-mono">{distance} meters</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full cursor-pointer accent-orange-500"
              />
            </div>

            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-bold text-slate-300">Elapsed Time:</span>
                <span className="font-black text-cyan-400 font-mono">{time} seconds</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={time}
                onChange={(e) => setTime(Number(e.target.value))}
                className="w-full cursor-pointer accent-cyan-500"
              />
            </div>
          </div>

          {/* Speed Result Card */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-800 border border-slate-700 mb-4">
            <div>
              <div className="text-[11px] text-slate-400 font-semibold uppercase">Calculated Velocity</div>
              <div className="text-xl sm:text-2xl font-black text-orange-400 font-mono">
                {speed.toFixed(2)} m/s{" "}
                <span className="text-xs font-medium text-slate-400">({speedKmh.toFixed(1)} km/h)</span>
              </div>
            </div>

            <button
              onClick={handleStartSimulation}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Play className="w-4 h-4" /> {isSimulating ? "Running Track..." : "Simulate Motion Run"}
            </button>
          </div>

          {/* Animated Track Visualizer */}
          <div className="relative h-20 bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden flex flex-col justify-end">
            <div className="absolute top-2 left-3 text-[10px] font-bold text-slate-500">START (0 m)</div>
            <div className="absolute top-2 right-3 text-[10px] font-bold text-emerald-400">
              FINISH ({distance} m)
            </div>

            <div className="w-full h-1 bg-slate-700 relative mb-4">
              <div className="absolute inset-0 flex justify-between">
                {[0, 25, 50, 75, 100].map((t) => (
                  <div key={t} className="w-0.5 h-2 bg-slate-600 -top-0.5" />
                ))}
              </div>

              <div
                className="absolute -top-7 -ml-4 text-2xl transition-all duration-75 select-none"
                style={{ left: `${cartPosition}%` }}
              >
                {vehicleIcons[vehicle]}
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
