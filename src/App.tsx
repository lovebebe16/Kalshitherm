import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

import { PredictionsPage } from './pages/PredictionsPage';
import { CalendarPage } from './pages/CalendarPage';
import { WatchlistPage } from './pages/WatchlistPage';
import { MarketsPage } from './pages/MarketsPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation';

function App() {
  return (
    <BrowserRouter>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(245, 243, 237)"
        gradientBackgroundEnd="rgb(232, 229, 222)"
        firstColor="74, 124, 89"
        secondColor="156, 175, 136"
        thirdColor="107, 155, 122"
        fourthColor="249, 166, 32"
        fifthColor="45, 74, 54"
        pointerColor="74, 124, 89"
        size="90%"
        blendingValue="multiply"
        interactive={true}
        containerClassName="!fixed inset-0"
      />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto scrollbar-botanical">
            <Routes>
              <Route path="/" element={<Navigate to="/predictions" replace />} />

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
