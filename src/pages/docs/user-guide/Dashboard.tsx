import React from 'react';
import DocumentationLayout from '../DocumentationLayout';

const Dashboard: React.FC = () => {
  return (
    <DocumentationLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Dashboard Guide
          </h1>
          <p className="text-xl text-gray-400">
            Master the Kalshitherm dashboard to monitor predictions, track markets, and analyze performance
          </p>
        </div>

        {/* Overview */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">
            Dashboard Overview
          </h2>
          <p className="text-gray-300 mb-4">
            The Kalshitherm dashboard is your central hub for managing predictions, monitoring markets,
            and analyzing your performance. It provides real-time updates, interactive charts, and
            quick access to all platform features.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">
            Dashboard Sections
          </h2>

          {/* Header & Wallet */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              📱 Header & Navigation
            </h3>
            <p className="text-gray-300 mb-4">
              The top navigation bar provides quick access to all features:
            </p>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-2">Left Side:</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>🏠 <strong>Kalshitherm Logo</strong> - Return to home</li>
                    <li>🔍 <strong>Scanner</strong> - Market discovery tool</li>
                    <li>📊 <strong>Predictions</strong> - Your active predictions</li>
                    <li>📅 <strong>Calendar</strong> - Upcoming market expirations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200 mb-2">Right Side:</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>⭐ <strong>Watchlist</strong> - Saved markets</li>
                    <li>📈 <strong>Markets</strong> - All active markets</li>
                    <li>🗂️ <strong>Categories</strong> - Browse by category</li>
                    <li>👛 <strong>Wallet Button</strong> - Connect/disconnect</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded p-4">
              <p className="text-blue-200 text-sm">
                💡 <strong>Wallet Status:</strong> The wallet button shows your connected address
                (abbreviated) or "Connect Wallet" if disconnected. Click to access wallet options.
              </p>
            </div>
          </div>

          {/* Scanner Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              🔍 Scanner Page
            </h3>
            <p className="text-gray-300 mb-4">
              Your primary tool for discovering profitable prediction opportunities:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Category Tabs</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 border border-gray-700 rounded p-3">
                    <p className="font-semibold text-gray-200 mb-1">🌍 All Markets</p>
                    <p className="text-xs text-gray-400">Complete market overview with all active predictions</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded p-3">
                    <p className="font-semibold text-gray-200 mb-1">🔥 Hot Cities</p>
                    <p className="text-xs text-gray-400">High-temperature prediction markets</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded p-3">
                    <p className="font-semibold text-gray-200 mb-1">❄️ Cold Cities</p>
                    <p className="text-xs text-gray-400">Low-temperature prediction markets</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded p-3">
                    <p className="font-semibold text-gray-200 mb-1">📈 High Volume</p>
                    <p className="text-xs text-gray-400">Most actively traded markets</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Market Cards</h4>
                <p className="text-sm text-gray-300 mb-3">Each market displays:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                  <li><strong className="text-gray-300">Question:</strong> Market prediction question</li>
                  <li><strong className="text-gray-300">Odds:</strong> Current YES/NO probability</li>
                  <li><strong className="text-gray-300">Volume:</strong> 24h trading volume</li>
                  <li><strong className="text-gray-300">Liquidity:</strong> Available market depth</li>
                  <li><strong className="text-gray-300">Mini Chart:</strong> Price trend preview</li>
                  <li><strong className="text-gray-300">Expiry:</strong> Time remaining until resolution</li>
                </ul>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Interaction</h4>
                <p className="text-sm text-gray-400 mb-2">Click any market card to:</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400">→</span>
                    <span className="text-gray-300">View detailed charts (price, volume, liquidity)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400">→</span>
                    <span className="text-gray-300">Analyze weather forecast data</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400">→</span>
                    <span className="text-gray-300">Make a prediction</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400">→</span>
                    <span className="text-gray-300">Add to watchlist</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Predictions Page */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              📊 Predictions Page
            </h3>
            <p className="text-gray-300 mb-4">
              Track all your active and historical temperature predictions:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Prediction Cards</h4>
                <div className="bg-gray-800 border border-gray-700 rounded p-4 mb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h5 className="font-semibold text-gray-200">Tokyo Temperature &gt; 30°C</h5>
                      <p className="text-xs text-gray-500">December 15, 2025</p>
                    </div>
                    <span className="px-2 py-1 bg-green-900/30 border border-green-700 rounded text-green-400 text-xs font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                    <div>
                      <p className="text-gray-500">Your Prediction</p>
                      <p className="text-green-400 font-semibold">YES (31.5°C)</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Confidence</p>
                      <p className="text-gray-200 font-semibold">85%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Stake</p>
                      <p className="text-gray-200 font-semibold">1.5 SOL</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 rounded text-white text-xs font-semibold">
                      View Charts
                    </button>
                    <button className="px-3 py-2 bg-gray-700 rounded text-gray-300 text-xs">
                      ⭐
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Each prediction shows your forecast, current market odds, potential return,
                  and real-time temperature updates.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Filtering Options</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-2 bg-blue-600 rounded text-white text-sm">All</button>
                  <button className="px-3 py-2 bg-gray-700 rounded text-gray-300 text-sm">Active</button>
                  <button className="px-3 py-2 bg-gray-700 rounded text-gray-300 text-sm">Resolved</button>
                  <button className="px-3 py-2 bg-gray-700 rounded text-gray-300 text-sm">Won</button>
                  <button className="px-3 py-2 bg-gray-700 rounded text-gray-300 text-sm">Lost</button>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Page */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              📅 Calendar Page
            </h3>
            <p className="text-gray-300 mb-4">
              Visualize market expiration dates and plan your predictions:
            </p>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-200 mb-3">Calendar Features</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">📅</span>
                  <div>
                    <strong className="text-gray-200">Month View:</strong>
                    <span className="text-gray-400"> Browse markets by expiration date</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">●</span>
                  <div>
                    <strong className="text-gray-200">Date Indicators:</strong>
                    <span className="text-gray-400"> Days with expiring markets are highlighted</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">!</span>
                  <div>
                    <strong className="text-gray-200">Urgency Markers:</strong>
                    <span className="text-gray-400"> Predictions expiring within 24h marked in red</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">👁️</span>
                  <div>
                    <strong className="text-gray-200">Your Predictions:</strong>
                    <span className="text-gray-400"> Dates with your active predictions emphasized</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-900/30 border border-blue-700 rounded p-4">
              <p className="text-blue-200 text-sm">
                💡 <strong>Pro Tip:</strong> Use the calendar to identify clustering of markets.
                Multiple markets expiring on the same date can create correlation opportunities.
              </p>
            </div>
          </div>

          {/* Markets & Categories */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-100 mb-4">
              📈 Markets & Categories
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Markets Page</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Browse all active temperature prediction markets with advanced filtering:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
                  <li>Sort by volume, liquidity, expiry date, or odds</li>
                  <li>Filter by city, temperature range, or market status</li>
                  <li>Search for specific markets or keywords</li>
                  <li>View grid or list layout</li>
                </ul>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Categories Page</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Explore markets organized by weather categories:
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-800 border border-gray-700 rounded p-2">
                    <p className="text-gray-200">🌡️ Temperature Thresholds</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded p-2">
                    <p className="text-gray-200">🌍 Regional Markets</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded p-2">
                    <p className="text-gray-200">⚡ Extreme Weather</p>
                  </div>
                  <div className="bg-gray-800 border border-gray-700 rounded p-2">
                    <p className="text-gray-200">📊 Climate Events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            ⚡ Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">Keyboard Shortcuts</h3>
              <div className="space-y-1 text-sm text-gray-400">
                <p><kbd className="px-2 py-1 bg-gray-800 rounded text-xs">S</kbd> Scanner</p>
                <p><kbd className="px-2 py-1 bg-gray-800 rounded text-xs">P</kbd> Predictions</p>
                <p><kbd className="px-2 py-1 bg-gray-800 rounded text-xs">W</kbd> Watchlist</p>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">Quick Filters</h3>
              <p className="text-sm text-gray-400">
                Right-click market cards for context menu with instant actions
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">Bulk Actions</h3>
              <p className="text-sm text-gray-400">
                Select multiple markets to add to watchlist or compare side-by-side
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Next Steps</h2>
          <div className="space-y-3">
            <a href="/docs/user-guide/watchlist" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">Watchlist Guide →</p>
              <p className="text-sm text-gray-400">Learn how to track and monitor your favorite markets</p>
            </a>
            <a href="/docs/user-guide/notifications" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">Notification Setup →</p>
              <p className="text-sm text-gray-400">Configure alerts for market changes and updates</p>
            </a>
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default Dashboard;
