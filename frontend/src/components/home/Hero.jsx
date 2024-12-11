import React from 'react';
import { Shield, Star, Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-24 lg:pb-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left side - Text Content */}
          <div className="flex-1 text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Find Trusted
              <br />
              Childminders
              <br />
              <span className="text-[#8B5CF6]">in Your Community</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Connect with experienced, verified childminders who provide quality care for your children. Your peace of mind is our priority.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-10 flex flex-row gap-4">
              <button className="px-8 py-3 bg-[#8B5CF6] text-white rounded-full font-semibold hover:bg-[#7c4ef3] transition-colors">
                Find a Childminder
              </button>
              <button className="px-8 py-3 bg-white text-[#8B5CF6] border-2 border-[#8B5CF6] rounded-full font-semibold hover:bg-purple-50 transition-colors">
                Become a Childminder
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-row gap-8 text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#8B5CF6]" />
                <span>Verified Profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#8B5CF6]" />
                <span>Trusted Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-[#8B5CF6]" />
                <span>Easy Search</span>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 relative z-0">
            {/* Purple Circle Background */}
            <div className="absolute inset-0 bg-purple-100/50 rounded-full transform -rotate-6" />
            
            {/* Image Container */}
            <div className="relative w-full aspect-square max-w-lg mx-auto z-10">
              <img
                src="https://rollercoaster.ie/wp-content/uploads/2021/03/Preparing-for-childcare-1.jpg"
                alt="Happy children with childminder"
                className="relative rounded-2xl object-cover w-full h-full shadow-lg"
                style={{ opacity: 1 }}
              />
            </div>
            
            {/* Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg z-20">
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Active Childminders</div>
            </div>
            
            {/* Review Card */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg z-20">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#8B5CF6] text-[#8B5CF6]" />
                ))}
              </div>
              <div className="text-sm text-gray-600 mt-1">Trusted by Parents</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/30 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50/30 rounded-full transform -translate-x-1/2 translate-y-1/2 blur-3xl" />
      </div>
    </div>
  );
};

export default Hero;