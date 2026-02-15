'use client';

import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User, Bell, Lock, LogOut, Save, CheckCircle2 } from 'lucide-react';

export default function DashboardSettingsPage() {
  const { data: session, update } = useSession();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications'>('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: (session?.user as { phone?: string })?.phone || '',
  });

  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    weeklyProgress: true,
    newCourses: true,
    promotions: false,
  });

  const handleSaveProfile = async () => {
    // In production, this would call an API to update the user
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveNotifications = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-900 mb-1">Settings</h1>
        <p className="text-warm-600 text-sm">Manage your account</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-warm-100 p-1 rounded-lg w-fit">
        {[
          { key: 'profile' as const, label: 'Profile', icon: User },
          { key: 'notifications' as const, label: 'Notifications', icon: Bell },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key ? 'bg-white text-primary-900 shadow-sm' : 'text-warm-600 hover:text-primary-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Success banner */}
      {saved && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-sm text-green-700">
          <CheckCircle2 className="w-4 h-4" /> Settings saved successfully
        </div>
      )}

      {/* Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-xl border border-warm-200 p-6">
          <h2 className="font-semibold text-primary-900 mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-primary-900 mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-900 mb-1">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-2.5 border border-warm-200 rounded-lg bg-warm-50 text-warm-500 text-sm cursor-not-allowed"
              />
              <p className="text-xs text-warm-500 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-900 mb-1">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500 text-sm"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <button onClick={handleSaveProfile} className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all text-sm flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>

          {/* Danger zone */}
          <div className="mt-8 pt-6 border-t border-warm-200">
            <h3 className="font-semibold text-primary-900 mb-4">Account</h3>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-6 py-2.5 bg-white border border-warm-200 text-warm-700 rounded-lg font-medium hover:bg-warm-50 transition-all text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-xl border border-warm-200 p-6">
          <h2 className="font-semibold text-primary-900 mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            {[
              { key: 'sessionReminders', label: 'Session reminders', desc: 'Get reminders before your booked sessions' },
              { key: 'weeklyProgress', label: 'Weekly progress report', desc: 'Receive a summary of your learning progress' },
              { key: 'newCourses', label: 'New courses & materials', desc: 'Be notified when new content is available' },
              { key: 'promotions', label: 'Offers & promotions', desc: 'Get notified about special deals' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium text-primary-900">{item.label}</div>
                  <div className="text-xs text-warm-500">{item.desc}</div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    notifications[item.key as keyof typeof notifications] ? 'bg-primary-600' : 'bg-warm-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
            <button onClick={handleSaveNotifications} className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all text-sm flex items-center gap-2 mt-4">
              <Save className="w-4 h-4" /> Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
