import { StrictMode, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { getWalletAdapters } from './wallets/config.ts';
import { connection } from './solana/service.ts';
import './index.css';
import App from './App.tsx';

// Import Solana Wallet Adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

const WalletConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  // Get RPC endpoint
  const endpoint = useMemo(() => connection.rpcEndpoint, []);

  // Get all wallet adapters
  const wallets = useMemo(() => getWalletAdapters(), []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <WalletConnectionProvider>
        <App />
      </WalletConnectionProvider>
    </ErrorBoundary>
  </StrictMode>,
);
