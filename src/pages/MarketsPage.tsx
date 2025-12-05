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
        { id: 'snow-philadelphia', question: 'Snow in Philadelphia this month?', category: 'weather', polymarket_id: 'kxphilsnowm', kalshi_url: 'https://kalshi.com/markets/kxphilsnowm/philadelphia-monthly-snow/kxphilsnowm-25dec', volume: 33469, liquidity: 15000, status: 'active', odds_yes: 0.19, odds_no: 0.81, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-denver', question: 'Snow in Denver this month?', category: 'weather', polymarket_id: 'kxdensnowmb', kalshi_url: 'https://kalshi.com/markets/kxdensnowmb/denver-monthly-snow/kxdensnowmb-25dec', volume: 44987, liquidity: 22000, status: 'active', odds_yes: 0.27, odds_no: 0.73, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-jackson', question: 'Snow in Jackson, WY this month?', category: 'weather', polymarket_id: 'kxjacwsnowm', kalshi_url: 'https://kalshi.com/markets/kxjacwsnowm/jackson-wy-monthly-snow/kxjacwsnowm-25dec', volume: 67543, liquidity: 32000, status: 'active', odds_yes: 0.58, odds_no: 0.42, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-nyc', question: 'Snow in New York City this month?', category: 'weather', polymarket_id: 'kxnycsnowm', kalshi_url: 'https://kalshi.com/markets/kxnycsnowm/nyc-snowfall-monthly/kxnycsnowm-25dec', volume: 38798, liquidity: 18000, status: 'active', odds_yes: 0.55, odds_no: 0.45, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-washington', question: 'Snow in Washington DC this month?', category: 'weather', polymarket_id: 'kxdcsnowm', kalshi_url: 'https://kalshi.com/markets/kxdcsnowm/dc-monthly-snow/kxdcsnowm-25dec', volume: 29177, liquidity: 14000, status: 'active', odds_yes: 0.26, odds_no: 0.74, created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-seattle', question: 'Snow in Seattle this month?', category: 'weather', polymarket_id: 'kxseasnowm', kalshi_url: 'https://kalshi.com/markets/kxseasnowm/seattle-snowfall-monthly/kxseasnowm-25dec', volume: 29743, liquidity: 14500, status: 'active', odds_yes: 0.48, odds_no: 0.52, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-dallas', question: 'Snow in Dallas this month?', category: 'weather', polymarket_id: 'kxdalsnowm', kalshi_url: 'https://kalshi.com/markets/kxdalsnowm/dallas-snowfall-monthly/kxdalsnowm-25dec', volume: 11922, liquidity: 5800, status: 'active', odds_yes: 0.16, odds_no: 0.84, created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-saltlake', question: 'Snow in Salt Lake City this month?', category: 'weather', polymarket_id: 'kxslcsnowm', kalshi_url: 'https://kalshi.com/markets/kxslcsnowm/salt-lake-city-monthly/kxslcsnowm-25dec', volume: 26827, liquidity: 13000, status: 'active', odds_yes: 0.89, odds_no: 0.11, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-chicago', question: 'Snow in Chicago this month?', category: 'weather', polymarket_id: 'kxchisnowm', kalshi_url: 'https://kalshi.com/markets/kxchisnowm/chicago-snowfall-monthly/kxchisnowm-25decb', volume: 28035, liquidity: 13500, status: 'active', odds_yes: 0.49, odds_no: 0.51, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'snow-detroit', question: 'Snow in Detroit this month?', category: 'weather', polymarket_id: 'kxdetsnowm', kalshi_url: 'https://kalshi.com/markets/kxdetsnowm/detroit-monthly-snow/kxdetsnowm-25dec', volume: 27796, liquidity: 13500, status: 'active', odds_yes: 0.59, odds_no: 0.41, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },

        // Rain Predictions
        { id: 'rain-sf', question: 'Rain in San Francisco this month?', category: 'weather', polymarket_id: 'kxrainsfom', kalshi_url: 'https://kalshi.com/markets/kxrainsfom/rain-san-francisco/kxrainsfom-25dec', volume: 20076, liquidity: 9800, status: 'active', odds_yes: 0.53, odds_no: 0.47, created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-la', question: 'Rain in Los Angeles this month?', category: 'weather', polymarket_id: 'kxrainlaxm', kalshi_url: 'https://kalshi.com/markets/kxrainlaxm/rain-los-angeles/kxrainlaxm-25dec', volume: 22258, liquidity: 10800, status: 'active', odds_yes: 0.49, odds_no: 0.51, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-houston', question: 'Rain in Houston this month?', category: 'weather', polymarket_id: 'kxrainhoum', kalshi_url: 'https://kalshi.com/markets/kxrainhoum/rain-houston/kxrainhoum-25dec', volume: 20034, liquidity: 9800, status: 'active', odds_yes: 0.40, odds_no: 0.60, created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-miami', question: 'Rain in Miami this month?', category: 'weather', polymarket_id: 'kxrainmiam', kalshi_url: 'https://kalshi.com/markets/kxrainmiam/rain-miami/kxrainmiam-25dec', volume: 18446, liquidity: 9000, status: 'active', odds_yes: 0.55, odds_no: 0.45, created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
        { id: 'rain-dallas', question: 'Rain in Dallas this month?', category: 'weather', polymarket_id: 'kxraindalm', kalshi_url: 'https://kalshi.com/markets/kxraindalm/rain-dallas/kxraindalm-25dec', volume: 10807, liquidity: 5300, status: 'active', odds_yes: 0.44, odds_no: 0.56, created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },

        // Climate Predictions
        { id: 'earthquake-california', question: 'Earthquake in California in 2026?', category: 'climate', polymarket_id: 'kxearthquakecalifornia', kalshi_url: 'https://kalshi.com/markets/kxearthquakecalifornia/earthquake-in-california/kxearthquakecalifornia-26', volume: 55432, liquidity: 26800, status: 'active', odds_yes: 0.35, odds_no: 0.65, created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), updated_at: new Date().toISOString() },
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
