import React, { useState } from "react";
import { CAPS_CURRICULUM_MAPPING, CapsStrand } from "../../data/southAfricaData";
import { X, BookOpen, CheckCircle, Sparkles, ExternalLink } from "lucide-react";
import { ModuleId } from "../../types";

interface CapsCurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToLesson: (id: ModuleId) => void;
}

export const CapsCurriculumModal: React.FC<CapsCurriculumModalProps> = ({
  isOpen,
  onClose,
  onNavigateToLesson,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<string>("Grade 5");
  const [selectedStrandId, setSelectedStrandId] = useState<string>("life_living");

  if (!isOpen) return null;

  const currentStrand =
    CAPS_CURRICULUM_MAPPING.find((s) => s.id === selectedStrandId) ||
    CAPS_CURRICULUM_MAPPING[0];

  const gradeTopics =
    currentStrand.grades.find((g) => g.grade === selectedGrade)?.topics || [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl text-white overflow-hidden animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-950 border border-emerald-700 text-2xl">
              🇿🇦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  SOUTH AFRICAN CURRICULUM
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 font-mono">
                  Natural Sciences & Tech
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                CAPS Curriculum Alignment Map
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Controls: Grade & Strand Selectors */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap gap-3 items-center justify-between">
          {/* Grade Selector */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
            {["Grade 4", "Grade 5", "Grade 6", "Grade 7"].map((grade) => (
              <button
                key={grade}
                onClick={() => setSelectedGrade(grade)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedGrade === grade
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {grade}
              </button>
            ))}
          </div>

          {/* Strand Selector Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
            {CAPS_CURRICULUM_MAPPING.map((strand) => (
              <button
                key={strand.id}
                onClick={() => setSelectedStrandId(strand.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedStrandId === strand.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {strand.strandNameEn.split(" ")[0]} & {strand.strandNameEn.split(" ")[2] || "Change"}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body: Topic Mapping List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-emerald-300">
              {currentStrand.strandNameEn} • {selectedGrade}
            </h3>
            <span className="text-xs text-slate-400 italic">
              {currentStrand.strandNameZu}
            </span>
          </div>

          {gradeTopics.length === 0 ? (
            <div className="p-8 text-center bg-slate-950 rounded-2xl border border-slate-800 text-slate-400 text-xs">
              This strand is introduced in higher or earlier grades. Select another strand or grade above.
            </div>
          ) : (
            <div className="space-y-3">
              {gradeTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        {topic.term} Topic
                      </span>
                      <h4 className="text-sm font-bold text-white">{topic.title}</h4>
                    </div>

                    {/* Linked Course Modules */}
                    <div className="flex flex-wrap gap-1.5">
                      {topic.matchingCourseLessons.map((modId) => (
                        <button
                          key={modId}
                          onClick={() => {
                            onClose();
                            onNavigateToLesson(modId as ModuleId);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-700 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Jump to Lesson</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Core Concepts */}
                  <div className="space-y-1 bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Core CAPS Concepts Covered:
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                      {topic.keyConcepts.map((concept, cIdx) => (
                        <li key={cIdx}>{concept}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-400">
          Curriculum mapped to the Department of Basic Education (DBE) CAPS Natural Sciences Curriculum (Grades 4–7).
        </div>
      </div>
    </div>
  );
};
