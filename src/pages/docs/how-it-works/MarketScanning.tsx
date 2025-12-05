import React from 'react';
import DocumentationLayout from '../DocumentationLayout';

const MarketScanning: React.FC = () => {
  return (
    <DocumentationLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Market Scanning Flow
          </h1>
          <p className="text-xl text-gray-400">
            Discover profitable temperature prediction opportunities using Kalshitherm's market scanner
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">
            Overview
          </h2>
          <p className="text-gray-300 mb-4">
            The Market Scanner is Kalshitherm's powerful tool for discovering prediction opportunities
            across global temperature markets. This 8-step workflow helps you identify high-potential
            markets, analyze weather patterns, and make data-driven prediction decisions.
          </p>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              💡 <strong>Scanner Advantage:</strong> Our scanner aggregates data from Open-Meteo API
              and Polymarket, filtering thousands of data points to surface the best opportunities.
            </p>
          </div>
        </div>

        {/* Workflow Diagram */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Workflow Diagram
          </h2>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300">
              {`┌─────────────────────────────────────────────────────────────┐
│                   MARKET SCANNING FLOW                      │
└─────────────────────────────────────────────────────────────┘

  1. Access Scanner Page
         │
         ▼
  2. Select Scan Category ──────► Apply Filters
         │                            │
         ▼                            ▼
  3. Run Market Scan ◄───────────────┘
         │
         ▼
  4. Review Scan Results ──────► Sort by Criteria
         │                            │
         ▼                            ▼
  5. Analyze Market Details ◄────────┘
         │
         ▼
  6. Compare Weather Data
         │
         ▼
  7. Identify Opportunities ──────► Add to Watchlist
         │                            │
         ▼                            ▼
  8. Make Prediction ◄───────────────┘
         │
         ▼
  [ Continue to Prediction Flow ]`}
            </pre>
          </div>
        </div>

        {/* Scanner Categories */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Scanner Categories
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌍</span>
                <h3 className="font-semibold text-gray-200">All Markets</h3>
              </div>
              <p className="text-sm text-gray-400">
                Comprehensive scan of all active temperature prediction markets globally.
                Best for broad opportunity discovery.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🔥</span>
                <h3 className="font-semibold text-gray-200">Hot Cities</h3>
              </div>
              <p className="text-sm text-gray-400">
                Markets focused on high-temperature predictions (tropical and summer regions).
                Ideal for heat wave opportunities.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">❄️</span>
                <h3 className="font-semibold text-gray-200">Cold Cities</h3>
              </div>
              <p className="text-sm text-gray-400">
                Markets for low-temperature predictions (winter and polar regions).
                Perfect for cold snap trading.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📈</span>
                <h3 className="font-semibold text-gray-200">High Volume</h3>
              </div>
              <p className="text-sm text-gray-400">
                Most actively traded markets with high liquidity.
                Great for quick entries/exits with minimal slippage.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">
            Step-by-Step Guide
          </h2>

          {/* Step 1 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Access Scanner Page
                </h3>
                <p className="text-gray-300 mb-4">
                  Navigate to the <strong>Scanner</strong> page from the main navigation menu.
                  The scanner interface displays market categories and filtering options.
                </p>
                <div className="bg-gray-900 rounded p-4">
                  <p className="text-sm text-gray-400 mb-2">Scanner Features:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                    <li>Real-time market data from Polymarket CLOB API</li>
                    <li>Live weather data from Open-Meteo API</li>
                    <li>Customizable filters and sorting</li>
                    <li>Interactive charts and visualizations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Select Scan Category
                </h3>
                <p className="text-gray-300 mb-4">
                  Choose a category that aligns with your prediction strategy:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-3 bg-blue-600 rounded-lg text-white font-semibold text-sm">
                      🌍 All Markets
                    </button>
                    <button className="px-4 py-3 bg-gray-700 rounded-lg text-gray-300 text-sm">
                      🔥 Hot Cities
                    </button>
                    <button className="px-4 py-3 bg-gray-700 rounded-lg text-gray-300 text-sm">
                      ❄️ Cold Cities
                    </button>
                    <button className="px-4 py-3 bg-gray-700 rounded-lg text-gray-300 text-sm">
                      📈 High Volume
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Each category applies pre-configured filters to show relevant markets.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Run Market Scan
                </h3>
                <p className="text-gray-300 mb-4">
                  Optionally apply additional filters before running the scan:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <p className="text-sm text-gray-400 mb-3">Available Filters:</p>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-300">Min Liquidity (USD)</label>
                      <input
                        type="range"
                        className="w-full mt-1"
                        min="0"
                        max="100000"
                      />
                      <p className="text-xs text-gray-500 mt-1">$10,000+</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">Time to Expiry</label>
                      <select className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm">
                        <option>All timeframes</option>
                        <option>24 hours</option>
                        <option>7 days</option>
                        <option>30 days</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-300">Min Volume (24h)</label>
                      <input
                        type="number"
                        className="w-full mt-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                        placeholder="5000"
                      />
                    </div>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold">
                  🔍 Run Scan
                </button>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Review Scan Results
                </h3>
                <p className="text-gray-300 mb-4">
                  The scanner returns matching markets with key metrics:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <div className="space-y-3">
                    {/* Sample Market Card */}
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-200">Tokyo Temperature &gt; 30°C</h4>
                          <p className="text-xs text-gray-500">Dec 15, 2025 • 3 days left</p>
                        </div>
                        <span className="px-2 py-1 bg-green-900/30 border border-green-700 rounded text-green-400 text-xs">
                          High Opportunity
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div>
                          <p className="text-gray-500">Odds</p>
                          <p className="text-gray-200 font-semibold">62% / 38%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Volume (24h)</p>
                          <p className="text-gray-200 font-semibold">$45.2K</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Liquidity</p>
                          <p className="text-gray-200 font-semibold">$128K</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gray-700 rounded text-sm text-gray-300">
                    Sort by Volume ↓
                  </button>
                  <button className="px-4 py-2 bg-gray-700 rounded text-sm text-gray-300">
                    Sort by Odds
                  </button>
                  <button className="px-4 py-2 bg-gray-700 rounded text-sm text-gray-300">
                    Sort by Expiry
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Analyze Market Details
                </h3>
                <p className="text-gray-300 mb-4">
                  Click on a market to view comprehensive analysis:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <p className="text-sm text-gray-400 mb-3">Market Detail Modal includes:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm">
                    <li>
                      <strong>Price/Odds Chart:</strong> Historical YES/NO odds movements
                    </li>
                    <li>
                      <strong>Volume & Liquidity:</strong> Trading activity over time
                    </li>
                    <li>
                      <strong>Current Statistics:</strong> Real-time market metrics
                    </li>
                    <li>
                      <strong>Order Book:</strong> Buy/sell orders and spread
                    </li>
                    <li>
                      <strong>Historical Performance:</strong> Similar past markets
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-900/30 border border-blue-700 rounded p-3">
                  <p className="text-blue-200 text-sm">
                    💡 Look for markets with increasing volume, narrowing spreads, and clear
                    odds trends - these indicate active participation and better pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                6
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Compare Weather Data
                </h3>
                <p className="text-gray-300 mb-4">
                  Cross-reference market odds with actual weather forecasts:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <p className="text-xs text-gray-500 mb-1">MARKET PREDICTION</p>
                      <p className="text-lg font-semibold text-gray-200">62% chance &gt; 30°C</p>
                      <p className="text-xs text-gray-400">Based on crowd wisdom</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <p className="text-xs text-gray-500 mb-1">WEATHER FORECAST</p>
                      <p className="text-lg font-semibold text-gray-200">31.5°C expected</p>
                      <p className="text-xs text-gray-400">Open-Meteo 7-day forecast</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 rounded p-4">
                  <p className="text-sm text-gray-400 mb-2">Analysis Indicators:</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Market vs Forecast Alignment</span>
                      <span className="px-3 py-1 bg-green-900/30 border border-green-700 rounded text-green-400 text-xs font-semibold">
                        ✓ Strong
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Historical Accuracy</span>
                      <span className="px-3 py-1 bg-yellow-900/30 border border-yellow-700 rounded text-yellow-400 text-xs font-semibold">
                        ~ Moderate (78%)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Weather Volatility</span>
                      <span className="px-3 py-1 bg-blue-900/30 border border-blue-700 rounded text-blue-400 text-xs font-semibold">
                        Low (±1.2°C)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                7
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Identify Opportunities
                </h3>
                <p className="text-gray-300 mb-4">
                  Look for opportunities where market odds don't align with weather data:
                </p>
                <div className="space-y-3 mb-4">
                  <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">✅</span>
                      <div>
                        <h4 className="font-semibold text-green-400 mb-1">Value Opportunity</h4>
                        <p className="text-sm text-gray-300">
                          Market shows 62% YES odds, but weather forecast strongly indicates
                          31.5°C (well above 30°C threshold). Historical accuracy is high.
                        </p>
                        <p className="text-xs text-green-400 mt-2">
                          → Consider YES position with moderate stake
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <h4 className="font-semibold text-red-400 mb-1">High Risk</h4>
                        <p className="text-sm text-gray-300">
                          Market shows 85% NO odds, and forecast confirms 28°C. Low volatility.
                          Little room for profit due to consensus.
                        </p>
                        <p className="text-xs text-red-400 mt-2">
                          → Avoid or wait for better odds
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⏳</span>
                      <div>
                        <h4 className="font-semibold text-yellow-400 mb-1">Watch & Wait</h4>
                        <p className="text-sm text-gray-300">
                          Market odds fluctuating (48% YES / 52% NO). High weather volatility.
                          Wait for clearer forecast or odds movement.
                        </p>
                        <p className="text-xs text-yellow-400 mt-2">
                          → Add to watchlist, monitor for 24-48h
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 8 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                8
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Take Action
                </h3>
                <p className="text-gray-300 mb-4">
                  Based on your analysis, choose your next step:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <button className="p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg text-white text-left hover:from-green-700 hover:to-green-800 transition">
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <span className="font-semibold">Make Prediction</span>
                    </div>
                    <p className="text-sm opacity-90">
                      Proceed to prediction flow for identified opportunity
                    </p>
                  </button>

                  <button className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white text-left hover:from-blue-700 hover:to-blue-800 transition">
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                      <span className="font-semibold">Add to Watchlist</span>
                    </div>
                    <p className="text-sm opacity-90">
                      Monitor market for better entry opportunity
                    </p>
                  </button>

                  <button className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white text-left hover:from-purple-700 hover:to-purple-800 transition">
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <span className="font-semibold">Set Alert</span>
                    </div>
                    <p className="text-sm opacity-90">
                      Get notified when odds or weather changes
                    </p>
                  </button>

                  <button className="p-4 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg text-white text-left hover:from-gray-700 hover:to-gray-800 transition">
                    <div className="flex items-center gap-3 mb-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="font-semibold">Scan Again</span>
                    </div>
                    <p className="text-sm opacity-90">
                      Run new scan with different filters
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scanner Tips */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Pro Scanner Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <span>⏰</span> Scan at Optimal Times
              </h3>
              <p className="text-sm text-gray-400">
                Markets are most active during business hours in major time zones.
                Scan 2-3 times daily for best opportunities.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <span>🎯</span> Focus on Liquidity
              </h3>
              <p className="text-sm text-gray-400">
                Markets with $50K+ liquidity offer better entry/exit prices and
                lower slippage for your predictions.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <span>📊</span> Compare Multiple Sources
              </h3>
              <p className="text-sm text-gray-400">
                Cross-check Open-Meteo forecasts with other weather sources
                for higher confidence predictions.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <span>🔄</span> Track Pattern Changes
              </h3>
              <p className="text-sm text-gray-400">
                Save successful scanning patterns and filters to quickly
                identify similar opportunities in the future.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Next Steps</h2>
          <div className="space-y-3">
            <a href="/docs/how-it-works/prediction-flow" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">Prediction Making Flow →</p>
              <p className="text-sm text-gray-400">Learn the complete process of making predictions</p>
            </a>
            <a href="/docs/user-guide/watchlist" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">Watchlist Guide →</p>
              <p className="text-sm text-gray-400">Master market tracking and monitoring</p>
            </a>
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default MarketScanning;
