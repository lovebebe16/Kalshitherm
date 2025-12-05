// @ts-nocheck
import { X, TrendingUp, Activity, DollarSign, Users, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';
import type { Market } from '../types';

interface MarketDetailModalProps {
  market: Market;
  onClose: () => void;
}

export const MarketDetailModal = ({ market, onClose }: MarketDetailModalProps) => {
  const [timeRange, setTimeRange] = useState<'1D' | '7D' | '30D'>('7D');

  // Generate mock historical data
  const generatePriceHistory = (days: number) => {
    const data = [];
    const now = Date.now();
    const basePrice = market.odds_yes || 0.5;

    for (let i = days; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      const variation = (Math.random() - 0.5) * 0.2;
      const yesPrice = Math.max(0, Math.min(1, basePrice + variation));
      const noPrice = 1 - yesPrice;

      data.push({
        date: date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
        fullDate: date.toISOString(),
        yes: yesPrice * 100,
        no: noPrice * 100,
        volume: Math.floor(Math.random() * 50000) + 10000
      });
    }
    return data;
  };

  const generateVolumeData = (days: number) => {
    const data = [];
    const now = Date.now();

    for (let i = days; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      data.push({
        date: date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
        volume: Math.floor(Math.random() * 100000) + 20000,
        liquidity: Math.floor(Math.random() * 50000) + 10000
      });
    }
    return data;
  };

  const days = timeRange === '1D' ? 1 : timeRange === '7D' ? 7 : 30;
  const priceData = generatePriceHistory(days);
  const volumeData = generateVolumeData(days);

  return (
    <div className="fixed inset-0 bg-botanical-bark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-botanical-sage/30 shadow-botanical-lg scrollbar-botanical">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-botanical-sage/20 p-6 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-botanical-marigold/15 border border-botanical-marigold/30 rounded-lg text-xs text-botanical-bark font-medium">
                {market.category}
              </span>
              <span className="text-botanical-moss text-sm">#{market.polymarket_id}</span>
            </div>
            <h2 className="text-2xl font-display font-bold text-botanical-bark mb-2">{market.question}</h2>
            <div className="flex items-center gap-6 text-sm text-botanical-moss">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>Volume: ${(market.volume / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>Liquidity: ${(market.liquidity / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{Math.floor(Math.random() * 1000) + 100} traders</span>
              </div>
            </div>
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
              <h3 className="text-lg font-display font-bold text-botanical-bark">Price Movement</h3>
              <div className="flex gap-2">
                {(['1D', '7D', '30D'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${timeRange === range
                        ? 'bg-botanical-fern text-botanical-cream shadow-botanical'
                        : 'bg-botanical-cream text-botanical-bark hover:bg-botanical-moss/20'
                      }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Chart */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
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
                    formatter={(value: number) => [`${value.toFixed(1)}%`, '']}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="yes"
                    stroke="#4a7c59"
                    fill="#4a7c59"
                    fillOpacity={0.3}
                    name="Yes"
                  />
                  <Area
                    type="monotone"
                    dataKey="no"
                    stroke="#b7472a"
                    fill="#b7472a"
                    fillOpacity={0.3}
                    name="No"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Volume Chart */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-4">Volume & Liquidity</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d4cfbf" />
                  <XAxis
                    dataKey="date"
                    stroke="#6b9b7a"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis
                    stroke="#6b9b7a"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d4cfbf',
                      borderRadius: '12px',
                      color: '#3d2c1f'
                    }}
                    formatter={(value: number) => [`$${(value / 1000).toFixed(1)}K`, '']}
                  />
                  <Legend />
                  <Bar dataKey="volume" fill="#4a7c59" name="Volume" />
                  <Bar dataKey="liquidity" fill="#f9a620" name="Liquidity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            {/* Current Odds */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-4">Current Odds</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-botanical-fern/10 border border-botanical-fern/30 rounded-xl">
                  <span className="text-botanical-bark font-medium">Yes</span>
                  <span className="text-2xl font-display font-bold text-botanical-fern">
                    {(market.odds_yes * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-botanical-terracotta/10 border border-botanical-terracotta/30 rounded-xl">
                  <span className="text-botanical-bark font-medium">No</span>
                  <span className="text-2xl font-display font-bold text-botanical-terracotta">
                    {(market.odds_no * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-4">Key Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-botanical-moss">24h Volume</span>
                  <span className="text-botanical-bark font-semibold">${(market.volume / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-botanical-moss">Liquidity</span>
                  <span className="text-botanical-bark font-semibold">${(market.liquidity / 1000).toFixed(1)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-botanical-moss">24h Change</span>
                  <span className="text-botanical-fern font-semibold">+{(Math.random() * 10).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-botanical-moss">Total Traders</span>
                  <span className="text-botanical-bark font-semibold">{Math.floor(Math.random() * 1000) + 100}</span>
                </div>
              </div>
            </div>

            {/* Market Info */}
            <div className="bg-botanical-cream rounded-2xl p-4 border border-botanical-sage/30">
              <h4 className="text-sm font-semibold text-botanical-bark mb-4">Market Info</h4>
              <div className="space-y-3">
                <div>
                  <span className="text-botanical-moss text-xs">Status</span>
                  <div className="mt-1">
                    <span className="px-2.5 py-1 bg-botanical-fern/15 border border-botanical-fern/30 rounded-lg text-xs text-botanical-fern font-medium">
                      {market.status}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-botanical-moss text-xs">Created</span>
                  <p className="text-botanical-bark text-sm mt-1 font-medium">
                    {new Date(market.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-botanical-moss text-xs">Last Updated</span>
                  <p className="text-botanical-bark text-sm mt-1 font-medium">
                    {new Date(market.updated_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => window.open(market.kalshi_url, '_blank')}
                className="w-full px-4 py-3 bg-botanical-fern hover:bg-botanical-forest rounded-xl text-botanical-cream font-semibold transition-all shadow-botanical hover:shadow-botanical-lg flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" />
                Go to Market
              </button>
              <button className="w-full px-4 py-3 bg-white hover:bg-botanical-petal border border-botanical-sage/30 rounded-xl text-botanical-bark font-semibold transition-all flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
