export interface User {
  id: string;
  email: string;
  wallet_address?: string;
  telegram_id?: string;
  created_at: string;
}

export interface Prediction {
  id: string;
  user_id: string;
  city: string;
  date: string;
  predicted_temp: number;
  actual_temp?: number;
  confidence_score: number;
  market_resolution_unit: string;
  suggested_option: string;
  created_at: string;
}

export interface Market {
  id: string;
  question: string;
  category: string;
  polymarket_id: string;
  volume: number;
  liquidity: number;
  status: string;
  odds_yes: number;
  odds_no: number;
  created_at: string;
  updated_at: string;
}

export interface Watchlist {
  id: string;
  user_id: string;
  market_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  message: string;
  sent_at: string;
  read: boolean;
}

export interface WeatherData {
  city: string;
  country?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  current: {
    temp: number;
    temp_fahrenheit: number;
    feels_like: number;
    humidity: number;
    wind_speed?: number;
    description: string;
    icon: string;
  };
  forecast: {
    high_celsius: number;
    low_celsius?: number;
    high_fahrenheit: number;
    low_fahrenheit?: number;
    suggested_option: string;
    hourly_breakdown: Array<{
      time: string;
      temp: number;
      feels_like: number;
      humidity: number;
      description: string;
    }>;
  };
  timestamp: string;
}

export interface ScannerCategory {
  count: number;
  markets: Market[];
}

export interface ScannerData {
  surging_markets: ScannerCategory;
  hidden_gems: ScannerCategory;
  urgent_decisions: ScannerCategory;
  even_odds: ScannerCategory;
  timestamp: string;
}

// Enhanced Weather Prediction Types (JMA Global Forecast)
export interface DailyForecast {
  date: string;
  day: string;
  temperatureMax: number;
  temperatureMin: number;
  temperature: number;
  precipitationSum: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
  weatherCode: number;
  windSpeedMax: number;
  humidity: number;
  confidence: number;
  condition: string;
}

export interface AirQuality {
  pm25: number;
  pm10: number;
  carbonMonoxide: number;
  ozone: number;
  aqi: number;
  aqiLevel: string;
}

export interface EnhancedWeatherData {
  location: {
    latitude: number;
    longitude: number;
    name: string;
    country: string;
  };
  timezone: string;
  lastUpdate: string;
  hourly: Array<{
    time: string;
    temperature: number;
    humidity: number;
    pressure: number;
    precipitation: number;
    cloudCover: number;
    windSpeed: number;
    weatherCode: number;
  }>;
  daily: DailyForecast[];
  airQuality: AirQuality | null;
  visibility: {
    value: number;
    valueKm: number;
  } | null;
  metadata: {
    elevation: number;
    utcOffset: number;
  };
}

export interface PredictionStats {
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  expectedRain: number;
  avgConfidence: number;
}

export interface MarketPrediction {
  suggestedOption: 'Higher' | 'Lower';
  confidence: number;
  marketResolutionUnit: number; // Fahrenheit
  forecastHighC: number;
  forecastHighF: number;
  marketVolume: number;
  predictionCount: number;
  avgAccuracy: number;
}

// WMO Weather Code Mappings
export const WEATHER_CODE_MAP: Record<number, {
  description: string;
  icon: string;
  severity: 'clear' | 'cloudy' | 'rainy' | 'stormy';
}> = {
  0: { description: 'Clear Sky', icon: '☀️', severity: 'clear' },
  1: { description: 'Mainly Clear', icon: '🌤️', severity: 'clear' },
  2: { description: 'Partly Cloudy', icon: '⛅', severity: 'cloudy' },
  3: { description: 'Overcast', icon: '☁️', severity: 'cloudy' },
  45: { description: 'Foggy', icon: '🌫️', severity: 'cloudy' },
  48: { description: 'Depositing Rime Fog', icon: '🌫️', severity: 'cloudy' },
  51: { description: 'Light Drizzle', icon: '🌧️', severity: 'rainy' },
  53: { description: 'Moderate Drizzle', icon: '🌧️', severity: 'rainy' },
  55: { description: 'Dense Drizzle', icon: '🌧️', severity: 'rainy' },
  61: { description: 'Slight Rain', icon: '🌧️', severity: 'rainy' },
  63: { description: 'Moderate Rain', icon: '🌧️', severity: 'rainy' },
  65: { description: 'Heavy Rain', icon: '⛈️', severity: 'rainy' },
  71: { description: 'Slight Snow', icon: '❄️', severity: 'stormy' },
  73: { description: 'Moderate Snow', icon: '❄️', severity: 'stormy' },
  75: { description: 'Heavy Snow', icon: '❄️', severity: 'stormy' },
  77: { description: 'Snow Grains', icon: '❄️', severity: 'stormy' },
  80: { description: 'Slight Rain Showers', icon: '🌦️', severity: 'rainy' },
  81: { description: 'Moderate Rain Showers', icon: '🌦️', severity: 'rainy' },
  82: { description: 'Violent Rain Showers', icon: '⛈️', severity: 'stormy' },
  85: { description: 'Slight Snow Showers', icon: '🌨️', severity: 'stormy' },
  86: { description: 'Heavy Snow Showers', icon: '🌨️', severity: 'stormy' },
  95: { description: 'Thunderstorm', icon: '⛈️', severity: 'stormy' },
  96: { description: 'Thunderstorm with Slight Hail', icon: '⛈️', severity: 'stormy' },
  99: { description: 'Thunderstorm with Heavy Hail', icon: '⛈️', severity: 'stormy' },
};

export function getWeatherDescription(code: number): string {
  return WEATHER_CODE_MAP[code]?.description || 'Unknown';
}

export function getWeatherIcon(code: number): string {
  return WEATHER_CODE_MAP[code]?.icon || '🌡️';
}
