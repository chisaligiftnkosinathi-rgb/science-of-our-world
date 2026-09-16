import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { HeroSection } from "./components/HeroSection";
import { ScienceMap } from "./components/map/ScienceMap";
import { LevelExplorer } from "./components/levels/LevelExplorer";
import { EcosystemSandbox } from "./components/builder/EcosystemSandbox";
import { Lesson01Systems } from "./components/lessons/Lesson01Systems";
import { Lesson02HumanBody } from "./components/lessons/Lesson02HumanBody";
import { Lesson03EarthSystem } from "./components/lessons/Lesson03EarthSystem";
import { Lesson04FoodChains } from "./components/lessons/Lesson04FoodChains";
import { Lesson05Energy } from "./components/lessons/Lesson05Energy";
import { Lesson06Cycles } from "./components/lessons/Lesson06Cycles";
import { Lesson07Matter } from "./components/lessons/Lesson07Matter";
import { Lesson08Chemistry } from "./components/lessons/Lesson08Chemistry";
import { Lesson09Forces } from "./components/lessons/Lesson09Forces";
import { Lesson10Electricity } from "./components/lessons/Lesson10Electricity";
import { Lesson11NatureLaws } from "./components/lessons/Lesson11NatureLaws";
import { Lesson12ConnectedWorld } from "./components/lessons/Lesson12ConnectedWorld";
import { ScientistJournal } from "./components/common/ScientistJournal";
import { ScientificDetectiveMode } from "./components/detective/ScientificDetectiveMode";
import { LaboratoryHub } from "./components/laboratory/LaboratoryHub";
import { YoungScientistCapstone } from "./components/capstone/YoungScientistCapstone";
import { FinalChallenge } from "./components/challenge/FinalChallenge";
import { SouthAfricaEcosystemExplorer } from "./components/local/SouthAfricaEcosystemExplorer";
import { CapsCurriculumModal } from "./components/local/CapsCurriculumModal";
import { LearnerProfileModal } from "./components/local/LearnerProfileModal";
import { ParentDashboardModal } from "./components/parent/ParentDashboardModal";
import { LegalModal } from "./components/legal/LegalModal";
import { LockedLessonCard } from "./components/common/LockedLessonCard";
import { AuthModal } from "./components/auth/AuthModal";
import { COURSE_MODULES } from "./data/courseData";
import { ModuleId } from "./types";
import { useLearner } from "./context/LearnerContext";
import { getModuleUnlockState } from "./utils/progressionEngine";
import { ArrowUp } from "lucide-react";
import { AIAssistant } from "./components/common/AIAssistant";

