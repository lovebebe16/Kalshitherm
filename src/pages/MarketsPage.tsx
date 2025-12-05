import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { MarketCard } from '../components/MarketCard';
import { MarketDetailModal } from '../components/MarketDetailModal';
import type { Market } from '../types';

export const MarketsPage = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [filteredMarkets, setFilteredMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'volume' | 'liquidity' | 'recent'>('volume');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  useEffect(() => {
    fetchMarkets();
  }, []);

  useEffect(() => {
    filterAndSortMarkets();
  }, [searchQuery, sortBy, markets]);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      // Climate prediction markets data based on Kalshi climate category
      const climateMarkets: Market[] = [
        // Snow Predictions
        { id: 'snow-philadelphia', question: 'Snow in Philadelphia this month? (Above 3.0 inches)', category: 'weather', polymarket_id: 'kalshi-snow-phl', volume: 33469, liquidity: 15000, status: 'active', odds_yes: 0.19, odds_no: 0.81, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-denver', question: 'Snow in Denver this month? (Above 10.0 inches)', category: 'weather', polymarket_id: 'kalshi-snow-den', volume: 44987, liquidity: 22000, status: 'active', odds_yes: 0.27, odds_no: 0.73, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-jackson', question: 'Snow in Jackson, WY this month? (Above 15.0 inches)', category: 'weather', polymarket_id: 'kalshi-snow-jac', volume: 67543, liquidity: 32000, status: 'active', odds_yes: 0.58, odds_no: 0.42, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-nyc', question: 'Snow in New York City this month? (Above 3.0 inches)', category: 'weather', polymarket_id: 'kalshi-snow-nyc', volume: 38798, liquidity: 18000, status: 'active', odds_yes: 0.55, odds_no: 0.45, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-washington', question: 'Snow in Washington DC this month? (Above 3.0 inches)', category: 'weather', polymarket_id: 'kalshi-snow-dc', volume: 29177, liquidity: 14000, status: 'active', odds_yes: 0.26, odds_no: 0.74, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-seattle', question: 'Snow in Seattle this month? (Above 0.1 inches)', category: 'weather', polymarket_id: 'kalshi-snow-sea', volume: 29743, liquidity: 14500, status: 'active', odds_yes: 0.48, odds_no: 0.52, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-boston', question: 'Snow in Boston this month? (Above 6.0 inches)', category: 'weather', polymarket_id: 'kalshi-snow-bos', volume: 18202, liquidity: 9000, status: 'active', odds_yes: 0.50, odds_no: 0.50, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-chicago', question: 'Snow in Chicago this month? (Above 8.0 inches)', category: 'weather', polymarket_id: 'kalshi-snow-chi', volume: 28035, liquidity: 13500, status: 'active', odds_yes: 0.49, odds_no: 0.51, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-dallas', question: 'Snow in Dallas this month? (Above 0.1 inches)', category: 'weather', polymarket_id: 'kalshi-snow-dal', volume: 11922, liquidity: 5800, status: 'active', odds_yes: 0.16, odds_no: 0.84, created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-saltlake', question: 'Snow in Salt Lake City this month? (Above 0.5 inches)', category: 'weather', polymarket_id: 'kalshi-snow-slc', volume: 26827, liquidity: 13000, status: 'active', odds_yes: 0.89, odds_no: 0.11, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-detroit', question: 'Snow in Detroit this month? (Above 6.0 inches)', category: 'weather', polymarket_id: 'kalshi-snow-det', volume: 27796, liquidity: 13500, status: 'active', odds_yes: 0.59, odds_no: 0.41, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-miami', question: 'Snow in Miami this month? (Above 0.5 inches)', category: 'weather', polymarket_id: 'kalshi-snow-mia', volume: 4855, liquidity: 2400, status: 'active', odds_yes: 0.03, odds_no: 0.97, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-la', question: 'Snow in Los Angeles this month? (Above 0.5 inches)', category: 'weather', polymarket_id: 'kalshi-snow-la', volume: 3438, liquidity: 1700, status: 'active', odds_yes: 0.04, odds_no: 0.96, created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-sf', question: 'Snow in San Francisco this month? (Above 0.1 inches)', category: 'weather', polymarket_id: 'kalshi-snow-sf', volume: 5343, liquidity: 2600, status: 'active', odds_yes: 0.08, odds_no: 0.92, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },

        // Rain Predictions
        { id: 'rain-houston', question: 'Rain in Houston this month? (Above 4 inches)', category: 'weather', polymarket_id: 'kalshi-rain-hou', volume: 20034, liquidity: 9800, status: 'active', odds_yes: 0.40, odds_no: 0.60, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-miami', question: 'Rain in Miami this month? (Above 1 inch)', category: 'weather', polymarket_id: 'kalshi-rain-mia', volume: 18446, liquidity: 9000, status: 'active', odds_yes: 0.55, odds_no: 0.45, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-sf', question: 'Rain in San Francisco this month? (Above 2 inches)', category: 'weather', polymarket_id: 'kalshi-rain-sf', volume: 20076, liquidity: 9800, status: 'active', odds_yes: 0.53, odds_no: 0.47, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-la', question: 'Rain in Los Angeles this month? (Above 1 inch)', category: 'weather', polymarket_id: 'kalshi-rain-la', volume: 22258, liquidity: 10800, status: 'active', odds_yes: 0.49, odds_no: 0.51, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-seattle', question: 'Rain in Seattle this month? (Above 7 inches)', category: 'weather', polymarket_id: 'kalshi-rain-sea', volume: 36987, liquidity: 18000, status: 'active', odds_yes: 0.69, odds_no: 0.31, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-denver', question: 'Rain in Denver this month? (Above 1 inch)', category: 'weather', polymarket_id: 'kalshi-rain-den', volume: 2271, liquidity: 1100, status: 'active', odds_yes: 0.15, odds_no: 0.85, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-austin', question: 'Rain in Austin this month? (Above 1 inch)', category: 'weather', polymarket_id: 'kalshi-rain-aus', volume: 9226, liquidity: 4500, status: 'active', odds_yes: 0.59, odds_no: 0.41, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-chicago', question: 'Rain in Chicago this month? (Above 2 inches)', category: 'weather', polymarket_id: 'kalshi-rain-chi', volume: 7195, liquidity: 3500, status: 'active', odds_yes: 0.57, odds_no: 0.43, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-dallas', question: 'Rain in Dallas this month? (Above 2 inches)', category: 'weather', polymarket_id: 'kalshi-rain-dal', volume: 10807, liquidity: 5300, status: 'active', odds_yes: 0.44, odds_no: 0.56, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-nyc', question: 'Rain in NYC this month? (Above 3 inches)', category: 'weather', polymarket_id: 'kalshi-rain-nyc', volume: 4391, liquidity: 2100, status: 'active', odds_yes: 0.48, odds_no: 0.52, created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },

        // Temperature Predictions
        { id: 'temp-philadelphia', question: 'Highest temperature in Philadelphia today? (33° to 34°)', category: 'temperature', polymarket_id: 'kalshi-temp-phl', volume: 12920, liquidity: 6300, status: 'active', odds_yes: 0.40, odds_no: 0.60, created_at: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'temp-nyc', question: 'Highest temperature in NYC today? (32° to 33°)', category: 'temperature', polymarket_id: 'kalshi-temp-nyc', volume: 25785, liquidity: 12500, status: 'active', odds_yes: 0.52, odds_no: 0.48, created_at: new Date(Date.now() - 0.3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'temp-miami', question: 'Highest temperature in Miami today? (83° to 84°)', category: 'temperature', polymarket_id: 'kalshi-temp-mia', volume: 25153, liquidity: 12200, status: 'active', odds_yes: 0.61, odds_no: 0.39, created_at: new Date(Date.now() - 0.4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'temp-la', question: 'Highest temperature in LA today? (68° to 69°)', category: 'temperature', polymarket_id: 'kalshi-temp-la', volume: 28522, liquidity: 13800, status: 'active', odds_yes: 0.47, odds_no: 0.53, created_at: new Date(Date.now() - 0.2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'temp-denver', question: 'Highest temperature in Denver today? (39° to 40°)', category: 'temperature', polymarket_id: 'kalshi-temp-den', volume: 22933, liquidity: 11100, status: 'active', odds_yes: 0.39, odds_no: 0.61, created_at: new Date(Date.now() - 0.6 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'temp-chicago', question: 'Highest temperature in Chicago today? (28° to 29°)', category: 'temperature', polymarket_id: 'kalshi-temp-chi', volume: 21757, liquidity: 10500, status: 'active', odds_yes: 0.50, odds_no: 0.50, created_at: new Date(Date.now() - 0.7 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'temp-austin', question: 'Highest temperature in Austin today? (58° or above)', category: 'temperature', polymarket_id: 'kalshi-temp-aus', volume: 44619, liquidity: 21600, status: 'active', odds_yes: 0.58, odds_no: 0.42, created_at: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },

        // Hurricane Predictions
        { id: 'hurricane-florida', question: 'Will a hurricane make landfall in Florida during 2025?', category: 'climate', polymarket_id: 'kalshi-hurr-fl', volume: 70171, liquidity: 34000, status: 'active', odds_yes: 0.02, odds_no: 0.98, created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'hurricane-south', question: 'Will a hurricane make landfall in South Carolina/Georgia?', category: 'climate', polymarket_id: 'kalshi-hurr-sc', volume: 53887, liquidity: 26000, status: 'active', odds_yes: 0.02, odds_no: 0.98, created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'hurricane-texas', question: 'Will a hurricane make landfall in Houston MSA?', category: 'climate', polymarket_id: 'kalshi-hurr-tx', volume: 11973, liquidity: 5800, status: 'active', odds_yes: 0.02, odds_no: 0.98, created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'hurricane-cat2', question: 'Will a Category 2+ hurricane make landfall in US?', category: 'climate', polymarket_id: 'kalshi-hurr-cat2', volume: 56653, liquidity: 27500, status: 'active', odds_yes: 0.02, odds_no: 0.98, created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'hurricane-hawaii', question: 'Will a hurricane make landfall in Hawaii this year?', category: 'climate', polymarket_id: 'kalshi-hurr-hi', volume: 18202, liquidity: 8800, status: 'active', odds_yes: 0.02, odds_no: 0.98, created_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'atlantic-hurricanes', question: 'How many major Atlantic hurricanes will there be next year? (Above 4)', category: 'climate', polymarket_id: 'kalshi-atl-hurr', volume: 35000, liquidity: 17000, status: 'active', odds_yes: 0.45, odds_no: 0.55, created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'tropical-storms', question: 'Number of tropical storms next year? (Above 10)', category: 'climate', polymarket_id: 'kalshi-trop-storms', volume: 28000, liquidity: 13500, status: 'active', odds_yes: 0.62, odds_no: 0.38, created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },

        // Climate Goals & Other Predictions
        { id: 'climate-us-2030', question: 'US meets its climate goals? (By 2030)', category: 'climate', polymarket_id: 'kalshi-clim-us', volume: 32260, liquidity: 15600, status: 'active', odds_yes: 0.13, odds_no: 0.87, created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'climate-india-2030', question: 'India meets its 2030 climate goals?', category: 'climate', polymarket_id: 'kalshi-clim-india', volume: 3925, liquidity: 1900, status: 'active', odds_yes: 0.71, odds_no: 0.29, created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'climate-eu-2030', question: 'EU meets its 2030 climate goals?', category: 'climate', polymarket_id: 'kalshi-clim-eu', volume: 1350, liquidity: 650, status: 'active', odds_yes: 0.54, odds_no: 0.46, created_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'hottest-2025', question: 'Will 2025 be the hottest year ever?', category: 'climate', polymarket_id: 'kalshi-hot-2025', volume: 229577, liquidity: 111000, status: 'active', odds_yes: 0.01, odds_no: 0.99, created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'world-2c', question: 'Will the world pass 2 degrees Celsius over pre-industrial levels?', category: 'climate', polymarket_id: 'kalshi-2c', volume: 4413, liquidity: 2100, status: 'active', odds_yes: 0.82, odds_no: 0.18, created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'ev-market-2030', question: 'EV market share in 2030? (Above 30%)', category: 'climate', polymarket_id: 'kalshi-ev-2030', volume: 11718, liquidity: 5700, status: 'active', odds_yes: 0.46, odds_no: 0.54, created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'global-energy', question: 'What will be the largest source of global primary energy?', category: 'climate', polymarket_id: 'kalshi-energy', volume: 10655, liquidity: 5200, status: 'active', odds_yes: 0.33, odds_no: 0.67, created_at: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'supervolcano', question: 'Will a supervolcano erupt before 2050?', category: 'climate', polymarket_id: 'kalshi-volcano', volume: 8007, liquidity: 3900, status: 'active', odds_yes: 0.17, odds_no: 0.83, created_at: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'etna-eruption', question: 'When will Mt. Etna next erupt? (Before Jan 1, 2026)', category: 'climate', polymarket_id: 'kalshi-etna', volume: 13480, liquidity: 6500, status: 'active', odds_yes: 0.55, odds_no: 0.45, created_at: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'earthquake-japan', question: '8.0 magnitude earthquake in Japan this month?', category: 'climate', polymarket_id: 'kalshi-eq-japan', volume: 10124, liquidity: 4900, status: 'active', odds_yes: 0.44, odds_no: 0.56, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'earthquake-8', question: 'Will there be an at least 8.0 magnitude earthquake?', category: 'climate', polymarket_id: 'kalshi-eq-8', volume: 55432, liquidity: 26800, status: 'active', odds_yes: 0.02, odds_no: 0.98, created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'tornadoes-month', question: 'Number of tornadoes this month? (Above 50)', category: 'weather', polymarket_id: 'kalshi-tornado', volume: 2094, liquidity: 1000, status: 'active', odds_yes: 0.33, odds_no: 0.67, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-nyc-tomorrow', question: 'Will it rain in NYC tomorrow?', category: 'weather', polymarket_id: 'kalshi-rain-nyc-tom', volume: 8500, liquidity: 4100, status: 'active', odds_yes: 0.35, odds_no: 0.65, created_at: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'temp-nov-2025', question: 'November 2025 temperature increase? (1.17 to 1.23)', category: 'climate', polymarket_id: 'kalshi-temp-nov', volume: 18558, liquidity: 9000, status: 'active', odds_yes: 0.80, odds_no: 0.20, created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'hottest-november', question: 'This November 2025 is the hottest November ever?', category: 'climate', polymarket_id: 'kalshi-hot-nov', volume: 9412, liquidity: 4600, status: 'active', odds_yes: 0.03, odds_no: 0.97, created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
      ];
      setMarkets(climateMarkets);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortMarkets = () => {
    let filtered = markets;

    if (searchQuery) {
      filtered = filtered.filter(m =>
        m.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'volume') return b.volume - a.volume;
      if (sortBy === 'liquidity') return b.liquidity - a.liquidity;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    setFilteredMarkets(filtered);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-botanical-sage/30 rounded-xl w-48 mb-6"></div>
          <div className="grid grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-white rounded-2xl shadow-botanical"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {selectedMarket && (
        <MarketDetailModal
          market={selectedMarket}
          onClose={() => setSelectedMarket(null)}
        />
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-botanical-bark mb-2">All Markets</h1>
        <p className="text-botanical-moss">Browse all available prediction markets</p>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-botanical-moss w-5 h-5" />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-botanical-sage/30 rounded-xl pl-11 pr-4 py-3 text-botanical-bark placeholder-botanical-moss/60 focus:outline-none focus:ring-2 focus:ring-botanical-fern/50 focus:border-botanical-fern transition-all"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-white border border-botanical-sage/30 rounded-xl px-4 py-3 text-botanical-bark focus:outline-none focus:ring-2 focus:ring-botanical-fern/50 cursor-pointer"
        >
          <option value="volume">Sort by Volume</option>
          <option value="liquidity">Sort by Liquidity</option>
          <option value="recent">Sort by Recent</option>
        </select>
      </div>

      <div className="mb-5">
        <p className="text-botanical-moss text-sm">
          Showing {filteredMarkets.length} of {markets.length} markets
        </p>
      </div>

      {filteredMarkets.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-botanical-sage/30 shadow-botanical">
          <p className="text-botanical-moss">No markets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {filteredMarkets.map((market) => (
            <MarketCard
              key={market.id}
              market={market}
              onClick={() => setSelectedMarket(market)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
