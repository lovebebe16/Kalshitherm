// Solana Service - RPC and Program Interactions
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram,
  LAMPORTS_PER_SOL,
  Commitment 
} from '@solana/web3.js';
import { 
  getAssociatedTokenAddress, 
  TOKEN_PROGRAM_ID 
} from '@solana/spl-token';
import type { SolanaNetwork, SPLToken, SolanaTransaction } from '../types/solana';

// Solana RPC Configuration
const NETWORKS: Record<string, SolanaNetwork> = {
  mainnet: {
    name: 'mainnet-beta',
    endpoint: import.meta.env.VITE_SOLANA_RPC_ENDPOINT || 'https://api.mainnet-beta.solana.com'
  },
  devnet: {
    name: 'devnet',
    endpoint: import.meta.env.VITE_SOLANA_DEVNET_RPC || 'https://api.devnet.solana.com'
  }
};

// Current network (default to mainnet)
const currentNetwork = import.meta.env.VITE_NETWORK || 'mainnet-beta';

// Create Solana connection
export const createConnection = (network: 'mainnet' | 'devnet' = 'mainnet', commitment: Commitment = 'confirmed') => {
  const networkConfig = NETWORKS[network];
  return new Connection(networkConfig.endpoint, commitment);
};

// Default connection
export const connection = createConnection(
  currentNetwork === 'devnet' ? 'devnet' : 'mainnet'
);

// Solana Service Class
export class SolanaService {
  private connection: Connection;

  constructor(customConnection?: Connection) {
    this.connection = customConnection || connection;
  }

  /**
   * Get SOL balance for a wallet
   */
  async getBalance(publicKey: PublicKey): Promise<number> {
    try {
      const balance = await this.connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error('Error getting balance:', error);
      return 0;
    }
  }

  /**
   * Get SPL token balance
   */
  async getTokenBalance(walletAddress: PublicKey, mintAddress: string): Promise<SPLToken | null> {
    try {
      const mint = new PublicKey(mintAddress);
      const tokenAccount = await getAssociatedTokenAddress(
        mint,
        walletAddress,
        false,
        TOKEN_PROGRAM_ID
      );

      const balance = await this.connection.getTokenAccountBalance(tokenAccount);
      
      return {
        mint: mintAddress,
        symbol: 'TOKEN', // Would need to fetch from metadata
        name: 'Token',
        decimals: balance.value.decimals,
        balance: parseFloat(balance.value.amount) / Math.pow(10, balance.value.decimals),
        uiBalance: balance.value.uiAmountString || '0'
      };
    } catch (error) {
      console.error('Error getting token balance:', error);
      return null;
    }
  }

  /**
   * Get USDC balance (Solana USDC mint)
   */
  async getUSDCBalance(walletAddress: PublicKey): Promise<number> {
    const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // Mainnet USDC
    const tokenBalance = await this.getTokenBalance(walletAddress, USDC_MINT);
    return tokenBalance?.balance || 0;
  }

  /**
   * Get recent transactions for a wallet
   */
  async getRecentTransactions(publicKey: PublicKey, limit: number = 10): Promise<SolanaTransaction[]> {
    try {
      const signatures = await this.connection.getSignaturesForAddress(publicKey, { limit });
      
      const transactions: SolanaTransaction[] = signatures.map(sig => ({
        signature: sig.signature,
        slot: sig.slot,
        timestamp: sig.blockTime || 0,
        status: sig.err ? 'failed' : 'success',
        fee: 0.000005 // Default Solana fee, would need to fetch actual
      }));

      return transactions;
    } catch (error) {
      console.error('Error getting transactions:', error);
      return [];
    }
  }

  /**
   * Send SOL transaction
   */
  async sendTransaction(
    transaction: Transaction,
    publicKey: PublicKey,
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  ): Promise<string> {
    try {
      // Get recent blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Sign transaction
      const signed = await signTransaction(transaction);

      // Send transaction
      const signature = await this.connection.sendRawTransaction(signed.serialize());

      // Confirm transaction
      await this.connection.confirmTransaction(signature, 'confirmed');

      return signature;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  }

  /**
   * Create transfer SOL transaction
   */
  createTransferTransaction(from: PublicKey, to: PublicKey, amount: number): Transaction {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from,
        toPubkey: to,
        lamports: amount * LAMPORTS_PER_SOL
      })
    );
    return transaction;
  }

  /**
   * Get network info
   */
  async getNetworkInfo() {
    try {
      const version = await this.connection.getVersion();
      const epochInfo = await this.connection.getEpochInfo();
      const blockHeight = await this.connection.getBlockHeight();

      return {
        version: version['solana-core'],
        epoch: epochInfo.epoch,
        blockHeight,
        network: currentNetwork
      };
    } catch (error) {
      console.error('Error getting network info:', error);
      return null;
    }
  }

  /**
   * Verify connection health
   */
  async isHealthy(): Promise<boolean> {
    try {
      const blockHeight = await this.connection.getBlockHeight();
      return blockHeight > 0;
    } catch (error) {
      return false;
    }
  }
}

// Export singleton instance
export const solanaService = new SolanaService();

// Helper functions
export const formatPublicKey = (publicKey: PublicKey | null): string => {
  if (!publicKey) return '';
  const key = publicKey.toString();
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
};

export const formatSOL = (lamports: number): string => {
  return (lamports / LAMPORTS_PER_SOL).toFixed(4);
};

export const lamportsToSOL = (lamports: number): number => {
  return lamports / LAMPORTS_PER_SOL;
};

export const solToLamports = (sol: number): number => {
  return sol * LAMPORTS_PER_SOL;
};
