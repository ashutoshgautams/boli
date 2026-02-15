'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Phone, Mail, Lock, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import BoliLogo from '../components/Bolilogo';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setStep(2);
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create user via API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password,
          phone: phoneNumber,
          name: email.split('@')[0],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create account');
        setIsLoading(false);
        return;
      }

      // 2. Auto sign-in after signup
      const signInResult = await signIn('credentials', {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        // Account created but auto-login failed — redirect to login
        router.push('/login?registered=true');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

const handleGoogleSignup = async () => {
  setIsLoading(true);
  
  // Store phone number before redirecting
  if (phoneNumber && step === 2) {
    localStorage.setItem('pendingPhone', phoneNumber.replace(/\D/g, ''));
  }
  
  try {
    await signIn('google', { callbackUrl: '/dashboard' });
  } catch {
    setError('Failed to sign up with Google.');
    setIsLoading(false);
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <BoliLogo size={44} />
          <span className="text-2xl font-bold text-primary-900">Boli</span>
        </Link>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-primary-600' : 'text-warm-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step >= 1 ? 'bg-primary-600 text-white' : 'bg-warm-200 text-warm-600'
            }`}>
              {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
            </div>
            <span className="text-sm font-medium hidden sm:inline">Phone</span>
          </div>
          <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-primary-600' : 'bg-warm-200'}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-primary-600' : 'text-warm-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              step >= 2 ? 'bg-primary-600 text-white' : 'bg-warm-200 text-warm-600'
            }`}>
              2
            </div>
            <span className="text-sm font-medium hidden sm:inline">Account</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">
            {step === 1 ? 'Create your account' : 'Complete your profile'}
          </h1>
          <p className="text-warm-600">
            {step === 1 ? 'Start your English learning journey today' : 'Choose how you want to sign up'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Step 1: Phone */}
        {step === 1 && (
          <form onSubmit={handlePhoneSubmit} className="space-y-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-primary-900 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-500 pl-9" />
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="auth-input pl-14"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  disabled={isLoading}
                  autoComplete="tel"
                />
              </div>
              <p className="text-xs text-warm-600 mt-2">
                We&apos;ll use this for session reminders and support
              </p>
            </div>

            <button type="submit" disabled={isLoading} className="auth-button">
              {isLoading ? <div className="spinner" /> : (
                <>Continue <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        )}

        {/* Step 2: Email/Password or Google */}
        {step === 2 && (
          <>
            <form onSubmit={handleEmailSignup} className="space-y-5 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-primary-900 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-500 pl-9" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input pl-14"
                    placeholder="your@email.com"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-primary-900 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-500 pl-9" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input pl-14"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-primary-900 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-500 pl-9" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="auth-input pl-14"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-warm-300 text-primary-600 focus:ring-primary-500" />
                <label htmlFor="terms" className="text-sm text-warm-700">
                  I agree to the{' '}
                  <Link href="/terms" className="auth-link">Terms</Link> and{' '}
                  <Link href="/privacy" className="auth-link">Privacy Policy</Link>
                </label>
              </div>

              <button type="submit" disabled={isLoading} className="auth-button">
                {isLoading ? <div className="spinner" /> : (
                  <>Create Account <ArrowRight className="w-5 h-5" /></>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-warm-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-warm-600">Or continue with</span>
              </div>
            </div>

            {/* Google */}
            <button onClick={handleGoogleSignup} disabled={isLoading} className="social-button">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* Back */}
            <button
              onClick={() => { setStep(1); setError(''); }}
              className="w-full mt-4 py-3 text-warm-700 hover:text-primary-600 font-medium transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to phone number
            </button>
          </>
        )}

        {/* Login */}
        <p className="text-center text-sm text-warm-600 mt-8">
          Already have an account?{' '}
          <Link href="/login" className="auth-link">Log in</Link>
        </p>

        {/* Back to home */}
        <Link href="/" className="mt-4 text-center block text-sm text-warm-500 hover:text-primary-600 transition-colors flex items-center justify-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to home
        </Link>
      </div>
    </div>
  );
}
