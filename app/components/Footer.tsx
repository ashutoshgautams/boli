import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'Courses', href: '/courses' },
      { label: 'Speaking Clubs', href: '/speaking-clubs' },
      { label: 'Interview Prep', href: '/interview-prep' },
      { label: 'Coaching', href: '/coaching' },
      { label: 'Pricing', href: '/pricing' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Contact', href: '/contact' },
    ],
    resources: [
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Success Stories', href: '/stories' },
      { label: 'Free Resources', href: '/resources' },
      { label: 'English Test', href: '/test' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Refund Policy', href: '/refunds' },
    ],
  };

  return (
    <footer className="bg-warm-100 border-t border-warm-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                B
              </div>
              <span className="text-xl font-bold text-primary-900">Boli</span>
            </Link>
            <p className="text-warm-600 mb-6 max-w-xs">
              Master English through conversation. Learn, practice, and speak with confidence.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-warm-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-warm-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-warm-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-warm-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-warm-600 hover:text-primary-600 hover:bg-primary-50 transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-primary-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-600 hover:text-primary-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-primary-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-600 hover:text-primary-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-primary-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-600 hover:text-primary-600 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-primary-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-warm-600 hover:text-primary-600 transition-colors">
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
          <div className="flex gap-6 text-sm text-warm-600">
            <span>Made with ❤️ in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
