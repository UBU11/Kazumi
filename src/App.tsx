import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/ui/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Search } from './pages/Search';
import { Details } from './pages/Details';
import { Player } from './pages/Player';
import { Favorites } from './pages/Favorites';
import { ScrollToTop } from './components/ScrollToTop';
import { AnimatePresence } from 'framer-motion';
import { FavoritesProvider } from './context/FavoritesContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // Don't show Navbar/Footer on Player page
  const isPlayer = location.pathname.startsWith('/watch');

  return (
    <>
      {!isPlayer && <Navbar />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isPlayer && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <ScrollToTop />
        <div className="bg-[#0A0A0A] min-h-screen text-[#EDEDED] font-sans selection:bg-[#1C8C4E] selection:text-white">
          {/* VHS Grain Overlay Global */}
          <div className="pointer-events-none fixed inset-0 z-50 opacity-20 mix-blend-overlay"></div>
          <div className="scanline pointer-events-none fixed inset-0 z-50"></div>

          <Layout>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/:type/:id" element={<Details />} />
                <Route path="/watch/:type/:id" element={<Player />} />
                <Route path="/watch/:type/:id/:season/:episode" element={<Player />} />
                <Route path="/watch/:type/:id/:episode/:animeType" element={<Player />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/movies" element={<Home />} />
                <Route path="/series" element={<Home />} />
                <Route path="/anime" element={<Home />} />
              </Routes>
            </AnimatePresence>
          </Layout>
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
