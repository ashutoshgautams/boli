'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, Clock, User } from 'lucide-react';

interface Booking {
  _id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  message: string;
  preferredTime: string;
  status: string;
  createdAt: string;
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  level: string;
  createdAt: string;
}

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<'bookings' | 'users'>('bookings');
  const [filter, setFilter] = useState('all');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, usersRes] = await Promise.all([
        fetch(`/api/bookings?key=${encodeURIComponent(key)}`),
        fetch(`/api/admin/users?key=${encodeURIComponent(key)}`),
      ]);

      if (!bookingsRes.ok || !usersRes.ok) {
        alert('Invalid admin key');
        return;
      }

      const bookingsData = await bookingsRes.json();
      const usersData = await usersRes.json();

      setBookings(bookingsData.bookings || []);
      setUsers(usersData.users || []);
      setAuthenticated(true);
    } catch {
      alert('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === 'all' ? bookings : bookings.filter((b) => b.source === filter);
  const sources = ['all', ...new Set(bookings.map((b) => b.source))];

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-sm w-full">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your admin key to view data</p>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchData()}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg mb-4 text-sm focus:outline-none focus:border-blue-500"
            placeholder="Admin key"
          />
          <button
            onClick={fetchData}
            disabled={loading || !key}
            className="w-full py-2.5 bg-gray-900 text-white rounded-lg font-medium text-sm hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Access Dashboard'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">
              {view === 'bookings' ? `${bookings.length} leads` : `${users.length} users`}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setView('bookings')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${view === 'bookings' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
              >
                Bookings
              </button>
              <button
                onClick={() => setView('users')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${view === 'users' ? 'bg-gray-900 text-white' : 'text-gray-600'}`}
              >
                Users
              </button>
            </div>
            <button onClick={fetchData} className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800">
              Refresh
            </button>
          </div>
        </div>

        {/* Bookings View */}
        {view === 'bookings' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              {sources.map((s) => {
                const count = s === 'all' ? bookings.length : bookings.filter((b) => b.source === s).length;
                return (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      filter === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-lg font-bold">{count}</div>
                    <div className="text-xs capitalize">{s === 'all' ? 'All Leads' : s.replace('-', ' ')}</div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Source</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-900">{b.name}</td>
                        <td className="px-4 py-3 text-gray-600">{b.phone}</td>
                        <td className="px-4 py-3 text-gray-600">{b.email}</td>
                        <td className="px-4 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{b.source}</span></td>
                        <td className="px-4 py-3 text-gray-500">{new Date(b.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Users View */}
        {view === 'users' && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Plan</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Level</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{u.name}</td>
                      <td className="px-4 py-3 text-gray-600">{u.email}</td>
                      <td className="px-4 py-3 text-gray-600">{u.phone || '-'}</td>
                      <td className="px-4 py-3"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs capitalize">{u.plan}</span></td>
                      <td className="px-4 py-3 text-gray-600">{u.level}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
