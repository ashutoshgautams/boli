import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { BookOpen, PlayCircle, CheckCircle2, Clock, Trophy, Target } from 'lucide-react';

export default function CoursesPage() {
  const courses = [
    {
      level: 'Beginner (A1-A2)',
      title: 'English Foundations',
      description: 'Start your English journey with basic grammar, vocabulary, and everyday conversations.',
      duration: '8 weeks',
      lessons: 40,
      features: [
        'Basic grammar and sentence structure',
        'Essential vocabulary (500+ words)',
        'Common phrases for daily life',
        'Pronunciation basics',
        'Simple conversation practice'
      ]
    },
    {
      level: 'Intermediate (B1-B2)',
      title: 'Conversational Fluency',
      description: 'Build confidence in speaking and expand your vocabulary for professional settings.',
      duration: '12 weeks',
      lessons: 60,
      features: [
        'Advanced grammar patterns',
        'Professional vocabulary',
        'Business communication',
        'Debate and discussion skills',
        'Writing emails and reports'
      ]
    },
    {
      level: 'Advanced (C1-C2)',
      title: 'Professional Mastery',
      description: 'Perfect your English for leadership, presentations, and complex discussions.',
      duration: '10 weeks',
      lessons: 50,
      features: [
        'Native-level expressions',
        'Advanced writing techniques',
        'Presentation mastery',
        'Negotiation skills',
        'Cultural nuances'
      ]
    }
  ];

  const features = [
    {
      icon: <PlayCircle className="w-6 h-6" />,
      title: 'HD Video Lessons',
      description: '1000+ hours of professionally produced content with native speakers'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Downloadable Materials',
      description: 'PDFs, worksheets, and practice exercises you can study offline'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Learn at Your Pace',
      description: 'Study anytime, anywhere. Lifetime access to all course materials'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Earn Certificates',
      description: 'Get recognized for your achievements with verified completion certificates'
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-warm-50 via-white to-warm-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-full mb-6">
            <span className="text-sm font-medium text-primary-700">Self-Paced Learning</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
            Master English at Your Own Pace
          </h1>
          
          <p className="text-xl text-warm-600 mb-8 max-w-2xl mx-auto">
            Structured curriculum from A1 to C2 level. Learn with expert teachers through HD video lessons and interactive exercises.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Start Learning Free
            </Link>
            <Link
              href="#courses"
              className="px-8 py-4 bg-white text-primary-700 border-2 border-primary-200 rounded-xl font-semibold text-lg hover:bg-warm-50 transition-all"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-warm-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Choose Your Level
            </h2>
            <p className="text-xl text-warm-600">
              Structured learning path from beginner to advanced
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-200 p-8 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
                  {course.level}
                </div>
                
                <h3 className="text-2xl font-bold text-primary-900 mb-3">
                  {course.title}
                </h3>
                
                <p className="text-warm-600 mb-6">
                  {course.description}
                </p>
                
                <div className="flex items-center gap-4 mb-6 text-sm text-warm-700">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <PlayCircle className="w-4 h-4" />
                    {course.lessons} lessons
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2 text-warm-700">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/signup"
                  className="block w-full py-3 bg-primary-600 text-white text-center rounded-xl font-semibold hover:bg-primary-700 transition-all"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-warm-600 mb-8">
            Join thousands of learners improving their English every day
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg"
          >
            Start Free Trial
            <Target className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
