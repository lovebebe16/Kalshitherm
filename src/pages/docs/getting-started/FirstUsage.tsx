import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Monitor, ThermometerSun, ScanSearch, Bookmark, Calendar } from 'lucide-react';

export const FirstUsage = () => {
  return (
    <div className="prose prose-invert max-w-none">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/docs" className="hover:text-white">Docs</Link>
        <span>/</span>
        <Link to="/docs/getting-started/quick-start" className="hover:text-white">Getting Started</Link>
        <span>/</span>
        <span className="text-white">First Usage</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-4">First Time Usage Guide</h1>
      <p className="text-gray-300 text-lg mb-8">
        This guide walks you through the main features of Kalshitherm after you've connected
        your wallet. Learn how to navigate the interface, view predictions, and use the market scanner.
      </p>

      {/* Interface Overview */}
      <h2 className="text-2xl font-semibold text-white mb-4">Interface Overview</h2>
      <p className="text-gray-300 mb-6">
        Kalshitherm's interface consists of three main areas:
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
          <h3 className="font-semibold text-white mb-2">Header</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Kalshitherm logo and branding</li>
            <li>Search functionality</li>
            <li>Wallet connection button</li>
            <li>User account status</li>
          </ul>
        </div>
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
          <h3 className="font-semibold text-white mb-2">Sidebar</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Main navigation menu</li>
            <li>Scanner, Predictions, Calendar</li>
            <li>Watchlist, Markets, Categories</li>
            <li>Quick access to all features</li>
          </ul>
        </div>
        <div className="p-4 bg-gray-900 border border-gray-800 rounded-xl">
          <h3 className="font-semibold text-white mb-2">Main Content</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Page-specific content area</li>
            <li>Interactive cards and charts</li>
            <li>Data visualizations</li>
            <li>Modal overlays for details</li>
          </ul>
        </div>
      </div>

      {/* Feature Walkthroughs */}
      <h2 className="text-2xl font-semibold text-white mb-6">Feature Walkthroughs</h2>

      {/* Predictions */}
      <div className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <ThermometerSun className="w-6 h-6 text-orange-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">Temperature Predictions</h3>
            <p className="text-gray-300 mb-4">
              The Predictions page displays temperature forecasts for 10 major global cities.
              Each prediction card shows:
            </p>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li><strong className="text-white">City Name:</strong> Location for the temperature prediction</li>
              <li><strong className="text-white">Forecast High:</strong> Predicted high temperature in Celsius</li>
              <li><strong className="text-white">Market Resolution Unit:</strong> Temperature in Fahrenheit for market reference</li>
              <li><strong className="text-white">Suggested Option:</strong> Recommended prediction direction (Higher/Lower)</li>
              <li><strong className="text-white">Hourly Breakdown:</strong> Temperature variations throughout the day</li>
            </ul>
            <h4 className="font-semibold text-white mb-2">How to Use:</h4>
            <ol className="text-gray-300 space-y-2 list-decimal list-inside">
              <li>Navigate to "Predictions" from the sidebar</li>
              <li>Toggle between "Today" and "Tomorrow" tabs</li>
              <li>Click on any city card to open detailed charts</li>
              <li>Review hourly breakdowns and forecast data</li>
              <li>Click "Go to Market" to proceed to Polymarket</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Scanner */}
      <div className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <ScanSearch className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">Market Scanner</h3>
            <p className="text-gray-300 mb-4">
              The Scanner provides a categorized view of prediction markets to help you
              discover opportunities:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <h5 className="text-purple-400 font-medium mb-1">Surging Markets (30)</h5>
                <p className="text-sm text-gray-400">Markets with highest trading volume</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <h5 className="text-green-400 font-medium mb-1">Hidden Gems (35)</h5>
                <p className="text-sm text-gray-400">Low attention markets with good liquidity</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <h5 className="text-yellow-400 font-medium mb-1">Urgent Decisions (22)</h5>
                <p className="text-sm text-gray-400">Markets nearing resolution deadline</p>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <h5 className="text-blue-400 font-medium mb-1">Even Odds (14)</h5>
                <p className="text-sm text-gray-400">Markets with balanced probabilities (~50/50)</p>
              </div>
            </div>
            <h4 className="font-semibold text-white mb-2">How to Use:</h4>
            <ol className="text-gray-300 space-y-2 list-decimal list-inside">
              <li>Click "Scanner" in the sidebar navigation</li>
              <li>Browse the four category sections</li>
              <li>Click on any market card for detailed view</li>
              <li>Add interesting markets to your watchlist</li>
              <li>Set up price alerts for monitoring</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Watchlist */}
      <div className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bookmark className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">Watchlist Management</h3>
            <p className="text-gray-300 mb-4">
              Keep track of markets you're interested in by adding them to your watchlist:
            </p>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li><strong className="text-white">Add Markets:</strong> Click the bookmark icon on any market card</li>
              <li><strong className="text-white">View Watchlist:</strong> Access from sidebar navigation</li>
              <li><strong className="text-white">Remove Items:</strong> Click the bookmark icon again to remove</li>
              <li><strong className="text-white">Quick Access:</strong> One-click to open market details</li>
            </ul>
            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
              <p className="text-blue-300 text-sm mb-0">
                <strong>Note:</strong> Your watchlist is stored locally in your browser.
                Clearing browser data will reset your watchlist.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">Calendar View</h3>
            <p className="text-gray-300 mb-4">
              The Calendar page helps you track market events and resolution dates:
            </p>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li><strong className="text-white">Monthly View:</strong> See all events in calendar format</li>
              <li><strong className="text-white">Event Markers:</strong> Visual indicators for market resolutions</li>
              <li><strong className="text-white">Navigate:</strong> Use arrows to move between months</li>
              <li><strong className="text-white">Click Dates:</strong> View events for specific days</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips for Success */}
      <h2 className="text-2xl font-semibold text-white mb-4">Tips for Success</h2>
      <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 mb-8">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-green-400 font-bold">1.</span>
            <span className="text-gray-300"><strong className="text-white">Start with Familiar Cities:</strong> Begin with cities whose weather patterns you understand</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 font-bold">2.</span>
            <span className="text-gray-300"><strong className="text-white">Use Multiple Timeframes:</strong> Check 24H, 7D, and 30D charts for context</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 font-bold">3.</span>
            <span className="text-gray-300"><strong className="text-white">Build Your Watchlist:</strong> Track markets you're considering before committing</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 font-bold">4.</span>
            <span className="text-gray-300"><strong className="text-white">Monitor Volume:</strong> Higher volume markets typically have better liquidity</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-400 font-bold">5.</span>
            <span className="text-gray-300"><strong className="text-white">Check Resolution Times:</strong> Be aware of when markets resolve</span>
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between">
        <Link to="/docs/getting-started/installation" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Installation
        </Link>
        <Link to="/docs/how-it-works/overview" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Next: How It Works
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
