'use client';

import { useState, useEffect } from 'react';
import { Phone, X } from 'lucide-react';

export default function OnboardingPhone() {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pending = localStorage.getItem('pendingPhone');
    if (pending) {
      setPhone(pending);
      setShow(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (!phone || phone.replace(/\D/g, '').length < 10) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/user/update-phone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      
      if (res.ok) {
        localStorage.removeItem('pendingPhone');
        setShow(false);
      }
    } catch {
      // Silent fail
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-primary-900">Complete Your Profile</h3>
          <button onClick={() => setShow(false)} className="text-warm-500 hover:text-warm-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-warm-600 mb-4">Add your phone number for session reminders</p>
        <div className="relative mb-4">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-500" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full pl-14 pr-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !phone}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Phone Number'}
        </button>
      </div>
    </div>
  );
}