export default function App() {
  const {
    completedModules,
    markModuleComplete,
    resetProgress,
    profile,
    parentSession,
    setParentSession,
    signOutParent,
  } = useLearner();

  const [currentSection, setCurrentSection] = useState<ModuleId>("home");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [capsModalOpen, setCapsModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [parentModalOpen, setParentModalOpen] = useState<boolean>(false);
  const [legalModalOpen, setLegalModalOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your course progress in local storage?")) {
      resetProgress();
    }
  };

  // Scroll listener for back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to track active visible module
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id as ModuleId);
          }
        });
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: 0.1,
      }
    );

    COURSE_MODULES.forEach((mod) => {
      const el = document.getElementById(mod.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navigateTo = (id: ModuleId) => {
    setCurrentSection(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setSidebarOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Fixed Top Header */}
      <Header
        completedModules={completedModules}
        totalModulesCount={COURSE_MODULES.length}
        currentSection={currentSection}
        onNavigate={navigateTo}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onResetProgress={handleResetProgress}
        onOpenProfile={() => setProfileModalOpen(true)}
        onOpenCaps={() => setCapsModalOpen(true)}
        onOpenParentDashboard={() => setParentModalOpen(true)}
        onOpenLegal={() => setLegalModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        parentSession={parentSession}
        onSignOut={signOutParent}
      />

      <div className="flex pt-16">
        {/* Left Sidebar Navigation Drawer */}
        <Sidebar
          currentSection={currentSection}
          completedModules={completedModules}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onNavigate={navigateTo}
          onOpenProfile={() => setProfileModalOpen(true)}
          onOpenCaps={() => setCapsModalOpen(true)}
          onOpenParentDashboard={() => setParentModalOpen(true)}
          onOpenLegal={() => setLegalModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-72 p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full transition-all">
          {/* 00. Hero Banner */}
          <div id="home" className="scroll-mt-20">
            <HeroSection
              onStartCourse={() => {
                navigateTo("systems");
                markModuleComplete("home");
              }}
              onOpenLab={() => {
                navigateTo("laboratory");
                markModuleComplete("home");
              }}
              onNavigateTo={navigateTo}
              onOpenCaps={() => setCapsModalOpen(true)}
              completedCount={completedModules.length}
            />
          </div>

          {/* 🇿🇦 South African Ecosystems & Local Science Investigation Hub */}
          <SouthAfricaEcosystemExplorer />

          {/* Learning Pathway & Mastery Levels */}
          <LevelExplorer onNavigateTo={navigateTo} />

          {/* Unifying Science Map: The Story of Reality */}
          <ScienceMap onNavigateTo={navigateTo} />

          {/* 01. Systems */}
          <Lesson01Systems onComplete={() => markModuleComplete("systems")} />

          {/* 02. Human Body */}
          {(() => {
            const gate = getModuleUnlockState("human", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="human" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="human"
                    title="Lesson 02: The Human Body as an Open System"
                    category="BIOLOGY"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson02HumanBody onComplete={() => markModuleComplete("human")} />;
          })()}

          {/* 03. Earth System */}
          {(() => {
            const gate = getModuleUnlockState("earth", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="earth" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="earth"
                    title="Lesson 03: Earth as a Connected System"
                    category="EARTH SCIENCE"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson03EarthSystem onComplete={() => markModuleComplete("earth")} />;
          })()}

          {/* 04. Food Chains */}
          {(() => {
            const gate = getModuleUnlockState("food", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="food" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="food"
                    title="Lesson 04: Food Chains & Trophic Webs"
                    category="ECOLOGY"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson04FoodChains onComplete={() => markModuleComplete("food")} />;
          })()}

          {/* 05. Energy & Heat */}
          {(() => {
            const gate = getModuleUnlockState("energy", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="energy" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="energy"
                    title="Lesson 05: Energy & Heat Transfer"
                    category="PHYSICS"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson05Energy onComplete={() => markModuleComplete("energy")} />;
          })()}

          {/* 06. Natural Cycles */}
          {(() => {
            const gate = getModuleUnlockState("cycles", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="cycles" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="cycles"
                    title="Lesson 06: Natural Cycles: Water, Carbon, & Oxygen"
                    category="EARTH SYSTEMS"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson06Cycles onComplete={() => markModuleComplete("cycles")} />;
          })()}

          {/* 07. States of Matter */}
          {(() => {
            const gate = getModuleUnlockState("matter", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="matter" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="matter"
                    title="Lesson 07: States of Matter & Particles"
                    category="CHEMISTRY"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson07Matter onComplete={() => markModuleComplete("matter")} />;
          })()}

          {/* 08. Chemistry in Life */}
          {(() => {
            const gate = getModuleUnlockState("chemistry", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="chemistry" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="chemistry"
                    title="Lesson 08: Chemistry in Life & Reactions"
                    category="CHEMISTRY"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson08Chemistry onComplete={() => markModuleComplete("chemistry")} />;
          })()}

          {/* 09. Forces & Motion */}
          {(() => {
            const gate = getModuleUnlockState("forces", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="forces" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="forces"
                    title="Lesson 09: Forces, Gravity & Motion"
                    category="PHYSICS"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson09Forces onComplete={() => markModuleComplete("forces")} />;
          })()}

          {/* 10. Electricity & Circuits */}
          {(() => {
            const gate = getModuleUnlockState("electricity", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="electricity" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="electricity"
                    title="Lesson 10: Electricity & Complete Circuits"
                    category="PHYSICS"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson10Electricity onComplete={() => markModuleComplete("electricity")} />;
          })()}

          {/* 11. Laws of Nature & History */}
          {(() => {
            const gate = getModuleUnlockState("laws", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="laws" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="laws"
                    title="Lesson 11: Laws of Nature & Scientific Discovery"
                    category="SCIENTIFIC THINKING"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson11NatureLaws onComplete={() => markModuleComplete("laws")} />;
          })()}

          {/* 12. One Connected World */}
          {(() => {
            const gate = getModuleUnlockState("connected", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="connected" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="connected"
                    title="Lesson 12: One Connected World"
                    category="SYSTEMS THINKING"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <Lesson12ConnectedWorld onComplete={() => markModuleComplete("connected")} />;
          })()}

          {/* Young Scientist Research Journal */}
          <section id="journal" className="scroll-mt-20">
            <ScientistJournal onNavigateTo={navigateTo} />
          </section>

          {/* Scientific Detective Mode */}
          {(() => {
            const gate = getModuleUnlockState("detective", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="detective" className="scroll-mt-20 mb-14">
                  <LockedLessonCard
                    moduleId="detective"
                    title="Scientific Detective Mode"
                    category="FORENSIC SCIENCE"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return (
              <section id="detective" className="scroll-mt-20 mb-14">
                <ScientificDetectiveMode />
              </section>
            );
          })()}

          {/* Ecosystem Sandbox */}
          {(() => {
            const gate = getModuleUnlockState("sandbox", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="sandbox" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="sandbox"
                    title="Ecosystem Sandbox & World Builder"
                    category="INTERACTIVE SIMULATION"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <EcosystemSandbox />;
          })()}

          {/* Virtual Laboratory Hub */}
          {(() => {
            const gate = getModuleUnlockState("laboratory", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="laboratory" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="laboratory"
                    title="Young Scientist Virtual Lab Hub"
                    category="PRACTICAL LAB"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return (
              <LaboratoryHub
                onNavigateTo={navigateTo}
                onComplete={() => markModuleComplete("laboratory")}
              />
            );
          })()}

          {/* Young Scientist Capstone Defense */}
          {(() => {
            const gate = getModuleUnlockState("capstone", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="capstone" className="scroll-mt-20 mb-14">
                  <LockedLessonCard
                    moduleId="capstone"
                    title="Young Scientist Capstone Defense"
                    category="CAPSTONE DEFENSE"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return (
              <section id="capstone" className="scroll-mt-20 mb-14">
                <YoungScientistCapstone />
              </section>
            );
          })()}

          {/* Final Assessment & Certificate */}
          {(() => {
            const gate = getModuleUnlockState("challenge", completedModules, profile.teacherDemoMode);
            if (!gate.isUnlocked) {
              return (
                <div id="challenge" className="scroll-mt-20">
                  <LockedLessonCard
                    moduleId="challenge"
                    title="Young Scientist Challenge & Certificate"
                    category="ASSESSMENT"
                    prerequisiteTitle={gate.prerequisiteTitle}
                    prerequisiteId={gate.prerequisiteId}
                    unlockRequirementText={gate.unlockRequirementText}
                    onNavigateToPrerequisite={navigateTo}
                  />
                </div>
              );
            }
            return <FinalChallenge onComplete={() => markModuleComplete("challenge")} />;
          })()}

          {/* Course Footer */}
          <footer className="mt-16 pt-8 pb-12 border-t border-slate-300 text-center text-xs text-slate-500 space-y-2">
            <div className="flex items-center justify-center gap-2 font-black text-slate-800 text-base">
              <span>🧬</span>
              <span>Nexus Science™</span>
              <span className="text-slate-400 text-xs font-normal">• Science of Our World</span>
            </div>
            <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider">
              Explore. Understand. Build.
            </p>
            <p className="max-w-md mx-auto text-slate-500 text-xs leading-relaxed">
              Dedicated to curious minds everywhere. Observe with precision, test with evidence, and explore the wondrous connections of the universe.
            </p>
            <div className="pt-3 text-[11px] text-slate-500 space-y-2">
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
                <button
                  onClick={() => setLegalModalOpen(true)}
                  className="hover:text-blue-600 hover:underline cursor-pointer"
                >
                  📜 Terms & Conditions
                </button>
                <span>•</span>
                <button
                  onClick={() => setLegalModalOpen(true)}
                  className="hover:text-blue-600 hover:underline cursor-pointer"
                >
                  🛡️ Privacy Policy & POPIA
                </button>
                <span>•</span>
                <button
                  onClick={() => setParentModalOpen(true)}
                  className="hover:text-indigo-600 hover:underline cursor-pointer font-bold text-indigo-700"
                >
                  👥 Parent & Educator Dashboard
                </button>
              </div>
              <p className="font-semibold text-slate-600">
                A product of Global IT and Business Solutions (Pty) Ltd.
              </p>
              <p className="text-slate-400">
                © 2026 Global IT and Business Solutions (Pty) Ltd. All rights reserved. • Offline PWA (IndexedDB) • CAPS DBE Aligned
              </p>
            </div>
          </footer>
        </main>
      </div>

      {/* CAPS Curriculum Modal */}
      <CapsCurriculumModal
        isOpen={capsModalOpen}
        onClose={() => setCapsModalOpen(false)}
        onNavigateToLesson={navigateTo}
      />

      {/* Anonymous Scientist Profile & Sync Modal */}
      <LearnerProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      {/* Parent & Educator Governance Dashboard Modal */}
      <ParentDashboardModal
        isOpen={parentModalOpen}
        onClose={() => setParentModalOpen(false)}
        onOpenLegal={() => {
          setParentModalOpen(false);
          setLegalModalOpen(true);
        }}
      />

      {/* Legal & Trust POPIA Compliance Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
      />

      {/* Parent Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(email, parentProfileId) => {
          setParentSession({ userId: "", email, parentProfileId });
          setAuthModalOpen(false);
          setParentModalOpen(true);
        }}
      />

      {/* Floating Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl hover:shadow-2xl transition-all z-40 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      
      {/* Local WebLLM AI Assistant */}
      <AIAssistant />
    </div>
  );
}
