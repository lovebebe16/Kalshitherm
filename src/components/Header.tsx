import { useState } from 'react';
import { Search, Bell, Leaf } from 'lucide-react';
import { WalletButton } from './WalletButton';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-botanical-forest border-b border-botanical-fern/30 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-botanical-fern to-botanical-marigold rounded-xl flex items-center justify-center shadow-botanical">
              <Leaf className="w-5 h-5 text-botanical-cream" />
            </div>
            <h1 className="text-xl font-display font-bold text-botanical-cream">Kalshitherm</h1>
            <div className="ml-2 px-3 py-1.5 bg-botanical-moss/20 border border-botanical-moss/40 rounded-lg text-xs text-botanical-sage font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-botanical-sage rounded-full animate-pulse"></span>
              Solana Network
            </div>
          </div>

          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-botanical-moss w-4 h-4" />
            <input
              type="text"
              placeholder="Search markets... (Alt+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-botanical-petal/10 border border-botanical-moss/30 rounded-xl pl-10 pr-16 py-2.5 text-sm text-botanical-cream placeholder-botanical-sage/70 focus:outline-none focus:ring-2 focus:ring-botanical-marigold/50 focus:border-botanical-marigold/50 transition-all"
            />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-botanical-moss/20 rounded-md text-xs text-botanical-sage font-mono">
              Alt+K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-botanical-marigold hover:brightness-110 rounded-xl text-botanical-bark text-sm font-semibold transition-all shadow-warm hover:shadow-warm-lg">
            <Bell className="w-4 h-4" />
            Alerts on Telegram
          </button>

          <WalletButton />
        </div>
      </div>
    </header>
  );
};
