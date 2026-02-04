import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Users, Video, Calendar, Star, CheckCircle2, Clock } from 'lucide-react';

export default function OneOnOneCoachingPage() {
  const coachingTypes = [
    {
      title: 'General English',
      description: 'Improve your overall English proficiency with personalized guidance',
      duration: '30 or 60 min',
      bestFor: 'Anyone wanting to improve their English',
      includes: [
        'Customized learning plan',
        'Grammar and vocabulary focus',
        'Speaking and pronunciation',
        'Progress tracking'
      ]
    },
    {
      title: 'Business English',
      description: 'Master professional communication for the workplace',
      duration: '60 min',
      bestFor: 'Professionals and job seekers',
      includes: [
        'Presentation skills',
        'Email and report writing',
        'Meeting participation',
        'Negotiation techniques'
      ]
    },
    {
      title: 'Exam Preparation',
      description: 'Targeted coaching for IELTS, TOEFL, and other exams',
      duration: '60 min',
      bestFor: 'Students preparing for exams',
      includes: [
        'Test strategies and tips',
        'Practice tests and feedback',
        'Time management skills',
        'Score improvement plan'
      ]
    },
    {
      title: 'Interview Coaching',
      description: 'One-on-one preparation for job interviews',
      duration: '60 min',
      bestFor: 'Job seekers and career changers',
      includes: [
        'Mock interviews',
        'Answer structuring',
        'Confidence building',
        'Company-specific prep'
      ]
    }
  ];

  const coaches = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'IELTS Expert',
      experience: '15 years',
      specialties: ['IELTS', 'Academic English', 'Pronunciation'],
      rating: 4.9,
      students: 2000,
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      title: 'Business Communication',
      experience: '12 years',
      specialties: ['Business English', 'Presentations', 'Negotiations'],
      rating: 4.8,
      students: 1500,
      avatar: 'MC'
    },
    {
      name: 'Priya Patel',
      title: 'Career Coach',
      experience: '10 years',
      specialties: ['Interview Prep', 'Resume Writing', 'LinkedIn'],
      rating: 5.0,
      students: 1800,
      avatar: 'PP'
    },
    {
      name: 'David Williams',
      title: 'Fluency Specialist',
      experience: '18 years',
      specialties: ['Conversation', 'Accent Reduction', 'Fluency'],
      rating: 4.9,
      students: 2500,
      avatar: 'DW'
    }
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expert Coaches',
      description: '100+ certified tutors with years of teaching experience'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Flexible Scheduling',
      description: 'Book sessions anytime, 24/7 availability'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'HD Video Calls',
      description: 'Crystal clear video and audio for the best learning experience'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Personalized Learning',
      description: 'Custom curriculum based on your goals and level'
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-warm-50 via-white to-warm-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-full mb-6">
            <Star className="w-4 h-4 text-primary-700 fill-primary-700" />
            <span className="text-sm font-medium text-primary-700">4.9★ Average Rating</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
            Personal English Coaching
          </h1>
          
          <p className="text-xl text-warm-600 mb-8 max-w-2xl mx-auto">
            Get personalized attention from expert tutors. Achieve your goals faster with one-on-one coaching tailored to your needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Book First Session
            </Link>
            <Link
              href="#coaches"
              className="px-8 py-4 bg-white text-primary-700 border-2 border-primary-200 rounded-xl font-semibold text-lg hover:bg-warm-50 transition-all"
            >
              Meet Our Coaches
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">100+</div>
              <div className="text-sm text-warm-600">Expert Coaches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">24/7</div>
              <div className="text-sm text-warm-600">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">50,000+</div>
              <div className="text-sm text-warm-600">Sessions Done</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Why Choose 1:1 Coaching?
            </h2>
            <p className="text-xl text-warm-600">
              Personalized learning for faster progress
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

      {/* Coaching Types */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Choose Your Coaching Focus
            </h2>
            <p className="text-xl text-warm-600">
              Specialized coaching for your specific goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coachingTypes.map((type, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-200 p-8 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-primary-900 mb-3">
                  {type.title}
                </h3>
                
                <p className="text-warm-600 mb-4">
                  {type.description}
                </p>
                
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1 text-warm-700">
                    <Clock className="w-4 h-4" />
                    {type.duration}
                  </div>
                  <div className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-medium">
                    {type.bestFor}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm font-semibold text-primary-900 mb-3">
                    What&apos;s Included:
                  </div>
                  <ul className="space-y-2">
                    {type.includes.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-warm-700">
                        <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Link
                  href="/signup"
                  className="block w-full py-3 bg-primary-600 text-white text-center rounded-xl font-semibold hover:bg-primary-700 transition-all"
                >
                  Book Session
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches */}
      <section id="coaches" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Meet Our Expert Coaches
            </h2>
            <p className="text-xl text-warm-600">
              Learn from the best in the industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coaches.map((coach, idx) => (
              <div
                key={idx}
                className="bg-white border border-warm-200 rounded-2xl p-6 hover:shadow-xl transition-all text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                  {coach.avatar}
                </div>
                
                <h3 className="text-xl font-bold text-primary-900 mb-1">
                  {coach.name}
                </h3>
                
                <p className="text-sm text-warm-600 mb-3">
                  {coach.title}
                </p>
                
                <div className="flex items-center justify-center gap-4 mb-4 text-sm text-warm-700">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {coach.rating}
                  </div>
                  <div>{coach.experience}</div>
                </div>
                
                <div className="text-xs text-warm-600 mb-4">
                  {coach.students.toLocaleString()} students taught
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {coach.specialties.map((specialty, specialtyIdx) => (
                    <span
                      key={specialtyIdx}
                      className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <Link
                  href="/signup"
                  className="block w-full py-2 bg-primary-600 text-white text-center rounded-lg font-semibold hover:bg-primary-700 transition-all text-sm"
                >
                  Book with {coach.name.split(' ')[0]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Coach', desc: 'Browse coaches and pick the perfect match' },
              { step: '2', title: 'Book Session', desc: 'Select a time that works for you' },
              { step: '3', title: 'Join Video Call', desc: 'Meet your coach in HD video session' },
              { step: '4', title: 'Track Progress', desc: 'Get feedback and see your improvement' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-primary-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-warm-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-warm-600 mb-8">
            Book your first 1:1 coaching session today
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg"
          >
            Book First Session
            <Users className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
