import React, { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Lock,
  Building,
  CheckCircle2,
  X,
  Scale,
  HeartHandshake,
  AlertCircle,
  Download,
} from "lucide-react";
import { useLearner } from "../../context/LearnerContext";
import { analyticsService } from "../../services/analyticsService";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  const { profile, updateProfile } = useLearner();
  const [activeTab, setActiveTab] = useState<"terms" | "privacy" | "child" | "publisher">("terms");
  const [acceptedSuccess, setAcceptedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAcceptTerms = async (consentType: "parent_guardian" | "teacher_educator" | "guest_learner") => {
    const acceptance = {
      termsVersion: "1.0",
      privacyVersion: "1.0",
      acceptedAt: new Date().toISOString(),
      consentType,
      acceptedByRole: consentType === "parent_guardian" ? "Parent / Guardian" : consentType === "teacher_educator" ? "Teacher / Educator" : "Learner",
    };

    await updateProfile({ legalAcceptance: acceptance });
    await analyticsService.trackEvent("TERMS_ACCEPTED", undefined, { consentType });
    setAcceptedSuccess(true);
    setTimeout(() => {
      setAcceptedSuccess(false);
    }, 3000);
  };

  const isAccepted = !!profile.legalAcceptance;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-white overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800">
                  LEGAL & TRUST CENTER v1.0
                </span>
                {isAccepted ? (
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                    ✓ TERMS ACCEPTED
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                    ⚠️ REVIEW REQUIRED
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                Nexus Science™ Legal Governance & POPIA Privacy
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap border-b border-slate-800 bg-slate-950/50 p-2 gap-2">
          {[
            { id: "terms", label: "Terms & Conditions", icon: FileText },
            { id: "privacy", label: "Privacy Policy & POPIA", icon: ShieldCheck },
            { id: "child", label: "Child Protection & Consent", icon: HeartHandshake },
            { id: "publisher", label: "Publisher & Copyright", icon: Building },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed custom-scrollbar">
          {activeTab === "terms" && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span>1. Terms & Conditions of Use (v1.0)</span>
              </h3>
              <p>
                Welcome to <strong>Nexus Science™</strong> (<em>Science of Our World</em>), published by <strong>Global IT and Business Solutions (Pty) Ltd.</strong> By accessing or installing this progressive web application, you agree to comply with and be bound by these Terms and Conditions.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider">A. Educational Purpose</h4>
                <p className="text-xs text-slate-400">
                  Nexus Science™ is an interactive educational platform designed for Grade 4–7 science learners, aligned with South African CAPS standards and global systems science. It is intended for classroom, homeschool, and self-directed learning.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider">B. Offline PWA License</h4>
                <p className="text-xs text-slate-400">
                  Global IT and Business Solutions (Pty) Ltd. grants you a non-exclusive, non-transferable license to run and install Nexus Science™ locally on personal or institutional devices. All educational content, visual lab engines, and interactive modules remain the intellectual property of Global IT and Business Solutions (Pty) Ltd.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider">C. Sequential Mastery Progression</h4>
                <p className="text-xs text-slate-400">
                  Learners progress through sequential lesson gates by satisfying mastery criteria. Educator/Parent Demo Mode is provided strictly for review purposes and does not replace genuine learner progress.
                </p>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>2. Privacy Principles & Child-Data Safeguards (POPIA Aligned)</span>
              </h3>
              <p>
                <strong>Global IT and Business Solutions (Pty) Ltd.</strong> has designed Nexus Science™ with POPIA-aligned privacy principles and child-data safeguards (Act No. 4 of 2013). We adhere to principles of lawful, reasonable, minimal, and transparent data processing.
              </p>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 space-y-2">
                <h4 className="font-bold text-emerald-300 uppercase text-xs tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No Commercial Tracking or Data Selling</span>
                </h4>
                <p className="text-xs text-emerald-200/90">
                  Nexus Science™ contains zero third-party advertising, zero commercial tracking cookies, and zero behavioral profiling scripts. We do NOT sell, rent, or trade any learner data.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <h4 className="font-bold text-white uppercase text-xs tracking-wider">Local-First Storage Architecture</h4>
                <p className="text-xs text-slate-400">
                  Learner progress, journal entries, and quiz attempt scores are stored securely on the local device using IndexedDB (`ScienceOfOurWorldDB`). Learners can export or clear their complete local dataset at any time via Profile Settings.
                </p>
              </div>
            </div>
          )}

          {activeTab === "child" && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-amber-400" />
                <span>3. Processing of Children's Information & Parent Consent</span>
              </h3>
              <p>
                In compliance with <strong>Section 35 of POPIA</strong> (Processing of Personal Information of Children), Nexus Science™ requires that a competent person (parent, legal guardian, or school educator) provides consent before creating child learning profiles.
              </p>

              <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 space-y-2">
                <h4 className="font-bold text-amber-300 uppercase text-xs tracking-wider">Anonymous Learner Identity</h4>
                <p className="text-xs text-amber-200/90">
                  By default, learners are identified using anonymous scientist codes (e.g., <code>YSC-7F42</code>) and non-identifying installation IDs (e.g., <code>inst_9F412A</code>). We do NOT request full legal names, phone numbers, or physical addresses from children.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Give Competent Person Consent:</h4>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => handleAcceptTerms("parent_guardian")}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>I am a Parent / Guardian (Provide Consent)</span>
                  </button>

                  <button
                    onClick={() => handleAcceptTerms("teacher_educator")}
                    className="px-4 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>I am a Teacher / Educator (School Consent)</span>
                  </button>
                </div>
                {acceptedSuccess && (
                  <div className="text-xs font-bold text-emerald-400 animate-in fade-in mt-2">
                    ✓ Consent recorded for version 1.0! Saved in IndexedDB.
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "publisher" && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-purple-400" />
                <span>4. Publisher Designation & Intellectual Property</span>
              </h3>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                  PUBLISHER DETAILS
                </div>
                <div className="text-base font-black text-white">
                  Global IT and Business Solutions (Pty) Ltd.
                </div>
                <p className="text-xs text-slate-400">
                  <strong>Product Brand:</strong> Nexus Science™<br />
                  <strong>Course Application:</strong> Science of Our World<br />
                  <strong>Tagline:</strong> Explore. Understand. Build.<br />
                  <strong>Jurisdiction:</strong> Republic of South Africa
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                  © 2026 Global IT and Business Solutions (Pty) Ltd. All rights reserved. Nexus Science™ is a proprietary product brand.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 text-center sm:text-left">
            {profile.legalAcceptance ? (
              <span className="text-emerald-400 font-bold">
                ✓ Terms 1.0 Accepted on {new Date(profile.legalAcceptance.acceptedAt).toLocaleDateString()} ({profile.legalAcceptance.acceptedByRole})
              </span>
            ) : (
              <span className="text-amber-400 font-bold">
                ⚠️ Review Terms & Consent to update profile record
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!isAccepted && (
              <button
                onClick={() => handleAcceptTerms("parent_guardian")}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Accept Terms & Consent</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
