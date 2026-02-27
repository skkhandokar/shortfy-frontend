"use client";
import { useState } from "react";
import axios from "axios";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    
    try {
      const res = await axios.post(
        "https://skkhandokar22.pythonanywhere.com/api/forgot-password/",
        { email }
      );
      setMessage(res.data.message || "Reset link sent! Please check your inbox.");
      setStatus("success");
    } catch (err) {
      setMessage("We couldn't find an account with that email address.");
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Basic email validation for button state
  const isValidEmail = email.includes("@") && email.includes(".");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Top Progress/Decorative Bar - Matches Reset Page */}
        <div className="h-2 w-full bg-gray-100">
          <div 
            className={`h-full transition-all duration-700 ${isValidEmail ? 'w-full bg-emerald-500' : 'w-1/3 bg-blue-500'}`}
          ></div>
        </div>

        <div className="p-8 sm:p-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl mb-4 rotate-3">
              <Mail size={40} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Forgot Password?</h2>
            <p className="text-gray-500 mt-2 text-sm">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="name@company.com"
                  className={`block w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition duration-200 ${
                    isValidEmail ? 'border-emerald-100 focus:border-emerald-500' : 'border-transparent focus:border-blue-500'
                  }`}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              disabled={isLoading || status === 'success'}
              className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center ${
                isValidEmail && status !== 'success'
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" size={20} />
              ) : status === 'success' ? (
                <CheckCircle2 className="mr-2" size={20} />
              ) : null}
              {isLoading ? "Sending Link..." : status === 'success' ? "Email Sent!" : "Send Reset Link"}
            </button>
          </form>

          {/* Feedback Message styled exactly like Reset page */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl text-sm text-center font-bold animate-in fade-in zoom-in duration-300 ${
              status === 'success' 
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                : 'bg-red-50 text-red-700 border border-red-100'
            }`}>
              {message}
            </div>
          )}

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <a 
              href="/signin" 
              className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-emerald-600 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}