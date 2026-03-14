import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Product from './pages/Product';
import OmOss from './pages/OmOss';
import Returpolicy from './pages/Returpolicy';
import Anvandarvilkor from './pages/anvandarvilkor';
import Leveranspolicy from './pages/Leveranspolicy';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';


function App() {
  return (
    <CartProvider>
      <CartDrawer />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/om-oss" element={<OmOss />} />
        <Route path="/returpolicy" element={<Returpolicy />} />
        <Route path="/anvandarvilkor" element={<Anvandarvilkor />} />
        <Route path="/leveranspolicy" element={<Leveranspolicy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
