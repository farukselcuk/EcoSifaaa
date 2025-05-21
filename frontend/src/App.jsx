import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import SuggestionPage from './pages/SuggestionPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/suggestion" element={<SuggestionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Diğer rotalar buraya eklenecek */}
        </Routes>
        {/* Anasayfa içeriği buradan kaldırıldı, sadece HomePage bileşeni içinde render edilecek */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
