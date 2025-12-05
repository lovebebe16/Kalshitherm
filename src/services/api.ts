// Kalshitherm API Service
// Konfigurasi API untuk koneksi ke backend Supabase

import type { EnhancedWeatherData, DailyForecast, AirQuality, MarketPrediction } from '../types';
import { getWeatherDescription, getWeatherIcon } from '../types';

// TODO: Ganti dengan URL Supabase yang sebenarnya setelah deployment
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Edge Function URLs
const MARKETS_SCANNER_URL = `${SUPABASE_URL}/functions/v1/markets-scanner`;
const PREDICTIONS_API_URL = `${SUPABASE_URL}/functions/v1/predictions-api`;
const TELEGRAM_NOTIFICATIONS_URL = `${SUPABASE_URL}/functions/v1/telegram-notifications`;

// Weather API Configuration
const FORECAST_DAYS = 16; // JMA API maximum: 16 days
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Simple in-memory cache
const weatherCache = new Map<string, { data: any; timestamp: number }>();

function getCacheKey(lat: number, lon: number, type: string): string {
  return `weather_${type}_${lat.toFixed(2)}_${lon.toFixed(2)}`;
}

function getFromCache<T>(key: string): T | null {
  const entry = weatherCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    weatherCache.delete(key);
    return null;
  }
  return entry.data;
}

function setToCache<T>(key: string, data: T): void {
  weatherCache.set(key, { data, timestamp: Date.now() });
}

// Check if backend is configured
const isBackendConfigured = () => {
  return SUPABASE_URL && SUPABASE_ANON_KEY;
};

// Weather code to description mapping
const weatherDescriptions: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

// Weather code to icon mapping
const weatherIcons: Record<number, string> = {
  0: '01d', 1: '01d', 2: '02d', 3: '03d',
  45: '50d', 48: '50d',
  51: '09d', 53: '09d', 55: '09d',
  61: '10d', 63: '10d', 65: '10d',
  71: '13d', 73: '13d', 75: '13d',
  80: '09d', 81: '09d', 82: '09d',
  95: '11d', 96: '11d', 99: '11d'
};

