# How Kalshitherm Works

Panduan lengkap tentang cara kerja sistem Kalshitherm - Temperature Prediction Market berbasis Solana.

## Overview

Kalshitherm adalah platform prediksi pasar temperature yang memungkinkan users untuk:
1. Melihat prediksi temperature real-time untuk 10 kota global
2. Connect dengan multiple Solana wallets (7 wallet support)
3. Browse dan track prediction markets
4. View interactive charts dengan historical data
5. Manage watchlist dan predictions

## System Architecture

### 1. Frontend Layer (React + TypeScript)

**Components:**
- **Header**: Navigation dengan wallet connection button
- **PredictionCard**: Display temperature data dan forecast
- **MarketCard**: Show market information dengan odds
- **Modal Components**: Interactive detail views dengan charts
- **WalletButton**: Multi-wallet selector dan connection manager

**State Management:**
- React Hooks untuk local state
- Solana Wallet Adapter untuk wallet state
- LocalStorage untuk predictions dan watchlist

### 2. Solana Integration Layer

**Wallet Management:**
```typescript
// 7 Supported Wallets
- Phantom (primary)
- Solflare
- Sollet
- Clover
- Solong
- Coin98
- MathWallet
```

**Connection Flow:**
```
1. User clicks "Connect Wallet"
   ↓
2. WalletMultiButton modal shows available wallets
   ↓
3. User selects wallet (e.g., Phantom)
   ↓
4. Wallet extension opens for approval
   ↓
5. User approves connection
   ↓
6. PublicKey and balance loaded
   ↓
7. UI updates dengan wallet info
```

**Solana Service (`src/solana/service.ts`):**
- **RPC Connection**: Connect ke Solana mainnet/devnet
- **Balance Queries**: Get SOL dan SPL token balances
- **Transaction Handling**: Sign dan send transactions
- **Network Info**: Monitor blockchain status

### 3. API Integration Layer

**Weather API (Open-Meteo):**
```
Flow:
1. User views city prediction card
   ↓
2. weatherService.getCurrentWeather(city) called
   ↓
3. Geocode city name → coordinates
   ↓
4. Fetch weather data from Open-Meteo
   ↓
5. Process hourly breakdown
   ↓
6. Calculate forecast high/low
   ↓
7. Determine suggested option
   ↓
8. Display in UI dengan charts
```

**Markets API (Polymarket CLOB):**
```
Flow:
1. User opens Scanner page
   ↓
2. marketsService.getMarkets() called
   ↓
3. Fetch dari Polymarket CLOB API
   ↓
4. Process dan categorize markets:
   - Surging Markets (by volume)
   - Hidden Gems (low liquidity, good volume)
   - Urgent Decisions (time-sensitive)
   - Even Odds (close to 50/50)
   ↓
5. Display in categorized sections
```

## Core Features Explained

### 1. Temperature Prediction Cards

**Data Flow:**
```
PredictionCard Component
  ↓
weatherService.getCurrentWeather(city, days)
  ↓
Open-Meteo API (Geocoding + Weather)
  ↓
Data Processing:
- Current temperature (Celsius + Fahrenheit)
- Forecast high/low
- Hourly breakdown (24 hours)
- Suggested option (Higher/Lower)
  ↓
Display:
- Current temp display
- Forecast high (Market Resolution Unit)
- Suggested option indicator
- Hourly breakdown grid
  ↓
User clicks card
  ↓
TemperatureChartModal opens
  ↓
Interactive Charts:
- Temperature forecast line chart
- Hourly breakdown bar chart
- Time range selectors (24H, 7D, 30D)
```

**Temperature Calculation:**
```typescript
// Celsius to Fahrenheit
fahrenheit = (celsius * 9/5) + 32

// Suggested Option Logic
if (forecastHighF > currentTempF) {
  suggestedOption = 'Higher'
} else {
  suggestedOption = 'Lower'
}
```

### 2. Wallet Connection System

**Multi-Wallet Architecture:**
```
Solana Wallet Adapter Framework
  ↓
WalletProvider (wraps entire app)
  ↓
7 Wallet Adapters:
- PhantomWalletAdapter
- SolflareWalletAdapter
- SolletWalletAdapter
- CloverWalletAdapter
- SolongWalletAdapter
- Coin98WalletAdapter
- MathWalletAdapter
  ↓
WalletModalProvider (UI)
  ↓
WalletButton Component (custom UI)
```

**Wallet State Management:**
```typescript
const { 
  publicKey,      // User's Solana address
  connected,      // Connection status
  connecting,     // Loading state
  wallet,         // Current wallet adapter
  disconnect,     // Disconnect function
  signTransaction // Sign TX function
} = useWallet();
```

**Balance Loading:**
```
1. Wallet connected
   ↓
2. Get publicKey
   ↓
3. solanaService.getBalance(publicKey)
   ↓
4. RPC call: connection.getBalance()
   ↓
5. Convert lamports → SOL
   ↓
6. Display in WalletButton
```

