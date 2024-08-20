import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Shop from './pages/Shop';
import About from './pages/About';
import Production from './pages/Production';
import ProductShow from './pages/ProductShow';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductShow />} /> {/* Reuse shop route for product details */}
        <Route path="/about" element={<About />} />
        <Route path="/production" element={<Production />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