// Weather API Service - Direct call to Open-Meteo (FREE, no API key required!)
export const weatherService = {
  /**
   * Mengambil data cuaca langsung dari Open-Meteo API (gratis, tanpa API key)
   * @param city - Nama kota
   * @param days - Jumlah hari forecast (default: 1)
   */
  async getCurrentWeather(city: string, days: number = 1) {
    try {
      // Step 1: Geocode city name to coordinates
      const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
      const geocodeResponse = await fetch(geocodeUrl);

      if (!geocodeResponse.ok) {
        throw new Error(`Geocoding API error: ${geocodeResponse.statusText}`);
      }

      const geocodeData = await geocodeResponse.json();

      if (!geocodeData.results || geocodeData.results.length === 0) {
        console.warn(`City not found: ${city}, using demo data`);
        return this.getDemoWeather(city);
      }

      const location = geocodeData.results[0];
      const { latitude, longitude, name, country } = location;

      // Step 2: Get weather data from Open-Meteo
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&forecast_days=${Math.min(days, 7)}&timezone=auto`;

      const weatherResponse = await fetch(weatherUrl);

      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.statusText}`);
      }

      const weatherData = await weatherResponse.json();

      // Process hourly data (next 24 hours)
      const hourlyBreakdown = weatherData.hourly.time.slice(0, 24).map((time: string, i: number) => ({
        time: time,
        temp: weatherData.hourly.temperature_2m[i],
        feels_like: weatherData.hourly.apparent_temperature[i],
        humidity: weatherData.hourly.relative_humidity_2m[i],
        description: weatherDescriptions[weatherData.hourly.weather_code[i]] || 'Unknown'
      }));

      // Calculate forecast high/low
      const temps = hourlyBreakdown.map((h: { temp: number }) => h.temp);
      const forecastHigh = Math.max(...temps);
      const forecastLow = Math.min(...temps);
      const forecastHighF = (forecastHigh * 9 / 5) + 32;
      const forecastLowF = (forecastLow * 9 / 5) + 32;

      // Current weather
      const currentTemp = weatherData.current.temperature_2m;
      const currentTempF = (currentTemp * 9 / 5) + 32;
      const currentWeatherCode = weatherData.current.weather_code;

      // Suggested option based on current temp vs forecast high
      const suggestedOption = forecastHighF > currentTempF ? 'Higher' : 'Lower';

      return {
        city: name,
        country: country,
        coordinates: { latitude, longitude },
        current: {
          temp: currentTemp,
          temp_fahrenheit: Math.round(currentTempF * 10) / 10,
          feels_like: weatherData.current.apparent_temperature,
          humidity: weatherData.current.relative_humidity_2m,
          wind_speed: weatherData.current.wind_speed_10m,
          description: weatherDescriptions[currentWeatherCode] || 'Unknown',
          icon: weatherIcons[currentWeatherCode] || '01d'
        },
        forecast: {
          high_celsius: Math.round(forecastHigh * 10) / 10,
          low_celsius: Math.round(forecastLow * 10) / 10,
          high_fahrenheit: Math.round(forecastHighF * 10) / 10,
          low_fahrenheit: Math.round(forecastLowF * 10) / 10,
          suggested_option: suggestedOption,
          hourly_breakdown: hourlyBreakdown
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      // Fallback ke demo data jika API gagal
      return this.getDemoWeather(city);
    }
  },

  getDemoWeather(city: string) {
    const baseTemp = 20 + Math.random() * 15;
    const currentTempF = (baseTemp * 9 / 5) + 32;
    const forecastHighF = currentTempF + Math.random() * 10;

    return {
      city: city,
      country: 'Unknown',
      coordinates: { latitude: 0, longitude: 0 },
      current: {
        temp: baseTemp,
        temp_fahrenheit: Math.round(currentTempF * 10) / 10,
        feels_like: baseTemp - 1,
        humidity: 65 + Math.random() * 20,
        wind_speed: 5 + Math.random() * 10,
        description: 'Partly cloudy',
        icon: '02d',
      },
      forecast: {
        high_celsius: baseTemp + 5,
        low_celsius: baseTemp - 3,
        high_fahrenheit: Math.round(forecastHighF * 10) / 10,
        low_fahrenheit: Math.round((forecastHighF - 15) * 10) / 10,
        suggested_option: Math.random() > 0.5 ? 'Higher' : 'Lower',
        hourly_breakdown: Array.from({ length: 24 }, (_, i) => ({
          time: new Date(Date.now() + i * 3600000).toISOString(),
          temp: baseTemp + Math.random() * 10 - 5,
          feels_like: baseTemp + Math.random() * 8 - 4,
          humidity: 60 + Math.random() * 30,
          description: 'Partly cloudy',
        })),
      },
      timestamp: new Date().toISOString(),
    };
  },
};

