import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { isCartOpen, setIsCartOpen, totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="brand-header">
        <div className="site-shell brand-header-inner">
          <Link to="/" className="brand-wordmark" aria-label="Mello Hair Filler Home">
            Mello
            <span>Hair Filler</span>
          </Link>

          <nav className="brand-nav">
            <NavLink to="/">Hem</NavLink>
            <NavLink to="/product">Köp</NavLink>
            <NavLink to="/om-oss">Om oss</NavLink>
          </nav>

          <div className="brand-actions">
            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>

            <button
              type="button"
              className="cart-trigger"
              onClick={() => setIsCartOpen(!isCartOpen)}
              aria-label="Open cart"
            >
              Bag
              {totalItems > 0 && <span className="cart-count-bubble">{totalItems}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-panel ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-panel-card">
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/product" onClick={closeMenu}>Shop bundles</NavLink>
          <NavLink to="/om-oss" onClick={closeMenu}>Our science</NavLink>
          <NavLink to="/returpolicy" onClick={closeMenu}>Returns</NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
