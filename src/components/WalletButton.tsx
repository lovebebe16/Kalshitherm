// Wallet Connection Component - Solana Multi-Wallet Support
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { Wallet, LogOut, ExternalLink } from 'lucide-react';
import { solanaService, formatPublicKey } from '../solana/service';

// Import Solana Wallet Adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

export const WalletButton = () => {
  const { publicKey, connected, disconnect, wallet } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (publicKey && connected) {
      loadBalance();
    } else {
      setBalance(null);
    }
  }, [publicKey, connected]);

  const loadBalance = async () => {
    if (!publicKey) return;
    try {
      const bal = await solanaService.getBalance(publicKey);
      setBalance(bal);
    } catch (error) {
      console.error('Error loading balance:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      setBalance(null);
      setShowDetails(false);
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  if (!connected) {
    return (
      <div className="relative">
        <WalletMultiButton className="!bg-gradient-to-r !from-botanical-fern !to-botanical-moss hover:!from-botanical-forest hover:!to-botanical-fern !rounded-xl !px-6 !py-3 !text-botanical-cream !font-semibold !transition-all !shadow-botanical hover:!shadow-botanical-lg" />
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-3 bg-gradient-to-r from-botanical-fern to-botanical-moss hover:from-botanical-forest hover:to-botanical-fern rounded-xl px-4 py-2.5 text-botanical-cream font-medium transition-all shadow-botanical hover:shadow-botanical-lg"
      >
        <Wallet className="w-4 h-4" />
        <div className="flex flex-col items-start">
          <span className="text-xs text-botanical-sage">{wallet?.adapter.name || 'Wallet'}</span>
          <span className="text-sm font-mono">{formatPublicKey(publicKey)}</span>
        </div>
        {balance !== null && (
          <div className="ml-2 px-2 py-1 bg-botanical-marigold rounded-lg text-xs font-bold text-botanical-bark">
            {balance.toFixed(4)} SOL
          </div>
        )}
      </button>

      {showDetails && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowDetails(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white border border-botanical-sage/30 rounded-2xl shadow-botanical-lg z-50 p-5">
            <div className="space-y-4">
              {/* Wallet Info */}
              <div className="pb-4 border-b border-botanical-sage/20">
                <p className="text-xs text-botanical-moss mb-2">Connected Wallet</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-botanical-fern to-botanical-moss rounded-xl flex items-center justify-center shadow-botanical">
                    <Wallet className="w-5 h-5 text-botanical-cream" />
                  </div>
                  <div>
                    <p className="text-botanical-bark font-semibold">{wallet?.adapter.name}</p>
                    <p className="text-xs text-botanical-moss font-mono">{formatPublicKey(publicKey)}</p>
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="pb-4 border-b border-botanical-sage/20">
                <p className="text-xs text-botanical-moss mb-2">Balance</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-display font-bold text-botanical-bark">
                    {balance !== null ? balance.toFixed(4) : '...'} SOL
                  </span>
                  <button
                    onClick={loadBalance}
                    className="text-xs text-botanical-fern hover:text-botanical-forest font-medium"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              {/* Address */}
              <div className="pb-4 border-b border-botanical-sage/20">
                <p className="text-xs text-botanical-moss mb-2">Wallet Address</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs text-botanical-bark bg-botanical-cream px-3 py-2 rounded-lg font-mono break-all">
                    {publicKey?.toString()}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(publicKey?.toString() || '');
                    }}
                    className="text-botanical-moss hover:text-botanical-fern transition-colors p-2 hover:bg-botanical-cream rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Explorer Link */}
              <div className="pb-4 border-b border-botanical-sage/20">
                <a
                  href={`https://explorer.solana.com/address/${publicKey?.toString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-botanical-fern hover:text-botanical-forest font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Solana Explorer
                </a>
              </div>

              {/* Disconnect Button */}
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-botanical-terracotta hover:brightness-110 rounded-xl text-botanical-cream font-semibold transition-all"
              >
                <LogOut className="w-4 h-4" />
                Disconnect Wallet
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
