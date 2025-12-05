import React from 'react';
import DocumentationLayout from '../DocumentationLayout';

const PolymarketIntegration: React.FC = () => {
  return (
    <DocumentationLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            Polymarket Integration
          </h1>
          <p className="text-xl text-gray-400">
            Technical overview of Kalshitherm's integration with Polymarket CLOB API
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-3">
            Overview
          </h2>
          <p className="text-gray-300 mb-4">
            Kalshitherm leverages Polymarket's Central Limit Order Book (CLOB) API to provide
            real-time prediction market data, including market odds, liquidity, trading volume,
            and order book information. This integration powers our market scanner and
            prediction analysis features.
          </p>
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <p className="text-blue-200 text-sm">
              💡 <strong>Why Polymarket?</strong> As the largest decentralized prediction
              market platform with $2B+ in trading volume, Polymarket provides deep liquidity
              and accurate market-based forecasts.
            </p>
          </div>
        </div>

        {/* Architecture */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Integration Architecture
          </h2>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto mb-4">
            <pre className="text-sm text-gray-300">
              {`┌─────────────────────────────────────────────────────────────┐
│               POLYTHERM + POLYMARKET FLOW                   │
└─────────────────────────────────────────────────────────────┘

  Kalshitherm Frontend
         │
         │ HTTP Request
         ▼
  API Service Layer (/src/services/api.ts)
         │
         ├─► Open-Meteo API ──────► Weather Data
         │                            │
         └─► Polymarket CLOB API      │
                    │                 │
                    ▼                 ▼
         ┌──────────────────────────────┐
         │   Data Aggregation Layer     │
         └──────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────────────┐
         │  Market Analysis Engine      │
         │  - Odds calculation          │
         │  - Liquidity assessment      │
         │  - Opportunity scoring       │
         └──────────────────────────────┘
                    │
                    ▼
         ┌──────────────────────────────┐
         │   UI Components              │
         │   - Scanner                  │
         │   - Market Cards             │
         │   - Detail Modals            │
         └──────────────────────────────┘`}
            </pre>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-100 mb-6">
            Polymarket CLOB API Endpoints
          </h2>

          {/* Markets Endpoint */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">
              📊 Get Markets
            </h3>
            <div className="bg-gray-900 rounded p-4 mb-4">
              <code className="text-sm text-green-400">
                GET https://clob.polymarket.com/markets
              </code>
            </div>
            <p className="text-gray-300 mb-4">
              Retrieves list of active prediction markets with filtering options.
            </p>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-400 mb-2">Query Parameters:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                  <code className="text-blue-400 flex-shrink-0">limit</code>
                  <span className="text-gray-300">Number of results to return (default: 100)</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-blue-400 flex-shrink-0">offset</code>
                  <span className="text-gray-300">Pagination offset</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-blue-400 flex-shrink-0">active</code>
                  <span className="text-gray-300">Filter by active/closed markets (true/false)</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-blue-400 flex-shrink-0">tag</code>
                  <span className="text-gray-300">Filter by market category/tag</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">Example Response:</p>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                {`{
  "data": [
    {
      "id": "0x123abc...",
      "question": "Will Tokyo temperature exceed 30°C on Dec 15?",
      "description": "Resolves YES if...",
      "category": "Weather",
      "end_date": "2025-12-15T23:59:59Z",
      "active": true,
      "closed": false,
      "volume": "45234.50",
      "liquidity": "128450.00",
      "outcomes": [
        {
          "name": "YES",
          "price": "0.62",
          "volume": "28145.39"
        },
        {
          "name": "NO",
          "price": "0.38",
          "volume": "17089.11"
        }
      ]
    }
  ],
  "count": 234,
  "next_offset": 100
}`}
              </pre>
            </div>
          </div>

          {/* Order Book Endpoint */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">
              📖 Get Order Book
            </h3>
            <div className="bg-gray-900 rounded p-4 mb-4">
              <code className="text-sm text-green-400">
                GET https://clob.polymarket.com/book
              </code>
            </div>
            <p className="text-gray-300 mb-4">
              Fetches current order book with buy/sell orders for a specific market.
            </p>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-400 mb-2">Query Parameters:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                  <code className="text-blue-400 flex-shrink-0">token_id</code>
                  <span className="text-gray-300">Market token identifier (required)</span>
                </div>
                <div className="flex items-start gap-3">
                  <code className="text-blue-400 flex-shrink-0">side</code>
                  <span className="text-gray-300">Order side: BUY or SELL</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">Example Response:</p>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                {`{
  "market": "0x123abc...",
  "asset_id": "YES",
  "bids": [
    { "price": "0.6200", "size": "1250.00" },
    { "price": "0.6150", "size": "850.50" },
    { "price": "0.6100", "size": "2100.00" }
  ],
  "asks": [
    { "price": "0.6250", "size": "900.00" },
    { "price": "0.6300", "size": "1500.00" },
    { "price": "0.6350", "size": "750.25" }
  ],
  "spread": "0.0050",
  "timestamp": "2025-12-02T04:56:44Z"
}`}
              </pre>
            </div>
          </div>

          {/* Trades Endpoint */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-3">
              💱 Get Recent Trades
            </h3>
            <div className="bg-gray-900 rounded p-4 mb-4">
              <code className="text-sm text-green-400">
                GET https://clob.polymarket.com/trades
              </code>
            </div>
            <p className="text-gray-300 mb-4">
              Returns recent trade history for market analysis.
            </p>

            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">Example Response:</p>
              <pre className="text-xs text-gray-300 overflow-x-auto">
                {`{
  "data": [
    {
      "id": "trade_001",
      "market": "0x123abc...",
      "side": "BUY",
      "outcome": "YES",
      "price": "0.6200",
      "size": "500.00",
      "timestamp": "2025-12-02T04:45:12Z"
    },
    {
      "id": "trade_002",
      "market": "0x123abc...",
      "side": "SELL",
      "outcome": "NO",
      "price": "0.3800",
      "size": "300.00",
      "timestamp": "2025-12-02T04:42:33Z"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Implementation */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Implementation in Kalshitherm
          </h2>

          <p className="text-gray-300 mb-4">
            Kalshitherm's API service layer (<code className="text-blue-400 text-sm">src/services/api.ts</code>)
            handles all Polymarket integrations:
          </p>

          <div className="bg-gray-900 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-400 mb-2">Core Service Functions:</p>
            <pre className="text-sm text-gray-300 overflow-x-auto">
              {`// Fetch active markets from Polymarket
export const fetchPolymarketMarkets = async () => {
  const response = await fetch(
    'https://clob.polymarket.com/markets?active=true&limit=100'
  );
  const data = await response.json();
  return processMarketData(data);
};

// Get order book for specific market
export const fetchOrderBook = async (tokenId: string) => {
  const response = await fetch(
    \`https://clob.polymarket.com/book?token_id=\${tokenId}\`
  );
  return await response.json();
};

// Calculate market metrics
const processMarketData = (rawData: any) => {
  return rawData.data.map((market: any) => ({
    id: market.id,
    question: market.question,
    category: market.category,
    volume24h: parseFloat(market.volume),
    liquidity: parseFloat(market.liquidity),
    oddsYes: parseFloat(market.outcomes[0].price) * 100,
    oddsNo: parseFloat(market.outcomes[1].price) * 100,
    expiryDate: new Date(market.end_date),
    isActive: market.active
  }));
};`}
            </pre>
          </div>
        </div>

        {/* Data Flow */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Data Flow & Caching
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <span className="text-blue-400">1.</span> Request Optimization
              </h3>
              <p className="text-sm text-gray-400">
                API calls are batched and deduplicated to minimize requests.
                Multiple components requesting the same market data receive cached responses.
              </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <span className="text-blue-400">2.</span> Smart Caching
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                Market data is cached with strategic TTL (Time To Live):
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 ml-4">
                <li>Market list: 5 minutes (moderate refresh)</li>
                <li>Order book: 30 seconds (near real-time)</li>
                <li>Historical trades: 10 minutes (static historical)</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <span className="text-blue-400">3.</span> Error Handling
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                Robust fallback mechanisms ensure continuity:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 ml-4">
                <li>API timeout → Use cached data if available</li>
                <li>Network error → Display demo data with warning</li>
                <li>Invalid response → Log error, retry with exponential backoff</li>
                <li>Rate limiting → Queue requests and throttle</li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
                <span className="text-blue-400">4.</span> Real-Time Updates
              </h3>
              <p className="text-sm text-gray-400">
                Markets with user watchlist entries refresh every 30 seconds.
                Background polling keeps odds and volume data current without user intervention.
              </p>
            </div>
          </div>
        </div>

        {/* CORS Considerations */}
        <div className="mt-8 bg-yellow-900/30 border border-yellow-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-200 mb-3 flex items-center gap-2">
            <span>⚠️</span> CORS Considerations
          </h2>
          <p className="text-yellow-100 mb-4">
            Browser-based applications may encounter CORS (Cross-Origin Resource Sharing)
            restrictions when accessing Polymarket's API directly.
          </p>

          <div className="space-y-3">
            <div className="bg-gray-900/50 rounded p-4">
              <h3 className="font-semibold text-yellow-200 mb-2">Current Solution:</h3>
              <p className="text-sm text-gray-300">
                Kalshitherm attempts direct API calls first. If CORS blocks the request,
                the app gracefully falls back to cached or demo data.
              </p>
            </div>

            <div className="bg-gray-900/50 rounded p-4">
              <h3 className="font-semibold text-yellow-200 mb-2">Production Recommendation:</h3>
              <p className="text-sm text-gray-300 mb-2">
                For production deployments, implement a backend proxy:
              </p>
              <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 ml-4">
                <li>Deploy Supabase Edge Functions as API proxy</li>
                <li>Edge functions fetch from Polymarket server-side (no CORS)</li>
                <li>Frontend calls your Edge Functions instead of Polymarket directly</li>
                <li>Add caching layer in Edge Functions for performance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Market Categories */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Weather Market Categories
          </h2>

          <p className="text-gray-300 mb-4">
            Kalshitherm filters Polymarket's vast catalog to focus on temperature-related markets:
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">🌡️ Temperature Markets</h3>
              <p className="text-sm text-gray-400 mb-2">Questions about specific temperature thresholds:</p>
              <code className="text-xs text-blue-400">
                "Will [City] exceed [X]°C on [Date]?"
              </code>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">📊 Climate Events</h3>
              <p className="text-sm text-gray-400 mb-2">Broader climate-related predictions:</p>
              <code className="text-xs text-blue-400">
                "Will 2025 be hottest year on record?"
              </code>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">🌍 Regional Forecasts</h3>
              <p className="text-sm text-gray-400 mb-2">Multi-city or regional predictions:</p>
              <code className="text-xs text-blue-400">
                "Will average Asia temp rise by 2°C?"
              </code>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-200 mb-2">⚡ Extreme Weather</h3>
              <p className="text-sm text-gray-400 mb-2">Heat waves and cold snaps:</p>
              <code className="text-xs text-blue-400">
                "Will heat wave hit Europe in June?"
              </code>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-700 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4">
            Benefits of Polymarket Integration
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-green-400 mb-2">✅ Deep Liquidity</h3>
              <p className="text-sm text-gray-300">
                Access to millions in market liquidity ensures fair pricing and easy entry/exit.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-green-400 mb-2">✅ Market Wisdom</h3>
              <p className="text-sm text-gray-300">
                Crowd-sourced predictions often outperform individual forecasts through wisdom of crowds.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-green-400 mb-2">✅ Transparent Data</h3>
              <p className="text-sm text-gray-300">
                All market data is on-chain and publicly verifiable, ensuring trust and accuracy.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-green-400 mb-2">✅ Real-Time Pricing</h3>
              <p className="text-sm text-gray-300">
                Live order book data provides instant market sentiment and pricing signals.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Next Steps</h2>
          <div className="space-y-3">
            <a href="/docs/technical-guide/architecture" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">System Architecture →</p>
              <p className="text-sm text-gray-400">Explore Kalshitherm's complete technical architecture</p>
            </a>
            <a href="/docs/technical-guide/api-reference" className="block p-4 bg-gray-900 rounded-lg hover:bg-gray-750 transition">
              <p className="font-semibold text-blue-400">API Reference →</p>
              <p className="text-sm text-gray-400">Complete API documentation and code examples</p>
            </a>
          </div>
        </div>
      </div>
    </DocumentationLayout>
  );
};

export default PolymarketIntegration;
