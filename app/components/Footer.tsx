import Link from 'next/link';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    learn: [
      { label: 'Self-Paced Courses', href: '/learn/courses' },
      { label: 'Learning Materials', href: '/learn/materials' },
    ],
    practice: [
      { label: 'Speaking Club', href: '/practice/speaking-club' },
      { label: 'Interview Prep', href: '/practice/interview-prep' },
    ],
    coaching: [
      { label: '1:1 Sessions', href: '/coaching/one-on-one' },
      { label: 'Group Sessions', href: '/coaching/group' },
    ],
    company: [
      { label: 'For Business', href: '/business' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-warm-100 border-t border-warm-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                B
              </div>
              <span className="text-xl font-bold text-primary-900">Boli</span>
            </Link>
            <p className="text-warm-600 mb-8 max-w-xs leading-relaxed pb-6">
              Master English through conversation. Learn, practice, and speak with confidence.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-warm-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-warm-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-warm-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-semibold text-primary-900 mb-4 pb-6">Learn</h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-600 hover:text-primary-600 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice */}
          <div>
            <h3 className="font-semibold text-primary-900 mb-4 pb-6">Practice</h3>
            <ul className="space-y-3">
              {footerLinks.practice.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-600 hover:text-primary-600 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coaching */}
          <div>
            <h3 className="font-semibold text-primary-900 mb-4 pb-6">Coaching</h3>
            <ul className="space-y-3">
              {footerLinks.coaching.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-600 hover:text-primary-600 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-primary-900 mb-4 pb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-600 hover:text-primary-600 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-warm-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-warm-600 text-sm">
            © {currentYear} Boli. All rights reserved.
          </p>
          <p className="text-warm-600 text-sm">
            Made with ❤️ in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
