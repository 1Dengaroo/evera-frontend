import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import Home from './pages/Home'
import FAQ from './pages/FAQ'
import Shop from './pages/Shop'
import About from './pages/About'
import ProductShow from './pages/ProductShow'
import CartPage from './pages/Cart'
import { CartProvider } from './context/CartContext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoutes from './components/Authentication/ProtectedRoute'
import PublicRoutes from './components/Authentication/PublicRoute'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Router>
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<FAQ />} path="/faq" />
                <Route element={<Shop />} path="/shop" />
                <Route element={<ProductShow />} path="/shop/:id" />
                <Route element={<About />} path="/about" />
                <Route element={<CartPage />} path="/cart" />
                <Route element={<Checkout />} path="/checkout" />

                <Route element={<PublicRoutes />}>
                  <Route element={<Login />} path="/login" />
                  <Route element={<Signup />} path="/signup" />
                </Route>

                <Route element={<ProtectedRoutes />}>
                  <Route element={<Orders />} path="/orders" />
                </Route>
              </Routes>
            </div>
            <Footer />
          </Router>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
