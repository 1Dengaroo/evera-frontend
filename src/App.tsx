import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import Home from './pages/Home'
import FAQ from './pages/FAQ'
import Shop from './pages/Shop'
import About from './pages/About'
import Production from './pages/Production'
import ProductShow from './pages/ProductShow'

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<FAQ />} path="/faq" />
        <Route element={<Shop />} path="/shop" />
        <Route element={<ProductShow />} path="/shop/:id" />{' '}
        <Route element={<About />} path="/about" />
        <Route element={<Production />} path="/production" />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
