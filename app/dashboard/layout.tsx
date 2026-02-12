'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Users, 
  Target, 
  FileText, 
  Video,
  Calendar,
  Trophy,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Learn',
    icon: BookOpen,
    children: [
      { name: 'Courses', href: '/dashboard/courses', icon: Video },
      { name: 'Materials', href: '/dashboard/materials', icon: FileText },
    ],
  },
  {
    name: 'Practice',
    icon: Target,
    children: [
      { name: 'Speaking Club', href: '/dashboard/speaking-club', icon: MessageSquare },
      { name: 'Interview Prep', href: '/dashboard/interview-prep', icon: Users },
    ],
  },
  {
    name: 'Coaching',
    icon: Users,
    children: [
      { name: '1:1 Sessions', href: '/dashboard/one-on-one', icon: Users },
      { name: 'Group Sessions', href: '/dashboard/group', icon: Calendar },
    ],
  },
  {
    name: 'My Progress',
    href: '/dashboard/progress',
    icon: Trophy,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['Learn', 'Practice', 'Coaching']);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isParentActive = (children: unknown[]) => 
    children?.some(child => pathname === (child as { href: string }).href);

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-warm-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-warm-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-warm-200">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
                B
              </div>
              <span className="text-xl font-bold text-primary-900">Boli</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-warm-600 hover:text-primary-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  // Parent with children
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.name)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isParentActive(item.children)
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-warm-700 hover:bg-warm-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          expandedItems.includes(item.name) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedItems.includes(item.name) && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              isActive(child.href)
                                ? 'bg-primary-600 text-white'
                                : 'text-warm-700 hover:bg-warm-100'
                            }`}
                          >
                            <child.icon className="w-4 h-4" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Single item
                  <Link
                    href={item.href!}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href!)
                        ? 'bg-primary-600 text-white'
                        : 'text-warm-700 hover:bg-warm-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-warm-200">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-warm-100 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-primary-900">John Doe</div>
                  <div className="text-xs text-warm-600">Pro Plan</div>
                </div>
                <ChevronDown className="w-4 h-4 text-warm-600" />
              </button>

              {userMenuOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-warm-200 rounded-lg shadow-lg overflow-hidden">
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-warm-50 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-warm-600" />
                    <span className="text-sm text-warm-700">Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      // TODO: Implement logout
                      window.location.href = '/';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-warm-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-warm-600" />
                    <span className="text-sm text-warm-700">Log out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-warm-200 h-16">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-warm-600 hover:text-primary-600"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-500" />
                <input
                  type="text"
                  placeholder="Search courses, sessions..."
                  className="w-full pl-10 pr-4 py-2 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-warm-600 hover:text-primary-600 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
