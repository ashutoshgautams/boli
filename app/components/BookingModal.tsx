'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { X, Phone, Mail, User, Calendar, CheckCircle2, Clock } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
  title?: string;
}

export default function BookingModal({ isOpen, onClose, source, title }: BookingModalProps) {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '',
    preferredTime: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.phone) {
      setError('Name and phone number are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-primary-900 mb-2">Booking Confirmed!</h3>
          <p className="text-warm-600 mb-6">
            Our counsellor will call you within 24 hours to schedule your free session.
          </p>
          <button onClick={onClose} className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all">
            Got it
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="p-6 border-b border-warm-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-primary-900">
                {title || 'Book Free Counselling'}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-warm-500 line-through">₹999</span>
                <span className="text-sm font-bold text-green-600">FREE</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Limited time</span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-warm-100 rounded-lg transition-colors">
              <X className="w-5 h-5 text-warm-600" />
            </button>
          </div>
        </div>

        {/* What you get */}
        <div className="px-6 pt-4">
          <div className="bg-primary-50 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-primary-900 mb-2">What you get:</p>
            <div className="space-y-1.5 text-sm text-primary-800">
              {['30-min 1:1 call with expert counsellor', 'Personalized learning roadmap', 'Level assessment & goal setting', 'Exclusive discount on programs'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-600 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-primary-900 mb-1">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
                placeholder="Your full name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-900 mb-1">Phone Number *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-900 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-900 mb-1">Preferred Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <select
                value={form.preferredTime}
                onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm appearance-none bg-white"
              >
                <option value="">Select a time slot</option>
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 4 PM)</option>
                <option>Evening (4 PM - 8 PM)</option>
                <option>Weekend</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-900 mb-1">Anything specific? (optional)</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2.5 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
              rows={2}
              placeholder="Tell us about your goals..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Calendar className="w-4 h-4" />
                Book My Free Session
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
