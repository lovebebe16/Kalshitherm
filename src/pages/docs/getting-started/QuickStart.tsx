import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Wallet, ThermometerSun, ScanSearch, BarChart } from 'lucide-react';

export const QuickStart = () => {
  return (
    <div className="prose prose-invert max-w-none">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/docs" className="hover:text-white">Docs</Link>
        <span>/</span>
        <Link to="/docs/getting-started/quick-start" className="hover:text-white">Getting Started</Link>
        <span>/</span>
        <span className="text-white">Quick Start</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-4">Quick Start Guide</h1>
      <p className="text-gray-300 text-lg mb-8">
        Get up and running with Kalshitherm in under 5 minutes. This guide walks you through
        connecting your Solana wallet and making your first temperature prediction.
      </p>

      {/* Prerequisites */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold text-white mb-4 mt-0">Prerequisites</h2>
        <ul className="space-y-3 mb-0">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">A modern web browser (Chrome, Firefox, Safari, or Edge)</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">A Solana wallet extension installed (Phantom recommended)</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-300">Some SOL in your wallet for transactions</span>
          </li>
        </ul>
      </div>

      {/* Step-by-Step Guide */}
      <h2 className="text-2xl font-semibold text-white mb-6">Step-by-Step Setup</h2>

      {/* Step 1 */}
      <div className="relative pl-8 pb-8 border-l-2 border-gray-700">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          1
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">Install a Solana Wallet</h3>
          <p className="text-gray-300 mb-4">
            If you don't already have a Solana wallet, we recommend installing Phantom:
          </p>
          <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">
            <li>Visit <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">phantom.app</a></li>
            <li>Click "Download" and select your browser</li>
            <li>Install the browser extension</li>
            <li>Create a new wallet or import an existing one</li>
            <li>Securely store your recovery phrase</li>
          </ol>
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
            <p className="text-yellow-300 text-sm mb-0">
              <strong>Security Tip:</strong> Never share your recovery phrase with anyone. Kalshitherm will never ask for your private keys.
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="relative pl-8 pb-8 border-l-2 border-gray-700">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          2
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-gray-300 mb-4">
            Once your wallet is installed, connect it to Kalshitherm:
          </p>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Click the "Connect Wallet" button in the header</li>
            <li>A modal will appear showing supported wallets</li>
            <li>Select your installed wallet (e.g., Phantom)</li>
            <li>Approve the connection request in your wallet extension</li>
            <li>Your wallet address and SOL balance will appear in the header</li>
          </ol>
        </div>
      </div>

      {/* Step 3 */}
      <div className="relative pl-8 pb-8 border-l-2 border-gray-700">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          3
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">Browse Temperature Predictions</h3>
          <p className="text-gray-300 mb-4">
            Navigate to the Predictions page to see real-time temperature data:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Click "Predictions" in the left sidebar</li>
            <li>View temperature predictions for 10 global cities</li>
            <li>Each card shows current forecast and suggested options</li>
            <li>Toggle between "Today" and "Tomorrow" views</li>
          </ul>
        </div>
      </div>

      {/* Step 4 */}
      <div className="relative pl-8 pb-8 border-l-2 border-gray-700">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
          4
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">View Detailed Charts</h3>
          <p className="text-gray-300 mb-4">
            Click on any prediction card to see detailed charts:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Interactive temperature forecast chart</li>
            <li>Hourly breakdown with high/low ranges</li>
            <li>Time range selectors (24H, 7D, 30D)</li>
            <li>Current weather statistics</li>
          </ul>
        </div>
      </div>

      {/* Step 5 */}
      <div className="relative pl-8">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-white mb-2">You're Ready!</h3>
          <p className="text-gray-300 mb-4">
            You're now set up to use Kalshitherm. Explore the platform:
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        <Link to="/docs/how-it-works/market-scanning" className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors group">
          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <ScanSearch className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">Explore Market Scanner</h4>
            <p className="text-sm text-gray-400">Discover markets across 4 categories</p>
          </div>
        </Link>

        <Link to="/docs/how-it-works/polymarket-integration" className="flex items-start gap-4 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors group">
          <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <BarChart className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">Trade on Polymarket</h4>
            <p className="text-sm text-gray-400">Learn about Polymarket integration</p>
          </div>
        </Link>
      </div>

      {/* Next Steps */}
      <div className="mt-12 flex items-center justify-between p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <div>
          <h4 className="font-semibold text-white mb-1">Next: Installation Guide</h4>
          <p className="text-sm text-gray-400">Set up Kalshitherm for local development</p>
        </div>
        <Link to="/docs/getting-started/installation" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Continue
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