// Enhanced Weather Service - JMA Global Forecast (16 days)
export const enhancedWeatherService = {
  async getEnhancedForecast(city: string): Promise<EnhancedWeatherData> {
    try {
      // Step 1: Geocode city name
      const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
      const geocodeResponse = await fetch(geocodeUrl);

      if (!geocodeResponse.ok) {
        throw new Error(`Geocoding API error: ${geocodeResponse.statusText}`);
      }

      const geocodeData = await geocodeResponse.json();

      if (!geocodeData.results || geocodeData.results.length === 0) {
        console.warn(`City not found: ${city}, using demo data`);
        return this.getDemoEnhancedForecast(city);
      }

      const location = geocodeData.results[0];
      const { latitude, longitude, name, country } = location;

      // Check cache
      const cacheKey = getCacheKey(latitude, longitude, 'jma');
      const cached = getFromCache<EnhancedWeatherData>(cacheKey);
      if (cached) {
        console.log(`[Cache] JMA Forecast for ${city}`);
        return cached;
      }

      // Step 2: Fetch JMA forecast data
      const [forecastData, airQualityData] = await Promise.all([
        this.fetchJMAForecast(latitude, longitude),
        this.fetchAirQuality(latitude, longitude),
      ]);

      // Transform data
      const result = this.transformForecastData(
        forecastData,
        airQualityData,
        { latitude, longitude, name, country }
      );

      // Cache result
      setToCache(cacheKey, result);

      return result;
    } catch (error) {
      console.error('Error fetching enhanced forecast:', error);
      return this.getDemoEnhancedForecast(city);
    }
  },

  async fetchJMAForecast(latitude: number, longitude: number) {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: [
        'temperature_2m',
        'relative_humidity_2m',
        'pressure_msl',
        'precipitation',
        'cloud_cover',
        'wind_speed_10m',
        'weather_code',
      ].join(','),
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'precipitation_sum',
        'weather_code',
        'wind_speed_10m_max',
        'uv_index_max',
        'sunrise',
        'sunset',
      ].join(','),
      forecast_days: FORECAST_DAYS.toString(),
      timezone: 'auto',
      models: 'jma_gsm',
      temperature_unit: 'celsius',
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`JMA Forecast API error: ${response.statusText}`);
    }

    return response.json();
  },

  async fetchAirQuality(latitude: number, longitude: number): Promise<AirQuality | null> {
    try {
      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        hourly: ['pm2_5', 'pm10', 'carbon_monoxide', 'ozone'].join(','),
        timezone: 'auto',
      });

      const response = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`
      );

      if (!response.ok) return null;

      const data = await response.json();

      if (!data.hourly?.pm2_5) return null;

      const pm25 = data.hourly.pm2_5[0] || 0;
      const { aqi, level } = this.calculateAQI(pm25);

      return {
        pm25,
        pm10: data.hourly.pm10?.[0] || 0,
        carbonMonoxide: data.hourly.carbon_monoxide?.[0] || 0,
        ozone: data.hourly.ozone?.[0] || 0,
        aqi,
        aqiLevel: level,
      };
    } catch (error) {
      console.error('Error fetching air quality:', error);
      return null;
    }
  },

  calculateAQI(pm25: number): { aqi: number; level: string } {
    let aqi: number;
    let level: string;

    if (pm25 <= 12) {
      aqi = (pm25 / 12) * 50;
      level = 'Good';
    } else if (pm25 <= 35.4) {
      aqi = ((pm25 - 12) / (35.4 - 12)) * (100 - 50) + 50;
      level = 'Moderate';
    } else if (pm25 <= 55.4) {
      aqi = ((pm25 - 35.4) / (55.4 - 35.4)) * (150 - 100) + 100;
      level = 'Unhealthy for Sensitive';
    } else if (pm25 <= 150.4) {
      aqi = ((pm25 - 55.4) / (150.4 - 55.4)) * (200 - 150) + 150;
      level = 'Unhealthy';
    } else if (pm25 <= 250.4) {
      aqi = ((pm25 - 150.4) / (250.4 - 150.4)) * (300 - 200) + 200;
      level = 'Very Unhealthy';
    } else {
      aqi = 500;
      level = 'Hazardous';
    }

    return { aqi: Math.round(aqi), level };
  },

  transformForecastData(
    forecast: any,
    airQuality: AirQuality | null,
    location: { latitude: number; longitude: number; name: string; country: string }
  ): EnhancedWeatherData {
    const hourly = forecast.hourly;
    const daily = forecast.daily;

    // Transform hourly data (next 48 hours)
    const hourlyData = Array.from({ length: Math.min(48, hourly.time.length) }, (_, i) => ({
      time: hourly.time[i],
      temperature: hourly.temperature_2m[i],
      humidity: hourly.relative_humidity_2m[i],
      pressure: hourly.pressure_msl[i],
      precipitation: hourly.precipitation[i],
      cloudCover: hourly.cloud_cover[i],
      windSpeed: hourly.wind_speed_10m[i],
      weatherCode: hourly.weather_code[i],
    }));

    // Transform daily data with confidence
    const dailyData: DailyForecast[] = daily.time.map((date: string, i: number) => {
      const dateObj = new Date(date);
      const tempMax = daily.temperature_2m_max[i];
      const tempMin = daily.temperature_2m_min[i];
      const confidence = Math.max(25, 100 - (i * 5)); // Confidence decreases 5% per day

      return {
        date: dateObj.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
        day: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
        temperatureMax: Math.round(tempMax * 10) / 10,
        temperatureMin: Math.round(tempMin * 10) / 10,
        temperature: Math.round(((tempMax + tempMin) / 2) * 10) / 10,
        precipitationSum: Math.round((daily.precipitation_sum[i] || 0) * 10) / 10,
        uvIndexMax: daily.uv_index_max?.[i] || 0,
        sunrise: daily.sunrise?.[i] || '',
        sunset: daily.sunset?.[i] || '',
        weatherCode: daily.weather_code[i],
        windSpeedMax: Math.round((daily.wind_speed_10m_max[i] || 0) * 10) / 10,
        humidity: hourly.relative_humidity_2m[i * 24] || 65,
        confidence,
        condition: `${getWeatherIcon(daily.weather_code[i])} ${getWeatherDescription(daily.weather_code[i])}`,
      };
    });

    return {
      location: {
        latitude: location.latitude,
        longitude: location.longitude,
        name: location.name,
        country: location.country,
      },
      timezone: forecast.timezone,
      lastUpdate: new Date().toISOString(),
      hourly: hourlyData,
      daily: dailyData,
      airQuality,
      visibility: null,
      metadata: {
        elevation: forecast.elevation || 0,
        utcOffset: forecast.utc_offset_seconds || 0,
      },
    };
  },

  getDemoEnhancedForecast(city: string): EnhancedWeatherData {
    const today = new Date();
    const baseTemp = 20 + Math.random() * 10;

    const dailyData: DailyForecast[] = Array.from({ length: 16 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const variance = Math.sin(i * 0.5) * 5;
      const tempMax = baseTemp + variance + 5 + Math.random() * 3;
      const tempMin = baseTemp + variance - 3 + Math.random() * 2;
      const confidence = Math.max(25, 100 - (i * 5));
      const weatherCodes = [0, 1, 2, 3, 61, 63, 80];
      const weatherCode = weatherCodes[Math.floor(Math.random() * weatherCodes.length)];

      return {
        date: date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        temperatureMax: Math.round(tempMax * 10) / 10,
        temperatureMin: Math.round(tempMin * 10) / 10,
        temperature: Math.round(((tempMax + tempMin) / 2) * 10) / 10,
        precipitationSum: Math.random() > 0.7 ? Math.round(Math.random() * 30 * 10) / 10 : 0,
        uvIndexMax: Math.round((3 + Math.random() * 7) * 10) / 10,
        sunrise: '06:00',
        sunset: '18:00',
        weatherCode,
        windSpeedMax: Math.round((5 + Math.random() * 15) * 10) / 10,
        humidity: Math.round(50 + Math.random() * 40),
        confidence,
        condition: `${getWeatherIcon(weatherCode)} ${getWeatherDescription(weatherCode)}`,
      };
    });

    const hourlyData = Array.from({ length: 48 }, (_, i) => ({
      time: new Date(Date.now() + i * 3600000).toISOString(),
      temperature: baseTemp + Math.random() * 6 - 3,
      humidity: 50 + Math.random() * 40,
      pressure: 1013 + Math.random() * 10 - 5,
      precipitation: Math.random() > 0.8 ? Math.random() * 5 : 0,
      cloudCover: Math.random() * 100,
      windSpeed: 5 + Math.random() * 15,
      weatherCode: [0, 1, 2, 3][Math.floor(Math.random() * 4)],
    }));

    return {
      location: {
        latitude: 0,
        longitude: 0,
        name: city,
        country: 'Unknown',
      },
      timezone: 'auto',
      lastUpdate: new Date().toISOString(),
      hourly: hourlyData,
      daily: dailyData,
      airQuality: {
        pm25: Math.round(10 + Math.random() * 30),
        pm10: Math.round(15 + Math.random() * 40),
        carbonMonoxide: Math.round(200 + Math.random() * 100),
        ozone: Math.round(30 + Math.random() * 20),
        aqi: Math.round(30 + Math.random() * 50),
        aqiLevel: 'Moderate',
      },
      visibility: null,
      metadata: {
        elevation: 50,
        utcOffset: 25200,
      },
    };
  },

  clearCache() {
    weatherCache.clear();
    console.log('Weather cache cleared');
  },

  calculateMarketPrediction(weatherData: EnhancedWeatherData, targetDay: 'today' | 'tomorrow' = 'tomorrow'): MarketPrediction {
    const dayIndex = targetDay === 'today' ? 0 : 1;
    const todayHigh = weatherData.daily[0]?.temperatureMax || 0;
    const targetHigh = weatherData.daily[dayIndex]?.temperatureMax || 0;
    const targetHighF = (targetHigh * 9 / 5) + 32;

    // Calculate average confidence for next 2 days
    const avgConfidence = weatherData.daily.slice(0, 2)
      .reduce((sum, d) => sum + d.confidence, 0) / 2;

    // Suggested option based on temperature trend
    const suggestedOption: 'Higher' | 'Lower' = targetHigh > todayHigh ? 'Higher' : 'Lower';

    // Simulated market stats (in production, fetch from Polymarket API)
    const cityHash = weatherData.location.name.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const marketVolume = 10000 + (cityHash * 100) + Math.floor(Math.random() * 50000);
    const predictionCount = 50 + Math.floor(cityHash / 10) + Math.floor(Math.random() * 200);
    const avgAccuracy = 75 + Math.floor(Math.random() * 20);

    return {
      suggestedOption,
      confidence: Math.round(avgConfidence),
      marketResolutionUnit: Math.round(targetHighF * 10) / 10,
      forecastHighC: Math.round(targetHigh * 10) / 10,
      forecastHighF: Math.round(targetHighF * 10) / 10,
      marketVolume,
      predictionCount,
      avgAccuracy,
    };
  },
};

// Markets Scanner Service - Direct call to Polymarket API (PUBLIC, no auth required!)
export const marketsService = {
  /**
   * Mengambil data markets langsung dari Polymarket API
   * @param category - Kategori market (opsional)
   */
  async getMarkets(category?: string) {
    try {
      // Direct call to Polymarket CLOB API
      const polymarketUrl = 'https://clob.polymarket.com/markets';
      const polymarketResponse = await fetch(polymarketUrl);

      if (!polymarketResponse.ok) {
        throw new Error('Failed to fetch Polymarket data');
      }

      const polymarketData = await polymarketResponse.json();

      // Process and categorize markets
      const processedMarkets = polymarketData.slice(0, 50).map((market: any) => ({
        question: market.question || market.description || 'Unknown Market',
        volume: parseFloat(market.volume || '0'),
        liquidity: parseFloat(market.liquidity || '0'),
        odds_yes: parseFloat(market.bestAsk || '0.5'),
        odds_no: parseFloat(market.bestBid || '0.5'),
        polymarket_id: market.condition_id || market.id,
        category: market.category || 'general'
      }));

      // Categorize markets
      const surgingMarkets = processedMarkets
        .sort((a: any, b: any) => b.volume - a.volume)
        .slice(0, 30);

      const hiddenGems = processedMarkets
        .filter((m: any) => m.liquidity < 10000 && m.volume > 1000)
        .slice(0, 35);

      const urgentDecisions = processedMarkets.slice(0, 22);

      const evenOdds = processedMarkets
        .filter((m: any) => Math.abs(m.odds_yes - 0.5) < 0.15)
        .slice(0, 14);

      return {
        surging_markets: {
          count: surgingMarkets.length,
          markets: surgingMarkets,
        },
        hidden_gems: {
          count: hiddenGems.length,
          markets: hiddenGems.length > 0 ? hiddenGems : surgingMarkets.slice(0, 10),
        },
        urgent_decisions: {
          count: urgentDecisions.length,
          markets: urgentDecisions,
        },
        even_odds: {
          count: evenOdds.length,
          markets: evenOdds.length > 0 ? evenOdds : surgingMarkets.slice(0, 5),
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching markets from Polymarket:', error);
      // Fallback ke demo data jika API gagal (CORS issue kemungkinan)
      return this.getDemoMarkets();
    }
  },

  getDemoMarkets() {
    const demoMarkets = [
      {
        question: 'Will Bitcoin reach $100,000 by end of 2025?',
        volume: 125000,
        liquidity: 45000,
        odds_yes: 0.65,
        odds_no: 0.35,
        polymarket_id: 'btc-100k-2025',
        category: 'crypto',
      },
      {
        question: 'Will the S&P 500 hit a new all-time high in Q1 2025?',
        volume: 98000,
        liquidity: 38000,
        odds_yes: 0.72,
        odds_no: 0.28,
        polymarket_id: 'sp500-ath-q1',
        category: 'finance',
      },
      {
        question: 'Will Indonesia win the next AFF Championship?',
        volume: 85000,
        liquidity: 32000,
        odds_yes: 0.58,
        odds_no: 0.42,
        polymarket_id: 'indo-aff-2025',
        category: 'sports',
      },
      {
        question: 'Will Ethereum reach $5,000 in Q1 2025?',
        volume: 75000,
        liquidity: 28000,
        odds_yes: 0.45,
        odds_no: 0.55,
        polymarket_id: 'eth-5k-2025',
        category: 'crypto',
      },
      {
        question: 'Will there be a Fed rate cut in January 2025?',
        volume: 112000,
        liquidity: 52000,
        odds_yes: 0.35,
        odds_no: 0.65,
        polymarket_id: 'fed-rate-jan',
        category: 'finance',
      },
      {
        question: 'Will AI stocks outperform the S&P 500 in 2025?',
        volume: 89000,
        liquidity: 41000,
        odds_yes: 0.68,
        odds_no: 0.32,
        polymarket_id: 'ai-stocks-2025',
        category: 'tech',
      },
    ];

    return {
      surging_markets: {
        count: demoMarkets.length,
        markets: demoMarkets,
      },
      hidden_gems: {
        count: 4,
        markets: demoMarkets.slice(2, 6),
      },
      urgent_decisions: {
        count: 4,
        markets: demoMarkets.slice(1, 5),
      },
      even_odds: {
        count: 2,
        markets: demoMarkets.filter(m => Math.abs(m.odds_yes - 0.5) < 0.15),
      },
      timestamp: new Date().toISOString(),
    };
  },
};

// Predictions API Service - Requires Supabase Backend
export const predictionsService = {
  /**
   * Membuat prediksi baru
   * @param predictionData - Data prediksi
   * @param authToken - Token autentikasi user
   */
  async createPrediction(predictionData: any, authToken: string) {
    try {
      if (!isBackendConfigured()) {
        console.warn('Backend belum dikonfigurasi');
        // Store in localStorage for demo
        const predictions = JSON.parse(localStorage.getItem('kalshitherm_predictions') || '[]');
        const newPrediction = {
          id: `pred_${Date.now()}`,
          ...predictionData,
          created_at: new Date().toISOString()
        };
        predictions.push(newPrediction);
        localStorage.setItem('kalshitherm_predictions', JSON.stringify(predictions));
        return newPrediction;
      }

      const response = await fetch(PREDICTIONS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          action: 'create',
          predictionData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Predictions API error: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error creating prediction:', error);
      throw error;
    }
  },

  /**
   * Mengambil daftar prediksi user
   * @param authToken - Token autentikasi user (optional for local storage)
   */
  async listPredictions(authToken?: string) {
    try {
      if (!isBackendConfigured()) {
        // Return from localStorage for demo
        const predictions = JSON.parse(localStorage.getItem('kalshitherm_predictions') || '[]');
        return predictions;
      }

      const response = await fetch(PREDICTIONS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          action: 'list',
        }),
      });

      if (!response.ok) {
        throw new Error(`Predictions API error: ${response.statusText}`);
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error listing predictions:', error);
      return [];
    }
  },
};

// Telegram Notifications Service (Optional - requires Telegram Bot Token)
export const notificationsService = {
  /**
   * Mengirim notifikasi Telegram
   * @param userId - ID user
   * @param message - Pesan notifikasi
   * @param type - Tipe notifikasi
   */
  async sendNotification(userId: string, message: string, type: string = 'general') {
    try {
      if (!isBackendConfigured()) {
        console.warn('Telegram notifications requires Supabase backend');
        return { success: false };
      }

      const response = await fetch(TELEGRAM_NOTIFICATIONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          userId,
          message,
          type,
        }),
      });

      if (!response.ok) {
        console.warn('Telegram notification failed (optional feature)');
        return { success: false };
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.warn('Telegram notifications not available:', error);
      return { success: false };
    }
  },
};

// Watchlist Service - Local storage fallback
export const watchlistService = {
  getWatchlist() {
    return JSON.parse(localStorage.getItem('kalshitherm_watchlist') || '[]');
  },

  addToWatchlist(market: any) {
    const watchlist = this.getWatchlist();
    if (!watchlist.find((m: any) => m.polymarket_id === market.polymarket_id)) {
      watchlist.push({ ...market, added_at: new Date().toISOString() });
      localStorage.setItem('kalshitherm_watchlist', JSON.stringify(watchlist));
    }
    return watchlist;
  },

  removeFromWatchlist(polymarketId: string) {
    const watchlist = this.getWatchlist().filter(
      (m: any) => m.polymarket_id !== polymarketId
    );
    localStorage.setItem('kalshitherm_watchlist', JSON.stringify(watchlist));
    return watchlist;
  },

  isInWatchlist(polymarketId: string) {
    return this.getWatchlist().some((m: any) => m.polymarket_id === polymarketId);
  }
};

// Export configuration status
export const apiConfig = {
  isBackendConfigured,
  SUPABASE_URL,
  hasAnonKey: !!SUPABASE_ANON_KEY,
};
