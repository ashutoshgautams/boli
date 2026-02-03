'use client';

import { useEffect, useRef } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  metric: string;
}

export default function SocialProof() {
  const testimonials: Testimonial[] = [
    {
      quote: "Landed my dream job at Google after 3 months. The mock interviews and live practice were game-changers.",
      author: "Priya Sharma",
      role: "Software Engineer",
      company: "Google",
      avatar: "PS",
      rating: 5,
      metric: "8.5 IELTS Score"
    },
    {
      quote: "From struggling with presentations to confidently leading client calls. The certificate helped too!",
      author: "Rajesh Kumar",
      role: "Senior Consultant",
      company: "Deloitte",
      avatar: "RK",
      rating: 5,
      metric: "12 Weeks to Fluency"
    },
    {
      quote: "Cleared IELTS with 8.5 overall. The structured courses and speaking practice made all the difference.",
      author: "Ananya Reddy",
      role: "MBA Candidate",
      company: "IIM Bangalore",
      avatar: "AR",
      rating: 5,
      metric: "8.5 IELTS Score"
    },
    {
      quote: "Promoted to team lead within 6 months. My confidence in English meetings improved drastically.",
      author: "Vikram Patel",
      role: "Team Lead",
      company: "Wipro",
      avatar: "VP",
      rating: 5,
      metric: "6 Month Transformation"
    },
    {
      quote: "The speaking club sessions are incredible. I practice daily and see real improvement every week.",
      author: "Meera Singh",
      role: "Product Manager",
      company: "Flipkart",
      avatar: "MS",
      rating: 5,
      metric: "200+ Practice Hours"
    },
    {
      quote: "Interview prep helped me crack 5 companies. The 1:1 coaching made all the difference in my job search.",
      author: "Arjun Nair",
      role: "Data Analyst",
      company: "Amazon",
      avatar: "AN",
      rating: 5,
      metric: "5 Job Offers"
    },
  ];

  const companies = ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'TCS', 'Infosys', 'Deloitte', 'Wipro'];

  const stats = [
    { value: '10,000+', label: 'Active learners' },
    { value: '4.9★', label: 'Average rating' },
    { value: '85%', label: 'Job success rate' },
    { value: '5,000+', label: 'Certificates issued' },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-gradient-to-b from-warm-50 to-surface">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">
          <span className="text-lg">★★★★★</span>
          <span>4.9/5 from 2,000+ reviews</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Trusted by professionals across India
        </h2>
        <p className="text-lg text-warm-700 max-w-2xl mx-auto">
          Join thousands who transformed their careers through better English
        </p>
      </div>

      {/* Stats Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-surface border border-warm-200 rounded-2xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary-300"
          >
            <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              {stat.value}
            </div>
            <div className="text-sm text-warm-700">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Marquee Testimonials - Row 1 (Slow Left to Right) */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-6 animate-marquee-slow">
          {[...testimonials, ...testimonials].map((testimonial, idx) => (
            <TestimonialCard key={`row1-${idx}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Marquee Testimonials - Row 2 (Slower Reverse) */}
      <div className="relative mb-16">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-6 animate-marquee-slower-reverse">
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, idx) => (
            <TestimonialCard key={`row2-${idx}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Company logos with marquee */}
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-warm-700 uppercase tracking-wider">
            Trusted by professionals at
          </p>
        </div>
        
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-12 animate-marquee-medium overflow-hidden">
            {[...companies, ...companies, ...companies].map((company, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-8 py-4 bg-surface border border-warm-200 rounded-xl font-semibold text-warm-800 whitespace-nowrap hover:border-primary-300 hover:text-primary-700 transition-all duration-300"
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
          <span>85% placed in top companies</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary-600 text-lg">✓</span>
          <span>Average salary increase: 45%</span>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[400px] bg-surface border border-warm-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-500 group">
      {/* Rating & Metric */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-500 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
          {testimonial.metric}
        </span>
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
          <div className="font-semibold text-foreground truncate">
            {testimonial.author}
          </div>
          <div className="text-sm text-warm-700 truncate">
            {testimonial.role} • {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}
