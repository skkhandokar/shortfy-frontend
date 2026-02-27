"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { LockKeyhole, Eye, EyeOff, Loader2, CheckCircle2, XCircle, Check } from "lucide-react";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Validation Logic
  const validations = {
    length: password.length >= 8,
    match: password === confirmPassword && confirmPassword.length > 0,
  };

  const isFormValid = validations.length && validations.match;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setStatus(null);

    try {
      const res = await axios.post(
        "https://skkhandokar22.pythonanywhere.com/api/reset-password-confirm/",
        { uid, token, password }
      );
      setMessage(res.data.message || "Password updated successfully!");
      setStatus("success");
      setTimeout(() => router.push("/signin"), 3000);
    } catch (err) {
      setMessage("Invalid or expired link. Please try again.");
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Progress header */}
        <div className="h-2 w-full bg-gray-100">
          <div 
            className={`h-full transition-all duration-500 ${isFormValid ? 'w-full bg-emerald-500' : 'w-1/3 bg-blue-500'}`}
          ></div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl mb-4 rotate-3">
              <LockKeyhole size={40} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">New Password</h2>
            <p className="text-gray-500 mt-2 text-sm">Set a password that is easy to remember but hard to guess.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">New Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  className={`block w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition duration-200 ${
                    validations.length ? 'border-emerald-100 focus:border-emerald-500' : 'border-transparent focus:border-blue-500'
                  }`}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  className={`block w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition duration-200 ${
                    validations.match ? 'border-emerald-100 focus:border-emerald-500' : 'border-transparent focus:border-blue-500'
                  }`}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Live Requirements Checklist */}
            <div className="bg-gray-50 p-4 rounded-2xl space-y-3 border border-gray-100">
              <h4 className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">Security Checklist</h4>
              <div className="space-y-2">
                <Requirement met={validations.length} label="Minimum 8 characters" />
                <Requirement met={validations.match} label="Passwords must match" />
              </div>
            </div>

            <button
              disabled={isLoading || !isFormValid || status === 'success'}
              className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center ${
                isFormValid && status !== 'success'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" size={20} />
              ) : status === 'success' ? (
                <CheckCircle2 className="mr-2" size={20} />
              ) : null}
              {isLoading ? "Saving Changes..." : status === 'success' ? "Password Reset!" : "Update Password"}
            </button>
          </form>

          {message && (
            <div className={`mt-6 p-4 rounded-xl text-sm text-center font-bold animate-in fade-in zoom-in duration-300 ${
              status === 'success' 
                ? 'bg-emerald-50 text-emerald-700' 
                : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper component for the checklist items
function Requirement({ met, label }) {
  return (
    <div className={`flex items-center text-xs transition-colors duration-300 ${met ? 'text-emerald-600 font-semibold' : 'text-gray-400'}`}>
      {met ? <Check size={14} className="mr-2" /> : <XCircle size={14} className="mr-2 opacity-50" />}
      {label}
    </div>
  );
}