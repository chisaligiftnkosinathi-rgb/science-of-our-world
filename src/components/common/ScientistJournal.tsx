import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  Download,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  TrendingUp,
  BarChart2,
  Save,
  Clock,
  Star,
} from "lucide-react";
import { JournalEntry, ModuleId } from "../../types";
import { COURSE_MODULES } from "../../data/courseData";

const JOURNAL_STORAGE_KEY = "scienceOfOurWorld.journal.v1";

interface ScientistJournalProps {
  onNavigateTo?: (id: ModuleId) => void;
}

export const ScientistJournal: React.FC<ScientistJournalProps> = ({ onNavigateTo }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedModule, setSelectedModule] = useState<ModuleId>("systems");
  const [question, setQuestion] = useState<string>("");
  const [hypothesis, setHypothesis] = useState<string>("");
  const [observation, setObservation] = useState<string>("");
  const [conclusion, setConclusion] = useState<string>("");
  const [confidence, setConfidence] = useState<number>(4);
  const [activeGraphTab, setActiveGraphTab] = useState<"temp_energy" | "voltage_current" | "light_o2">("light_o2");
  const [graphQuizAnswer, setGraphQuizAnswer] = useState<string | null>(null);

  // Load saved journal entries
  useEffect(() => {
    try {
      const saved = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (saved) {
        setEntries(JSON.parse(saved));
      } else {
        // Pre-populate with a warm sample entry
        const sampleEntry: JournalEntry = {
          id: "sample_01",
          moduleId: "food",
          lessonTitle: "Food Chains & Energy",
          timestamp: new Date().toLocaleDateString(),
          question: "How does removing apex predators affect the green plant population in a forest?",
          hypothesis: "If apex predators (wolves) are removed, then deer populations will surge, causing severe overgrazing of young oak saplings.",
          observation: "In the ecosystem simulator, setting wolves to 0 caused rabbit and deer counts to double within 3 seasons, reducing plant biomass by 65%.",
          conclusion: "Predators play an essential top-down regulatory feedback role in maintaining ecosystem carrying capacity!",
          confidenceRating: 5,
        };
        setEntries([sampleEntry]);
      }
    } catch (e) {
      console.warn("Could not load journal", e);
    }
  }, []);

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hypothesis.trim() || !observation.trim()) {
      alert("Please fill in your hypothesis and observations before recording.");
      return;
    }

    const mod = COURSE_MODULES.find((m) => m.id === selectedModule);
    const newEntry: JournalEntry = {
      id: `entry_${Date.now()}`,
      moduleId: selectedModule,
      lessonTitle: mod ? mod.title : "General Scientific Investigation",
      timestamp: new Date().toLocaleDateString(),
      question: question || (mod ? `How does ${mod.title} behave under experimentation?` : "Scientific Inquiry"),
      hypothesis,
      observation,
      conclusion: conclusion || "Evidence supports the predictive hypothesis model.",
      confidenceRating: confidence,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Could not save to storage", err);
    }

    // Reset form
    setQuestion("");
    setHypothesis("");
    setObservation("");
    setConclusion("");
    alert("✨ Observation successfully recorded in your Scientist Notebook!");
  };

  const handleDeleteEntry = (id: string) => {
    const filtered = entries.filter((e) => e.id !== id);
    setEntries(filtered);
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(filtered));
    } catch (err) {
      console.warn("Storage write error", err);
    }
  };

  const handleExportJournal = () => {
    const text = entries
      .map(
        (e, idx) =>
          `Entry #${idx + 1} [${e.timestamp}] — ${e.lessonTitle}\n` +
          `Question: ${e.question}\n` +
          `Hypothesis: ${e.hypothesis}\n` +
          `Observation & Evidence: ${e.observation}\n` +
          `Scientific Conclusion: ${e.conclusion}\n` +
          `Confidence: ${"★".repeat(e.confidenceRating)}${"☆".repeat(5 - e.confidenceRating)}\n\n`
      )
      .join("----------------------------------------\n\n");

    const blob = new Blob([`YOUNG SCIENTIST RESEARCH JOURNAL\nScience of Our World\n\n${text}`], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Young_Scientist_Journal_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm my-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-sm shadow-xs">
            📓
          </span>
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              EVIDENCE, MEASUREMENT & HYPOTHESES
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              🧪 Young Scientist Field Notebook
            </h3>
          </div>
        </div>

        {entries.length > 0 && (
          <button
            onClick={handleExportJournal}
            className="px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-all flex items-center gap-2 border border-teal-200 cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-teal-600" />
            <span>Export Research Log</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Entry Recorder Form (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-600" />
              Record New Hypothesis & Investigation
            </h4>

            <form onSubmit={handleSaveEntry} className="space-y-4 text-xs">
              {/* Select Lesson Focus */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  1. Investigation Topic / Lesson:
                </label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value as ModuleId)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {COURSE_MODULES.filter((m) => m.id !== "home" && m.id !== "map" && m.id !== "challenge").map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.icon} {m.number}: {m.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Research Question */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  2. The Scientific Question:
                </label>
                <input
                  type="text"
                  placeholder="e.g., What happens to plant oxygen output when sunlight is cut in half?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* Hypothesis */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  3. Your Hypothesis (If... then... because...):
                </label>
                <textarea
                  rows={2}
                  placeholder="If sunlight decreases from 100% to 50%, then oxygen output will drop proportionally because photosynthesis requires radiant photons..."
                  value={hypothesis}
                  onChange={(e) => setHypothesis(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Observation & Data */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  4. Experimental Observation & Measured Data:
                </label>
                <textarea
                  rows={2}
                  placeholder="In the simulation trial, when sunlight slider was set to 50%, the measured oxygen meter dropped from 144 kg/day to 72 kg/day..."
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Conclusion */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  5. Scientific Conclusion & Mechanism:
                </label>
                <textarea
                  rows={2}
                  placeholder="The data confirms a direct linear relationship between photon flux and O₂ synthesis in autotrophs."
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                />
              </div>

              {/* Confidence Rating */}
              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-slate-700">Evidence Confidence:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setConfidence(star)}
                      className={`text-lg cursor-pointer transition-transform hover:scale-125 ${
                        star <= confidence ? "text-amber-400" : "text-slate-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Save className="w-4 h-4" />
                <span>Save to Scientific Research Log</span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT: Data Graph & Evidence Interpreter Widget (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4" /> Data & Graph Interpretation
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Skill #7</span>
            </div>

            {/* Graph Selector Tabs */}
            <div className="flex gap-1 p-1 bg-slate-950 rounded-xl mb-4 text-[11px]">
              <button
                onClick={() => {
                  setActiveGraphTab("light_o2");
                  setGraphQuizAnswer(null);
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer ${
                  activeGraphTab === "light_o2" ? "bg-cyan-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                }`}
              >
                ☀️ Light vs O₂
              </button>
              <button
                onClick={() => {
                  setActiveGraphTab("voltage_current");
                  setGraphQuizAnswer(null);
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer ${
                  activeGraphTab === "voltage_current"
                    ? "bg-cyan-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                ⚡ Ohm's Law
              </button>
              <button
                onClick={() => {
                  setActiveGraphTab("temp_energy");
                  setGraphQuizAnswer(null);
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer ${
                  activeGraphTab === "temp_energy"
                    ? "bg-cyan-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                🌡️ Heat & Phase
              </button>
            </div>

            {/* Interactive Visual Graph Canvas representation */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 mb-4">
              {activeGraphTab === "light_o2" && (
                <div>
                  <div className="text-xs font-bold text-slate-200 mb-2">
                    Graph: Photosynthetic Rate (O₂ Output) vs Sunlight Intensity (Lux)
                  </div>
                  {/* Bar visual chart */}
                  <div className="space-y-2 text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-14 text-slate-400">100% Lux</span>
                      <div className="h-4 bg-cyan-500 rounded-sm w-[90%] flex items-center justify-end pr-2 text-white font-bold">
                        180 kg/d
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-14 text-slate-400">50% Lux</span>
                      <div className="h-4 bg-cyan-600 rounded-sm w-[50%] flex items-center justify-end pr-2 text-white font-bold">
                        90 kg/d
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-14 text-slate-400">20% Lux</span>
                      <div className="h-4 bg-cyan-700 rounded-sm w-[22%] flex items-center justify-end pr-2 text-white font-bold">
                        36 kg/d
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-14 text-slate-400">0% Lux</span>
                      <div className="h-4 bg-slate-800 rounded-sm w-[2%] flex items-center justify-end pr-1 text-slate-500 font-bold">
                        0
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeGraphTab === "voltage_current" && (
                <div>
                  <div className="text-xs font-bold text-slate-200 mb-2">
                    Graph: Current (I) vs Voltage (V) at constant Resistance 4Ω (Slope = 1/R)
                  </div>
                  <div className="space-y-2 text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-400">24 Volts</span>
                      <div className="h-4 bg-amber-500 rounded-sm w-[100%] flex items-center justify-end pr-2 text-slate-950 font-bold">
                        6.0 Amps
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-400">12 Volts</span>
                      <div className="h-4 bg-amber-600 rounded-sm w-[50%] flex items-center justify-end pr-2 text-slate-950 font-bold">
                        3.0 Amps
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-400">6 Volts</span>
                      <div className="h-4 bg-amber-700 rounded-sm w-[25%] flex items-center justify-end pr-2 text-white font-bold">
                        1.5 Amps
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeGraphTab === "temp_energy" && (
                <div>
                  <div className="text-xs font-bold text-slate-200 mb-2">
                    Graph: Mean Molecular Velocity (m/s) vs Temperature (°C)
                  </div>
                  <div className="space-y-2 text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-400">100°C</span>
                      <div className="h-4 bg-rose-500 rounded-sm w-[95%] flex items-center justify-end pr-2 text-white font-bold">
                        650 m/s (Steam)
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-400">20°C</span>
                      <div className="h-4 bg-indigo-500 rounded-sm w-[55%] flex items-center justify-end pr-2 text-white font-bold">
                        450 m/s (Water)
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-slate-400">-20°C</span>
                      <div className="h-4 bg-sky-600 rounded-sm w-[25%] flex items-center justify-end pr-2 text-white font-bold">
                        220 m/s (Ice)
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scientific Question Check */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <span className="font-bold text-slate-200 block mb-1">
                🧐 Graph Analysis Challenge:
              </span>
              <p className="text-slate-400 text-[11px] mb-2">
                {activeGraphTab === "light_o2" &&
                  "What mathematically happens to Oxygen production if solar irradiance is multiplied by 2?"}
                {activeGraphTab === "voltage_current" &&
                  "If voltage doubles from 6V to 12V with constant resistance, what happens to current?"}
                {activeGraphTab === "temp_energy" &&
                  "Why do particles move fastest in the 100°C steam phase?"}
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGraphQuizAnswer("correct")}
                  className={`p-2 rounded-lg text-left text-[10px] font-bold border transition-all cursor-pointer ${
                    graphQuizAnswer === "correct"
                      ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                      : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  ✓ Direct Proportion (Doubles)
                </button>
                <button
                  onClick={() => setGraphQuizAnswer("incorrect")}
                  className={`p-2 rounded-lg text-left text-[10px] font-bold border transition-all cursor-pointer ${
                    graphQuizAnswer === "incorrect"
                      ? "bg-rose-950 border-rose-500 text-rose-300"
                      : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  ✗ Stays constant
                </button>
              </div>

              {graphQuizAnswer === "correct" && (
                <div className="mt-2 text-emerald-400 text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Exact graph interpretation! Direct linear relation.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recorded Log Entries Stream */}
      <div className="mt-8 border-t border-slate-200 pt-6">
        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-teal-600" />
          Saved Field Notes ({entries.length})
        </h4>

        {entries.length === 0 ? (
          <p className="text-xs text-slate-400 italic">
            No research notes recorded yet. Use the form above to record your first experiment!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between text-xs space-y-2"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{entry.lessonTitle}</span>
                    <span className="text-[10px] text-slate-400">({entry.timestamp})</span>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-slate-400 hover:text-rose-500 transition-colors p-1 cursor-pointer"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1 text-slate-700">
                  <div>
                    <strong className="text-slate-900">Q:</strong> {entry.question}
                  </div>
                  <div>
                    <strong className="text-teal-700">Hypothesis:</strong> {entry.hypothesis}
                  </div>
                  <div>
                    <strong className="text-indigo-700">Observation:</strong> {entry.observation}
                  </div>
                  <div>
                    <strong className="text-emerald-700">Conclusion:</strong> {entry.conclusion}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                  <span>Confidence: {"★".repeat(entry.confidenceRating)}{"☆".repeat(5 - entry.confidenceRating)}</span>
                  {onNavigateTo && (
                    <button
                      onClick={() => onNavigateTo(entry.moduleId)}
                      className="text-teal-600 font-bold hover:underline cursor-pointer"
                    >
                      View Lesson ➔
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
