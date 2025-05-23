import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Cart from './pages/Cart/Cart';
import { CartProvider } from "./context/CartContext";
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
