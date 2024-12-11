import React from 'react';
import { Shield, Search, Users, Lock, Target, Heart } from 'lucide-react';

const About = () => {
  const whyChoosePoints = [
    {
      icon: Users,
      title: "Personalized Matching",
      description: "Tailored recommendations that consider your family's unique needs."
    },
    {
      icon: Heart,
      title: "Community-Focused",
      description: "We're passionate about building strong, supportive relationships between families and caregivers."
    },
    {
      icon: Lock,
      title: "Secure and Reliable",
      description: "Our platform is designed with your privacy and security in mind."
    }
  ];

  const whatWeDoPoints = [
    {
      icon: Shield,
      title: "Prioritize Safety",
      description: "We encourage thorough vetting, including interviews and reference checks, to ensure every child is cared for by someone trustworthy and qualified."
    },
    {
      icon: Search,
      title: "Simplify the Search",
      description: "Using the information provided during registration, our system intelligently matches parents with childminders who meet their specific requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1602973497083-36f296a4eae1?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-[#8B5CF6]">ChildMinderConnect</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted partner in finding the perfect childminder.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Who We Are</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                ChildMinderConnect is an innovative platform designed to match parents with trusted childminders based on their unique needs and preferences. Think of us as a matchmaking service, but instead of finding a date, we're here to help you find the ideal caregiver for your child.
              </p>
              <p>
                We combine advanced technology with a personal touch to create a seamless experience for parents and childminders alike. Our mission is to connect families with compassionate, skilled, and dependable childminders who will provide the care and support every child deserves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {whatWeDoPoints.map((point, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-lg mb-6">
                  <point.icon className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose ChildMinderConnect?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoosePoints.map((point, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-lg mb-6">
                  <point.icon className="w-6 h-6 text-[#8B5CF6]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{point.title}</h3>
                <p className="text-gray-600">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-[#8B5CF6] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Our Vision</h3>
              <p className="text-purple-100">
                To be the most trusted childminding connection service, fostering safe and happy environments for children while empowering parents with peace of mind.
              </p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <p className="text-purple-100">
                To build meaningful connections between families and childminders, making quality childcare accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;