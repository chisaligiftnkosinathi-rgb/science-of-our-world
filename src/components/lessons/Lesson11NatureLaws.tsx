import React, { useState } from "react";
import { Telescope, BookOpen, Clock, CheckCircle2, Search, Sparkles } from "lucide-react";
import { TIMELINE_DATA } from "../../data/courseData";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson11NatureLaws: React.FC<LessonProps> = ({ onComplete }) => {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState<number>(2); // Newton default

  const pedagogy = LESSON_PEDAGOGIES.laws;

  const scientificMethodSteps = [
    { num: "01", icon: "👀", title: "Observe", desc: "Watch patterns in nature carefully without assumptions." },
    { num: "02", icon: "❓", title: "Question", desc: "Ask 'Why does this happen?' and 'How does it behave?'" },
    { num: "03", icon: "💡", title: "Hypothesize", desc: "Propose a testable explanation or mathematical model." },
    { num: "04", icon: "🧪", title: "Experiment", desc: "Perform controlled trials, gather data, and measure variables." },
    { num: "05", icon: "📊", title: "Analyze", desc: "Examine evidence critically and invite peer review." },
    { num: "06", icon: "🔁", title: "Repeat & Refine", desc: "If experiments hold repeatedly across history, a law or theory emerges." },
  ];

  const quizQuestion: QuizQuestion = {
    id: "q11_laws",
    concept: "The Scientific Method",
    question: "If a new experiment contradicts a long-held scientific hypothesis, what must honest scientists do?",
    options: [
      {
        text: "Examine the new evidence carefully, re-test the experiment, and revise or discard the hypothesis based on reproducible data.",
        isCorrect: true,
        explanation: "Correct! Science is evidence-based and self-correcting. Ideas must adapt to match what empirical experiments demonstrate in reality.",
      },
      {
        text: "Pretend the experiment never happened.",
        isCorrect: false,
        explanation: "Ignoring evidence violates the core integrity of the scientific method.",
      },
      {
        text: "Vote in a town meeting to make the old hypothesis legal.",
        isCorrect: false,
        explanation: "Nature's laws are discovered through empirical evidence, not created by human voting.",
      },
    ],
  };

  const activeEvent = TIMELINE_DATA[selectedTimelineIndex];

  return (
    <section id="laws" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 font-bold flex items-center justify-center text-sm shadow-xs">
          11
        </span>
        <div>
          <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">
            SCIENTIFIC THINKING • EPISTEMOLOGY & HISTORY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🔬 Laws of Nature & Discovery
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="11"
        lessonTitle="Laws of Nature & Discovery"
        category="SCIENTIFIC METHOD"
        onComplete={onComplete}
      >
        <div className="space-y-6">
          {/* 6-Step Scientific Method Flow */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
              🔄 The 6-Step Scientific Method Cycle
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {scientificMethodSteps.map((step) => (
                <div
                  key={step.num}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center shadow-2xs"
                >
                  <div className="text-xl mb-1">{step.icon}</div>
                  <div className="text-xs font-bold text-slate-900">{step.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1 leading-snug">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Timeline of Scientific Giants */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-bold text-violet-300 uppercase tracking-wider">
                  Timeline of Scientific Discovery
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 hidden sm:inline">Click a pioneer to inspect</span>
            </div>

            {/* Timeline Selector Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 custom-scrollbar">
              {TIMELINE_DATA.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTimelineIndex(idx);
                    onComplete();
                  }}
                  className={`p-2.5 rounded-xl border text-left shrink-0 transition-all cursor-pointer ${
                    selectedTimelineIndex === idx
                      ? "bg-violet-600 border-violet-400 text-white shadow-md ring-2 ring-violet-400/40"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750"
                  }`}
                >
                  <div className="text-lg">{item.icon}</div>
                  <div className="font-bold text-xs whitespace-nowrap mt-0.5">{item.pioneer.split(" ")[0]}</div>
                  <div className="text-[10px] text-slate-400">{item.period.split("–")[0]}</div>
                </button>
              ))}
            </div>

            {/* Active Pioneer Detail */}
            {activeEvent && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeEvent.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{activeEvent.pioneer}</h4>
                      <span className="text-[11px] text-violet-400 font-mono">{activeEvent.period}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <strong className="text-slate-300 block mb-0.5">🔬 Major Contribution:</strong>
                    <span className="text-slate-300">{activeEvent.contribution}</span>
                  </div>
                  <div>
                    <strong className="text-cyan-400 block mb-0.5">🌟 Lasting Scientific Significance:</strong>
                    <span className="text-slate-400">{activeEvent.significance}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LessonPedagogyWrapper>

      {/* Quiz */}
      <QuizComponent question={quizQuestion} onAnswerCorrect={onComplete} />
    </section>
  );
};
