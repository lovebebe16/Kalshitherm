import { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import { MarketCard } from '../components/MarketCard';
import { MarketDetailModal } from '../components/MarketDetailModal';
import { watchlistService } from '../services/api';
import type { Market } from '../types';

export const WatchlistPage = () => {
  const [watchlist, setWatchlist] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = () => {
    setLoading(true);
    try {
      const items = watchlistService.getWatchlist();
      setWatchlist(items);
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWatchlist = (polymarketId: string) => {
    try {
      const updated = watchlistService.removeFromWatchlist(polymarketId);
      setWatchlist(updated);
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-botanical-sage/30 rounded-xl w-48 mb-6"></div>
          <div className="grid grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
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
        <h1 className="text-3xl font-display font-bold text-botanical-bark mb-2">My Watchlist</h1>
        <p className="text-botanical-moss">Markets you're tracking (stored locally)</p>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-botanical-sage/30 shadow-botanical">
          <Star className="w-16 h-16 text-botanical-sage mx-auto mb-4" />
          <h2 className="text-xl font-display font-bold text-botanical-bark mb-2">No markets in watchlist</h2>
          <p className="text-botanical-moss">Add markets to your watchlist to track them here</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {watchlist.map((market) => (
            <div key={market.polymarket_id} className="relative">
              <MarketCard 
                market={market}
                onClick={() => setSelectedMarket(market)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWatchlist(market.polymarket_id);
                }}
                className="absolute top-3 right-3 p-2 bg-botanical-terracotta hover:brightness-110 rounded-xl transition-all z-10 shadow-warm"
                title="Remove from watchlist"
              >
                <Trash2 className="w-4 h-4 text-botanical-cream" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
