import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Building2, Users, TrendingUp, CheckCircle2, Target, Globe, Award } from 'lucide-react';

export default function BusinessPage() {
  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Boost Team Performance',
      description: 'Improve communication efficiency and reduce misunderstandings in the workplace'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Readiness',
      description: 'Prepare your team for international clients and global expansion'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Customized Programs',
      description: 'Tailored curriculum based on your industry and team needs'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Track ROI',
      description: 'Detailed analytics and progress reports to measure improvement'
    }
  ];

  const solutions = [
    {
      title: 'Corporate Training',
      description: 'Comprehensive English programs for teams of any size',
      features: [
        'Industry-specific vocabulary and scenarios',
        'Flexible scheduling (on-site or online)',
        'Customized curriculum',
        'Progress tracking dashboard',
        'Dedicated account manager',
        'Completion certificates'
      ],
      bestFor: 'Teams of 10+ employees'
    },
    {
      title: 'Executive Coaching',
      description: 'One-on-one coaching for leadership and C-suite executives',
      features: [
        'Presentation and public speaking',
        'Negotiation and persuasion',
        'Cross-cultural communication',
        'Email and report writing',
        'Accent reduction',
        'Flexible scheduling'
      ],
      bestFor: 'Senior leadership and managers'
    },
    {
      title: 'Interview Preparation',
      description: 'Help your HR team conduct better English interviews',
      features: [
        'Mock interviews with candidates',
        'Assessment tools and frameworks',
        'HR team training',
        'Question bank and resources',
        'Scoring guidelines',
        'Video interview analysis'
      ],
      bestFor: 'Hiring teams and recruiters'
    }
  ];

  const industries = [
    'Information Technology',
    'Banking & Finance',
    'Healthcare',
    'E-commerce',
    'Consulting',
    'Manufacturing',
    'Hospitality',
    'Education'
  ];

  const testimonials = [
    {
      quote: "Our team's communication improved dramatically. Client presentations are more confident and professional now.",
      company: "Tech Solutions Pvt Ltd",
      industry: "IT Services",
      size: "150+ employees",
      improvement: "40% improvement in communication scores"
    },
    {
      quote: "The customized program for our finance team was exactly what we needed. ROI was visible within 3 months.",
      company: "FinCorp India",
      industry: "Banking",
      size: "80+ employees",
      improvement: "25% reduction in client escalations"
    },
    {
      quote: "Executive coaching helped our leadership team confidently handle international partnerships.",
      company: "Global Traders Inc",
      industry: "E-commerce",
      size: "200+ employees",
      improvement: "3 new international deals closed"
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-warm-50 via-white to-warm-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-primary-700" />
            <span className="text-sm font-medium text-primary-700">Trusted by 500+ Companies</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
            English Training for Your Team
          </h1>
          
          <p className="text-xl text-warm-600 mb-8 max-w-2xl mx-auto">
            Empower your workforce with professional English skills. Customized corporate training programs that deliver measurable results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#contact"
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Request Demo
            </Link>
            <Link
              href="#solutions"
              className="px-8 py-4 bg-white text-primary-700 border-2 border-primary-200 rounded-xl font-semibold text-lg hover:bg-warm-50 transition-all"
            >
              Explore Solutions
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-warm-600">Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">25,000+</div>
              <div className="text-sm text-warm-600">Employees Trained</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">92%</div>
              <div className="text-sm text-warm-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Why Companies Choose Boli
            </h2>
            <p className="text-xl text-warm-600">
              Investing in your team&apos;s English skills pays dividends
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-warm-600 text-sm">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Solutions for Every Need
            </h2>
            <p className="text-xl text-warm-600">
              Flexible programs designed for modern businesses
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-200 p-8 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-primary-900 mb-3">
                  {solution.title}
                </h3>
                
                <p className="text-warm-600 mb-6">
                  {solution.description}
                </p>
                
                <div className="mb-6">
                  <div className="text-sm font-semibold text-primary-900 mb-3">
                    Key Features:
                  </div>
                  <ul className="space-y-2">
                    {solution.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-start gap-2 text-warm-700">
                        <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-warm-200">
                  <div className="text-xs font-medium text-warm-600 mb-2">Best For:</div>
                  <div className="text-sm font-semibold text-primary-700">{solution.bestFor}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Serving Multiple Industries
            </h2>
            <p className="text-xl text-warm-600">
              Industry-specific training programs tailored to your sector
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {industries.map((industry, idx) => (
              <div
                key={idx}
                className="bg-white border border-warm-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-primary-300 transition-all"
              >
                <div className="font-semibold text-primary-900">{industry}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              What Companies Say
            </h2>
            <p className="text-xl text-warm-600">
              Real results from real businesses
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white border border-warm-200 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <p className="text-warm-800 mb-6 leading-relaxed italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                
                <div className="mb-4">
                  <div className="font-semibold text-primary-900 mb-1">
                    {testimonial.company}
                  </div>
                  <div className="text-sm text-warm-600">
                    {testimonial.industry} • {testimonial.size}
                  </div>
                </div>
                
                <div className="pt-4 border-t border-warm-200">
                  <div className="text-sm font-semibold text-primary-600">
                    {testimonial.improvement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Simple Implementation Process
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: '1', title: 'Consultation', desc: 'Discuss your goals and team needs' },
              { step: '2', title: 'Assessment', desc: 'Evaluate current English proficiency' },
              { step: '3', title: 'Customize', desc: 'Design program for your industry' },
              { step: '4', title: 'Train', desc: 'Launch training with your team' },
              { step: '5', title: 'Track', desc: 'Monitor progress and ROI' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-primary-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-warm-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-warm-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Get Started Today
            </h2>
            <p className="text-xl text-warm-600">
              Schedule a free consultation to discuss your team&apos;s needs
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-warm-200 p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Team Size *
                  </label>
                  <select className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500">
                    <option>Select size</option>
                    <option>1-10 employees</option>
                    <option>11-50 employees</option>
                    <option>51-200 employees</option>
                    <option>200+ employees</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                    placeholder="work@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary-900 mb-2">
                  Tell us about your needs
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-warm-200 rounded-lg focus:outline-none focus:border-primary-500"
                  placeholder="What are your team's English learning goals?"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-lg"
              >
                Request Free Consultation
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Ready to Upskill Your Team?
          </h2>
          <p className="text-xl text-warm-600 mb-8">
            Join 500+ companies that trust Boli for corporate English training
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg"
          >
            Schedule Demo
            <Target className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
