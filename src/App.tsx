import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ScannerPage } from './pages/ScannerPage';
import { PredictionsPage } from './pages/PredictionsPage';
import { CalendarPage } from './pages/CalendarPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { MarketsPage } from './pages/MarketsPage';
import { CategoriesPage } from './pages/CategoriesPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-botanical-cream bg-botanical-pattern flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto scrollbar-botanical">
            <Routes>
              <Route path="/" element={<Navigate to="/predictions" replace />} />
              <Route path="/scanner" element={<ScannerPage />} />
              <Route path="/predictions" element={<PredictionsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
              <Route path="/markets" element={<MarketsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
