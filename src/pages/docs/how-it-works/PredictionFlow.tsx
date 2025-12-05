import React from 'react';
import DocumentationLayout from '../DocumentationLayout';

const PredictionFlow: React.FC = () => {
  return (
    <DocumentationLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Prediction Making Flow
          </h1>
          <p className="text-xl text-gray-400">
            Complete workflow for creating temperature predictions on Kalshitherm
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">
            Overview
          </h2>
          <p className="text-gray-300 mb-4">
            Making predictions on Kalshitherm involves a 9-step process that ensures accuracy,
            transparency, and fair market participation. This guide walks you through each step
            from selecting a market to confirming your prediction on-chain.
          </p>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              💡 <strong>Pro Tip:</strong> Before making predictions, research weather patterns,
              check historical data, and review market odds to make informed decisions.
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
│                    PREDICTION FLOW                          │
└─────────────────────────────────────────────────────────────┘

  1. Browse Markets
         │
         ▼
  2. Select Market/City ──────► View Historical Data
         │                            │
         ▼                            ▼
  3. Analyze Weather Data ◄──────────┘
         │
         ▼
  4. Review Market Odds ──────► Check Liquidity
         │                            │
         ▼                            ▼
  5. Enter Prediction ◄──────────────┘
         │
         ▼
  6. Set Confidence & Amount
         │
         ▼
  7. Review Prediction Summary
         │
         ▼
  8. Confirm Transaction (Wallet)
         │
         ▼
  9. Receive Confirmation ──────► Track in Watchlist
         │
         ▼
  [ Prediction Active on Blockchain ]`}
            </pre>
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
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Browse Available Markets
                </h3>
                <p className="text-gray-300 mb-4">
                  Navigate to the <strong>Markets</strong> page or <strong>Scanner</strong>
                  to view all available temperature prediction markets.
                </p>
                <div className="bg-gray-900 rounded p-4 mb-3">
                  <p className="text-sm text-gray-400 mb-2">Available Categories:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                    <li>🌍 All Markets - Global temperature predictions</li>
                    <li>🔥 Hot Cities - High-temperature markets</li>
                    <li>❄️ Cold Cities - Low-temperature markets</li>
                    <li>📈 High Volume - Most active markets</li>
                  </ul>
                </div>
                <p className="text-sm text-gray-400">
                  Markets display current odds, volume, liquidity, and expiration time.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Select Market/City
                </h3>
                <p className="text-gray-300 mb-4">
                  Click on a market card to open the detailed prediction modal. Each market
                  represents a specific city and temperature prediction question.
                </p>
                <div className="bg-gray-900 rounded p-4 mb-3">
                  <p className="text-sm text-gray-400 mb-2">Example Market Question:</p>
                  <p className="text-gray-200 font-semibold">
                    "Will Tokyo's temperature exceed 30°C on December 15, 2025?"
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  The modal shows historical weather charts, current conditions, and market statistics.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Analyze Weather Data
                </h3>
                <p className="text-gray-300 mb-4">
                  Review the interactive weather charts showing:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>📊 <strong>Temperature Forecast:</strong> 7-30 day predictions</li>
                  <li>📈 <strong>Historical Trends:</strong> Past temperature patterns</li>
                  <li>🎯 <strong>Accuracy Metrics:</strong> Model prediction accuracy</li>
                  <li>🌡️ <strong>High/Low Range:</strong> Temperature variability</li>
                </ul>
                <div className="bg-blue-900/30 border border-blue-700 rounded p-3">
                  <p className="text-blue-200 text-sm">
                    💡 Data is sourced from Open-Meteo API, providing reliable weather forecasts
                    for 10+ major cities globally.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Review Market Odds
                </h3>
                <p className="text-gray-300 mb-4">
                  Check the current market odds displayed in the prediction modal:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">YES Odds</p>
                      <p className="text-2xl font-bold text-green-400">62%</p>
                      <p className="text-xs text-gray-500">Market thinks likely</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">NO Odds</p>
                      <p className="text-2xl font-bold text-red-400">38%</p>
                      <p className="text-xs text-gray-500">Market thinks unlikely</p>
                    </div>
                  </div>
                </div>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li><strong>Liquidity:</strong> Higher liquidity = easier to enter/exit positions</li>
                  <li><strong>Volume:</strong> Trading activity indicates market confidence</li>
                  <li><strong>Spread:</strong> Price difference between buy/sell orders</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Enter Your Prediction
                </h3>
                <p className="text-gray-300 mb-4">
                  Fill in the prediction form with your analysis:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Prediction Outcome</label>
                      <div className="flex gap-3 mt-2">
                        <button className="px-4 py-2 bg-green-600 rounded-lg text-white font-semibold">
                          YES
                        </button>
                        <button className="px-4 py-2 bg-gray-700 rounded-lg text-gray-300">
                          NO
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Predicted Temperature</label>
                      <input
                        type="number"
                        className="w-full mt-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        placeholder="31.5"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  Your prediction is stored on-chain and cannot be modified after confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                6
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Set Confidence Score & Amount
                </h3>
                <p className="text-gray-300 mb-4">
                  Indicate your confidence level and stake amount:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Confidence Level</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        className="w-full mt-2"
                      />
                      <p className="text-right text-sm text-gray-300 mt-1">85%</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Stake Amount (SOL)</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full mt-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                        placeholder="1.5"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-700 rounded p-3">
                  <p className="text-yellow-200 text-sm">
                    ⚠️ <strong>Risk Warning:</strong> Only stake amounts you can afford to lose.
                    Predictions involve risk and past performance doesn't guarantee future results.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                7
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Review Prediction Summary
                </h3>
                <p className="text-gray-300 mb-4">
                  Before confirming, carefully review all prediction details:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4 border border-gray-700">
                  <h4 className="font-semibold text-gray-200 mb-3">Prediction Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Market:</span>
                      <span className="text-gray-200">Tokyo Temperature &gt; 30°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Your Prediction:</span>
                      <span className="text-green-400 font-semibold">YES (31.5°C)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Confidence:</span>
                      <span className="text-gray-200">85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Stake Amount:</span>
                      <span className="text-gray-200">1.5 SOL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Odds:</span>
                      <span className="text-gray-200">62% YES / 38% NO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Potential Return:</span>
                      <span className="text-blue-400 font-semibold">2.42 SOL (62% profit)</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
                      <span className="text-gray-400">Network Fee:</span>
                      <span className="text-gray-200">~0.00001 SOL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 8 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                8
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Confirm Transaction in Wallet
                </h3>
                <p className="text-gray-300 mb-4">
                  Click "Submit Prediction" to trigger your Solana wallet approval:
                </p>
                <div className="bg-gray-900 rounded p-4 mb-4">
                  <p className="text-sm text-gray-400 mb-3">Wallet Approval Process:</p>
                  <ol className="list-decimal list-inside text-gray-300 space-y-2 text-sm">
                    <li>Wallet popup appears (Phantom, Solflare, etc.)</li>
                    <li>Review transaction details in wallet</li>
                    <li>Verify recipient address and amount</li>
                    <li>Check network fee estimate</li>
                    <li>Click "Approve" or "Confirm" in wallet</li>
                    <li>Wait for transaction to be signed</li>
                  </ol>
                </div>
                <div className="bg-blue-900/30 border border-blue-700 rounded p-3">
                  <p className="text-blue-200 text-sm">
                    💡 Transaction typically confirms in 400-800ms on Solana network.
                    You'll see a loading indicator during processing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 9 */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                9
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-100 mb-3">
                  Receive Confirmation & Track
                </h3>
                <p className="text-gray-300 mb-4">
                  Upon successful transaction, you'll receive on-screen confirmation:
                </p>
                <div className="bg-green-900/30 border border-green-700 rounded p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-200 font-semibold">Prediction Submitted Successfully!</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-green-300">
                      Transaction Hash: <code className="text-xs bg-gray-900 px-2 py-1 rounded">5FHwC...9x3Z</code>
                    </p>
                    <p className="text-green-300">
                      View on Solana Explorer →
                    </p>
                  </div>
                </div>
                <div className="bg-gray-900 rounded p-4">
                  <p className="text-sm text-gray-400 mb-3">Your prediction is now:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                    <li>✅ Stored on Solana blockchain</li>
                    <li>✅ Added to your Predictions page</li>
                    <li>✅ Trackable in Watchlist</li>
                    <li>✅ Eligible for notifications (if enabled)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Prediction Actions */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            After Making Your Prediction
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">📊 Track Performance</h3>
              <p className="text-sm text-gray-400">
                Monitor your prediction in the Predictions page. View real-time temperature
                updates and market movements.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">🔔 Enable Notifications</h3>
              <p className="text-sm text-gray-400">
                Set up Telegram notifications to receive alerts when weather changes or
                market odds shift significantly.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">⭐ Add to Watchlist</h3>
              <p className="text-sm text-gray-400">
                Keep important markets in your Watchlist for quick access and monitoring.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">📈 Analyze Results</h3>
              <p className="text-sm text-gray-400">
                After market resolution, review your prediction accuracy and learn from outcomes.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Next Steps</h2>
          <div className="space-y-3">
            <a href="/docs/how-it-works/market-scanning" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">Market Scanning Flow →</p>
              <p className="text-sm text-gray-400">Learn how to discover profitable prediction opportunities</p>
            </a>
            <a href="/docs/user-guide/dashboard" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">Dashboard Guide →</p>
              <p className="text-sm text-gray-400">Master the Kalshitherm dashboard features</p>
            </a>
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default PredictionFlow;
