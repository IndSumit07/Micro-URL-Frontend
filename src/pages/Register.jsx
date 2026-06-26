import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { signUp, signInWithGoogle, loading, isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState("");

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setPwError("Passwords don't match.");
      return;
    }
    if (form.password.length < 6) {
      setPwError("Password must be at least 6 characters.");
      return;
    }
    setPwError("");
    signUp({ email: form.email, password: form.password, fullName: form.fullName });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden py-8">
      {/* Background Geometrics */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] -left-[300px] w-[600px] h-[600px] geom-shape-2 geom-border-2 geom-shadow rounded-[32px] rotate-45 opacity-50" />
        <div className="absolute bottom-[10%] -right-[300px] w-[600px] h-[600px] geom-shape-4 geom-border-4 geom-shadow rounded-[32px] rotate-45 opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="w-full max-w-md relative z-10 glass-panel p-8 rounded-[32px] border border-white/10 shadow-2xl my-8"
      >
        <div className="text-center mb-8">
          <Link to="/">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#80001a] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,51,0.5)]">
                <span className="font-bold text-white text-lg">X</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Micro</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Create an account</h2>
          <p className="text-gray-400">Join us to control your performance.</p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 transition-all rounded-xl py-3.5 px-4 mb-6 group shadow-lg disabled:opacity-50"
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="font-medium text-white group-hover:text-primary transition-colors">
            Sign up with Google
          </span>
        </button>

        <div className="flex items-center mb-6">
          <div className="flex-1 border-t border-white/10" />
          <span className="px-3 text-xs text-gray-500 font-medium uppercase tracking-wider">
            Or register with email
          </span>
          <div className="flex-1 border-t border-white/10" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="register-name"
                type="text"
                required
                value={form.fullName}
                onChange={set("fullName")}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="register-email"
                type="email"
                required
                value={form.email}
                onChange={set("email")}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="register-password"
                type={showPw ? "text" : "password"}
                required
                value={form.password}
                onChange={set("password")}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3.5 pl-11 pr-10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500" />
              </div>
              <input
                id="register-confirm-password"
                type={showPw ? "text" : "password"}
                required
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                className={`w-full bg-black/50 border rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${pwError ? "border-red-500/70" : "border-white/10"}`}
                placeholder="••••••••"
              />
            </div>
            {pwError && (
              <p className="text-xs text-red-400 ml-1 mt-1">{pwError}</p>
            )}
          </div>

          <button
            type="submit"
            id="register-submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-[#cc0022] hover:from-[#ff1a4b] hover:to-primary text-white font-medium rounded-xl py-3.5 px-4 flex items-center justify-center gap-2 mt-6 transition-all shadow-[0_0_20px_rgba(255,0,51,0.3)] hover:shadow-[0_0_30px_rgba(255,0,51,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
