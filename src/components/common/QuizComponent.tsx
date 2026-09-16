import React, { useState } from "react";
import { CheckCircle, XCircle, HelpCircle, Sparkles, RefreshCw } from "lucide-react";
import { QuizQuestion } from "../../types";

interface QuizComponentProps {
  question: QuizQuestion;
  onAnswerCorrect?: () => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  question,
  onAnswerCorrect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setIsSubmitted(true);

    if (question.options[index].isCorrect && onAnswerCorrect) {
      onAnswerCorrect();
    }
  };

  const handleReset = () => {
    setSelectedIndex(null);
    setIsSubmitted(false);
  };

  const selectedOption = selectedIndex !== null ? question.options[selectedIndex] : null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
            <HelpCircle className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Concept Check • {question.concept}
          </span>
        </div>
        {isSubmitted && (
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Retry
          </button>
        )}
      </div>

      <h4 className="text-base md:text-lg font-bold text-slate-900 mb-4 leading-snug">
        {question.question}
      </h4>

      <div className="space-y-2.5">
        {question.options.map((option, idx) => {
          const isChosen = selectedIndex === idx;
          let btnStyle = "border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 bg-slate-50/50 text-slate-800";

          if (isSubmitted) {
            if (option.isCorrect) {
              btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-2 ring-emerald-500/20";
            } else if (isChosen && !option.isCorrect) {
              btnStyle = "border-rose-400 bg-rose-50 text-rose-950 ring-2 ring-rose-400/20";
            } else {
              btnStyle = "border-slate-200 bg-slate-50/50 text-slate-400 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              disabled={isSubmitted}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all flex items-start justify-between gap-3 ${btnStyle}`}
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-white border border-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug">{option.text}</span>
              </div>

              {isSubmitted && option.isCorrect && (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {isSubmitted && isChosen && !option.isCorrect && (
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {isSubmitted && selectedOption && (
        <div
          className={`mt-4 p-4 rounded-xl text-sm leading-relaxed border ${
            selectedOption.isCorrect
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center gap-2 font-bold mb-1">
            {selectedOption.isCorrect ? (
              <>
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Excellent Scientist! That is correct.</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>Not quite. Let's examine the scientific principle:</span>
              </>
            )}
          </div>
          <p className="text-xs md:text-sm">{selectedOption.explanation}</p>
        </div>
      )}
    </div>
  );
};
