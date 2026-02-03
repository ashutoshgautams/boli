'use client';

import { Check } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Free',
      description: 'Perfect to get started',
      price: { monthly: 0, annual: 0 },
      features: [
        'Access to speaking clubs',
        '5 video lessons per month',
        'Community forum access',
        'Basic progress tracking',
        'Mobile app access',
      ],
      cta: 'Start free',
      popular: false,
    },
    {
      name: 'Pro',
      description: 'Best for serious learners',
      price: { monthly: 999, annual: 9990 },
      features: [
        'Everything in Free',
        'Unlimited video lessons',
        '10 speaking club sessions/month',
        '2 mock interviews per month',
        'Downloadable materials',
        'Priority support',
        'Progress certificates',
      ],
      cta: 'Start Pro trial',
      popular: true,
    },
    {
      name: 'Premium',
      description: 'For career-focused professionals',
      price: { monthly: 2999, annual: 29990 },
      features: [
        'Everything in Pro',
        'Unlimited speaking clubs',
        'Unlimited mock interviews',
        '4 x 1:1 coaching sessions/month',
        'Group coaching classes',
        'Personalized learning path',
        'Job placement assistance',
        'Verified certificates',
      ],
      cta: 'Start Premium trial',
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Choose your learning path
          </h2>
          <p className="text-xl text-warm-600 max-w-2xl mx-auto mb-8">
            Start free, upgrade anytime. No credit card required to get started.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-warm-100 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-primary-900 shadow-warm'
                  : 'text-warm-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-primary-900 shadow-warm'
                  : 'text-warm-600'
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-3xl p-8 transition-all ${
                plan.popular
                  ? 'border-2 border-primary-600 shadow-lg scale-105'
                  : 'border border-warm-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary-600 text-white text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary-900 mb-2">{plan.name}</h3>
                <p className="text-warm-600">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-primary-900">
                    ₹{billingCycle === 'monthly' ? plan.price.monthly : Math.round(plan.price.annual / 12)}
                  </span>
                  <span className="text-warm-600">/month</span>
                </div>
                {plan.price.monthly > 0 && (
                  <p className="text-sm text-warm-600 mt-2">
                    {billingCycle === 'annual'
                      ? `₹${plan.price.annual} billed annually`
                      : 'Billed monthly'}
                  </p>
                )}
              </div>

              {/* CTA Button */}
              <Link
                href="/signup"
                className={`block w-full py-3.5 text-center rounded-xl font-semibold transition-all mb-8 ${
                  plan.popular
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-warm'
                    : 'bg-white border-2 border-primary-200 text-primary-700 hover:bg-warm-50'
                }`}
              >
                {plan.cta}
              </Link>

              {/* Features List */}
              <ul className="space-y-4">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span className="text-warm-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-warm-600">
            All plans include • 24/7 platform access • Mobile apps • Community support
          </p>
        </div>
      </div>
    </section>
  );
}
