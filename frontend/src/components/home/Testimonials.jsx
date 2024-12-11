import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Parent",
      location: "Dublin",
      image: "https://images.unsplash.com/photo-1601288496920-b6154fe3626a?w=150&h=150&fit=crop",
      content: "Finding a trustworthy childminder was so easy with ChildMinderConnect. My children love their new carer!",
      rating: 5
    },
    {
      name: "Michael Roberts",
      role: "Childminder",
      location: "Galway",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop",
      content: "This platform has helped me connect with wonderful families and grow my childminding business.",
      rating: 5
    },
    {
      name: "Emma Wilson",
      role: "Parent",
      location: "Cork",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
      content: "The verification process gave me peace of mind. I found the perfect childminder for my twins!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Trusted by 
            <span className="text-[#8B5CF6]"> Parents & Childminders</span>
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have found their perfect childcare match through our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 bg-[#8B5CF6] rounded-full p-3">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#8B5CF6] fill-[#8B5CF6]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} • {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-[#8B5CF6] mb-2">2,000+</div>
            <div className="text-gray-600">Active Users</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-[#8B5CF6] mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-purple-50 rounded-xl p-6">
            <div className="text-3xl font-bold text-[#8B5CF6] mb-2">1,500+</div>
            <div className="text-gray-600">Successful Matches</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="bg-[#8B5CF6] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7c4ef3] transition-colors shadow-md hover:shadow-lg">
            Join Our Community
          </button>
          <p className="mt-4 text-gray-600">
            Start your journey to finding the perfect childcare match today
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;