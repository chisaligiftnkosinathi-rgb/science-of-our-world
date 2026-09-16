import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  BookOpen,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Globe,
  ChevronDown,
  ChevronUp,
  MessageSquareQuote,
  Eye,
  Send,
} from "lucide-react";
import { LessonPedagogy, VocabularyTerm } from "../../types";
import { RealityModelEvidencePanel } from "./RealityModelEvidencePanel";
import { REALITY_MODEL_MAP } from "../../data/realityModelData";

interface WrapperProps {
  pedagogy: LessonPedagogy;
  lessonNumber: string;
  lessonTitle: string;
  category: string;
  badgeColor?: string;
  children: React.ReactNode; // The custom interactive simulation / testbench
  onComplete: () => void;
}

export const LessonPedagogyWrapper: React.FC<WrapperProps> = ({
  pedagogy,
  lessonNumber,
  lessonTitle,
  category,
  children,
  onComplete,
}) => {
  // Prediction state
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);

  // Explain it in your own words state
  const [userExplanation, setUserExplanation] = useState<string>("");
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [hasSubmittedExplanation, setHasSubmittedExplanation] = useState<boolean>(false);

  // Vocabulary expanded term
  const [selectedVocabIndex, setSelectedVocabIndex] = useState<number | null>(0);

  const handleSelectPrediction = (id: string) => {
    setSelectedPrediction(id);
    onComplete();
  };

  const handleSubmitExplanation = () => {
    if (userExplanation.trim().length > 10) {
      setHasSubmittedExplanation(true);
      onComplete();
    }
  };

  const activePredictionObj = pedagogy.prediction.options.find(
    (opt) => opt.id === selectedPrediction
  );

  return (
    <div className="space-y-6">
      {/* 1. BIG QUESTION BANNER */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white border border-blue-800 shadow-md">
        <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-wider mb-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>1. THE BIG QUESTION</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
          "{pedagogy.bigQuestion}"
        </h3>
      </div>

      {/* 2. SIMPLE EXPLANATION & STORY ANCHOR */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-700 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. Simple Explanation</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {pedagogy.simpleExplanation}
          </p>
        </div>

        {/* 3. REAL WORLD EXAMPLE */}
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-amber-900">
              <span>{pedagogy.realWorldExample.icon}</span>
              <span>3. Real-World Example: {pedagogy.realWorldExample.title}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
            {pedagogy.realWorldExample.description}
          </p>
        </div>
      </div>

      {/* 4. INTERACTIVE SIMULATION (CHILDREN) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 px-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>4. Interactive Workbench & Simulation</span>
        </div>
        {children}
      </div>

      {/* 4B. REALITY ➔ MODEL ➔ EVIDENCE ➔ EXPLANATION INSPECTOR */}
      {(() => {
        const ep = pedagogy.epistemology || REALITY_MODEL_MAP[pedagogy.moduleId] || REALITY_MODEL_MAP.systems;
        return (
          <RealityModelEvidencePanel
            epistemology={ep}
            topicTitle={pedagogy.bigQuestion}
          />
        );
      })()}

      {/* 5. SCIENTIFIC VOCABULARY ACCORDION */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-700">
            <span>📚</span>
            <span>5. Scientific Vocabulary (Terms to Master)</span>
          </div>
          <span className="text-[11px] text-slate-400">Click a term to inspect</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          {pedagogy.vocabulary.map((vocab, vIdx) => {
            const isSelected = selectedVocabIndex === vIdx;
            return (
              <button
                key={vIdx}
                onClick={() => setSelectedVocabIndex(vIdx)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-900 text-white border-indigo-700 shadow-sm ring-2 ring-indigo-400"
                    : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                }`}
              >
                <div className="font-extrabold text-xs">{vocab.term}</div>
                {vocab.phonetic && (
                  <div
                    className={`text-[10px] italic mt-0.5 ${
                      isSelected ? "text-indigo-200" : "text-slate-500"
                    }`}
                  >
                    /{vocab.phonetic}/
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {selectedVocabIndex !== null && pedagogy.vocabulary[selectedVocabIndex] && (
          <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200">
            <div className="font-bold text-xs sm:text-sm text-indigo-950 mb-1">
              <strong>{pedagogy.vocabulary[selectedVocabIndex].term}:</strong>{" "}
              {pedagogy.vocabulary[selectedVocabIndex].definition}
            </div>
            <div className="text-[11px] font-semibold text-indigo-800 flex items-center gap-1.5 mt-2 pt-2 border-t border-indigo-200/60">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Memory Tip: {pedagogy.vocabulary[selectedVocabIndex].memoryTip}</span>
            </div>
          </div>
        )}
      </div>

      {/* 6. "THINK LIKE A SCIENTIST" PREDICTION */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
          <span>🧠</span>
          <span>6. Think Like a Scientist: Form Your Prediction</span>
        </div>

        <h4 className="text-sm sm:text-base font-bold text-white mb-4">
          {pedagogy.prediction.prompt}
        </h4>

        <div className="space-y-2.5 mb-4">
          {pedagogy.prediction.options.map((opt) => {
            const isChosen = selectedPrediction === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectPrediction(opt.id)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isChosen
                    ? opt.isCorrectPrediction
                      ? "bg-emerald-950/90 border-emerald-500 text-emerald-100 ring-2 ring-emerald-400"
                      : "bg-rose-950/90 border-rose-500 text-rose-100 ring-2 ring-rose-400"
                    : "bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-500"
                }`}
              >
                <span>{opt.text}</span>
                {isChosen && (
                  <span>
                    {opt.isCorrectPrediction ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activePredictionObj && (
          <div
            className={`p-3.5 rounded-xl text-xs border ${
              activePredictionObj.isCorrectPrediction
                ? "bg-emerald-900/60 border-emerald-600 text-emerald-200"
                : "bg-rose-900/60 border-rose-600 text-rose-200"
            }`}
          >
            <strong>Scientific Insight:</strong> {activePredictionObj.feedback}
          </div>
        )}
      </div>

      {/* 9. SYSTEMS & PLANETARY CONNECTION */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-teal-900 mb-2">
          <Globe className="w-4 h-4 text-teal-600" />
          <span>9. How This Connects to Earth & You</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm text-teal-950 font-medium">
          <div className="p-3 bg-white/80 rounded-xl border border-teal-200/60">
            <strong>🌍 The Earth Connection:</strong> {pedagogy.systemConnection.earthLink}
          </div>
          <div className="p-3 bg-white/80 rounded-xl border border-teal-200/60">
            <strong>🧍 The You Connection:</strong> {pedagogy.systemConnection.humanLink}
          </div>
        </div>
      </div>

      {/* 10. "EXPLAIN IT IN YOUR OWN WORDS" CHALLENGE */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-purple-700">
            <MessageSquareQuote className="w-4 h-4" />
            <span>10. Challenge: Explain It in Your Own Words</span>
          </div>
          <span className="text-[10px] text-slate-400">Mastery Assessment</span>
        </div>

        <p className="text-xs sm:text-sm font-bold text-slate-800 mb-2">
          {pedagogy.synthesisChallenge.prompt}
        </p>

        {/* Hints */}
        <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200/60 text-[11px] text-purple-900 mb-3 space-y-1">
          <span className="font-bold block">💡 Clues & Guiding Questions:</span>
          {pedagogy.synthesisChallenge.hints.map((h, hIdx) => (
            <div key={hIdx} className="flex items-center gap-1.5">
              <span>•</span>
              <span>{h}</span>
            </div>
          ))}
        </div>

        <textarea
          value={userExplanation}
          onChange={(e) => setUserExplanation(e.target.value)}
          placeholder="Type your scientific explanation here..."
          className="w-full h-24 p-3 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleSubmitExplanation}
            disabled={userExplanation.trim().length < 8}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Save & Check Explanation</span>
          </button>

          <button
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 underline cursor-pointer"
          >
            {showModelAnswer ? "Hide Scientist Model Answer" : "View Scientist Model Answer"}
          </button>
        </div>

        {hasSubmittedExplanation && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Awesome scientific communication! Explaining concepts in your own words is the ultimate mark of understanding.
            </span>
          </div>
        )}

        {showModelAnswer && (
          <div className="mt-3 p-4 rounded-xl bg-slate-900 text-white border border-slate-800 text-xs sm:text-sm">
            <span className="text-amber-400 font-bold block mb-1">
              🔬 Scientist Model Explanation:
            </span>
            <p className="text-slate-200 leading-relaxed">
              "{pedagogy.synthesisChallenge.modelExplanation}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
