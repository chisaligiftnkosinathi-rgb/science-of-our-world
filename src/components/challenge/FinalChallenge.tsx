import React, { useState } from "react";
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Download, Printer } from "lucide-react";
import { FINAL_CHALLENGE_QUESTIONS } from "../../data/courseData";

interface ChallengeProps {
  onComplete: () => void;
}

export const FinalChallenge: React.FC<ChallengeProps> = ({ onComplete }) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scientistName, setScientistName] = useState<string>("Alex");

  const totalQuestions = FINAL_CHALLENGE_QUESTIONS.length;

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleGradeAssessment = () => {
    setIsSubmitted(true);

    // Check if score is passing / completed
    let score = 0;
    FINAL_CHALLENGE_QUESTIONS.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected !== undefined && q.options[selected]?.isCorrect) {
        score++;
      }
    });

    if (score >= Math.ceil(totalQuestions * 0.7)) {
      onComplete();
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  // Calculate score
  let correctCount = 0;
  FINAL_CHALLENGE_QUESTIONS.forEach((q) => {
    const selected = userAnswers[q.id];
    if (selected !== undefined && q.options[selected]?.isCorrect) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = percentage >= 70;
  const allAnswered = Object.keys(userAnswers).length === totalQuestions;

  return (
    <section id="challenge" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm shadow-xs">
          🏆
        </span>
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            FINAL EVALUATION • SCIENTIST CERTIFICATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🏆 Young Scientist Final Challenge
          </h2>
        </div>
      </div>

      {/* Intro Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm mb-6">
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
          Put your scientific knowledge to the ultimate test! Answer all questions across biology, chemistry, physics, and Earth systems to claim your official <strong>Young Scientist Certificate</strong>.
        </p>

        {/* Name input for certificate */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-0.5">
              Enter Your Name (for the Certificate):
            </label>
            <span className="text-[11px] text-slate-500">
              Personalizes your graduation document upon completion
            </span>
          </div>
          <input
            type="text"
            value={scientistName}
            onChange={(e) => setScientistName(e.target.value)}
            placeholder="Your Name..."
            className="px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 max-w-xs"
          />
        </div>

        {/* Questions List */}
        <div className="space-y-6 mb-8">
          {FINAL_CHALLENGE_QUESTIONS.map((question, qIdx) => {
            const selectedOpt = userAnswers[question.id];

            return (
              <div
                key={question.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    Question {qIdx + 1} of {totalQuestions}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">• {question.concept}</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-slate-900 mb-3">
                  {question.question}
                </h4>

                {/* Option Choices */}
                <div className="space-y-2">
                  {question.options.map((opt, optIdx) => {
                    const isChosen = selectedOpt === optIdx;
                    let style =
                      "border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/40 text-slate-800";

                    if (isChosen) {
                      style = "border-amber-500 bg-amber-50 text-amber-950 font-semibold ring-2 ring-amber-400/30";
                    }

                    if (isSubmitted) {
                      if (opt.isCorrect) {
                        style = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400/30";
                      } else if (isChosen && !opt.isCorrect) {
                        style = "border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-300";
                      } else {
                        style = "border-slate-200 bg-slate-100 text-slate-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(question.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${style}`}
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-white border border-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt.text}</span>
                        </div>

                        {isSubmitted && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        )}
                        {isSubmitted && isChosen && !opt.isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback after submit */}
                {isSubmitted && selectedOpt !== undefined && (
                  <div
                    className={`mt-3 p-3 rounded-xl text-xs border ${
                      question.options[selectedOpt].isCorrect
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}
                  >
                    <strong>Explanation:</strong> {question.options[selectedOpt].explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
          {!isSubmitted ? (
            <button
              onClick={handleGradeAssessment}
              disabled={!allAnswered}
              className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-amber-900/30 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit & Grade Final Challenge</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Retake Challenge
              </button>
            </div>
          )}

          <span className="text-xs text-slate-500">
            {Object.keys(userAnswers).length} of {totalQuestions} answered
          </span>
        </div>

        {/* Results Banner & Young Scientist Certificate */}
        {isSubmitted && (
          <div className="mt-8 space-y-6">
            {/* Score Banner */}
            <div
              className={`p-6 rounded-2xl border text-center ${
                isPassed
                  ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 text-emerald-950"
                  : "bg-rose-50 border-rose-200 text-rose-950"
              }`}
            >
              <div className="text-4xl mb-2">{isPassed ? "🎉" : "📚"}</div>
              <h3 className="text-xl font-extrabold mb-1">
                {isPassed ? "Congratulations, Young Scientist!" : "Keep Reviewing & Practicing!"}
              </h3>
              <p className="text-sm mb-3">
                You scored <strong className="font-mono text-base">{correctCount} / {totalQuestions}</strong> ({percentage}%)
              </p>
              <p className="text-xs max-w-md mx-auto opacity-80">
                {isPassed
                  ? "You have demonstrated a comprehensive understanding of systems, ecosystems, energy conservation, chemical reactions, and the scientific method!"
                  : "Review the lessons and explanations above, then try the challenge again to earn your certificate!"}
              </p>
            </div>

            {/* Printable Certificate (if passed) */}
            {isPassed && (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-amber-50 border-4 border-amber-300 shadow-xl text-center relative overflow-hidden">
                {/* Decorative border corners */}
                <div className="absolute top-3 left-3 text-2xl text-amber-500">⚜️</div>
                <div className="absolute top-3 right-3 text-2xl text-amber-500">⚜️</div>
                <div className="absolute bottom-3 left-3 text-2xl text-amber-500">⚜️</div>
                <div className="absolute bottom-3 right-3 text-2xl text-amber-500">⚜️</div>

                <div className="text-xs uppercase font-extrabold tracking-widest text-amber-700 mb-2">
                  OFFICIAL DIPLOMA OF DISCOVERY
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                  🌍 YOUNG SCIENTIST CERTIFICATE
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 italic mb-4">
                  This certifies that
                </p>

                <div className="text-2xl sm:text-3xl font-black text-blue-900 underline decoration-amber-400 decoration-2 underline-offset-8 mb-6 font-serif">
                  {scientistName.trim() || "Dedicated Young Scientist"}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed mb-6">
                  Has successfully completed the comprehensive curriculum in <strong>Systems Thinking, Biology, Earth Spheres, Trophic Food Webs, Thermodynamics, States of Matter, Chemistry, Forces, and the Scientific Method</strong>.
                </p>

                <div className="flex flex-wrap items-center justify-around gap-6 pt-6 border-t border-amber-200/80 text-xs">
                  <div>
                    <div className="font-bold text-slate-900">🔬 Scientific Thinking</div>
                    <div className="text-slate-500">Mastery Level: Passed with Distinction</div>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">📅 Date Certified</div>
                    <div className="text-slate-500">{new Date().toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-1.5 font-extrabold text-amber-800">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span>Certified Young Scientist</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
