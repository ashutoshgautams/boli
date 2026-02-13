import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { MessageSquare, Users, Clock, Globe, Calendar, CheckCircle2 } from 'lucide-react';

export default function SpeakingClubPage() {
  const benefits = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Daily Practice',
      description: '15+ live sessions every day at different times to fit your schedule'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Small Groups',
      description: 'Maximum 15 participants per session for quality conversations'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Diverse Topics',
      description: 'Business, culture, technology, current events, and casual conversations'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Flexible Timing',
      description: 'Sessions from 6 AM to 11 PM IST, 7 days a week'
    }
  ];

  const sessionTypes = [
    {
      title: 'Beginner Sessions',
      level: 'A1-A2',
      description: 'Simple topics, slower pace, supportive environment for new learners',
      topics: ['Daily routines', 'Hobbies', 'Food & travel', 'Family & friends'],
      time: '45 minutes'
    },
    {
      title: 'Intermediate Sessions',
      level: 'B1-B2',
      description: 'Balanced discussions on varied topics with moderate complexity',
      topics: ['Current events', 'Career goals', 'Technology', 'Culture'],
      time: '60 minutes'
    },
    {
      title: 'Advanced Sessions',
      level: 'C1-C2',
      description: 'Deep discussions, debates, and complex topics for fluent speakers',
      topics: ['Business strategy', 'Global issues', 'Philosophy', 'Innovation'],
      time: '60 minutes'
    },
    {
      title: 'Industry-Specific',
      level: 'All Levels',
      description: 'Focused sessions for IT, healthcare, finance, and other industries',
      topics: ['Technical terms', 'Industry trends', 'Workplace scenarios', 'Networking'],
      time: '60 minutes'
    }
  ];

  const upcomingSessions = [
    { time: '09:00 AM', topic: 'Tech Innovations 2026', level: 'Advanced', spots: 7 },
    { time: '12:00 PM', topic: 'Travel Stories', level: 'Intermediate', spots: 3 },
    { time: '03:00 PM', topic: 'Daily Life Conversations', level: 'Beginner', spots: 12 },
    { time: '06:00 PM', topic: 'Career Goals & Planning', level: 'Intermediate', spots: 5 },
    { time: '09:00 PM', topic: 'Weekend Casual Chat', level: 'All Levels', spots: 8 }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-warm-50 via-white to-warm-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-primary-700">Live Now • 47 Active Sessions</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
            Practice English Every Day
          </h1>
          
          <p className="inline-flex items-center text-xl text-warm-600 mb-8 max-w-2xl mx-auto pb-6">
            Join live speaking clubs with learners from across India. Build fluency through real conversations on topics you care about.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Join a Session
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
              <div className="text-3xl font-bold text-primary-600">15+</div>
              <div className="text-sm text-warm-600">Sessions Daily</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">50,000+</div>
              <div className="text-sm text-warm-600">Conversations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">7 Days</div>
              <div className="text-sm text-warm-600">Every Week</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Why Join Speaking Clubs?
            </h2>
            <p className="text-xl text-warm-600">
              The fastest way to improve your spoken English
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

      {/* Session Types */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Find Your Perfect Session
            </h2>
            <p className="text-xl text-warm-600">
              Sessions designed for every level and interest
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sessionTypes.map((session, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-200 p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-1">
                      {session.title}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {session.level}
                    </span>
                  </div>
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                
                <p className="text-warm-600 mb-6">
                  {session.description}
                </p>
                
                <div className="mb-4">
                  <div className="text-sm font-semibold text-primary-900 mb-2">
                    Common Topics:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {session.topics.map((topic, topicIdx) => (
                      <span
                        key={topicIdx}
                        className="px-3 py-1 bg-warm-100 text-warm-700 rounded-full text-xs"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-warm-600">
                  Duration: {session.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Schedule */}
      <section id="schedule" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Today&apos;s Schedule
            </h2>
            <p className="text-xl text-warm-600">
              Join any session that fits your schedule
            </p>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session, idx) => (
              <div
                key={idx}
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
                    <h3 className="text-lg font-semibold text-primary-900 mb-1">
                      {session.topic}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                        {session.level}
                      </span>
                      <span className="text-sm text-warm-600">
                        {session.spots} spots left
                      </span>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/signup"
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all whitespace-nowrap"
                >
                  Join Now
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/signup"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              View Full Week Schedule →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              How Speaking Clubs Work
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: '1', 
                title: 'Pick a Session', 
                desc: 'Browse the schedule and choose a topic you like',
                icon: <Calendar className="w-6 h-6" />
              },
              { 
                step: '2', 
                title: 'Join & Practice', 
                desc: 'Meet other learners and practice speaking together',
                icon: <Users className="w-6 h-6" />
              },
              { 
                step: '3', 
                title: 'Build Fluency', 
                desc: 'Regular practice leads to natural, confident speaking',
                icon: <MessageSquare className="w-6 h-6" />
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

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-900 mb-4">
            Start Practicing Today
          </h2>
          <p className="text-xl text-warm-600 mb-8 pb-6">
            Join your first speaking club session - completely free
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg"
          >
            Join Free Session
            <MessageSquare className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
