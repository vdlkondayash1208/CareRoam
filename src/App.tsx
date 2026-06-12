import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import AIAssistant from './pages/AIAssistant';
import LanguageSupport from './pages/LanguageSupport';
import Emergency from './pages/Emergency';
import PartnerDashboard from './pages/PartnerDashboard';
import FounderDashboard from './pages/FounderDashboard';
import Waitlist from './pages/Waitlist';
import Feedback from './pages/Feedback';
import Investor from './pages/Investor';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/assistant" element={<AIAssistant />} />
            <Route path="/language" element={<LanguageSupport />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/partner" element={<PartnerDashboard />} />
            <Route path="/founder" element={<FounderDashboard />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/investor" element={<Investor />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
