'use client';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  badge?: string;
}

export default function SocialProof() {
  const testimonials: Testimonial[] = [
    {
      quote: "Been using the beta for 2 weeks. The mock interview feature is surprisingly helpful - caught mistakes I didn't even know I was making.",
      author: "Priya S.",
      role: "Software Developer",
      company: "Tech Startup",
      avatar: "PS",
      rating: 5,
      badge: "Early Access User",
    },
    {
      quote: "Finally, something that doesn't feel like a classroom. The live sessions are casual and I'm actually enjoying practicing English.",
      author: "Rajesh K.",
      role: "Consultant",
      avatar: "RK",
      rating: 4,
      badge: "Beta Tester",
    },
    {
      quote: "I've tried 3 apps before this. What I like here is the focus on speaking practice, not just grammar lessons. Excited to see where this goes!",
      author: "Ananya R.",
      role: "MBA Student",
      avatar: "AR",
      rating: 5,
      badge: "Week 1",
    },
    {
      quote: "The coaches are real professionals, not scripted teachers. Had my first session yesterday and already feel more confident.",
      author: "Vikram P.",
      role: "Team Lead",
      company: "IT Services",
      avatar: "VP",
      rating: 4,
      badge: "Early Access User",
    },
    {
      quote: "Love the speaking club concept. Still early days but I can see this becoming part of my daily routine.",
      author: "Meera S.",
      role: "Product Manager",
      avatar: "MS",
      rating: 5,
      badge: "Beta Tester",
    },
    {
      quote: "Joined for interview prep. The 1:1 coaching is worth it - got specific feedback I couldn't get from YouTube videos.",
      author: "Arjun N.",
      role: "Data Analyst",
      avatar: "AN",
      rating: 5,
      badge: "Week 2",
    },
  ];

  const companies = ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'TCS', 'Infosys', 'Deloitte', 'Wipro'];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-warm-50 to-surface">
      {/* Header - Honest about launch stage */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
          <span>🚀</span>
          <span>Now in Early Access</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          What early users are saying
        </h2>
        <p className="inline-flex items-center text-lg text-warm-700 max-w-2xl mx-auto">
          We&apos;ve opened access to a small group of professionals. Here&apos;s their honest feedback as we build together.
        </p>
      </div>

      {/* Credibility Grid - Realistic for launch */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {[
          { value: '21+', label: 'Expert coaches onboard' },
          { value: '6+ yrs', label: 'Avg. coach experience' },
          { value: 'Free', label: 'To start practicing' },
          { value: '50+', label: 'Early access users' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-surface border border-warm-200 rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-primary-300"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
            <div className="text-sm text-warm-700">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Marquee Testimonials - Row 1 */}
      <div className="relative mb-8">
        <div className="flex gap-6 animate-marquee-slow">
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, idx) => (
            <TestimonialCard key={`row1-${idx}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Marquee Testimonials - Row 2 */}
      <div className="relative mb-16">
        <div className="flex gap-6 animate-marquee-slower-reverse">
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, idx) => (
            <TestimonialCard key={`row2-${idx}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Company logos marquee */}
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-warm-700 uppercase tracking-wider">
            Our coaches have worked with professionals at
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-marquee-medium">
            {[...companies, ...companies, ...companies, ...companies, ...companies].map((company, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-8 py-3 bg-surface border border-warm-200 rounded-xl font-semibold text-warm-800 whitespace-nowrap hover:border-primary-300 hover:text-primary-700 transition-all duration-300"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust metrics */}
      <div className="max-w-7xl mx-auto mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-warm-700">
        <div className="flex items-center gap-2">
          <span className="text-primary-600 text-lg">✓</span>
          <span>All coaches are working professionals</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary-600 text-lg">✓</span>
          <span>Early access pricing available now</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary-600 text-lg">✓</span>
          <span>New features added weekly</span>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[400px] bg-surface border border-warm-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-500 group">
      {/* Rating & Badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        {testimonial.badge && (
          <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {testimonial.badge}
          </span>
        )}
      </div>

      {/* Quote */}
      <p className="text-warm-800 mb-6 leading-relaxed line-clamp-3 group-hover:text-foreground transition-colors duration-300">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
          {testimonial.avatar}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-foreground truncate">{testimonial.author}</div>
          <div className="text-sm text-warm-700 truncate">
            {testimonial.role}{testimonial.company && ` • ${testimonial.company}`}
          </div>
        </div>
      </div>
    </div>
  );
}

