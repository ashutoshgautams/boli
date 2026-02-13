import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
  const sections = [
    { id: 'acceptance', title: 'Acceptance of Terms' },
    { id: 'service', title: 'Description of Service' },
    { id: 'accounts', title: 'User Accounts' },
    { id: 'payments', title: 'Payments and Refunds' },
    { id: 'ip', title: 'Intellectual Property' },
    { id: 'contact', title: 'Contact' }
  ];

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="border-b border-warm-200 pb-8 mb-12">
          <h1 className="text-3xl font-semibold text-primary-900 mb-3">Terms of Service</h1>
          <p className="text-sm text-warm-500">Last updated: February 2026</p>
        </div>

        {/* Table of Contents */}
        <nav className="bg-warm-50 rounded-lg p-6 mb-12 border border-warm-200">
          <h2 className="text-sm font-semibold text-primary-900 uppercase tracking-wide mb-4">Contents</h2>
          <ol className="space-y-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a 
                  href={`#${section.id}`}
                  className="text-warm-700 hover:text-primary-600 transition-colors text-sm"
                >
                  {index + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Content Sections */}
        <div className="space-y-12">
          <section id="acceptance" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">01</span>
              <h2 className="text-xl font-semibold text-primary-900">Acceptance of Terms</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                By accessing or using Boli, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>
          </section>

          <div className="border-t border-warm-200"></div>

          <section id="service" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">02</span>
              <h2 className="text-xl font-semibold text-primary-900">Description of Service</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                Boli provides an online English learning platform featuring self-paced courses, live speaking clubs, expert coaching sessions, interview preparation, and learning materials.
              </p>
            </div>
          </section>

          <div className="border-t border-warm-200"></div>

          <section id="accounts" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">03</span>
              <h2 className="text-xl font-semibold text-primary-900">User Accounts</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate information when creating your account and keep it updated.
              </p>
            </div>
          </section>

          <div className="border-t border-warm-200"></div>

          <section id="payments" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">04</span>
              <h2 className="text-xl font-semibold text-primary-900">Payments and Refunds</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                Free accounts remain free. Paid plans are billed as described at the time of purchase. Refund requests are handled on a case-by-case basis within 7 days of purchase.
              </p>
            </div>
          </section>

          <div className="border-t border-warm-200"></div>

          <section id="ip" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">05</span>
              <h2 className="text-xl font-semibold text-primary-900">Intellectual Property</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                All content, materials, and software provided through Boli are owned by Boli or its licensors. You may not reproduce, distribute, or create derivative works without permission.
              </p>
            </div>
          </section>

          <div className="border-t border-warm-200"></div>

          <section id="contact" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">06</span>
              <h2 className="text-xl font-semibold text-primary-900">Contact</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                For questions about these terms, contact us at{' '}
                <a href="mailto:theriveracademy7@gmail.com" className="text-primary-600 hover:text-primary-700 underline">
                  theriveracademy7@gmail.com
                </a>
                .
              </p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-warm-200">
          <p className="text-sm text-warm-500">
            These terms constitute the entire agreement between you and Boli regarding the use of our services.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
