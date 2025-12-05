import { Link } from 'react-router-dom';
import { ArrowRight, Database, Globe, Wallet, BarChart, Cloud, Zap } from 'lucide-react';

export const Overview = () => {
  return (
    <div className="prose prose-invert max-w-none">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/docs" className="hover:text-white">Docs</Link>
        <span>/</span>
        <Link to="/docs/how-it-works/overview" className="hover:text-white">How It Works</Link>
        <span>/</span>
        <span className="text-white">System Overview</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-4">System Overview</h1>
      <p className="text-gray-300 text-lg mb-8">
        Kalshitherm is a Solana-native temperature prediction market platform that connects
        real-time weather data with prediction markets. This overview explains the core
        architecture and data flow.
      </p>

      {/* What is Kalshitherm */}
      <h2 className="text-2xl font-semibold text-white mb-4">What is Kalshitherm?</h2>
      <p className="text-gray-300 mb-6">
        Kalshitherm enables users to make predictions on future temperature conditions for
        major global cities. The platform integrates with:
      </p>
      <ul className="text-gray-300 space-y-2 mb-8">
        <li><strong className="text-white">Open-Meteo API:</strong> Real-time and forecast weather data</li>
        <li><strong className="text-white">Polymarket CLOB:</strong> Decentralized prediction market trading</li>
        <li><strong className="text-white">Solana Blockchain:</strong> Fast, low-cost transactions</li>
        <li><strong className="text-white">Multiple Wallets:</strong> Support for 6+ Solana wallets</li>
      </ul>

      {/* Architecture Diagram */}
      <h2 className="text-2xl font-semibold text-white mb-4">System Architecture</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 overflow-x-auto">
        <pre className="text-sm text-gray-300 font-mono whitespace-pre">
          {`
+------------------+     +-------------------+     +------------------+
|                  |     |                   |     |                  |
|   USER BROWSER   |<--->|   KALSHITHERM APP  |<--->|   SOLANA RPC     |
|   + Wallet Ext   |     |   (React + TS)    |     |   (mainnet)      |
|                  |     |                   |     |                  |
+------------------+     +-------------------+     +------------------+
                               |       |
                               |       |
              +----------------+       +----------------+
              |                                        |
              v                                        v
    +------------------+                    +------------------+
    |                  |                    |                  |
    |   OPEN-METEO    |                    |   POLYMARKET     |
    |   Weather API   |                    |   CLOB API       |
    |   (Real-time)   |                    |   (Markets)      |
    |                  |                    |                  |
    +------------------+                    +------------------+
`}
        </pre>
      </div>

      {/* Core Components */}
      <h2 className="text-2xl font-semibold text-white mb-4">Core Components</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="p-5 bg-gray-900 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white">Frontend Layer</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            React 18 application with TypeScript, providing a responsive user interface
            with interactive charts and real-time data display.
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>React 18 + TypeScript</li>
            <li>Vite build system</li>
            <li>Tailwind CSS styling</li>
            <li>Recharts visualizations</li>
          </ul>
        </div>

        <div className="p-5 bg-gray-900 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white">Wallet Integration</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Solana Wallet Adapter framework supporting multiple wallet providers
            for secure connection and transaction signing.
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>6+ wallet support</li>
            <li>Secure key management</li>
            <li>Transaction signing</li>
            <li>Balance monitoring</li>
          </ul>
        </div>

        <div className="p-5 bg-gray-900 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Cloud className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold text-white">Weather Service</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Open-Meteo API integration providing real-time weather data
            and forecasts for 10 global cities.
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Real-time temperatures</li>
            <li>24-hour forecasts</li>
            <li>Hourly breakdowns</li>
            <li>No API key required</li>
          </ul>
        </div>

        <div className="p-5 bg-gray-900 border border-gray-800 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <BarChart className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="font-semibold text-white">Market Service</h3>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Polymarket CLOB API integration for accessing prediction market
            data, including volume, liquidity, and odds.
          </p>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Market discovery</li>
            <li>Real-time odds</li>
            <li>Volume tracking</li>
            <li>Category filtering</li>
          </ul>
        </div>
      </div>

      {/* Data Flow */}
      <h2 className="text-2xl font-semibold text-white mb-4">Data Flow</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">User Action</h4>
              <p className="text-sm text-gray-400">
                User connects wallet, navigates to a page, or interacts with a component
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Service Layer Processing</h4>
              <p className="text-sm text-gray-400">
                React components call appropriate service functions (weatherService, marketsService, solanaService)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">External API Calls</h4>
              <p className="text-sm text-gray-400">
                Services fetch data from Open-Meteo (weather), Polymarket CLOB (markets), or Solana RPC (blockchain)
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Data Transformation</h4>
              <p className="text-sm text-gray-400">
                Raw API responses are processed, formatted, and converted to application-specific types
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              5
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">UI Update</h4>
              <p className="text-sm text-gray-400">
                React components receive data and update the user interface with charts, cards, and interactive elements
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <h2 className="text-2xl font-semibold text-white mb-4">Technology Stack</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 font-medium px-6 py-3">Category</th>
              <th className="text-left text-gray-400 font-medium px-6 py-3">Technology</th>
              <th className="text-left text-gray-400 font-medium px-6 py-3">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3 text-white">Frontend</td>
              <td className="px-6 py-3 text-gray-300">React 18 + TypeScript</td>
              <td className="px-6 py-3 text-gray-400">UI framework with type safety</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3 text-white">Styling</td>
              <td className="px-6 py-3 text-gray-300">Tailwind CSS</td>
              <td className="px-6 py-3 text-gray-400">Utility-first CSS framework</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3 text-white">Build Tool</td>
              <td className="px-6 py-3 text-gray-300">Vite 6</td>
              <td className="px-6 py-3 text-gray-400">Fast build and HMR</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3 text-white">Blockchain</td>
              <td className="px-6 py-3 text-gray-300">@solana/web3.js</td>
              <td className="px-6 py-3 text-gray-400">Solana JavaScript SDK</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3 text-white">Wallet</td>
              <td className="px-6 py-3 text-gray-300">Wallet Adapter</td>
              <td className="px-6 py-3 text-gray-400">Multi-wallet support</td>
            </tr>
            <tr className="border-b border-gray-800/50">
              <td className="px-6 py-3 text-white">Charts</td>
              <td className="px-6 py-3 text-gray-300">Recharts</td>
              <td className="px-6 py-3 text-gray-400">Data visualization</td>
            </tr>
            <tr>
              <td className="px-6 py-3 text-white">Icons</td>
              <td className="px-6 py-3 text-gray-300">Lucide React</td>
              <td className="px-6 py-3 text-gray-400">SVG icon library</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Key Benefits */}
      <h2 className="text-2xl font-semibold text-white mb-4">Key Benefits</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-600/5 border border-blue-500/30 rounded-xl">
          <Zap className="w-8 h-8 text-blue-400 mb-3" />
          <h4 className="font-semibold text-white mb-2">Fast Transactions</h4>
          <p className="text-sm text-gray-400">
            Solana blockchain provides sub-second transaction finality with minimal fees
          </p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-600/20 to-green-600/5 border border-green-500/30 rounded-xl">
          <Cloud className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="font-semibold text-white mb-2">Real Weather Data</h4>
          <p className="text-sm text-gray-400">
            Live temperature data from Open-Meteo API for accurate predictions
          </p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-600/5 border border-purple-500/30 rounded-xl">
          <Database className="w-8 h-8 text-purple-400 mb-3" />
          <h4 className="font-semibold text-white mb-2">Decentralized Markets</h4>
          <p className="text-sm text-gray-400">
            Direct integration with Polymarket for transparent prediction trading
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-12 p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <h3 className="font-semibold text-white mb-4">Explore Detailed Workflows</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/docs/how-it-works/wallet-connection" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
            <Wallet className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300 group-hover:text-white">Wallet Connection Flow</span>
            <ArrowRight className="w-4 h-4 text-gray-500 ml-auto group-hover:text-white" />
          </Link>
          <Link to="/docs/how-it-works/prediction-flow" className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group">
            <BarChart className="w-5 h-5 text-orange-400" />
            <span className="text-gray-300 group-hover:text-white">Prediction Making Flow</span>
            <ArrowRight className="w-4 h-4 text-gray-500 ml-auto group-hover:text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
