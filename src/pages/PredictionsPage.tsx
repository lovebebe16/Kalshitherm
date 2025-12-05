import { useState } from 'react';
import { Search, MapPin, Plus, X } from 'lucide-react';
import { EnhancedPredictionCard } from '../components/EnhancedPredictionCard';

const defaultCities = [
  'Jakarta',
  'Tokyo',
  'New York',
  'London',
  'Singapore',
];

export const PredictionsPage = () => {
  const [cities, setCities] = useState<string[]>(defaultCities);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCity, setShowAddCity] = useState(false);
  const [newCity, setNewCity] = useState('');

  const handleAddCity = () => {
    if (newCity.trim() && !cities.includes(newCity.trim())) {
      setCities([newCity.trim(), ...cities]);
      setNewCity('');
      setShowAddCity(false);
    }
  };

  const handleRemoveCity = (cityToRemove: string) => {
    setCities(cities.filter(city => city !== cityToRemove));
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-botanical-bark mb-2">
            Temperature Predictions
          </h1>
          <p className="text-botanical-moss">
            Real-time weather forecasts powered by JMA Global Forecast System (16 days)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-botanical-moss" />
            <input
              type="text"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-botanical-sage/30 bg-white text-botanical-bark placeholder:text-botanical-moss/50 focus:outline-none focus:ring-2 focus:ring-botanical-fern/50 focus:border-botanical-fern w-48"
            />
          </div>

          {/* Add City Button */}
          <button
            onClick={() => setShowAddCity(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-botanical-fern text-botanical-cream font-semibold shadow-botanical hover:bg-botanical-forest transition-all"
          >
            <Plus size={18} />
            Add City
          </button>
        </div>
      </div>

      {/* Add City Modal */}
      {showAddCity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-botanical-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-display font-bold text-botanical-bark">Add New City</h3>
              <button
                onClick={() => setShowAddCity(false)}
                className="p-2 rounded-lg hover:bg-botanical-cream text-botanical-moss"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-botanical-moss" />
                <input
                  type="text"
                  placeholder="Enter city name..."
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCity()}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-botanical-sage/30 bg-botanical-cream/50 text-botanical-bark placeholder:text-botanical-moss/50 focus:outline-none focus:ring-2 focus:ring-botanical-fern/50"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddCity(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-botanical-sage/30 text-botanical-bark font-semibold hover:bg-botanical-cream transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCity}
                  disabled={!newCity.trim()}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-botanical-fern text-botanical-cream font-semibold shadow-botanical hover:bg-botanical-forest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add City
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* City Tags */}
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <div
            key={city}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-botanical-cream border border-botanical-sage/30 text-sm"
          >
            <MapPin size={14} className="text-botanical-fern" />
            <span className="text-botanical-bark font-medium">{city}</span>
            <button
              onClick={() => handleRemoveCity(city)}
              className="p-0.5 rounded-full hover:bg-botanical-sage/20 text-botanical-moss hover:text-botanical-terracotta transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Prediction Cards */}
      <div className="space-y-6">
        {filteredCities.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-botanical-sage/30">
            <MapPin className="w-12 h-12 text-botanical-sage mx-auto mb-4" />
            <h3 className="text-lg font-display font-semibold text-botanical-bark mb-2">No cities found</h3>
            <p className="text-botanical-moss">Try a different search or add a new city</p>
          </div>
        ) : (
          filteredCities.map((city) => (
            <EnhancedPredictionCard key={city} city={city} />
          ))
        )}
      </div>
    </div>
  );
};
