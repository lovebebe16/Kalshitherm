import { Link } from 'react-router-dom';
import {
  Rocket,
  Workflow,
  Users,
  Code,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Wallet,
  ThermometerSun,
  ScanSearch,
  Link2,
  ExternalLink
} from 'lucide-react';

interface QuickLinkCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
  color: string;
}

const QuickLinkCard = ({ icon, title, description, to, color }: QuickLinkCardProps) => (
  <Link
    to={to}
    className="group block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-blue-500/5"
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
      {title}
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed mb-4">
      {description}
    </p>
    <span className="inline-flex items-center gap-1 text-blue-400 text-sm font-medium">
      Learn more
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </span>
  </Link>
);

export const DocsHome = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <ThermometerSun className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Kalshitherm Documentation</h1>
            <p className="text-gray-400">Temperature Prediction Market on Solana</p>
          </div>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
          Welcome to the official Kalshitherm documentation. Learn how to connect your Solana wallet,
          make temperature predictions, scan markets, and integrate with Polymarket.
        </p>
      </div>

      {/* Quick Start Banner */}
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 mb-12">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
            <Rocket className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-2">New to Kalshitherm?</h2>
            <p className="text-gray-300 mb-4">
              Get started in minutes with our quick start guide. Learn how to connect your wallet
              and make your first temperature prediction.
            </p>
            <Link
              to="/docs/getting-started/quick-start"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Quick Start Guide
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/docs/how-it-works/wallet-connection"
            className="group p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500/50 transition-all"
          >
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3">
              <Wallet className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">
              1. Connect Wallet
            </h3>
            <p className="text-sm text-gray-400">Connect your Solana wallet to get started</p>
          </Link>

          <Link
            to="/docs/how-it-works/prediction-flow"
            className="group p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-orange-500/50 transition-all"
          >
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
              <ThermometerSun className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
              2. Make Predictions
            </h3>
            <p className="text-sm text-gray-400">View temperature forecasts and predictions</p>
          </Link>

          <Link
            to="/docs/how-it-works/market-scanning"
            className="group p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-green-500/50 transition-all"
          >
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
              <ScanSearch className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">
              3. Scan Markets
            </h3>
            <p className="text-sm text-gray-400">Discover markets across categories</p>
          </Link>

          <Link
            to="/docs/how-it-works/polymarket-integration"
            className="group p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all"
          >
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
              <Link2 className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
              4. Trade on Polymarket
            </h3>
            <p className="text-sm text-gray-400">Execute trades via Polymarket CLOB</p>
          </Link>
        </div>
      </div>

      {/* Main Sections */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Explore Documentation</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickLinkCard
            icon={<Rocket className="w-6 h-6 text-white" />}
            title="Getting Started"
            description="Quick setup guides, installation instructions, and first-time usage walkthrough."
            to="/docs/getting-started/quick-start"
            color="bg-gradient-to-br from-green-500 to-emerald-600"
          />
          <QuickLinkCard
            icon={<Workflow className="w-6 h-6 text-white" />}
            title="How It Works"
            description="Detailed explanations of system workflows, data flows, and architecture."
            to="/docs/how-it-works/overview"
            color="bg-gradient-to-br from-blue-500 to-cyan-600"
          />
          <QuickLinkCard
            icon={<Users className="w-6 h-6 text-white" />}
            title="User Guide"
            description="Learn how to use the dashboard, manage watchlists, and configure notifications."
            to="/docs/user-guide/dashboard"
            color="bg-gradient-to-br from-purple-500 to-pink-600"
          />
          <QuickLinkCard
            icon={<Code className="w-6 h-6 text-white" />}
            title="Technical Guide"
            description="System architecture, Solana integration details, and API documentation."
            to="/docs/technical/architecture"
            color="bg-gradient-to-br from-orange-500 to-red-600"
          />
          <QuickLinkCard
            icon={<AlertCircle className="w-6 h-6 text-white" />}
            title="Troubleshooting"
            description="Solutions for common issues with wallets, connections, and API errors."
            to="/docs/troubleshooting/common-issues"
            color="bg-gradient-to-br from-red-500 to-rose-600"
          />
          <QuickLinkCard
            icon={<HelpCircle className="w-6 h-6 text-white" />}
            title="FAQ"
            description="Frequently asked questions about Kalshitherm, wallets, and predictions."
            to="/docs/faq/general"
            color="bg-gradient-to-br from-indigo-500 to-violet-600"
          />
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 font-medium px-6 py-4">Feature</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">Description</th>
                <th className="text-left text-gray-400 font-medium px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50">
                <td className="px-6 py-4 text-white font-medium">Multi-Wallet Support</td>
                <td className="px-6 py-4 text-gray-400">Support for 6+ Solana wallets including Phantom, Solflare</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">Active</span></td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="px-6 py-4 text-white font-medium">Real-Time Weather</td>
                <td className="px-6 py-4 text-gray-400">Live temperature data from Open-Meteo API for 10 cities</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">Active</span></td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="px-6 py-4 text-white font-medium">Market Scanner</td>
                <td className="px-6 py-4 text-gray-400">Categorized market discovery with 4 scanning modes</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">Active</span></td>
              </tr>
              <tr className="border-b border-gray-800/50">
                <td className="px-6 py-4 text-white font-medium">Interactive Charts</td>
                <td className="px-6 py-4 text-gray-400">Temperature and market charts with time range selectors</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">Active</span></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-white font-medium">Polymarket Integration</td>
                <td className="px-6 py-4 text-gray-400">Direct connection to Polymarket CLOB for trading</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links Footer */}
      <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                Solana Docs <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://polymarket.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                Polymarket <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                Open-Meteo API <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Wallets</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://phantom.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                Phantom Wallet <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://solflare.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                Solflare <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <a href="https://coin98.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                Coin98 <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/docs/faq/general" className="text-gray-400 hover:text-white text-sm">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/docs/troubleshooting/common-issues" className="text-gray-400 hover:text-white text-sm">
                Troubleshooting
              </Link>
            </li>
            <li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
                GitHub Issues <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
