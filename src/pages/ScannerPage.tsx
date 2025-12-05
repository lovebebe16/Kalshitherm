import { useState, useEffect } from 'react';
import { Flame, Eye, Clock, Scale } from 'lucide-react';
import { MarketCard } from '../components/MarketCard';
import { MarketDetailModal } from '../components/MarketDetailModal';
import type { ScannerData, Market } from '../types';

export const ScannerPage = () => {
  const [scannerData, setScannerData] = useState<ScannerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'surging' | 'hidden' | 'urgent' | 'even'>('surging');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  useEffect(() => {
    fetchScannerData();
  }, []);

  const fetchScannerData = async () => {
    try {
      setLoading(true);
      // Use demo data for now
      const generateDemoMarkets = (count: number, baseVolume: number) => {
        return Array.from({ length: count }, (_, i) => ({
          id: `demo-${i}`,
          question: [
            'Will Bitcoin reach $100k in 2025?',
            'Will Trump win 2024 election?',
            'Will AI replace 50% jobs by 2030?',
            'Will Tesla stock hit $500 this year?',
            'Will crypto market cap reach $5T?',
            'Will inflation drop below 2% in 2025?',
            'Will remote work become standard?',
            'Will SpaceX land humans on Mars by 2030?'
          ][i % 8],
          category: ['crypto', 'politics', 'technology', 'finance', 'business'][Math.floor(Math.random() * 5)],
          polymarket_id: `pm-demo-${i}`,
          kalshi_url: `https://kalshi.com/markets/demo-${i}`,
          volume: baseVolume * (0.5 + Math.random()),
          liquidity: baseVolume * 0.4 * (0.5 + Math.random()),
          status: 'active',
          odds_yes: 0.3 + Math.random() * 0.4,
          odds_no: 0.3 + Math.random() * 0.4,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }));
      };

      setScannerData({
        surging_markets: {
          count: 30,
          markets: generateDemoMarkets(30, 250000)
        },
        hidden_gems: {
          count: 35,
          markets: generateDemoMarkets(35, 15000)
        },
        urgent_decisions: {
          count: 22,
          markets: generateDemoMarkets(22, 80000)
        },
        even_odds: {
          count: 14,
          markets: generateDemoMarkets(14, 120000).map(m => ({ ...m, odds_yes: 0.48 + Math.random() * 0.04, odds_no: 0.48 + Math.random() * 0.04 }))
        },
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      key: 'surging' as const,
      label: 'Surging Markets',
      icon: <Flame className="w-5 h-5" />,
      color: 'text-botanical-marigold',
      bgColor: 'bg-botanical-marigold/10',
      borderColor: 'border-botanical-marigold',
      data: scannerData?.surging_markets
    },
    {
      key: 'hidden' as const,
      label: 'Hidden Gems',
      icon: <Eye className="w-5 h-5" />,
      color: 'text-botanical-moss',
      bgColor: 'bg-botanical-moss/10',
      borderColor: 'border-botanical-moss',
      data: scannerData?.hidden_gems
    },
    {
      key: 'urgent' as const,
      label: 'Urgent Decisions',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-botanical-terracotta',
      bgColor: 'bg-botanical-terracotta/10',
      borderColor: 'border-botanical-terracotta',
      data: scannerData?.urgent_decisions
    },
    {
      key: 'even' as const,
      label: 'Even Odds',
      icon: <Scale className="w-5 h-5" />,
      color: 'text-botanical-fern',
      bgColor: 'bg-botanical-fern/10',
      borderColor: 'border-botanical-fern',
      data: scannerData?.even_odds
    }
  ];

  const activeData = categories.find(c => c.key === activeCategory);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-botanical-sage/30 rounded-xl w-48 mb-6"></div>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-white rounded-2xl shadow-botanical"></div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
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
        <h1 className="text-3xl font-display font-bold text-botanical-bark mb-2">Market Scanner</h1>
        <p className="text-botanical-moss">Discover trending markets across Polymarket and Kalshi</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            className={`p-5 rounded-2xl border-2 transition-all duration-300 ${activeCategory === category.key
                ? `${category.bgColor} ${category.borderColor} shadow-botanical`
                : 'bg-white border-botanical-sage/30 hover:border-botanical-moss shadow-warm'
              }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={category.color}>{category.icon}</div>
              <span className="text-2xl font-display font-bold text-botanical-bark">
                {category.data?.count || 0}
              </span>
            </div>
            <p className="text-sm font-semibold text-botanical-bark text-left">{category.label}</p>
          </button>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-display font-bold text-botanical-bark mb-1">{activeData?.label}</h2>
        <p className="text-botanical-moss text-sm">
          {activeData?.data?.count || 0} markets found
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        {activeData?.data?.markets.map((market) => (
          <MarketCard
            key={market.id || market.polymarket_id}
            market={market}
            onClick={() => setSelectedMarket(market)}
          />
        ))}
      </div>

      {(!activeData?.data?.markets || activeData.data.markets.length === 0) && (
        <div className="text-center py-12">
          <p className="text-botanical-moss">No markets found in this category</p>
        </div>
      )}
    </div>
  );
};
