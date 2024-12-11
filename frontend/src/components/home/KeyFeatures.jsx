import React from 'react';
import { 
  Shield, 
  ClipboardCheck, 
  LockKeyhole, 
  Users,
  BadgeCheck,
  Clock,
  MapPin,
  Star
} from 'lucide-react';

const KeyFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Verified Credentials",
      description: "All childminders must provide Garda vetting and Tusla registration documentation for complete peace of mind."
    },
    {
      icon: LockKeyhole,
      title: "Secure Platform",
      description: "Bank-level security protects your personal data and payments, ensuring safe and confidential transactions."
    },
    {
      icon: ClipboardCheck,
      title: "Document Verification",
      description: "Our team manually verifies all certifications and documents to maintain the highest standards."
    },
    {
      icon: Users,
      title: "Community Trust",
      description: "Make informed decisions with verified reviews and ratings from other parents in your community."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Find childcare that fits your schedule with our easy-to-use booking system and calendar management."
    },
    {
      icon: MapPin,
      title: "Local Matches",
      description: "Connect with trusted childminders in your neighborhood, making pickup and drop-off convenient."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Trust and Safety 
            <span className="text-[#8B5CF6]"> First</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Your peace of mind is our top priority. We've built comprehensive safety measures into every aspect of our platform.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-6">
                <feature.icon className="w-6 h-6 text-[#8B5CF6]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Indicator */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-6 sm:mb-0">
            <BadgeCheck className="w-12 h-12 text-[#8B5CF6] mr-4" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900">100% Verified Profiles</h3>
              <p className="text-gray-600 mt-1">Every childminder is thoroughly vetted</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#8B5CF6] text-[#8B5CF6]" />
            ))}
            <span className="ml-2 text-gray-600">
              Trusted by <span className="font-semibold">2000+</span> families
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;