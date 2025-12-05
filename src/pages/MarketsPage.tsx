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
      // Use demo data for now (Supabase optional)
      const demoMarkets: Market[] = Array.from({ length: 12 }, (_, i) => ({
        id: `demo-market-${i}`,
        question: [
          'Will Bitcoin reach $100k in 2025?',
          'Will Trump win 2024 election?',
          'Will AI replace 50% jobs by 2030?',
          'Will Tesla stock hit $500 this year?',
          'Will crypto market cap reach $5T?',
          'Will inflation drop below 2% in 2025?',
          'Will remote work become standard?',
          'Will SpaceX land humans on Mars by 2030?',
          'Will Apple release AR glasses in 2025?',
          'Will EV sales surpass gas cars by 2030?',
          'Will climate targets be met by 2030?',
          'Will quantum computers go mainstream?'
        ][i % 12],
        category: ['crypto', 'politics', 'technology', 'finance', 'business', 'science'][Math.floor(Math.random() * 6)],
        polymarket_id: `pm-market-${i}`,
        volume: Math.floor(Math.random() * 300000) + 50000,
        liquidity: Math.floor(Math.random() * 150000) + 25000,
        status: 'active',
        odds_yes: 0.3 + Math.random() * 0.4,
        odds_no: 0.3 + Math.random() * 0.4,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      }));
      setMarkets(demoMarkets);
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
