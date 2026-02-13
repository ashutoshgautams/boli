import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  const sections = [
    { id: 'collection', title: 'Information We Collect' },
    { id: 'usage', title: 'How We Use Your Information' },
    { id: 'security', title: 'Data Security' },
    { id: 'rights', title: 'Your Rights' },
    { id: 'contact', title: 'Contact Us' }
  ];

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="border-b border-warm-200 pb-8 mb-12">
          <h1 className="text-3xl font-semibold text-primary-900 mb-3">Privacy Policy</h1>
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
          <section id="collection" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">01</span>
              <h2 className="text-xl font-semibold text-primary-900">Information We Collect</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                When you create an account or use Boli, we may collect your name, email address, and learning preferences. We also collect usage data such as session activity, progress metrics, and device information to improve your experience.
              </p>
            </div>
          </section>

          <div className="border-t border-warm-200"></div>

          <section id="usage" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">02</span>
              <h2 className="text-xl font-semibold text-primary-900">How We Use Your Information</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                We use the information we collect to provide and improve our services, personalize your learning experience, communicate updates, and ensure platform security. We do not sell your personal data to third parties.
              </p>
            </div>
          </section>

          <div className="border-t border-warm-200"></div>

          <section id="security" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">03</span>
              <h2 className="text-xl font-semibold text-primary-900">Data Security</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                We implement industry-standard security measures to protect your personal information. All data is encrypted in transit and at rest.
              </p>
            </div>
          </section>

          <div className="border-t border-warm-200"></div>

          <section id="rights" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">04</span>
              <h2 className="text-xl font-semibold text-primary-900">Your Rights</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                You can access, update, or delete your personal information at any time through your account settings. You may also contact us to exercise your data rights under applicable laws.
              </p>
            </div>
          </section>

          <div className="border-t border-warm-200"></div>

          <section id="contact" className="scroll-mt-20">
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-primary-600 font-medium text-sm">05</span>
              <h2 className="text-xl font-semibold text-primary-900">Contact Us</h2>
            </div>
            <div className="pl-10">
              <p className="text-warm-700 leading-relaxed">
                If you have questions about this privacy policy, please reach out to us at{' '}
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
            This policy is effective as of the date stated above and will remain in effect except with respect to any changes in its provisions in the future.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
