import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './store/CartContext';
import MainLayout from './components/Layout/MainLayout';

// Pages - We'll create these shortly
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import PolicyPage from './pages/PolicyPage';
import TrackOrder from './pages/TrackOrder';
 
export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="track" element={<TrackOrder />} />
            <Route path="account" element={<Dashboard />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="shipping-policy" element={<PolicyPage type="Shipping" />} />
            <Route path="returns" element={<PolicyPage type="Returns" />} />
            <Route path="privacy-policy" element={<PolicyPage type="Privacy" />} />
            <Route path="terms" element={<PolicyPage type="Terms" />} />
            <Route path="new-arrivals" element={<Shop initialFilter="new" />} />
            <Route path="deals" element={<Shop initialFilter="sale" />} />
          </Route>
          
          <Route path="/admin/*" element={<Admin />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
