'use client';

import { useState } from 'react';
import { User, Bell, Lock, CreditCard, Globe, Mail, Shield, Trash2, Save } from 'lucide-react';

export default function DashboardSettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'billing'>('profile');

  // Mock user data
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    level: 'Intermediate',
    timezone: 'Asia/Kolkata',
    language: 'English'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    sessionReminders: true,
    weeklyProgress: true,
    newCourses: true,
    promotions: false
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-900 mb-2">
          Settings
        </h1>
        <p className="text-warm-600">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-warm-200 p-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary-600 text-white'
                  : 'text-warm-700 hover:bg-warm-50'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeTab === 'notifications'
                  ? 'bg-primary-600 text-white'
                  : 'text-warm-700 hover:bg-warm-50'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span className="font-medium">Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeTab === 'security'
                  ? 'bg-primary-600 text-white'
                  : 'text-warm-700 hover:bg-warm-50'
              }`}
            >
              <Lock className="w-5 h-5" />
              <span className="font-medium">Security</span>
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                activeTab === 'billing'
                  ? 'bg-primary-600 text-white'
                  : 'text-warm-700 hover:bg-warm-50'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Billing</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-warm-200 p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary-900 mb-6">Profile Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        English Level
                      </label>
                      <select
                        value={profile.level}
                        onChange={(e) => setProfile({...profile, level: e.target.value})}
                        className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-primary-900 mb-2">
                        Timezone
                      </label>
                      <select
                        value={profile.timezone}
                        onChange={(e) => setProfile({...profile, timezone: e.target.value})}
                        className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                      >
                        <option>Asia/Kolkata</option>
                        <option>Asia/Dubai</option>
                        <option>Europe/London</option>
                        <option>America/New_York</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </button>
                  <button className="px-6 py-3 bg-white border border-warm-200 text-warm-700 rounded-lg font-semibold hover:bg-warm-50 transition-all">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary-900 mb-2">Notification Preferences</h2>
                  <p className="text-warm-600">Choose how you want to receive updates</p>
                </div>

                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive updates via text messages' },
                    { key: 'sessionReminders', label: 'Session Reminders', desc: 'Get reminded before scheduled sessions' },
                    { key: 'weeklyProgress', label: 'Weekly Progress Report', desc: 'Summary of your weekly activity' },
                    { key: 'newCourses', label: 'New Courses', desc: 'Notify when new courses are available' },
                    { key: 'promotions', label: 'Promotions & Offers', desc: 'Special discounts and offers' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border border-warm-200 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-primary-900">{item.label}</h4>
                        <p className="text-sm text-warm-600">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key as keyof typeof notifications]}
                          onChange={(e) => setNotifications({
                            ...notifications,
                            [item.key]: e.target.checked
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-warm-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-warm-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary-900 mb-2">Security Settings</h2>
                  <p className="text-warm-600">Keep your account secure</p>
                </div>

                <div className="space-y-4">
                  <div className="p-6 border border-warm-200 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-primary-900 mb-1">Password</h4>
                        <p className="text-sm text-warm-600">Last changed 3 months ago</p>
                      </div>
                      <Lock className="w-5 h-5 text-warm-500" />
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all">
                      Change Password
                    </button>
                  </div>

                  <div className="p-6 border border-warm-200 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-primary-900 mb-1">Two-Factor Authentication</h4>
                        <p className="text-sm text-warm-600">Add an extra layer of security</p>
                      </div>
                      <Shield className="w-5 h-5 text-warm-500" />
                    </div>
                    <button className="px-4 py-2 bg-white border border-warm-200 text-warm-700 rounded-lg font-medium hover:bg-warm-50 transition-all">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="p-6 border border-warm-200 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-primary-900 mb-1">Connected Accounts</h4>
                        <p className="text-sm text-warm-600">Google account connected</p>
                      </div>
                      <Globe className="w-5 h-5 text-warm-500" />
                    </div>
                    <button className="px-4 py-2 bg-white border border-warm-200 text-warm-700 rounded-lg font-medium hover:bg-warm-50 transition-all">
                      Manage Connections
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Danger Zone
                  </h4>
                  <p className="text-sm text-red-700 mb-3">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-primary-900 mb-2">Billing & Subscription</h2>
                  <p className="text-warm-600">Manage your payments and subscriptions</p>
                </div>

                {/* Current Plan */}
                <div className="p-6 border-2 border-primary-600 rounded-xl bg-primary-50">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-primary-900 text-lg mb-1">Pro Plan</h4>
                      <p className="text-sm text-warm-600">Active since January 2026</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary-900 mb-4">
                    ₹999 <span className="text-sm font-normal text-warm-600">/ month</span>
                  </div>
                  <button className="px-4 py-2 bg-white border border-primary-600 text-primary-700 rounded-lg font-medium hover:bg-warm-50 transition-all">
                    Change Plan
                  </button>
                </div>

                {/* Payment History */}
                <div>
                  <h3 className="font-semibold text-primary-900 mb-4">Payment History</h3>
                  <div className="space-y-3">
                    {[
                      { date: '2026-02-01', amount: 999, status: 'Paid', invoice: '#INV-001' },
                      { date: '2026-01-01', amount: 999, status: 'Paid', invoice: '#INV-002' }
                    ].map((payment, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-warm-200 rounded-lg">
                        <div>
                          <p className="font-medium text-primary-900">{payment.invoice}</p>
                          <p className="text-sm text-warm-600">{payment.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-primary-900">₹{payment.amount}</p>
                            <span className="text-xs text-green-600">{payment.status}</span>
                          </div>
                          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Method Note */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Payments are processed during your counselling session. 
                    Our team will contact you via Google Meet or phone call to complete the payment process.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
