import React from 'react';
import DocumentationLayout from '../DocumentationLayout';

const Watchlist: React.FC = () => {
  return (
    <DocumentationLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Watchlist Guide
          </h1>
          <p className="text-xl text-gray-400">
            Track markets, monitor opportunities, and never miss important predictions
          </p>
        </div>

        {/* Overview */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">
            What is the Watchlist?
          </h2>
          <p className="text-gray-300 mb-4">
            The Watchlist is your personal market monitoring tool. Add markets you're interested in,
            track their odds changes, receive alerts when conditions match your criteria, and quickly
            access detailed information without searching.
          </p>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              💡 <strong>Pro Tip:</strong> Effective traders maintain 10-20 markets in their watchlist,
              regularly reviewing and updating based on changing conditions.
            </p>
          </div>
        </div>

        {/* Adding to Watchlist */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Adding Markets to Watchlist
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-3">Method 1: From Market Card</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                <li>Browse markets in Scanner, Markets, or Categories pages</li>
                <li>Find a market you want to track</li>
                <li>Click the ⭐ (star) icon in the top-right corner of the market card</li>
                <li>Star turns gold to confirm addition</li>
              </ol>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-3">Method 2: From Market Detail Modal</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                <li>Click on any market card to open detail modal</li>
                <li>Review charts and market information</li>
                <li>Click "Add to Watchlist" button at the bottom</li>
                <li>Modal shows confirmation and star icon highlights</li>
              </ol>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-3">Method 3: Bulk Add</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
                <li>In Scanner or Markets page, enable selection mode (checkbox icon)</li>
                <li>Select multiple market cards (checkboxes appear)</li>
                <li>Click "Add Selected to Watchlist" button</li>
                <li>All selected markets added simultaneously</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Watchlist Features */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">
            Watchlist Features
          </h2>

          {/* Organization */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              🗂️ Organization & Grouping
            </h3>
            <p className="text-gray-300 mb-4">
              Keep your watchlist organized with custom groups and tags:
            </p>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-200 mb-3">Create Groups</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-800 border border-gray-700 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-200">📁 High Confidence</span>
                    <span className="text-gray-500 text-xs">8 markets</span>
                  </div>
                  <p className="text-xs text-gray-400">Markets with strong weather forecast alignment</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-200">📁 Watch & Wait</span>
                    <span className="text-gray-500 text-xs">5 markets</span>
                  </div>
                  <p className="text-xs text-gray-400">Waiting for better odds or clearer forecasts</p>
                </div>
                <div className="bg-gray-800 border border-gray-700 rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-200">📁 Short-term (24-48h)</span>
                    <span className="text-gray-500 text-xs">3 markets</span>
                  </div>
                  <p className="text-xs text-gray-400">Markets expiring within 2 days</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="font-semibold text-gray-200 mb-3">Tag System</h4>
              <p className="text-sm text-gray-400 mb-3">Add custom tags for flexible filtering:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-900/30 border border-blue-700 rounded text-blue-400 text-xs">
                  asia-pacific
                </span>
                <span className="px-3 py-1 bg-green-900/30 border border-green-700 rounded text-green-400 text-xs">
                  high-liquidity
                </span>
                <span className="px-3 py-1 bg-purple-900/30 border border-purple-700 rounded text-purple-400 text-xs">
                  winter-markets
                </span>
                <span className="px-3 py-1 bg-yellow-900/30 border border-yellow-700 rounded text-yellow-400 text-xs">
                  value-opportunity
                </span>
              </div>
            </div>
          </div>

          {/* Monitoring */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              📊 Real-Time Monitoring
            </h3>
            <p className="text-gray-300 mb-4">
              Watchlist markets update every 30 seconds with fresh data:
            </p>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-gray-200 mb-3">Tracked Metrics</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-green-400 mb-2">Market Data</p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>✓ Odds changes (YES/NO percentages)</li>
                    <li>✓ Volume trends (24h trading activity)</li>
                    <li>✓ Liquidity updates</li>
                    <li>✓ Spread movements</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-400 mb-2">Weather Data</p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>✓ Temperature forecast updates</li>
                    <li>✓ Confidence level changes</li>
                    <li>✓ Weather pattern shifts</li>
                    <li>✓ Extreme event alerts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h4 className="font-semibold text-gray-200 mb-3">Change Indicators</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-2 py-1 bg-green-900/30 border border-green-700 rounded text-green-400 text-xs font-mono">
                    +5.2%
                  </span>
                  <span className="text-gray-300">Odds increased (favorable for YES predictions)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-2 py-1 bg-red-900/30 border border-red-700 rounded text-red-400 text-xs font-mono">
                    -3.8%
                  </span>
                  <span className="text-gray-300">Odds decreased (favorable for NO predictions)</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-2 py-1 bg-yellow-900/30 border border-yellow-700 rounded text-yellow-400 text-xs font-mono">
                    ⚠️ High
                  </span>
                  <span className="text-gray-300">Volatility alert - rapid price changes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              🔔 Alerts & Notifications
            </h3>
            <p className="text-gray-300 mb-4">
              Set custom alerts for watchlist markets to get notified when conditions change:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Alert Types</h4>
                <div className="space-y-3">
                  <div className="bg-gray-800 border border-gray-700 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-200 text-sm">📈 Odds Threshold</span>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-xs text-gray-400">Enabled</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">Notify when YES odds reach specific percentage</p>
                    <div className="flex gap-2 items-center">
                      <input type="number" placeholder="65" className="w-20 px-2 py-1 bg-gray-700 rounded text-white text-xs" />
                      <span className="text-gray-400 text-xs">% or higher</span>
                    </div>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-200 text-sm">📊 Volume Spike</span>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-xs text-gray-400">Enabled</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-400">Alert when 24h volume increases by 50%+ in 1 hour</p>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-200 text-sm">🌡️ Weather Change</span>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-xs text-gray-400">Disabled</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-400">Notify when forecast changes by ±2°C or more</p>
                  </div>

                  <div className="bg-gray-800 border border-gray-700 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-200 text-sm">⏰ Time-based</span>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-xs text-gray-400">Enabled</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-400">Alert 24h before market expiry</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Notification Channels</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-2 bg-gray-800 rounded">
                    <input type="checkbox" defaultChecked />
                    <div>
                      <p className="text-sm text-gray-200">In-App Notifications</p>
                      <p className="text-xs text-gray-500">Toast messages within Kalshitherm</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-2 bg-gray-800 rounded">
                    <input type="checkbox" />
                    <div>
                      <p className="text-sm text-gray-200">Telegram Bot</p>
                      <p className="text-xs text-gray-500">Receive alerts via Telegram (requires setup)</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-2 bg-gray-800 rounded">
                    <input type="checkbox" />
                    <div>
                      <p className="text-sm text-gray-200">Email Digest</p>
                      <p className="text-xs text-gray-500">Daily summary of watchlist changes</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              ⚙️ Watchlist Management
            </h3>

            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Removing Markets</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>Click gold star icon on market card to remove</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>Swipe left on market card → "Remove" button</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400">→</span>
                    <span>Select multiple → "Remove Selected" bulk action</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Sorting & Filtering</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  <button className="px-3 py-2 bg-blue-600 rounded text-white text-sm">Latest Added</button>
                  <button className="px-3 py-2 bg-gray-700 rounded text-gray-300 text-sm">Expiring Soon</button>
                  <button className="px-3 py-2 bg-gray-700 rounded text-gray-300 text-sm">Highest Volume</button>
                  <button className="px-3 py-2 bg-gray-700 rounded text-gray-300 text-sm">Best Odds</button>
                </div>
                <p className="text-xs text-gray-400">
                  Use filters to quickly find markets matching specific criteria within your watchlist
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <h4 className="font-semibold text-gray-200 mb-3">Notes & Annotations</h4>
                <div className="bg-gray-800 border border-gray-700 rounded p-3 mb-2">
                  <p className="text-xs text-gray-500 mb-2">Tokyo Temperature &gt; 30°C</p>
                  <textarea
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200 text-sm"
                    rows={2}
                    placeholder="Add your analysis notes..."
                    defaultValue="Strong YES signal. Open-Meteo shows 31.5°C forecast. Market underpricing at 62%. Potential 15% gain."
                  />
                  <p className="text-xs text-gray-500 mt-1">Last updated: 2 hours ago</p>
                </div>
                <p className="text-xs text-gray-400">
                  Add personal notes to each watched market to track your analysis and strategy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            💡 Watchlist Best Practices
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">✓ Keep it Focused</h3>
              <p className="text-sm text-gray-400">
                Maintain 10-20 high-quality markets rather than 100+ with superficial tracking.
                Quality over quantity enables better analysis.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">✓ Regular Reviews</h3>
              <p className="text-sm text-gray-400">
                Review watchlist daily. Remove markets that no longer meet your criteria.
                Add new opportunities as they emerge.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">✓ Use Groups Strategically</h3>
              <p className="text-sm text-gray-400">
                Organize by action needed: "Ready to Predict", "Watch & Wait", "Research Needed".
                This clarifies your workflow.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">✓ Set Smart Alerts</h3>
              <p className="text-sm text-gray-400">
                Don't over-alert. Set thresholds that signal genuine opportunities, not every minor fluctuation.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Next Steps</h2>
          <div className="space-y-3">
            <a href="/docs/user-guide/notifications" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">Notification Setup →</p>
              <p className="text-sm text-gray-400">Configure Telegram bot and notification preferences</p>
            </a>
            <a href="/docs/how-it-works/prediction-flow" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">Making Predictions →</p>
              <p className="text-sm text-gray-400">Learn how to convert watchlist insights into predictions</p>
            </a>
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default Watchlist;
