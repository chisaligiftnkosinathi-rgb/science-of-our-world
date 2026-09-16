import React, { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff, ShieldCheck, UserPlus, LogIn, Loader2, AlertCircle } from "lucide-react";
import { authService } from "../../services/authService";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (email: string, parentProfileId?: string) => void;
}

type AuthMode = "signin" | "signup";

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState<"parent" | "teacher">("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setSuccessMsg(null);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { user, parentProfile } = await authService.signUpParent(email, password, accountType);
        if (user) {
          setSuccessMsg("✅ Account created! Please check your email to confirm your address, then sign in.");
          resetForm();
          setMode("signin");
        }
      } else {
        const { user, parentProfile } = await authService.signInParent(email, password);
        if (user) {
          onAuthSuccess(user.email || email, parentProfile?.id);
          onClose();
        }
      }
    } catch (err: any) {
      const msg = err?.message || "An error occurred. Please try again.";
      if (msg.includes("Invalid login credentials")) {
        setError("Invalid email or password.");
      } else if (msg.includes("Email not confirmed")) {
        setError("Please confirm your email address first.");
      } else if (msg.includes("already registered")) {
        setError("This email is already registered. Please sign in.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 px-8 pt-8 pb-6 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Nexus Science™</p>
              <h2 className="text-lg font-black text-white">
                {mode === "signin" ? "Parent Sign In" : "Create Parent Account"}
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {mode === "signin"
              ? "Sign in to manage your child's learning profile, track mastery, and sync across devices."
              : "Create a parent or educator account to link child profiles. No child email address required."}
          </p>

          {/* Mode toggle */}
          <div className="flex gap-1 mt-4 p-1 bg-slate-800 rounded-xl">
            {(["signin", "signup"] as AuthMode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  mode === m
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {m === "signin" ? (
                  <span className="flex items-center justify-center gap-1.5"><LogIn className="w-3.5 h-3.5" />Sign In</span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5"><UserPlus className="w-3.5 h-3.5" />Register</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
          {/* Account type — only on signup */}
          {mode === "signup" && (
            <div className="flex gap-2">
              {(["parent", "teacher"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setAccountType(t)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    accountType === t
                      ? "border-indigo-500 bg-indigo-950/60 text-indigo-300"
                      : "border-slate-700 bg-slate-800/40 text-slate-400 hover:text-white"
                  }`}
                >
                  {t === "parent" ? "👨‍👩‍👧 Parent / Guardian" : "🏫 Teacher / School"}
                </button>
              ))}
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                required
                className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm password — signup only */}
          {mode === "signup" && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80">
              <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-rose-300">{error}</p>
            </div>
          )}

          {/* Success */}
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80">
              <p className="text-xs text-emerald-300">{successMsg}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg shadow-indigo-900/40"
          >
            {loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
            ) : mode === "signin" ? (
              <><LogIn className="w-4 h-4" /> Sign In to Parent Account</>
            ) : (
              <><UserPlus className="w-4 h-4" /> Create Parent Account</>
            )}
          </button>

          {/* Privacy notice */}
          <p className="text-center text-[10px] text-slate-500 leading-relaxed">
            By continuing, you accept our Terms & Conditions and POPIA-aligned Privacy Policy.
            Child profiles are created after sign-in — no child email is required.
          </p>
        </form>
      </div>
    </div>
  );
};
