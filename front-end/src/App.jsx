import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import SearchScorePage from './pages/SearchScorePage';
import ReportsPage from './pages/ReportsPage';


function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar mobileOpen={mobileOpen} onMobileToggle={setMobileOpen} />
        <div className="main-content">
          <Header onMobileToggle={setMobileOpen} />
          <main className="page-body">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/search" element={<SearchScorePage />} />
              <Route path="/reports" element={<ReportsPage />} />

            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;