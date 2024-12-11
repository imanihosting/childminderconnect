import React, { useState } from 'react';
import { Check, MessageCircle, Calendar, Search, Shield, Star, Clock } from 'lucide-react';

const SubscriptionTeaser = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const features = [
    {
      icon: MessageCircle,
      title: "Unlimited Messaging",
      description: "Direct communication with childminders"
    },
    {
      icon: Calendar,
      title: "Booking System",
      description: "Schedule and manage appointments"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Find the perfect match with detailed filters"
    },
    {
      icon: Shield,
      title: "Verified Profiles",
      description: "All childminders are fully vetted"
    },
    {
      icon: Star,
      title: "Reviews & Ratings",
      description: "Access trusted community feedback"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Priority support 24/7"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Premium 
            <span className="text-[#8B5CF6]"> Features</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with trusted childminders and manage your childcare needs with our premium features.
          </p>
          
          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center bg-purple-100 p-1 rounded-full">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                billingPeriod === 'monthly'
                  ? 'bg-[#8B5CF6] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#8B5CF6]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                billingPeriod === 'yearly'
                  ? 'bg-[#8B5CF6] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#8B5CF6]'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Premium Plan Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#8B5CF6] text-white rounded-2xl p-8 shadow-xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-900 text-white text-sm font-semibold px-4 py-1 rounded-full">
                {billingPeriod === 'yearly' ? 'Save 20% with yearly billing' : 'Most Popular'}
              </span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Premium Access</h3>
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold">€4.99</span>
                <span className="ml-2 text-purple-100">
                  {billingPeriod === 'monthly' ? '/month' : '/month, billed yearly'}
                </span>
              </div>
              {billingPeriod === 'yearly' && (
                <div className="mt-2 text-purple-100">
                  €49.99 billed annually
                </div>
              )}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <feature.icon className="w-6 h-6 mr-3 flex-shrink-0 text-white" />
                  <div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-purple-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-white text-[#8B5CF6] py-3 px-6 rounded-full font-semibold hover:bg-purple-50 transition-all duration-200">
              {billingPeriod === 'monthly' ? 'Start Your Premium Journey' : 'Get Yearly Access'}
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-600">
            30-day money-back guarantee • Cancel anytime
          </p>
          <div className="flex justify-center items-center space-x-2 text-[#8B5CF6]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <span className="ml-2 text-gray-600">Trusted by 2000+ families</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionTeaser;