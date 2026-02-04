import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Users, Calendar, CheckCircle2, TrendingUp, Video, Clock } from 'lucide-react';

export default function GroupCoachingPage() {
  const groupTypes = [
    {
      title: 'Beginner Group (A1-A2)',
      level: 'Beginner',
      description: 'Foundation English for new learners in a supportive group environment',
      duration: '8 weeks',
      frequency: '2x per week',
      groupSize: '12-15 students',
      includes: [
        'Basic grammar and vocabulary',
        'Simple conversation practice',
        'Pronunciation guidance',
        'Peer learning opportunities',
        'Weekly progress assessments'
      ]
    },
    {
      title: 'Intermediate Group (B1-B2)',
      level: 'Intermediate',
      description: 'Build confidence and fluency through structured group learning',
      duration: '10 weeks',
      frequency: '2x per week',
      groupSize: '12-15 students',
      includes: [
        'Advanced grammar patterns',
        'Professional vocabulary',
        'Group discussions and debates',
        'Writing practice',
        'Presentation skills'
      ]
    },
    {
      title: 'Advanced Group (C1-C2)',
      level: 'Advanced',
      description: 'Master professional English in a collaborative setting',
      duration: '8 weeks',
      frequency: '2x per week',
      groupSize: '10-12 students',
      includes: [
        'Native-level expressions',
        'Complex discussions',
        'Business communication',
        'Leadership language',
        'Industry-specific terminology'
      ]
    },
    {
      title: 'IELTS Preparation Group',
      level: 'All Levels',
      description: 'Intensive IELTS prep with fellow test-takers',
      duration: '6 weeks',
      frequency: '3x per week',
      groupSize: '10-15 students',
      includes: [
        'All four IELTS sections',
        'Practice tests and feedback',
        'Test strategies and tips',
        'Time management skills',
        'Score improvement techniques'
      ]
    }
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Learn Together',
      description: 'Interact with 10-15 peers at your level for collaborative learning'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Affordable',
      description: 'Get expert coaching at a fraction of 1:1 session costs'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Live Interactive',
      description: 'Real-time sessions with expert coaches, not recorded videos'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Structured Program',
      description: 'Complete curriculum with clear learning objectives and milestones'
    }
  ];

  const schedule = [
    {
      day: 'Monday',
      sessions: [
        { time: '7:00 AM', group: 'Beginner Group A', topic: 'Daily Routines', spots: 5 },
        { time: '6:00 PM', group: 'Intermediate Group B', topic: 'Business Meetings', spots: 3 }
      ]
    },
    {
      day: 'Wednesday',
      sessions: [
        { time: '7:00 AM', group: 'Advanced Group A', topic: 'Negotiations', spots: 2 },
        { time: '8:00 PM', group: 'IELTS Prep Group', topic: 'Speaking Test', spots: 7 }
      ]
    },
    {
      day: 'Friday',
      sessions: [
        { time: '6:00 AM', group: 'Beginner Group B', topic: 'Shopping & Money', spots: 8 },
        { time: '7:00 PM', group: 'Intermediate Group A', topic: 'Presentations', spots: 4 }
      ]
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-warm-50 via-white to-warm-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-full mb-6">
            <Users className="w-4 h-4 text-primary-700" />
            <span className="text-sm font-medium text-primary-700">Small Groups • Maximum Learning</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
            Group Coaching Classes
          </h1>
          
          <p className="text-xl text-warm-600 mb-8 max-w-2xl mx-auto">
            Learn English in interactive 1:15 group sessions. Get expert coaching, practice with peers, and achieve your goals together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Join a Group
            </Link>
            <Link
              href="#schedule"
              className="px-8 py-4 bg-white text-primary-700 border-2 border-primary-200 rounded-xl font-semibold text-lg hover:bg-warm-50 transition-all"
            >
              View Schedule
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">10-15</div>
              <div className="text-sm text-warm-600">Students per Group</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">60min</div>
              <div className="text-sm text-warm-600">Per Session</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">2-3x</div>
              <div className="text-sm text-warm-600">Weekly Sessions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Why Choose Group Coaching?
            </h2>
            <p className="text-xl text-warm-600">
              The perfect balance of expert guidance and peer learning
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

      {/* Group Types */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Find Your Perfect Group
            </h2>
            <p className="text-xl text-warm-600">
              Structured programs designed for every level
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {groupTypes.map((group, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-200 p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-1">
                      {group.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {group.level}
                    </span>
                  </div>
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                
                <p className="text-warm-600 mb-6">
                  {group.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                  <div>
                    <div className="text-warm-600 mb-1">Duration</div>
                    <div className="font-semibold text-primary-900">{group.duration}</div>
                  </div>
                  <div>
                    <div className="text-warm-600 mb-1">Frequency</div>
                    <div className="font-semibold text-primary-900">{group.frequency}</div>
                  </div>
                  <div>
                    <div className="text-warm-600 mb-1">Group Size</div>
                    <div className="font-semibold text-primary-900">{group.groupSize}</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm font-semibold text-primary-900 mb-3">
                    What You&apos;ll Learn:
                  </div>
                  <ul className="space-y-2">
                    {group.includes.map((item, itemIdx) => (
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
                  Enroll Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              This Week&apos;s Schedule
            </h2>
            <p className="text-xl text-warm-600">
              Join ongoing groups or start a new cohort
            </p>
          </div>

          <div className="space-y-8">
            {schedule.map((day, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  {day.day}
                </h3>
                <div className="space-y-4">
                  {day.sessions.map((session, sessionIdx) => (
                    <div
                      key={sessionIdx}
                      className="bg-white border border-warm-200 rounded-xl p-6 hover:shadow-lg transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-6">
                        <div className="text-center min-w-[80px]">
                          <div className="text-2xl font-bold text-primary-600">
                            {session.time}
                          </div>
                          <div className="text-xs text-warm-600">IST</div>
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-primary-900 mb-1">
                            {session.topic}
                          </h4>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-warm-600">
                              {session.group}
                            </span>
                            <span className="text-xs">•</span>
                            <span className="text-sm text-warm-600">
                              {session.spots} spots available
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <Link
                        href="/signup"
                        className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all whitespace-nowrap"
                      >
                        Join Group
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/signup"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              View All Groups →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              How Group Coaching Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: '1', 
                title: 'Choose Your Level', 
                desc: 'Select a group that matches your English proficiency',
                icon: <TrendingUp className="w-6 h-6" />
              },
              { 
                step: '2', 
                title: 'Join the Cohort', 
                desc: 'Start learning with 10-15 students at your level',
                icon: <Users className="w-6 h-6" />
              },
              { 
                step: '3', 
                title: 'Attend Sessions', 
                desc: 'Meet 2-3 times per week for live interactive classes',
                icon: <Calendar className="w-6 h-6" />
              },
              { 
                step: '4', 
                title: 'Track Progress', 
                desc: 'Complete the program and earn your certificate',
                icon: <CheckCircle2 className="w-6 h-6" />
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                  {item.icon}
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

      {/* Pricing Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Affordable Expert Coaching
            </h2>
            <p className="text-xl text-warm-600">
              Get the same quality at a fraction of the cost
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-warm-50 rounded-2xl p-8 border-2 border-warm-200">
              <div className="text-center mb-4">
                <div className="text-lg font-semibold text-warm-700 mb-2">1:1 Coaching</div>
                <div className="text-4xl font-bold text-primary-900">₹999</div>
                <div className="text-sm text-warm-600">per session</div>
              </div>
            </div>

            <div className="bg-primary-50 rounded-2xl p-8 border-2 border-primary-600 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-600 text-white rounded-full text-sm font-semibold">
                Best Value
              </div>
              <div className="text-center mb-4">
                <div className="text-lg font-semibold text-primary-700 mb-2">Group Coaching</div>
                <div className="text-4xl font-bold text-primary-900">₹399</div>
                <div className="text-sm text-warm-600">per session</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Ready to Join a Group?
          </h2>
          <p className="text-xl text-warm-600 mb-8">
            Start learning with expert coaches and motivated peers
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg"
          >
            Find Your Group
            <Users className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
