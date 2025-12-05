// Solana Wallet Configuration - All 7 Wallet Support
import { 
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CloverWalletAdapter,
  Coin98WalletAdapter,
  MathWalletAdapter,
  SolongWalletAdapter
} from '@solana/wallet-adapter-wallets';
import type { Adapter } from '@solana/wallet-adapter-base';
import type { WalletInfo } from '../types/solana';

/**
 * All supported Solana wallets (6 wallets)
 */
export const SUPPORTED_WALLETS: WalletInfo[] = [
  {
    name: 'Phantom',
    icon: 'https://phantom.app/img/phantom-icon-purple.png',
    url: 'https://phantom.app',
    adapter: 'phantom'
  },
  {
    name: 'Solflare',
    icon: 'https://solflare.com/assets/solflare-logo.png',
    url: 'https://solflare.com',
    adapter: 'solflare'
  },
  {
    name: 'Clover',
    icon: 'https://clover.finance/favicon.ico',
    url: 'https://clover.finance',
    adapter: 'clover'
  },
  {
    name: 'Solong',
    icon: 'https://solongwallet.io/favicon.ico',
    url: 'https://solongwallet.io',
    adapter: 'solong'
  },
  {
    name: 'Coin98',
    icon: 'https://coin98.com/favicon.ico',
    url: 'https://coin98.com',
    adapter: 'coin98'
  },
  {
    name: 'MathWallet',
    icon: 'https://mathwallet.org/favicon.ico',
    url: 'https://mathwallet.org',
    adapter: 'mathwallet'
  }
];

/**
 * Get all wallet adapters
 */
export const getWalletAdapters = (): Adapter[] => {
  return [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new CloverWalletAdapter(),
    new SolongWalletAdapter(),
    new Coin98WalletAdapter(),
    new MathWalletAdapter()
  ];
};

/**
 * Check if a specific wallet is installed
 */
export const isWalletInstalled = (walletName: string): boolean => {
  const w = window as any;
  
  switch (walletName.toLowerCase()) {
    case 'phantom':
      return !!(w.solana && w.solana.isPhantom);
    case 'solflare':
      return !!w.solflare;
    case 'clover':
      return !!w.clover_solana;
    case 'solong':
      return !!w.solong;
    case 'coin98':
      return !!w.coin98;
    case 'mathwallet':
      return !!w.solana?.isMathWallet;
    default:
      return false;
  }
};

/**
 * Get wallet installation URL
 */
export const getWalletInstallUrl = (walletName: string): string => {
  const wallet = SUPPORTED_WALLETS.find(w => w.name.toLowerCase() === walletName.toLowerCase());
  return wallet?.url || 'https://solana.com/ecosystem/explore?categories=wallet';
};
