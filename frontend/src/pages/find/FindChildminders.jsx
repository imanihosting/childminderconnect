import React, { useState } from 'react';
import { MapPin, Star } from 'lucide-react';

const FindChildminders = () => {
  const [filters, setFilters] = useState({
    availability: '',
    ageGroup: '',
    priceRange: ''
  });

  // Placeholder data - in real implementation, this would come from an API
  const childminders = [
    {
      id: 1,
      name: "Sarah O'Connor",
      location: "Dublin 4",
      rating: 4.8,
      reviewCount: 24,
      hourlyRate: "€15",
      image: "/api/placeholder/300/300"
    }
  ];

  const handleClearFilters = () => {
    setFilters({
      availability: '',
      ageGroup: '',
      priceRange: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search Section */}
      <div className="relative w-full">
        <div className="flex items-center mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter your location..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
          <button 
            className="ml-4 bg-purple-600 text-white px-8 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-8">
          <select 
            className="flex-1 border border-gray-300 rounded-lg p-2"
            value={filters.availability}
            onChange={(e) => setFilters(prev => ({...prev, availability: e.target.value}))}
          >
            <option value="">Availability</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="weekends">Weekends</option>
          </select>
          
          <select 
            className="flex-1 border border-gray-300 rounded-lg p-2"
            value={filters.ageGroup}
            onChange={(e) => setFilters(prev => ({...prev, ageGroup: e.target.value}))}
          >
            <option value="">Age Group</option>
            <option value="infant">Infant (0-1)</option>
            <option value="toddler">Toddler (1-3)</option>
            <option value="preschool">Preschool (3-5)</option>
            <option value="school-age">School Age (5+)</option>
          </select>
          
          <select 
            className="flex-1 border border-gray-300 rounded-lg p-2"
            value={filters.priceRange}
            onChange={(e) => setFilters(prev => ({...prev, priceRange: e.target.value}))}
          >
            <option value="">Price Range</option>
            <option value="0-10">€0 - €10/hour</option>
            <option value="10-15">€10 - €15/hour</option>
            <option value="15-20">€15 - €20/hour</option>
            <option value="20+">€20+/hour</option>
          </select>
          
          <button 
            onClick={handleClearFilters}
            className="text-purple-600 px-6 py-2 border border-purple-600 rounded-lg hover:bg-purple-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {childminders.map(childminder => (
          <div 
            key={childminder.id} 
            className="bg-white rounded-lg overflow-hidden border border-gray-200"
          >
            <img 
              src={childminder.image} 
              alt={childminder.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{childminder.name}</h3>
              <div className="flex items-center gap-1 text-gray-600 mt-2">
                <MapPin className="h-4 w-4" />
                <span>{childminder.location}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600 mt-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{childminder.rating} ({childminder.reviewCount} reviews)</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-purple-600">{childminder.hourlyRate}/hour</span>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindChildminders;