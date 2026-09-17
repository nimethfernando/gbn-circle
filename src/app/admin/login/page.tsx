'use client';

import { useState } from 'react';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';

type AuthView = 'LOGIN' | 'FORGOT_REQUEST' | 'FORGOT_RESET';

export default function AdminLoginPage() {
  const [view, setView] = useState<AuthView>('LOGIN');

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Forgot password state
  const [resetEmail, setResetEmail] = useState('gbncircle@gmail.com');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // UI state
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle standard login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        const searchParams = new URLSearchParams(window.location.search);
        const redirectUrl = searchParams.get('redirect') || '/admin/events';
        window.location.href = redirectUrl;
      } else {
        setError(data.message || 'Authentication failed');
        setLoading(false);
      }
    } catch {
      setError('An error occurred during authentication.');
      setLoading(false);
    }
  };

  // Handle requesting OTP for forgot password
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/forgot-password/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message || 'Verification code sent to your email.');
        setView('FORGOT_RESET');
      } else {
        setError(data.message || 'Failed to dispatch verification code.');
      }
    } catch {
      setError('Network error while requesting verification code.');
    } finally {
      setLoading(false);
    }
  };

  // Handle verifying OTP and setting new password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/forgot-password/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otp.trim(), newPassword }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMessage(data.message);
        setView('LOGIN');
        setPassword('');
        setOtp('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch {
      setError('Network error while resetting password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-[#c5a059] text-[10px] uppercase font-bold tracking-widest border border-[#c5a059]/30 px-3 py-1 rounded-full">
            Restricted Area
          </span>
          <h1 className="text-2xl font-bold font-serif text-white mt-4">
            GBN Admin Portal
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            {view === 'LOGIN' && 'Enter administrative credentials to access portal.'}
            {view === 'FORGOT_REQUEST' && 'Reset administrator password via verification code.'}
            {view === 'FORGOT_RESET' && 'Enter 6-digit OTP and choose a new password.'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/50 border border-red-500/40 text-red-300 text-xs rounded flex items-center gap-2">
            <ShieldAlert size={15} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs rounded flex items-center gap-2">
            <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* View 1: Standard Login */}
        {view === 'LOGIN' && (
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Admin Email</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="gbncircle@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-400">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setSuccessMessage('');
                    setView('FORGOT_REQUEST');
                  }}
                  className="text-[11px] text-[#c5a059] hover:text-[#d4af37] transition font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase rounded transition-all disabled:opacity-50 mt-2 shadow-md"
            >
              {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            </button>
          </form>
        )}

        {/* View 2: Forgot Password - Request OTP */}
        {view === 'FORGOT_REQUEST' && (
          <form onSubmit={handleRequestOtp} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Admin Email Address</label>
              <input
                required
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="gbncircle@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
              />
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                A 6-digit one-time verification code will be dispatched to this email.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase rounded transition-all disabled:opacity-50 mt-2 shadow-md flex items-center justify-center gap-2"
            >
              <Mail size={14} />
              {loading ? 'Sending Code...' : 'Send Verification Code (OTP)'}
            </button>

            <button
              type="button"
              onClick={() => {
                setError('');
                setView('LOGIN');
              }}
              className="w-full py-2 text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5 text-xs mt-2"
            >
              <ArrowLeft size={13} />
              Back to Login
            </button>
          </form>
        )}

        {/* View 3: Forgot Password - Verify OTP & Set Password */}
        {view === 'FORGOT_RESET' && (
          <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">6-Digit Verification Code (OTP)</label>
              <input
                required
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white font-mono text-center tracking-[6px] text-base focus:border-[#c5a059] outline-none"
              />
              <p className="text-[10px] text-slate-500 mt-1 text-center">
                Check inbox for gbncircle@gmail.com (valid for 10 minutes)
              </p>
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">New Password</label>
              <input
                required
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Confirm New Password</label>
              <input
                required
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-white focus:border-[#c5a059] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#c5a059] hover:bg-[#d4af37] text-black font-semibold text-xs tracking-wider uppercase rounded transition-all disabled:opacity-50 mt-2 shadow-md flex items-center justify-center gap-2"
            >
              <KeyRound size={14} />
              {loading ? 'Updating Password...' : 'Verify OTP & Reset Password'}
            </button>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setView('FORGOT_REQUEST');
                }}
                className="text-[11px] text-slate-400 hover:text-white transition"
              >
                Resend Code
              </button>
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setView('LOGIN');
                }}
                className="text-[11px] text-slate-400 hover:text-white transition"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}