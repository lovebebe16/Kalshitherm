import { useState, useEffect } from 'react';
import { TrendingUp, Clock, ExternalLink, BarChart3 } from 'lucide-react';
import { weatherService } from '../services/api';
import { TemperatureChartModal } from './TemperatureChartModal';
import type { WeatherData } from '../types';

interface PredictionCardProps {
  city: string;
  defaultView?: 'today' | 'tomorrow';
}

export const PredictionCard = ({ city, defaultView = 'today' }: PredictionCardProps) => {
  const [view, setView] = useState<'today' | 'tomorrow'>(defaultView);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      // Menggunakan weatherService dengan auto-fallback ke demo data
      const data = await weatherService.getCurrentWeather(city, 2);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      // weatherService sudah handle fallback ke demo data
      // Tapi jika masih error, set demo data manual
      const demoTemp = 15 + Math.random() * 15;
      const demoFahrenheit = (demoTemp * 9/5) + 32;
      setWeatherData({
        city: city,
        country: 'ID',
        coordinates: { latitude: 0, longitude: 0 },
        current: {
          temp: demoTemp,
          temp_fahrenheit: demoFahrenheit,
          feels_like: demoTemp - 1,
          humidity: 65,
          wind_speed: 5,
          description: 'partly cloudy',
          icon: '02d'
        },
        forecast: {
          high_celsius: demoTemp + 3,
          low_celsius: demoTemp - 2,
          high_fahrenheit: demoFahrenheit + 5.4,
          low_fahrenheit: demoFahrenheit - 3.6,
          suggested_option: demoTemp > 20 ? 'Higher' : 'Lower',
          hourly_breakdown: Array.from({ length: 24 }, (_, i) => ({
            time: new Date(Date.now() + i * 3600000).toISOString(),
            temp: demoTemp + (Math.random() * 4 - 2),
            feels_like: demoTemp + (Math.random() * 3 - 1.5),
            humidity: 60 + Math.floor(Math.random() * 20),
            description: ['clear sky', 'few clouds', 'scattered clouds', 'broken clouds'][Math.floor(Math.random() * 4)]
          }))
        },
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-botanical-sage/30 shadow-botanical animate-pulse">
        <div className="h-6 bg-botanical-cream rounded-lg w-1/3 mb-4"></div>
        <div className="h-20 bg-botanical-cream rounded-lg mb-4"></div>
        <div className="h-4 bg-botanical-cream rounded-lg w-1/2"></div>
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <>
      {showModal && (
        <TemperatureChartModal 
          weatherData={weatherData}
          onClose={() => setShowModal(false)}
        />
      )}
      <div 
        onClick={() => setShowModal(true)}
        className="bg-white rounded-2xl p-6 border border-botanical-sage/30 hover:border-botanical-fern shadow-botanical hover:shadow-botanical-lg transition-all duration-300 cursor-pointer"
      >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-xl font-display font-bold text-botanical-bark mb-1">{weatherData.city}</h3>
          <p className="text-botanical-moss text-sm">Temperature Prediction Market</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('today')}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              view === 'today'
                ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
                : 'bg-botanical-cream text-botanical-bark hover:bg-botanical-moss/20'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setView('tomorrow')}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              view === 'tomorrow'
                ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
                : 'bg-botanical-cream text-botanical-bark hover:bg-botanical-moss/20'
            }`}
          >
            Tomorrow
          </button>
        </div>
      </div>

      <div className="bg-botanical-cream rounded-2xl p-5 mb-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-botanical-moss text-sm mb-1">Forecast High</p>
            <p className="text-3xl font-display font-bold text-botanical-fern">
              {weatherData.forecast.high_celsius.toFixed(1)}°C
            </p>
          </div>
          <div>
            <p className="text-botanical-moss text-sm mb-1">Market Resolution Unit</p>
            <p className="text-3xl font-display font-bold text-botanical-marigold">
              {weatherData.forecast.high_fahrenheit.toFixed(1)}°F
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-botanical-sage/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-botanical-fern" />
            <p className="text-botanical-moss text-sm">Suggested Option</p>
          </div>
          <p className="text-lg font-semibold text-botanical-fern">
            {weatherData.forecast.suggested_option}
          </p>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-botanical-moss" />
          <p className="text-sm font-medium text-botanical-bark">Hourly Breakdown (±1H from peak)</p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {weatherData.forecast.hourly_breakdown.slice(0, 4).map((hour, idx) => (
            <div key={idx} className="bg-botanical-cream rounded-xl p-3 text-center">
              <p className="text-xs text-botanical-moss mb-1">
                {new Date(hour.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-lg font-bold text-botanical-bark">{hour.temp.toFixed(1)}°C</p>
              <p className="text-xs text-botanical-moss/70 mt-1">{hour.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(true);
        }}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-botanical-fern hover:bg-botanical-forest rounded-xl text-botanical-cream font-semibold transition-all shadow-botanical hover:shadow-botanical-lg"
      >
        <BarChart3 className="w-4 h-4" />
        <span>View Charts</span>
      </button>
    </div>
    </>
  );
};
