import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  ProtectedRoutes,
  PublicRoutes,
  UserRoutes
} from './components/Authentication'

import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'

import Home from './pages/Home'
import FAQ from './pages/FAQ'
import Shop from './pages/Shop'
import Login from './pages/Login'
import Signup from './pages/Signup'
import About from './pages/About'
import ProductShow from './pages/ProductShow'
import CartPage from './pages/Cart'
import Checkout from './pages/Checkout'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/404'
import OrderCancel from './pages/OrderCancel'
import OrderSuccess from './pages/OrderSuccess'
import OrderSearch from './pages/TrackOrder'
import {
  Account,
  AccountInfo,
  AccountOrders,
  AccountOverview,
  AccountOrderDetails
} from './components/Account'

import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'

import {
  PasswordResetRequest,
  PasswordReset
} from './components/Authentication'
import { SideCart } from './components/Cart'

import {
  ProductEditPage,
  DashboardOrders,
  ProductCreateForm,
  ProductsList
} from './components/Dashboard'

import { DisclaimerModal } from './components/Modal'

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <CartProvider>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Router>
              <DisclaimerModal />
              <Navbar />
              <SideCart />

              <div className="flex-grow">
                <Routes>
                  <Route element={<Home />} path="/" />
                  <Route element={<FAQ />} path="/faq" />
                  <Route element={<Shop />} path="/shop" />
                  <Route element={<ProductShow />} path="/shop/:id" />
                  <Route element={<About />} path="/about" />
                  <Route element={<CartPage />} path="/cart" />
                  <Route element={<Checkout />} path="/checkout" />
                  <Route element={<OrderCancel />} path="/orders/cancel" />
                  <Route element={<OrderSuccess />} path="/orders/success" />
                  <Route element={<OrderSearch />} path="/orders/track" />

                  <Route element={<UserRoutes />}>
                    <Route element={<Account />} path="/account/*">
                      <Route element={<AccountOverview />} index />
                      <Route element={<AccountOverview />} path="overview" />
                      <Route element={<AccountInfo />} path="profile" />
                      <Route element={<AccountOrders />} path="orders" />
                      <Route
                        element={<AccountOrderDetails />}
                        path="orders/details/:orderId"
                      />
                      <Route element={<AccountOverview />} path="*" />
                    </Route>
                  </Route>

                  <Route element={<PublicRoutes />}>
                    <Route element={<Login />} path="/login" />
                    <Route element={<Signup />} path="/signup" />
                    <Route
                      element={<PasswordResetRequest />}
                      path="/reset-password"
                    />
                    <Route element={<PasswordReset />} path="/password/edit" />
                  </Route>

                  <Route element={<ProtectedRoutes />}>
                    <Route element={<Dashboard />} path="/dashboard/*">
                      <Route element={<DashboardOrders />} path="orders" />
                      <Route element={<ProductsList />} path="products" />
                      <Route
                        element={<ProductCreateForm />}
                        path="create-product"
                      />
                    </Route>
                    <Route
                      element={<ProductEditPage />}
                      path="/dashboard/products/edit/:productId"
                    />
                  </Route>

                  <Route element={<NotFound />} path="*" />
                </Routes>
              </div>
              <Footer />
            </Router>
          </div>
        </AuthProvider>
      </CartProvider>
    </NotificationProvider>
  )
}

export default App