### 3. Interactive Charts

**Chart Implementation:**
```
Recharts Library
  ↓
Component Types:
- AreaChart: Temperature trends
- LineChart: Odds movements
- BarChart: Volume/liquidity data
- ComposedChart: Multiple data series
  ↓
Features:
- Responsive sizing
- Hover tooltips
- Time range selectors
- Smooth animations
```

**Time Range Handling:**
```typescript
// Generate mock historical data based on range
const generateData = (days: number) => {
  const now = Date.now();
  return Array.from({ length: days * 8 }, (_, i) => ({
    time: now - (days * 8 - i) * 3600000,
    value: baseValue + Math.random() * variance
  }));
};
```

### 4. Market Scanner

**Categorization Logic:**
```typescript
// Surging Markets (High Volume)
surgingMarkets = markets
  .sort((a, b) => b.volume - a.volume)
  .slice(0, 30);

// Hidden Gems (Low Liquidity, Good Volume)
hiddenGems = markets
  .filter(m => m.liquidity < 10000 && m.volume > 1000)
  .slice(0, 35);

// Urgent Decisions (Time-Sensitive)
urgentDecisions = markets
  .filter(m => hoursSinceUpdate < 24)
  .slice(0, 22);

// Even Odds (Close to 50/50)
evenOdds = markets
  .filter(m => Math.abs(m.oddsYes - 0.5) < 0.1)
  .slice(0, 14);
```

### 5. Watchlist Management

**LocalStorage Implementation:**
```typescript
// Save to watchlist
const addToWatchlist = (market) => {
  const watchlist = JSON.parse(
    localStorage.getItem('kalshitherm_watchlist') || '[]'
  );
  watchlist.push({ ...market, addedAt: new Date() });
  localStorage.setItem(
    'kalshitherm_watchlist', 
    JSON.stringify(watchlist)
  );
};

// Load watchlist
const loadWatchlist = () => {
  return JSON.parse(
    localStorage.getItem('kalshitherm_watchlist') || '[]'
  );
};
```

## Solana Transaction Flow

### Basic Transaction:
```
1. User initiates action (e.g., place bet)
   ↓
2. Create transaction object
   ↓
3. Get recent blockhash
   ↓
4. Set feePayer (user's publicKey)
   ↓
5. Call wallet.signTransaction()
   ↓
6. Wallet shows approval dialog
   ↓
7. User approves
   ↓
8. Signed transaction returned
   ↓
9. connection.sendRawTransaction()
   ↓
10. Transaction sent to Solana network
   ↓
11. Confirm transaction
   ↓
12. UI updates dengan result
```

### Error Handling:
```typescript
try {
  const signature = await sendTransaction(...);
  await confirmTransaction(signature);
  // Success
} catch (error) {
  if (error.code === 4001) {
    // User rejected
  } else if (error.code === -32603) {
    // RPC error
  } else {
    // Other errors
  }
}
```

## Data Flow Diagram

```
User Action
    ↓
React Component
    ↓
    ├→ Solana Service → RPC Endpoint → Blockchain
    │                      ↓
    │                  Balance/TX Status
    │
    ├→ Weather Service → Open-Meteo API → Weather Data
    │                       ↓
    │                   Temperature Info
    │
    └→ Markets Service → Polymarket API → Market Data
                            ↓
                        Market Info
    ↓
UI Update (Charts, Cards, Modals)
    ↓
User sees results
```

## Security Considerations

### 1. Wallet Security
- Private keys NEVER leave user's wallet
- All transactions require explicit approval
- No automatic signing
- Display TX details before approval

### 2. Data Validation
```typescript
// Validate publicKey
if (!PublicKey.isOnCurve(publicKey)) {
  throw new Error('Invalid public key');
}

// Validate amounts
if (amount <= 0 || isNaN(amount)) {
  throw new Error('Invalid amount');
}
```

### 3. Error Handling
- Graceful fallback ke demo data
- User-friendly error messages
- Retry logic untuk network errors
- Transaction confirmation monitoring

## Performance Optimization

### 1. Code Splitting
```typescript
// Lazy load heavy components
const Modal = lazy(() => import('./Modal'));
```

### 2. Data Caching
```typescript
// Cache weather data for 5 minutes
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

const getCachedWeather = (city) => {
  const cached = cache.get(city);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};
```

### 3. Efficient Rendering
```typescript
// Memoize expensive calculations
const chartData = useMemo(() => 
  generateChartData(rawData), 
  [rawData]
);
```

## Future Enhancements

1. **Smart Contract Integration**: On-chain betting dengan Solana programs
2. **Real-time Updates**: WebSocket untuk live price updates
3. **Mobile App**: React Native version
4. **Social Features**: Comments, sharing, leaderboards
5. **Advanced Analytics**: ML predictions, historical analysis

---

**Note**: Sistem ini dirancang untuk production-grade dengan fokus pada:
- User experience yang smooth
- Security best practices
- Performance optimization
- Comprehensive error handling
- Clear data flow
