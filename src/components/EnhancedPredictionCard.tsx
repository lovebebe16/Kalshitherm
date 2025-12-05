import { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, Droplets, Wind, Sun, BarChart3, RefreshCw, Target, ChevronUp, ChevronDown } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
} from 'recharts';
import { enhancedWeatherService } from '../services/api';
import { TemperatureChartModal } from './TemperatureChartModal';
import type { EnhancedWeatherData, PredictionStats, MarketPrediction, WeatherData } from '../types';

interface EnhancedPredictionCardProps {
  city: string;
}

type ForecastRange = '5days' | '10days' | '15days';
type MetricType = 'temperature' | 'precipitation' | 'wind' | 'combined';
type MarketView = 'today' | 'tomorrow';

export const EnhancedPredictionCard = ({ city }: EnhancedPredictionCardProps) => {
  const [forecastRange, setForecastRange] = useState<ForecastRange>('5days');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('temperature');
  const [marketView, setMarketView] = useState<MarketView>('tomorrow');
  const [weatherData, setWeatherData] = useState<EnhancedWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showChartModal, setShowChartModal] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      const data = await enhancedWeatherService.getEnhancedForecast(city);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching enhanced forecast:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    enhancedWeatherService.clearCache();
    await fetchWeatherData();
    setRefreshing(false);
  };

  const daysToShow = forecastRange === '5days' ? 5 : forecastRange === '10days' ? 10 : 15;

  const displayData = useMemo(() => {
    if (!weatherData) return [];
    return weatherData.daily.slice(0, daysToShow);
  }, [weatherData, daysToShow]);

  const stats: PredictionStats = useMemo(() => {
    if (displayData.length === 0) {
      return { avgTemp: 0, maxTemp: 0, minTemp: 0, expectedRain: 0, avgConfidence: 0 };
    }
    return {
      avgTemp: Math.round(displayData.reduce((sum, d) => sum + d.temperature, 0) / displayData.length * 10) / 10,
      maxTemp: Math.max(...displayData.map(d => d.temperatureMax)),
      minTemp: Math.min(...displayData.map(d => d.temperatureMin)),
      expectedRain: Math.round(displayData.reduce((sum, d) => sum + d.precipitationSum, 0) * 10) / 10,
      avgConfidence: Math.round(displayData.reduce((sum, d) => sum + d.confidence, 0) / displayData.length),
    };
  }, [displayData]);

  // Market prediction calculation
  const marketPrediction: MarketPrediction = useMemo(() => {
    if (!weatherData) {
      return {
        suggestedOption: 'Higher',
        confidence: 0,
        marketResolutionUnit: 0,
        forecastHighC: 0,
        forecastHighF: 0,
        marketVolume: 0,
        predictionCount: 0,
        avgAccuracy: 0,
      };
    }
    return enhancedWeatherService.calculateMarketPrediction(weatherData, marketView);
  }, [weatherData, marketView]);

  // Convert enhanced data to WeatherData format for modal
  const legacyWeatherData: WeatherData | null = useMemo(() => {
    if (!weatherData) return null;
    const todayData = weatherData.daily[0];
    const hourlyBreakdown = weatherData.hourly.slice(0, 24).map(h => ({
      time: h.time,
      temp: h.temperature,
      feels_like: h.temperature - 1,
      humidity: h.humidity,
      description: h.weatherCode <= 3 ? 'Clear' : h.weatherCode <= 50 ? 'Cloudy' : 'Rainy',
    }));

    return {
      city: weatherData.location.name,
      country: weatherData.location.country,
      coordinates: {
        latitude: weatherData.location.latitude,
        longitude: weatherData.location.longitude,
      },
      current: {
        temp: todayData?.temperature || 0,
        temp_fahrenheit: ((todayData?.temperature || 0) * 9 / 5) + 32,
        feels_like: (todayData?.temperature || 0) - 1,
        humidity: todayData?.humidity || 65,
        wind_speed: todayData?.windSpeedMax || 0,
        description: todayData?.condition || 'Unknown',
        icon: '02d',
      },
      forecast: {
        high_celsius: marketPrediction.forecastHighC,
        low_celsius: todayData?.temperatureMin || 0,
        high_fahrenheit: marketPrediction.forecastHighF,
        low_fahrenheit: ((todayData?.temperatureMin || 0) * 9 / 5) + 32,
        suggested_option: marketPrediction.suggestedOption,
        hourly_breakdown: hourlyBreakdown,
      },
      timestamp: weatherData.lastUpdate,
    };
  }, [weatherData, marketPrediction]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-botanical-sage/30 shadow-botanical animate-pulse">
        <div className="h-8 bg-botanical-cream rounded-lg w-1/3 mb-4"></div>
        <div className="h-4 bg-botanical-cream rounded-lg w-1/2 mb-6"></div>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-botanical-cream rounded-2xl"></div>
          ))}
        </div>
        <div className="h-80 bg-botanical-cream rounded-2xl"></div>
      </div>
    );
  }

  if (!weatherData) return null;

  return (
    <>
      {/* Temperature Chart Modal */}
      {showChartModal && legacyWeatherData && (
        <TemperatureChartModal
          weatherData={legacyWeatherData}
          onClose={() => setShowChartModal(false)}
        />
      )}

      <div className="bg-white rounded-2xl p-6 border border-botanical-sage/30 shadow-botanical space-y-6">
        {/* Header with Market Toggle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-botanical-bark mb-1">
              {weatherData.location.name}
            </h2>
            <p className="text-botanical-moss text-sm">
              Temperature Prediction Market - JMA Global Forecast
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Today/Tomorrow Toggle */}
            <div className="flex gap-1 bg-botanical-cream rounded-xl p-1">
              <button
                onClick={() => setMarketView('today')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${marketView === 'today'
                    ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
                    : 'text-botanical-bark hover:bg-botanical-sage/20'
                  }`}
              >
                Today
              </button>
              <button
                onClick={() => setMarketView('tomorrow')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${marketView === 'tomorrow'
                    ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
                    : 'text-botanical-bark hover:bg-botanical-sage/20'
                  }`}
              >
                Tomorrow
              </button>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 rounded-xl bg-botanical-cream hover:bg-botanical-sage/20 text-botanical-bark transition-all"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Market Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Forecast High */}
          <div className="bg-botanical-cream rounded-2xl p-5 border border-botanical-sage/20">
            <p className="text-botanical-moss text-sm mb-2">Forecast High ({marketView === 'today' ? 'Today' : 'Tomorrow'})</p>
            <p className="text-4xl font-display font-bold text-botanical-fern">
              {marketPrediction.forecastHighC}°C
            </p>
          </div>

          {/* Market Resolution Unit */}
          <div className="bg-botanical-cream rounded-2xl p-5 border border-botanical-sage/20">
            <p className="text-botanical-moss text-sm mb-2">Market Resolution Unit</p>
            <p className="text-4xl font-display font-bold text-botanical-marigold">
              {marketPrediction.forecastHighF}°F
            </p>
          </div>

          {/* Suggested Option */}
          <div className={`rounded-2xl p-5 border ${marketPrediction.suggestedOption === 'Higher'
              ? 'bg-botanical-fern/10 border-botanical-fern/30'
              : 'bg-botanical-terracotta/10 border-botanical-terracotta/30'
            }`}>
            <p className="text-botanical-moss text-sm mb-2">Suggested Option</p>
            <div className="flex items-center gap-2">
              {marketPrediction.suggestedOption === 'Higher' ? (
                <ChevronUp className="w-8 h-8 text-botanical-fern" />
              ) : (
                <ChevronDown className="w-8 h-8 text-botanical-terracotta" />
              )}
              <p className={`text-3xl font-display font-bold ${marketPrediction.suggestedOption === 'Higher'
                  ? 'text-botanical-fern'
                  : 'text-botanical-terracotta'
                }`}>
                {marketPrediction.suggestedOption}
              </p>
            </div>
            <p className="text-xs text-botanical-moss mt-2">
              {marketPrediction.confidence}% confidence
            </p>
          </div>
        </div>

        {/* Market Stats Row */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-botanical-cream rounded-lg">
            <Target size={14} className="text-botanical-fern" />
            <span className="text-botanical-moss">Accuracy:</span>
            <span className="font-semibold text-botanical-bark">{marketPrediction.avgAccuracy}%</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-botanical-cream rounded-lg">
            <span className="text-botanical-moss">Volume:</span>
            <span className="font-semibold text-botanical-bark">${(marketPrediction.marketVolume / 1000).toFixed(1)}K</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-botanical-cream rounded-lg">
            <span className="text-botanical-moss">Predictions:</span>
            <span className="font-semibold text-botanical-bark">{marketPrediction.predictionCount}</span>
          </div>
        </div>

        {/* Forecast Range Selector */}
        <div className="flex gap-2 flex-wrap">
          {(['5days', '10days', '15days'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setForecastRange(range)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${forecastRange === range
                  ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
                  : 'bg-botanical-cream text-botanical-bark hover:bg-botanical-sage/20'
                }`}
            >
              {range === '5days' ? 'Next 5 Days' : range === '10days' ? 'Next 10 Days' : 'Next 15 Days'}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: 'Avg Temp', value: `${stats.avgTemp}°C`, icon: '🌡️', gradient: 'from-botanical-marigold to-botanical-terracotta' },
            { label: 'Max Temp', value: `${stats.maxTemp}°C`, icon: '📈', gradient: 'from-botanical-terracotta to-red-500' },
            { label: 'Min Temp', value: `${stats.minTemp}°C`, icon: '❄️', gradient: 'from-blue-400 to-botanical-fern' },
            { label: 'Expected Rain', value: `${stats.expectedRain}mm`, icon: '🌧️', gradient: 'from-botanical-fern to-botanical-moss' },
            { label: 'Confidence', value: `${stats.avgConfidence}%`, icon: '🎯', gradient: 'from-botanical-moss to-botanical-forest' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${stat.gradient} rounded-2xl p-4 text-botanical-cream shadow-botanical`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-xs opacity-90">{stat.label}</p>
              <p className="text-lg font-display font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Metric Selector */}
        <div className="flex gap-2 flex-wrap">
          {([
            { key: 'temperature' as const, label: '🌡️ Temperature', icon: null },
            { key: 'precipitation' as const, label: '💧 Precipitation', icon: null },
            { key: 'wind' as const, label: '💨 Wind', icon: null },
            { key: 'combined' as const, label: 'Combined', icon: BarChart3 },
          ]).map((metric) => (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${selectedMetric === metric.key
                  ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
                  : 'bg-botanical-cream text-botanical-bark hover:bg-botanical-sage/20'
                }`}
            >
              {metric.icon ? <metric.icon size={16} /> : null}
              {metric.label}
            </button>
          ))}
        </div>

        {/* Main Chart */}
        <div className="bg-botanical-cream/50 rounded-2xl p-5 border border-botanical-sage/20">
          <h3 className="text-lg font-display font-semibold text-botanical-bark mb-4">
            {selectedMetric === 'temperature' && '🌡️ Temperature Forecast'}
            {selectedMetric === 'precipitation' && '💧 Precipitation Forecast'}
            {selectedMetric === 'wind' && '💨 Wind Speed Forecast'}
            {selectedMetric === 'combined' && <span className="flex items-center gap-2"><BarChart3 size={20} /> Combined Forecast</span>}
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            {selectedMetric === 'temperature' ? (
              <ComposedChart data={displayData}>
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b7472a" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#b7472a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74, 124, 89, 0.2)" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #d4c5b0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Area type="monotone" dataKey="temperatureMax" stroke="#b7472a" fill="url(#tempGradient)" name="Max Temp" />
                <Line type="monotone" dataKey="temperature" stroke="#4a7c59" strokeWidth={2} dot={{ fill: '#4a7c59' }} name="Avg Temp" />
                <Line type="monotone" dataKey="temperatureMin" stroke="#f9a620" strokeWidth={2} dot={{ fill: '#f9a620' }} name="Min Temp" />
              </ComposedChart>
            ) : selectedMetric === 'precipitation' ? (
              <AreaChart data={displayData}>
                <defs>
                  <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4a7c59" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4a7c59" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74, 124, 89, 0.2)" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #d4c5b0',
                    borderRadius: '12px',
                  }}
                />
                <Area type="monotone" dataKey="precipitationSum" stroke="#4a7c59" fill="url(#rainGradient)" name="Precipitation (mm)" />
              </AreaChart>
            ) : selectedMetric === 'wind' ? (
              <LineChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74, 124, 89, 0.2)" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #d4c5b0',
                    borderRadius: '12px',
                  }}
                />
                <Line type="monotone" dataKey="windSpeedMax" stroke="#b7472a" strokeWidth={3} dot={{ fill: '#b7472a', r: 5 }} name="Wind (km/h)" />
              </LineChart>
            ) : (
              <ComposedChart data={displayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(74, 124, 89, 0.2)" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #d4c5b0',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="precipitationSum" fill="#4a7c59" opacity={0.6} name="Rain (mm)" />
                <Line type="monotone" dataKey="temperature" stroke="#f9a620" strokeWidth={2} name="Temp (°C)" />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Daily Forecast Cards */}
        <div className="space-y-3">
          <h3 className="text-lg font-display font-semibold text-botanical-bark">Daily Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {displayData.slice(0, 5).map((forecast, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-botanical-sage/30 shadow-botanical hover:shadow-botanical-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-display font-semibold text-botanical-bark">{forecast.day}</p>
                    <p className="text-xs text-botanical-moss">{forecast.date}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-botanical-fern/20 text-botanical-fern rounded-lg font-semibold">
                    {forecast.confidence}%
                  </span>
                </div>

                <p className="text-2xl mb-3">{forecast.condition.split(' ')[0]}</p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-botanical-moss flex items-center gap-1">
                      <Sun size={14} /> Temp
                    </span>
                    <span className="font-semibold text-botanical-bark">{forecast.temperature}°C</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-botanical-moss flex items-center gap-1">
                      <TrendingUp size={14} /> Range
                    </span>
                    <span className="font-semibold text-botanical-bark">
                      {forecast.temperatureMin}° - {forecast.temperatureMax}°C
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-botanical-moss flex items-center gap-1">
                      <Droplets size={14} /> Rain
                    </span>
                    <span className="font-semibold text-botanical-bark">{forecast.precipitationSum}mm</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-botanical-moss flex items-center gap-1">
                      <Wind size={14} /> Wind
                    </span>
                    <span className="font-semibold text-botanical-bark">{forecast.windSpeedMax} km/h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Air Quality Info */}
        {weatherData.airQuality && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-botanical-cream to-botanical-petal rounded-2xl p-5 border border-botanical-sage/20">
              <h3 className="font-display font-semibold text-botanical-bark mb-2">🌬️ Air Quality</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-botanical-fern">{weatherData.airQuality.aqi}</span>
                <span className="text-sm text-botanical-moss">AQI - {weatherData.airQuality.aqiLevel}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-botanical-moss">PM2.5:</span>{' '}
                  <span className="font-semibold text-botanical-bark">{weatherData.airQuality.pm25} µg/m³</span>
                </div>
                <div>
                  <span className="text-botanical-moss">PM10:</span>{' '}
                  <span className="font-semibold text-botanical-bark">{weatherData.airQuality.pm10} µg/m³</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-botanical-cream to-botanical-petal rounded-2xl p-5 border border-botanical-sage/20">
              <h3 className="font-display font-semibold text-botanical-bark mb-2">📈 Model Info</h3>
              <p className="text-sm text-botanical-moss mb-2">
                Data predictions are updated every 6 hours with latest observations and satellite data.
              </p>
              <p className="text-xs text-botanical-moss/70">
                Confidence decreases over time: Day 1 (~95%) to Day 15 (~25%)
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowChartModal(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-botanical-cream hover:bg-botanical-sage/20 rounded-xl text-botanical-bark font-semibold transition-all border border-botanical-sage/30"
          >
            <BarChart3 className="w-4 h-4" />
            <span>View Charts</span>
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-botanical-marigold hover:brightness-110 rounded-xl text-botanical-bark font-semibold transition-all shadow-warm hover:shadow-warm-lg"
          >
            <Target className="w-4 h-4" />
            <span>Place Prediction</span>
          </button>
        </div>
      </div>
    </>
  );
};
