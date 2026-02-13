import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Target, Users, Video, CheckCircle2, TrendingUp, Briefcase } from 'lucide-react';

export default function InterviewPrepPage() {
  const features = [
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Mock Interviews',
      description: 'Practice with realistic interview scenarios and get instant feedback from experts'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expert Coaching',
      description: '1:1 sessions with industry professionals who know what recruiters want'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Company-wise Prep',
      description: 'Tailored preparation for top companies like Google, Amazon, Microsoft, and more'
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Job Placement Support',
      description: 'Resume reviews, LinkedIn optimization, and job application guidance'
    }
  ];

  const interviewTypes = [
    {
      title: 'Technical Interviews',
      description: 'Prepare for software engineering and IT roles with technical communication practice',
      topics: [
        'Explaining technical concepts clearly',
        'System design discussions',
        'Code walkthrough practice',
        'Technical problem-solving'
      ]
    },
    {
      title: 'Behavioral Interviews',
      description: 'Master the STAR method and common behavioral questions',
      topics: [
        'Tell me about yourself',
        'Strengths and weaknesses',
        'Conflict resolution examples',
        'Leadership experiences'
      ]
    },
    {
      title: 'HR & Culture Fit',
      description: 'Navigate HR rounds and demonstrate cultural alignment',
      topics: [
        'Salary negotiation',
        'Company research and fit',
        'Career goals discussion',
        'Why this company?'
      ]
    }
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      role: 'Software Engineer at Google',
      achievement: 'Landed dream job in 3 months',
      quote: 'The mock interviews and feedback helped me overcome my nervousness and speak confidently.'
    },
    {
      name: 'Arjun Patel',
      role: 'Data Analyst at Amazon',
      achievement: 'Got 5 job offers',
      quote: 'Learned to structure my answers and highlight my achievements effectively.'
    },
    {
      name: 'Meera Singh',
      role: 'Product Manager at Flipkart',
      achievement: '40% salary increase',
      quote: 'The expert coaches taught me negotiation skills that changed my career trajectory.'
    }
  ];

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-warm-50 via-white to-warm-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 border border-primary-200 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-primary-700" />
            <span className="text-sm font-medium text-primary-700">85% Job Success Rate</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
            Ace Your Next Interview
          </h1>
          
          <p className="inline-flex items-center text-xl text-warm-600 mb-8 max-w-2xl mx-auto pb-6">
            Master interview English with expert coaching, realistic mock interviews, and personalized feedback. Land your dream job with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
            >
              Book Mock Interview
            </Link>
            <Link
              href="#success-stories"
              className="px-8 py-4 bg-white text-primary-700 border-2 border-primary-200 rounded-xl font-semibold text-lg hover:bg-warm-50 transition-all"
            >
              See Success Stories
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">85%</div>
              <div className="text-sm text-warm-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">5,000+</div>
              <div className="text-sm text-warm-600">Interviews Done</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">45%</div>
              <div className="text-sm text-warm-600">Avg Salary Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Complete Interview Preparation
            </h2>
            <p className="text-xl text-warm-600">
              Everything you need to succeed in your job interviews
            </p>
          </div>

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

      {/* Interview Types */}
      <section className="py-20 bg-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Prepare for Every Interview Type
            </h2>
            <p className="text-xl text-warm-600">
              Comprehensive coverage of all interview formats
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {interviewTypes.map((type, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-warm-200 p-8 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-bold text-primary-900 mb-3">
                  {type.title}
                </h3>
                
                <p className="text-warm-600 mb-6">
                  {type.description}
                </p>
                
                <ul className="space-y-3">
                  {type.topics.map((topic, topicIdx) => (
                    <li key={topicIdx} className="flex items-start gap-2 text-warm-700">
                      <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-warm-600">
              Real results from real students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, idx) => (
              <div
                key={idx}
                className="bg-white border border-warm-200 rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4">
                  {story.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <h3 className="text-xl font-bold text-primary-900 mb-1">
                  {story.name}
                </h3>
                
                <p className="text-warm-600 text-sm mb-2">
                  {story.role}
                </p>
                
                <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium mb-4">
                  {story.achievement}
                </div>
                
                <p className="text-warm-700 italic">
                  &quot;{story.quote}&quot;
                </p>
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
              { step: '1', title: 'Book Session', desc: 'Choose a time that works for you' },
              { step: '2', title: 'Prepare', desc: 'Review materials and practice questions' },
              { step: '3', title: 'Mock Interview', desc: 'Realistic interview with expert' },
              { step: '4', title: 'Get Feedback', desc: 'Detailed report and improvement tips' }
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
            Ready to Ace Your Interview?
          </h2>
          <p className="text-xl text-warm-600 mb-8 pb-6">
            Book your first mock interview today and get expert feedback
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all shadow-lg"
          >
            Get Started
            <Target className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
