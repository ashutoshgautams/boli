'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown, BookOpen, Target, Users, Building2, FileText, Play, MessageSquare, Calendar, TrendingUp } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        //scale: 0,
        //rotation: -180,
        //opacity: 0,
        //duration: 0.8,
        //ease: 'back.out(1.7)',
        //delay: 0.3,
      });

      gsap.from('.nav-item', {
        //y: -20,
        //opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.5,
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const handleLogoHover = () => {
    gsap.to(logoRef.current?.querySelector('svg') as SVGSVGElement, {
      rotation: 360,
      duration: 0.6,
      ease: 'power2.inOut',
    });
  };

  const handleMouseEnter = (dropdown: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const navigationItems = {
    learn: {
      label: 'Learn',
      icon: BookOpen,
      items: [
        { 
          icon: Play, 
          title: 'Self-Paced Courses', 
          description: 'Learn at your own pace with interactive content',
          href: '/learn/courses'
        },
        { 
          icon: FileText, 
          title: 'Learning Materials', 
          description: 'Access comprehensive study resources',
          href: '/learn/materials'
        },
      ]
    },
    practice: {
      label: 'Practice',
      icon: Target,
      items: [
        { 
          icon: TrendingUp, 
          title: 'Interview Preparation', 
          description: 'Placement guidance and career path planning',
          href: '/practice/interview-prep'
        },
        { 
          icon: MessageSquare, 
          title: 'Speaking Club', 
          description: 'Improve fluency through live practice sessions',
          href: '/practice/speaking-club'
        },
      ]
    },
    coaching: {
      label: 'Coaching',
      icon: Users,
      items: [
        { 
          icon: Users, 
          title: '1:1 Sessions', 
          description: 'Personalized coaching with expert tutors',
          href: '/coaching/one-on-one'
        },
        { 
          icon: Calendar, 
          title: 'Group Sessions', 
          description: 'Interactive 1:15 group coaching classes',
          href: '/coaching/group'
        },
      ]
    },
  };

  return (
    <header 
      ref={headerRef}
      className="sticky top-0 z-50 bg-white/98 backdrop-blur-lg border-b border-neutral-200 shadow-sm"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group"
            onMouseEnter={handleLogoHover}
          >
            <div 
              ref={logoRef}
              className="w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110"
            >
              <svg 
                className="w-full h-full"
                viewBox="0 0 205.979 205.979" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <ellipse 
                    className="fill-primary-600"
                    cx="102.989" 
                    cy="120.685" 
                    rx="55.332" 
                    ry="76.156"
                  />
                  <path 
                    className="fill-primary-700"
                    d="M39.163,124.124c0,23.721,8.021,45.026,20.76,59.7c16.632-12.247,28.149-38.68,28.149-69.33 c0-24.012-7.071-45.434-18.13-59.479C51.529,68.943,39.163,94.67,39.163,124.124z"
                  />
                  <path 
                    className="fill-primary-700"
                    d="M166.816,124.124c0,23.721-8.021,45.026-20.76,59.7c-16.633-12.247-28.149-38.68-28.149-69.33 c0-24.012,7.071-45.434,18.13-59.479C154.45,68.943,166.816,94.67,166.816,124.124z"
                  />
                  <g>
                    <path className="fill-yellow-500" d="M81.309,201.876c0,2.266-1.837,4.103-4.103,4.103l0,0c-2.266,0-4.102-1.837-4.102-4.103v-15.291 c0-2.266,1.837-4.103,4.102-4.103l0,0c2.266,0,4.103,1.837,4.103,4.103V201.876z"/>
                    <path className="fill-yellow-500" d="M97.719,201.876c0,2.266-1.837,4.103-4.103,4.103l0,0c-2.266,0-4.102-1.837-4.102-4.103v-15.291 c0-2.266,1.837-4.103,4.102-4.103l0,0c2.266,0,4.103,1.837,4.103,4.103V201.876z"/>
                    <path className="fill-yellow-500" d="M89.514,201.876c0,2.266-1.837,4.103-4.103,4.103l0,0c-2.266,0-4.103-1.837-4.103-4.103v-15.291 c0-2.266,1.837-4.103,4.103-4.103l0,0c2.266,0,4.103,1.837,4.103,4.103V201.876z"/>
                    <path className="fill-yellow-500" d="M116.464,201.876c0,2.266-1.837,4.103-4.103,4.103l0,0c-2.266,0-4.103-1.837-4.103-4.103 v-15.291c0-2.266,1.837-4.103,4.103-4.103l0,0c2.266,0,4.103,1.837,4.103,4.103V201.876z"/>
                    <path className="fill-yellow-500" d="M132.875,201.876c0,2.266-1.837,4.103-4.103,4.103l0,0c-2.266,0-4.102-1.837-4.102-4.103 v-15.291c0-2.266,1.837-4.103,4.102-4.103l0,0c2.266,0,4.103,1.837,4.103,4.103V201.876z"/>
                    <path className="fill-yellow-500" d="M124.669,201.876c0,2.266-1.836,4.103-4.103,4.103l0,0c-2.266,0-4.103-1.837-4.103-4.103 v-15.291c0-2.266,1.837-4.103,4.103-4.103l0,0c2.267,0,4.103,1.837,4.103,4.103V201.876z"/>
                  </g>
                  <g>
                    <circle className="fill-primary-800" cx="73.543" cy="46.063" r="31.668"/>
                    <circle className="fill-primary-600" cx="73.543" cy="46.063" r="21.161"/>
                    <circle className="fill-yellow-400" cx="73.543" cy="46.063" r="15.448"/>
                    <circle className="fill-primary-900" cx="73.543" cy="46.063" r="8.651"/>
                    <circle className="fill-white" cx="67.007" cy="40.388" r="3.534"/>
                  </g>
                  <g>
                    <circle className="fill-primary-800" cx="132.435" cy="46.063" r="31.668"/>
                    <circle className="fill-primary-600" cx="132.436" cy="46.063" r="21.161"/>
                    <circle className="fill-yellow-400" cx="132.436" cy="46.063" r="15.449"/>
                    <circle className="fill-primary-900" cx="132.436" cy="46.063" r="8.651"/>
                    <circle className="fill-white" cx="125.899" cy="40.388" r="3.534"/>
                  </g>
                  <path className="fill-yellow-600" d="M102.989,57.07c-5.427,0-10.543,7.831-10.543,7.831c0,11.885,10.543,19.171,10.543,19.171 s10.544-7.222,10.544-19.107C113.533,64.965,108.417,57.07,102.989,57.07z"/>
                  <path className="fill-primary-700" d="M102.989,35.192c0,0-6.918-18.179-20.795-18.179c-6.079,0-14.113,0-18.721,0 c-4.607,0-15.816-6.38-15.816-17.012c0,0,28.221,0,36.491,0C96.199,0.001,102.989,15.123,102.989,35.192z"/>
                  <path className="fill-primary-700" d="M102.989,35.192c0,0,6.919-18.179,20.795-18.179c6.079,0,14.113,0,18.721,0 c4.607,0,15.816-6.38,15.816-17.012c0,0-28.222,0-36.491,0C109.78,0.001,102.989,15.123,102.989,35.192z"/>
                </g>
              </svg>
            </div>
            <span className="text-2xl font-semibold tracking-tight text-neutral-900">
              Boli
            </span>
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {Object.entries(navigationItems).map(([key, nav]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="nav-item flex items-center gap-1.5 px-3 py-2 text-[14px] font-medium text-neutral-700 hover:text-neutral-900 transition-colors rounded-lg hover:bg-neutral-50"
                >
                  <nav.icon className="w-4 h-4" />
                  {nav.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === key && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    {nav.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors group"
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                          <item.icon className="w-4.5 h-4.5 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-neutral-900 mb-0.5 tracking-tight">
                            {item.title}
                          </div>
                          <div className="text-xs text-neutral-600 leading-relaxed">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* For Business Link */}
            <Link
              href="/business"
              className="nav-item flex items-center gap-1.5 px-3 py-2 text-[14px] font-medium text-neutral-700 hover:text-neutral-900 transition-colors rounded-lg hover:bg-neutral-50"
            >
              <Building2 className="w-4 h-4" />
              For Business
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="nav-item text-[14px] font-medium text-neutral-700 hover:text-neutral-900 transition-colors px-3 py-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="nav-item px-4 py-2 bg-primary-600 text-white text-[14px] font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
            >
              Start now - it&apos;s free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col gap-1">
              {/* Learn Section */}
              <div className="mb-3">
                <div className="px-3 py-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Learn
                </div>
                <Link href="/learn/courses" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <Play className="w-4 h-4 text-primary-600" />
                  Self-Paced Courses
                </Link>
                <Link href="/learn/materials" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <FileText className="w-4 h-4 text-primary-600" />
                  Learning Materials
                </Link>
              </div>

              {/* Practice Section */}
              <div className="mb-3">
                <div className="px-3 py-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Practice
                </div>
                <Link href="/practice/interview-prep" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <TrendingUp className="w-4 h-4 text-primary-600" />
                  Interview Preparation
                </Link>
                <Link href="/practice/speaking-club" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <MessageSquare className="w-4 h-4 text-primary-600" />
                  Speaking Club
                </Link>
              </div>

              {/* Coaching Section */}
              <div className="mb-3">
                <div className="px-3 py-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                  Coaching
                </div>
                <Link href="/coaching/one-on-one" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <Users className="w-4 h-4 text-primary-600" />
                  1:1 Sessions
                </Link>
                <Link href="/coaching/group" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <Calendar className="w-4 h-4 text-primary-600" />
                  Group Sessions
                </Link>
              </div>

              {/* For Business */}
              <Link href="/business" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors mb-3" onClick={() => setMobileMenuOpen(false)}>
                <Building2 className="w-4 h-4 text-primary-600" />
                For Business
              </Link>

              {/* Auth Buttons */}
              <div className="pt-3 border-t border-neutral-200 flex flex-col gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50 rounded-lg transition-colors text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get started — free
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
