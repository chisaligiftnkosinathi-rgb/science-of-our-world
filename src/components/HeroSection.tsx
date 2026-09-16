import React from "react";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  FlaskConical,
  Atom,
  Compass,
  CheckCircle2,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { ModuleId } from "../types";

interface HeroSectionProps {
  onStartCourse: () => void;
  onOpenLab: () => void;
  onNavigateTo: (id: ModuleId) => void;
  onOpenCaps?: () => void;
  completedCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCourse,
  onOpenLab,
  onNavigateTo,
  onOpenCaps,
  completedCount,
}) => {
  return (
    <section className="mb-10">
      {/* Main Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-10 border border-blue-800/40 shadow-xl">
        {/* Subtle background glow circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Young Scientist Badges & Publisher Attribution */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Explore. Understand. Build.</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <span>🇿🇦 South African Ecosystems & CAPS</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-medium shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offline PWA (IndexedDB)</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-1">
              A Global IT and Business Solutions (Pty) Ltd. Product
            </div>
            <h1 className="text-3xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              🧬 NEXUS SCIENCE™
            </h1>
            <div className="text-xl sm:text-2xl font-bold text-cyan-200 mt-1">
              Science of Our World
            </div>
          </div>

          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-6">
            Explore how human bodies, living ecosystems, South African biomes, matter, and the fundamental laws of energy work together in one magnificent, interconnected universe.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <button
              onClick={onStartCourse}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-blue-900/40 hover:shadow-blue-800/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Start Course (Lesson 01)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Local Science Shortcut */}
            <button
              onClick={() => {
                const el = document.getElementById("sa-science");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700 font-bold text-sm sm:text-base flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>🇿🇦 Mzansi Ecosystems</span>
            </button>

            {onOpenCaps && (
              <button
                onClick={onOpenCaps}
                className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm sm:text-base flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span>CAPS Map</span>
              </button>
            )}

            <button
              onClick={onOpenLab}
              className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-sm sm:text-base flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4 text-cyan-400" />
              <span>🧪 Virtual Lab</span>
            </button>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-cyan-300">12+</div>
              <div className="text-xs text-slate-400 font-medium">Core Science Topics</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">4</div>
              <div className="text-xs text-slate-400 font-medium">SA Biomes & CAPS</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-amber-400">100%</div>
              <div className="text-xs text-slate-400 font-medium">Offline IndexedDB</div>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-purple-400">3</div>
              <div className="text-xs text-slate-400 font-medium">Languages (EN, ZU, SS)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Cycle Philosophy Card */}
      <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Our Epistemological Reasoning Engine
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              How Science Discovers the Universe
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Science is a self-correcting cycle of building and testing useful explanations about reality.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              1. 🌍 REAL WORLD
            </span>
            <span className="text-slate-400 text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              2. 👀 OBSERVE
            </span>
            <span className="text-slate-400 text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              3. ❓ QUESTION
            </span>
            <span className="text-slate-400 text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200">
              4. 🔵 MODEL
            </span>
            <span className="text-slate-400 text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200">
              5. 🔮 PREDICT
            </span>
            <span className="text-slate-400 text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              6. 🧪 TEST
            </span>
            <span className="text-slate-400 text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
              7. 🟠 EVIDENCE
            </span>
            <span className="text-slate-400 text-xs">→</span>
            <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
              8. ⚖️ EVALUATE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
