import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TripPlanner from './pages/TripPlanner';
import ChatAssistant from './pages/ChatAssistant';
import ExplorePlaces from './pages/ExplorePlaces';
import BuddyMarketplace from './pages/BuddyMarketplace';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/planner" element={<TripPlanner />} />
              <Route path="/chat" element={<ChatAssistant />} />
              <Route path="/explore" element={<ExplorePlaces />} />
              <Route path="/buddies" element={<BuddyMarketplace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<AuthPage isLogin={true} />} />
              <Route path="/register" element={<AuthPage isLogin={false} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
