import { ExternalLink, BarChart3 } from 'lucide-react';
import { MiniChart } from './MiniChart';
import type { Market } from '../types';

interface MarketCardProps {
  market: Market;
  showVolume?: boolean;
  showLiquidity?: boolean;
  onClick?: () => void;
}

export const MarketCard = ({ market, showVolume = true, showLiquidity = true, onClick }: MarketCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatOdds = (odds: number) => {
    return `${(odds * 100).toFixed(0)}%`;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-5 border border-botanical-sage/30 hover:border-botanical-fern shadow-botanical hover:shadow-botanical-lg transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="text-botanical-bark font-display font-semibold mb-2 line-clamp-2">{market.question}</h4>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-botanical-marigold/15 border border-botanical-marigold/30 rounded-lg text-xs text-botanical-bark font-medium">
              {market.category}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {showVolume && (
          <div className="bg-botanical-cream rounded-xl p-3">
            <p className="text-xs text-botanical-moss mb-1">Volume</p>
            <p className="text-sm font-bold text-botanical-bark">{formatNumber(market.volume)}</p>
          </div>
        )}
        {showLiquidity && (
          <div className="bg-botanical-cream rounded-xl p-3">
            <p className="text-xs text-botanical-moss mb-1">Liquidity</p>
            <p className="text-sm font-bold text-botanical-bark">{formatNumber(market.liquidity)}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-botanical-fern/10 border border-botanical-fern/30 rounded-xl px-3 py-2.5">
          <p className="text-xs text-botanical-moss mb-1">Yes</p>
          <p className="text-sm font-bold text-botanical-fern">{formatOdds(market.odds_yes)}</p>
        </div>
        <div className="flex-1 bg-botanical-terracotta/10 border border-botanical-terracotta/30 rounded-xl px-3 py-2.5">
          <p className="text-xs text-botanical-moss mb-1">No</p>
          <p className="text-sm font-bold text-botanical-terracotta">{formatOdds(market.odds_no)}</p>
        </div>
      </div>

      <div className="bg-botanical-cream rounded-xl p-3 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-botanical-moss">Price History</span>
          <BarChart3 className="w-3 h-3 text-botanical-sage" />
        </div>
        <MiniChart trend={market.odds_yes > 0.5 ? 'up' : 'down'} />
      </div>

      <button 
        onClick={(e) => {
          e.stopPropagation();
          window.open(`https://polymarket.com/market/${market.polymarket_id}`, '_blank');
        }}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-botanical-fern hover:bg-botanical-forest rounded-xl text-botanical-cream text-sm font-semibold transition-all shadow-botanical hover:shadow-botanical-lg"
      >
        <span>Go to Market</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
};
