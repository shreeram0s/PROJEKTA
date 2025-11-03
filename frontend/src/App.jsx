import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import HistoryPage from './pages/HistoryPage';
import ComparePage from './pages/ComparePage';
import AdminPanel from './pages/AdminPanel';
import InterviewPrepPage from './pages/InterviewPrepPage';
import JobsPage from './pages/JobsPage';
import SuggestionsPage from './pages/SuggestionsPage';
import ExportPage from './pages/ExportPage';
import DashboardPage from './pages/DashboardPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/suggestions" element={<SuggestionsPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/interview-prep" element={<InterviewPrepPage />} />
              <Route path="/export" element={<ExportPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;