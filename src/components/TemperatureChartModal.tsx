// @ts-nocheck
import { X, TrendingUp, Thermometer, Cloud, Droplets } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';
import type { WeatherData } from '../types';

interface TemperatureChartModalProps {
  weatherData: WeatherData;
  onClose: () => void;
}

export const TemperatureChartModal = ({ weatherData, onClose }: TemperatureChartModalProps) => {
  const [timeRange, setTimeRange] = useState<'24H' | '7D' | '30D'>('7D');

  // Generate mock historical temperature data
  const generateTempHistory = (days: number) => {
    const data = [];
    const now = Date.now();
    const baseTemp = weatherData.forecast.high_celsius;
    
    for (let i = days; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      const variation = (Math.random() - 0.5) * 8;
      const predictedTemp = baseTemp + variation;
      const actualTemp = i === 0 ? weatherData.current.temp : predictedTemp + (Math.random() - 0.5) * 3;
      
      data.push({
        date: date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString(),
        predicted: parseFloat(predictedTemp.toFixed(1)),
        actual: i === 0 ? parseFloat(actualTemp.toFixed(1)) : null,
        high: parseFloat((predictedTemp + 2).toFixed(1)),
        low: parseFloat((predictedTemp - 2).toFixed(1)),
        confidence: Math.floor(Math.random() * 30) + 70
      });
    }
    return data;
  };

  const generateAccuracyData = () => {
    return Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      accuracy: Math.floor(Math.random() * 15) + 85,
      predictions: Math.floor(Math.random() * 50) + 20
    }));
  };

  const days = timeRange === '24H' ? 1 : timeRange === '7D' ? 7 : 30;
  const tempHistory = generateTempHistory(days);
  const accuracyData = generateAccuracyData();

  const avgAccuracy = accuracyData.reduce((acc, d) => acc + d.accuracy, 0) / accuracyData.length;
  const predictedF = (weatherData.forecast.high_celsius * 9/5) + 32;

  return (
    <div className="fixed inset-0 bg-botanical-bark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-botanical-sage/30 shadow-botanical-lg scrollbar-botanical">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-botanical-sage/20 p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="w-5 h-5 text-botanical-marigold" />
              <span className="px-2.5 py-1 bg-botanical-marigold/15 border border-botanical-marigold/30 rounded-lg text-xs text-botanical-bark font-medium">
                Temperature Prediction
              </span>
            </div>
            <h2 className="text-2xl font-display font-bold text-botanical-bark mb-2">{weatherData.city} Temperature Market</h2>
            <p className="text-botanical-moss text-sm">{weatherData.current.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-botanical-cream rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-botanical-moss" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="col-span-2 space-y-6">
            {/* Time Range Selector */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-botanical-bark">Temperature Forecast</h3>
              <div className="flex gap-2">
                {(['24H', '7D', '30D'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      timeRange === range
                        ? 'bg-botanical-marigold text-botanical-bark shadow-warm'
                        : 'bg-botanical-cream text-botanical-bark hover:bg-botanical-moss/20'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Temperature Chart */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={tempHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6b9b7a" 
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b9b7a" 
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#6b9b7a' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d4cfbf',
                      borderRadius: '12px',
                      color: '#3d2c1f'
                    }}
                    formatter={(value: number) => [`${value}°C`, '']}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="high"
                    stroke="#f9a620"
                    fill="#f9a620"
                    fillOpacity={0.1}
                    name="High Range"
                  />
                  <Area
                    type="monotone"
                    dataKey="low"
                    stroke="#6b9b7a"
                    fill="#6b9b7a"
                    fillOpacity={0.1}
                    name="Low Range"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#4a7c59"
                    strokeWidth={2}
                    dot={{ fill: '#4a7c59', r: 4 }}
                    name="Predicted"
                  />
                  {timeRange === '24H' && (
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#b7472a"
                      strokeWidth={2}
                      dot={{ fill: '#b7472a', r: 4 }}
                      name="Actual"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Prediction Accuracy Chart */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-4">Prediction Accuracy (Last 7 Days)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={accuracyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d4cfbf" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#6b9b7a" 
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b9b7a" 
                    style={{ fontSize: '12px' }}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d4cfbf',
                      borderRadius: '12px',
                      color: '#3d2c1f'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                  <Bar dataKey="accuracy" fill="#4a7c59" name="Accuracy %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Hourly Breakdown */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-4">Hourly Breakdown</h4>
              <div className="grid grid-cols-4 gap-3">
                {weatherData.forecast.hourly_breakdown.map((hour, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-3 border border-botanical-sage/30 shadow-warm">
                    <p className="text-xs text-botanical-moss mb-1">
                      {new Date(hour.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xl font-display font-bold text-botanical-bark mb-1">{hour.temp.toFixed(1)}°C</p>
                    <p className="text-xs text-botanical-moss">{hour.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-xs text-botanical-moss">
                      <Droplets className="w-3 h-3" />
                      <span>{hour.humidity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            {/* Current Weather */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-4">Current Weather</h4>
              <div className="text-center mb-4">
                <div className="text-5xl font-display font-bold text-botanical-fern mb-2">
                  {weatherData.current.temp.toFixed(1)}°C
                </div>
                <p className="text-botanical-moss text-sm capitalize">{weatherData.current.description}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-botanical-moss">Feels Like</span>
                  <span className="text-botanical-bark font-medium">{weatherData.current.feels_like.toFixed(1)}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-botanical-moss">Humidity</span>
                  <span className="text-botanical-bark font-medium">{weatherData.current.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-botanical-moss">Fahrenheit</span>
                  <span className="text-botanical-bark font-medium">{weatherData.current.temp_fahrenheit.toFixed(1)}°F</span>
                </div>
              </div>
            </div>

            {/* Forecast */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-4">Forecast High</h4>
              <div className="space-y-3">
                <div className="p-3 bg-botanical-marigold/10 border border-botanical-marigold/30 rounded-xl">
                  <p className="text-xs text-botanical-moss mb-1">Celsius</p>
                  <p className="text-2xl font-display font-bold text-botanical-marigold">
                    {weatherData.forecast.high_celsius.toFixed(1)}°C
                  </p>
                </div>
                <div className="p-3 bg-botanical-fern/10 border border-botanical-fern/30 rounded-xl">
                  <p className="text-xs text-botanical-moss mb-1">Fahrenheit (Market Unit)</p>
                  <p className="text-2xl font-display font-bold text-botanical-fern">
                    {predictedF.toFixed(1)}°F
                  </p>
                </div>
              </div>
            </div>

            {/* Suggested Option */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-3">Suggested Option</h4>
              <div className="flex items-center gap-2 p-3 bg-botanical-fern/10 border border-botanical-fern/30 rounded-xl">
                <TrendingUp className="w-5 h-5 text-botanical-fern" />
                <span className="text-lg font-bold text-botanical-fern">
                  {weatherData.forecast.suggested_option}
                </span>
              </div>
            </div>

            {/* Prediction Stats */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-4">Prediction Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-botanical-moss">Avg Accuracy</span>
                  <span className="text-botanical-fern font-semibold">{avgAccuracy.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-botanical-moss">Total Predictions</span>
                  <span className="text-botanical-bark font-semibold">{Math.floor(Math.random() * 500) + 100}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-botanical-moss">Market Volume</span>
                  <span className="text-botanical-bark font-semibold">${Math.floor(Math.random() * 100) + 50}K</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full px-4 py-3 bg-botanical-marigold hover:brightness-110 rounded-xl text-botanical-bark font-semibold transition-all shadow-warm hover:shadow-warm-lg flex items-center justify-center gap-2">
              <Thermometer className="w-4 h-4" />
              Place Prediction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
