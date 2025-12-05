// Solana TypeScript Types
import { PublicKey, Transaction } from '@solana/web3.js';

export interface SolanaWallet {
  publicKey: PublicKey | null;
  connected: boolean;
  connecting: boolean;
  disconnecting: boolean;
  walletName: string | null;
  balance: number | null;
}

export interface SolanaNetwork {
  name: 'mainnet-beta' | 'devnet' | 'testnet';
  endpoint: string;
}

export interface SolanaTransaction {
  signature: string;
  slot: number;
  timestamp: number;
  status: 'success' | 'failed' | 'pending';
  fee: number;
}

export interface SPLToken {
  mint: string;
  symbol: string;
  name: string;
  decimals: number;
  balance: number;
  uiBalance: string;
}

export interface PolymarketOrder {
  marketId: string;
  side: 'buy' | 'sell';
  amount: number;
  price: number;
  token: 'SOL' | 'USDC';
}

export interface SolanaConfig {
  network: SolanaNetwork;
  rpcEndpoint: string;
  commitment: 'processed' | 'confirmed' | 'finalized';
}

// Wallet types
export type WalletName = 
  | 'Phantom'
  | 'Solflare'
  | 'Sollet'
  | 'Clover'
  | 'Solong'
  | 'Coin98'
  | 'MathWallet';

export interface WalletInfo {
  name: WalletName;
  icon: string;
  url: string;
  adapter: string;
}

// Polymarket types
export interface PolymarketMarket {
  id: string;
  question: string;
  category: string;
  volume: number;
  liquidity: number;
  oddsYes: number;
  oddsNo: number;
  solanaAddress?: string;
  programId?: string;
}

export interface MarketPosition {
  marketId: string;
  side: 'yes' | 'no';
  shares: number;
  averagePrice: number;
  currentValue: number;
  pnl: number;
}
