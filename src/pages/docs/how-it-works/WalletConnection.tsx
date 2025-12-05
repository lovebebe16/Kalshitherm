import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Wallet, CheckCircle, Shield, AlertTriangle } from 'lucide-react';

export const WalletConnection = () => {
  const supportedWallets = [
    { name: 'Phantom', description: 'Most popular Solana wallet', recommended: true, url: 'https://phantom.app' },
    { name: 'Solflare', description: 'Web and extension wallet', recommended: false, url: 'https://solflare.com' },
    { name: 'Clover', description: 'Cross-chain wallet', recommended: false, url: 'https://clv.org' },
    { name: 'Solong', description: 'Simple Solana wallet', recommended: false, url: 'https://solongwallet.com' },
    { name: 'Coin98', description: 'Multi-chain wallet', recommended: false, url: 'https://coin98.com' },
    { name: 'MathWallet', description: 'Universal crypto wallet', recommended: false, url: 'https://mathwallet.org' },
  ];

  return (
    <div className="prose prose-invert max-w-none">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/docs" className="hover:text-white">Docs</Link>
        <span>/</span>
        <Link to="/docs/how-it-works/overview" className="hover:text-white">How It Works</Link>
        <span>/</span>
        <span className="text-white">Wallet Connection</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-4">Wallet Connection Workflow</h1>
      <p className="text-gray-300 text-lg mb-8">
        This guide explains the complete wallet connection process in Kalshitherm, from
        clicking the connect button to having full access to all platform features.
      </p>

      {/* Supported Wallets */}
      <h2 className="text-2xl font-semibold text-white mb-4">Supported Solana Wallets</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {supportedWallets.map((wallet) => (
          <a
            key={wallet.name}
            href={wallet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                {wallet.name}
              </h3>
              {wallet.recommended && (
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                  Recommended
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">{wallet.description}</p>
          </a>
        ))}
      </div>

      {/* Connection Flow Diagram */}
      <h2 className="text-2xl font-semibold text-white mb-4">Connection Flow Diagram</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 overflow-x-auto">
        <pre className="text-sm text-gray-300 font-mono whitespace-pre">
          {`
  +-------------------+
  |   User visits     |
  |    Kalshitherm    |
  +-------------------+
           |
           v
  +-------------------+
  | Click "Connect    |
  |    Wallet"        |
  +-------------------+
           |
           v
  +-------------------+
  |  Modal shows 6    |
  |  wallet options   |
  +-------------------+
           |
           v
  +-------------------+
  | User selects      |
  |  wallet (Phantom) |
  +-------------------+
           |
           v
  +-------------------+
  | Wallet extension  |
  | opens for approval|
  +-------------------+
           |
           v
  +-------------------+
  | User approves     |
  |   connection      |
  +-------------------+
           |
           v
  +-------------------+
  | PublicKey loaded  |
  | Balance fetched   |
  +-------------------+
           |
           v
  +-------------------+
  | UI updates with   |
  | wallet info       |
  +-------------------+
           |
           v
  +-------------------+
  | All features      |
  |   unlocked        |
  +-------------------+
`}
        </pre>
      </div>

      {/* Step by Step */}
      <h2 className="text-2xl font-semibold text-white mb-6">Step-by-Step Connection Process</h2>

      {/* Step 1 */}
      <div className="relative pl-8 pb-8 border-l-2 border-blue-600">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          1
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">Click Connect Wallet Button</h3>
          <p className="text-gray-300 mb-3">
            Locate the "Connect Wallet" button in the header area of Kalshitherm. This button
            is always visible in the top-right corner of the interface.
          </p>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Technical Details:</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Button triggers WalletMultiButton from @solana/wallet-adapter-react-ui</li>
              <li>No wallet detection happens until user clicks</li>
              <li>Button state changes based on connection status</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="relative pl-8 pb-8 border-l-2 border-blue-600">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          2
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">Wallet Selection Modal Appears</h3>
          <p className="text-gray-300 mb-3">
            A modal window opens displaying all 6 supported Solana wallets. Only wallets
            that are installed in your browser will be highlighted as available.
          </p>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Available Wallets:</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>Phantom (primary recommendation)</li>
              <li>Solflare</li>
              <li>Clover</li>
              <li>Solong</li>
              <li>Coin98</li>
              <li>MathWallet</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="relative pl-8 pb-8 border-l-2 border-blue-600">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          3
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">Select Your Wallet</h3>
          <p className="text-gray-300 mb-3">
            Click on your preferred wallet from the modal. If the wallet is not installed,
            clicking it will redirect you to the wallet's download page.
          </p>
        </div>
      </div>

      {/* Step 4 */}
      <div className="relative pl-8 pb-8 border-l-2 border-blue-600">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          4
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">Wallet Extension Opens</h3>
          <p className="text-gray-300 mb-3">
            Your browser wallet extension automatically opens, displaying a connection
            request from Kalshitherm. This popup shows the website URL requesting access.
          </p>
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-300 mb-0">
                <strong>Security Check:</strong> Always verify the URL shown in your wallet matches
                the Kalshitherm domain before approving.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 5 */}
      <div className="relative pl-8 pb-8 border-l-2 border-blue-600">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          5
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">Approve the Connection</h3>
          <p className="text-gray-300 mb-3">
            Click "Connect" or "Approve" in your wallet extension. This grants Kalshitherm
            permission to:
          </p>
          <ul className="text-gray-300 space-y-2 mb-3">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              View your wallet address (public key)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              View your SOL and token balances
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Request transaction signatures (requires approval each time)
            </li>
          </ul>
          <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-300 mb-0">
                <strong>Your Keys, Your Control:</strong> Kalshitherm never has access to your
                private keys. Each transaction requires explicit approval in your wallet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step 6 */}
      <div className="relative pl-8 pb-8 border-l-2 border-blue-600">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          6
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">Wallet Address Displayed</h3>
          <p className="text-gray-300 mb-3">
            Upon successful connection, the header updates to show your wallet address
            in shortened format (e.g., "Abc1...xyz9").
          </p>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Address Format:</p>
            <code className="text-blue-400 text-sm">ABC12345...XYZ67890</code>
            <p className="text-sm text-gray-400 mt-2">
              (First 4 characters + ... + Last 8 characters)
            </p>
          </div>
        </div>
      </div>

      {/* Step 7 */}
      <div className="relative pl-8 pb-8 border-l-2 border-blue-600">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          7
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">SOL Balance Loaded</h3>
          <p className="text-gray-300 mb-3">
            The application queries the Solana RPC to fetch your current SOL balance,
            displayed next to your address.
          </p>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Technical Flow:</p>
            <pre className="text-sm text-gray-300 font-mono">
              {`connection.getBalance(publicKey)
  .then(lamports => lamports / LAMPORTS_PER_SOL)`}
            </pre>
          </div>
        </div>
      </div>

      {/* Step 8 */}
      <div className="relative pl-8">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">All Features Unlocked</h3>
          <p className="text-gray-300 mb-3">
            You now have full access to all Kalshitherm features:
          </p>
          <ul className="text-gray-300 space-y-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              View temperature predictions
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Scan prediction markets
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Add markets to watchlist
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              Navigate to Polymarket for trading
            </li>
          </ul>
        </div>
      </div>

      {/* Code Example */}
      <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Technical Implementation</h2>
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-8 overflow-x-auto">
        <pre className="text-sm text-gray-300 font-mono">
          {`// Wallet connection using @solana/wallet-adapter-react
import { useWallet } from '@solana/wallet-adapter-react';
import { useConnection } from '@solana/wallet-adapter-react';

function WalletButton() {
  const { 
    publicKey,      // User's Solana address
    connected,      // Connection status (boolean)
    connecting,     // Loading state
    disconnect,     // Disconnect function
    wallet          // Current wallet adapter
  } = useWallet();
  
  const { connection } = useConnection();

  // Fetch SOL balance when connected
  useEffect(() => {
    if (publicKey && connection) {
      connection.getBalance(publicKey)
        .then(lamports => {
          const sol = lamports / LAMPORTS_PER_SOL;
          setBalance(sol);
        });
    }
  }, [publicKey, connection]);

  return (
    <WalletMultiButton />
  );
}`}
        </pre>
      </div>

      {/* Troubleshooting */}
      <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
      <div className="space-y-4 mb-8">
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
          <h4 className="font-semibold text-white mb-2">Wallet not detected</h4>
          <p className="text-sm text-gray-400">
            Ensure your wallet extension is installed and enabled. Try refreshing the page
            after installing. Some wallets require a browser restart.
          </p>
        </div>
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
          <h4 className="font-semibold text-white mb-2">Connection rejected</h4>
          <p className="text-sm text-gray-400">
            If you accidentally rejected the connection, click "Connect Wallet" again
            and approve the request in your wallet extension.
          </p>
        </div>
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
          <h4 className="font-semibold text-white mb-2">Balance not showing</h4>
          <p className="text-sm text-gray-400">
            This may indicate RPC connection issues. The balance will retry automatically.
            Check your network connection or try switching Solana RPC endpoints.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between">
        <Link to="/docs/how-it-works/overview" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          System Overview
        </Link>
        <Link to="/docs/how-it-works/prediction-flow" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Next: Prediction Flow
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
