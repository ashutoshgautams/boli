'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard, BookOpen, MessageSquare, Users, Target,
  FileText, Calendar, Trophy, Settings, LogOut, Menu, X, ChevronDown,
} from 'lucide-react';
import BoliLogo from './../components/Bolilogo';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    name: 'Learn', icon: BookOpen,
    children: [
      { name: 'Courses', href: '/dashboard/courses', icon: BookOpen },
      { name: 'Materials', href: '/dashboard/materials', icon: FileText },
      { name: 'Vocabulary Challenge', href: '/dashboard/vocabulary', icon: Target },
    ],
  },
  {
    name: 'Practice', icon: Target,
    children: [
      { name: 'Speaking Club', href: '/dashboard/speaking-club', icon: MessageSquare },
      { name: 'Interview Prep', href: '/dashboard/interview-prep', icon: Target },
    ],
  },
  {
    name: 'Coaching', icon: Users,
    children: [
      { name: '1:1 Sessions', href: '/dashboard/one-on-one', icon: Users },
      { name: 'Group Sessions', href: '/dashboard/group', icon: Calendar },
    ],
  },
  { name: 'My Progress', href: '/dashboard/progress', icon: Trophy },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const mobileNav = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Learn', href: '/dashboard/courses', icon: BookOpen },
  { name: 'Practice', href: '/dashboard/speaking-club', icon: Target },
  { name: 'Progress', href: '/dashboard/progress', icon: Trophy },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Learn', 'Practice', 'Coaching']);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => { if (status === 'unauthenticated') router.push('/login?callbackUrl=/dashboard'); }, [status, router]);

  const toggleExpanded = (name: string) => setExpandedItems((p) => p.includes(name) ? p.filter((i) => i !== name) : [...p, name]);
  const isActive = (href: string) => pathname === href;
  const isParentActive = (ch: { href: string }[]) => ch?.some((c) => pathname === c.href);
  const handleLogout = async () => { await signOut({ callbackUrl: '/' }); };

  const userName = session?.user?.name || 'User';
  const userEmail = session?.user?.email || '';
  const userInitials = userName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  const userPlan = (session?.user as { plan?: string })?.plan || 'free';

  if (status === 'loading') return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center">
      <div className="text-center"><BoliLogo size={48} className="mx-auto mb-4 animate-pulse" /><p className="text-warm-600 text-sm">Loading...</p></div>
    </div>
  );
  if (status === 'unauthenticated') return null;

  return (
    <div className="min-h-screen bg-warm-50">
      {sidebarOpen && <div className="fixed inset-0 bg-warm-900/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-warm-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-warm-200">
            <Link href="/dashboard" className="flex items-center gap-2"><BoliLogo size={32} /><span className="text-xl font-bold text-primary-900">Boli</span></Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 text-warm-600 hover:text-primary-600"><X className="w-5 h-5" /></button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button onClick={() => toggleExpanded(item.name)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isParentActive(item.children) ? 'bg-primary-50 text-primary-700' : 'text-warm-700 hover:bg-warm-100'}`}>
                      <div className="flex items-center gap-3"><item.icon className="w-5 h-5" />{item.name}</div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedItems.includes(item.name) ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedItems.includes(item.name) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link key={child.name} href={child.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(child.href) ? 'bg-primary-600 text-white' : 'text-warm-700 hover:bg-warm-100'}`}>
                            <child.icon className="w-4 h-4" />{child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href!} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(item.href!) ? 'bg-primary-600 text-white' : 'text-warm-700 hover:bg-warm-100'}`}>
                    <item.icon className="w-5 h-5" />{item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-warm-200">
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-warm-100 transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {session?.user?.image ? <img src={session.user.image} alt="" className="w-10 h-10 rounded-full object-cover" /> : userInitials}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-semibold text-primary-900 truncate">{userName}</div>
                  <div className="text-xs text-warm-600 capitalize">{userPlan} Plan</div>
                </div>
                <ChevronDown className="w-4 h-4 text-warm-600 flex-shrink-0" />
              </button>
              {userMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-warm-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-warm-200">
                    <p className="text-sm font-medium text-primary-900 truncate">{userName}</p>
                    <p className="text-xs text-warm-500 truncate">{userEmail}</p>
                  </div>
                  <Link href="/dashboard/settings" onClick={() => { setUserMenuOpen(false); setSidebarOpen(false); }} className="flex items-center gap-3 px-4 py-3 hover:bg-warm-50 transition-colors">
                    <Settings className="w-4 h-4 text-warm-600" /><span className="text-sm text-warm-700">Settings</span>
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-warm-50 transition-colors text-left">
                    <LogOut className="w-4 h-4 text-warm-600" /><span className="text-sm text-warm-700">Log out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="lg:pl-72 pb-20 lg:pb-0">
        <header className="sticky top-0 z-30 bg-white border-b border-warm-200 h-14 lg:h-16">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <button onClick={() => setSidebarOpen(true)} className="p-1.5 text-warm-600 hover:text-primary-600"><Menu className="w-6 h-6" /></button>
              <Link href="/dashboard" className="flex items-center gap-1.5"><BoliLogo size={28} /><span className="text-lg font-bold text-primary-900">Boli</span></Link>
            </div>
            <div className="hidden lg:block flex-1" />
            <div className="lg:hidden w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
              {session?.user?.image ? <img src={session.user.image} alt="" className="w-8 h-8 rounded-full object-cover" /> : userInitials}
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-warm-200 lg:hidden safe-bottom">
        <div className="flex items-center justify-around h-16">
          {mobileNav.map((item) => {
            const active = isActive(item.href) || (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'));
            return (
              <Link key={item.name} href={item.href} className={`flex flex-col items-center justify-center gap-0.5 w-full h-full transition-colors ${active ? 'text-primary-600' : 'text-warm-500'}`}>
                <item.icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
