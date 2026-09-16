import React, { useState } from "react";
import { Globe, Wind, Droplets, Mountain, Sprout, Sun } from "lucide-react";
import { QuizComponent } from "../common/QuizComponent";
import { LessonPedagogyWrapper } from "../common/LessonPedagogyWrapper";
import { LESSON_PEDAGOGIES } from "../../data/pedagogyData";
import { QuizQuestion } from "../../types";

interface LessonProps {
  onComplete: () => void;
}

export const Lesson03EarthSystem: React.FC<LessonProps> = ({ onComplete }) => {
  const [selectedSphere, setSelectedSphere] = useState<string>("atmosphere");

  const spheres = [
    {
      id: "atmosphere",
      name: "Atmosphere (Air)",
      icon: "🌬️",
      composition: "78% Nitrogen, 21% Oxygen, 0.9% Argon, 0.04% Carbon Dioxide, plus water vapor.",
      role: "Shields Earth from solar ultraviolet radiation, regulates global climate via the greenhouse effect, and carries water vapor for weather.",
      interaction: "Provides CO₂ for plant photosynthesis and O₂ for animal respiration.",
      color: "bg-sky-50 border-sky-300 text-sky-950",
    },
    {
      id: "hydrosphere",
      name: "Hydrosphere (Water)",
      icon: "💧",
      composition: "97.5% Oceans (saline), 2.5% Freshwater (glaciers, lakes, rivers, groundwater).",
      role: "Absorbs solar thermal energy, stabilizes planetary temperatures, carves landscapes, and sustains all biological life.",
      interaction: "Evaporates into the atmosphere to form clouds, then precipitates down onto geosphere soils.",
      color: "bg-blue-50 border-blue-300 text-blue-950",
    },
    {
      id: "geosphere",
      name: "Geosphere (Land & Rocks)",
      icon: "🪨",
      composition: "Crust, mantle, liquid outer core, and solid iron-nickel inner core; rocks, minerals, tectonic plates, and rich topsoil.",
      role: "Provides solid substrate, stores fossil carbon reserves, generates Earth's protective magnetic field from core dynamo.",
      interaction: "Supplies essential mineral nutrients (phosphorus, calcium, potassium) to plant roots.",
      color: "bg-stone-50 border-stone-300 text-stone-950",
    },
    {
      id: "biosphere",
      name: "Biosphere (Life)",
      icon: "🌱",
      composition: "All living organisms: bacteria, archaea, fungi, plants, aquatic species, animals, and humans.",
      role: "Actively reshapes the planet's atmosphere (photosynthesis produced our oxygen!) and recycles organic matter.",
      interaction: "Draws water from hydrosphere, breathes air from atmosphere, and anchors in the geosphere.",
      color: "bg-emerald-50 border-emerald-300 text-emerald-950",
    },
  ];

  const activeSphere = spheres.find((s) => s.id === selectedSphere) || spheres[0];
  const pedagogy = LESSON_PEDAGOGIES.earth;

  const quizQuestion: QuizQuestion = {
    id: "q3_earth",
    concept: "Earth System Interactions",
    question: "When rain (water) falls from the air, soaks into soil, and is taken up by tree roots, which Earth spheres are interacting?",
    options: [
      {
        text: "Hydrosphere (rain), Atmosphere (air/clouds), Geosphere (soil), and Biosphere (tree).",
        isCorrect: true,
        explanation: "Bingo! All four major Earth spheres constantly interact in seamless, connected feedback loops.",
      },
      {
        text: "Only the geosphere is involved.",
        isCorrect: false,
        explanation: "Water (hydrosphere), clouds (atmosphere), and trees (biosphere) are also active participants!",
      },
      {
        text: "Earth systems never interact with each other.",
        isCorrect: false,
        explanation: "Earth is an interconnected system where changes in one sphere affect all others.",
      },
    ],
  };

  return (
    <section id="earth" className="scroll-mt-20 mb-14">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm shadow-xs">
          03
        </span>
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            EARTH SCIENCE • SPHERES & FLOWS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            🌍 Earth as a Connected System
          </h2>
        </div>
      </div>

      <LessonPedagogyWrapper
        pedagogy={pedagogy}
        lessonNumber="03"
        lessonTitle="Earth as a Connected System"
        category="EARTH SCIENCE"
        onComplete={onComplete}
      >
        {/* Interactive Earth Spheres Workbench */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {/* Earth Sunlight to Life Flow Map */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-sky-50 via-emerald-50 to-amber-50 border border-emerald-200 mb-6">
            <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 text-center mb-3">
              ☀️ Solar Energy Cascading Through Earth's Web
            </div>

            <div className="flex flex-col items-center gap-3 max-w-md mx-auto">
              {/* Sun */}
              <div className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-900 font-extrabold shadow-sm flex items-center gap-2 text-sm">
                <Sun className="w-5 h-5 text-amber-900 animate-pulse" />
                <span>☀️ Sun (Solar Radiant Energy)</span>
              </div>

              <div className="text-amber-500 font-bold text-lg">↓ Light & Heat</div>

              {/* Plants */}
              <div className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow-sm flex items-center gap-2 text-sm">
                <Sprout className="w-5 h-5" />
                <span>🌱 Biosphere: Plants & Algae (Photosynthesis)</span>
              </div>

              <div className="text-emerald-600 font-bold text-lg">↓ Biomass & Sugars</div>

              {/* Animals & Humans */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-2.5 bg-white rounded-xl border border-emerald-300 text-center text-xs font-bold text-slate-800">
                  🐄 Herbivores & Wildlife
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-emerald-300 text-center text-xs font-bold text-slate-800">
                  🧍 Human Communities
                </div>
              </div>

              <div className="text-slate-400 font-bold text-lg">↓ Decomposing & Mineral Cycle</div>

              {/* Soil / Earth */}
              <div className="px-5 py-2.5 rounded-xl bg-stone-700 text-white font-bold shadow-sm flex items-center gap-2 text-sm">
                <Globe className="w-5 h-5 text-emerald-400" />
                <span>🌍 Geosphere & Hydrosphere (Nutrient Storage)</span>
              </div>
            </div>
          </div>

          {/* 4 Spheres Explorer */}
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
            🌐 The Four Great Earth Spheres (Click to explore):
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {spheres.map((sphere) => (
              <button
                key={sphere.id}
                onClick={() => {
                  setSelectedSphere(sphere.id);
                  onComplete();
                }}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedSphere === sphere.id
                    ? "bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="text-xl mb-1">{sphere.icon}</div>
                <div className="font-bold text-xs sm:text-sm leading-tight">
                  {sphere.name.split(" ")[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Sphere Details */}
          <div className={`p-4 rounded-xl border ${activeSphere.color} transition-all`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{activeSphere.icon}</span>
              <h4 className="text-base font-bold">{activeSphere.name}</h4>
            </div>
            <p className="text-xs sm:text-sm mb-3 opacity-90">{activeSphere.role}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white/90 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block mb-0.5">🔬 Composition:</strong>
                <span className="text-slate-600">{activeSphere.composition}</span>
              </div>
              <div className="p-2.5 bg-white/90 rounded-lg border border-slate-200">
                <strong className="text-slate-800 block mb-0.5">
                  🔗 How It Interacts With Other Spheres:
                </strong>
                <span className="text-slate-600">{activeSphere.interaction}</span>
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
