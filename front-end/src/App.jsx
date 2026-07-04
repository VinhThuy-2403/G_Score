import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './pages/DashboardPage';
import SearchScorePage from './pages/SearchScorePage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <div className="main-content">
          <Header />
          <main className="page-body">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/search" element={<SearchScorePage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;