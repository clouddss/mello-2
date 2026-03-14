import { Link } from 'react-router-dom';
import './CustomFooter.css';

const CustomFooter = () => {
  return (
    <footer className="brand-footer">
      <div className="site-shell brand-footer-grid">
        <div>
          <p className="brand-pill">Strandline Hair Filler</p>
          <h3>Branded confidence for everyday volume.</h3>
          <p>
            Instant-density fibers engineered for a natural finish, sweat-safe wear,
            and fast application.
          </p>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/product">Starter kit</Link></li>
            <li><Link to="/product">Best seller duo</Link></li>
            <li><Link to="/product">Studio refill</Link></li>
          </ul>
        </div>

        <div>
          <h4>Policies</h4>
          <ul>
            <li><Link to="/returpolicy">Returns</Link></li>
            <li><Link to="/leveranspolicy">Shipping</Link></li>
            <li><Link to="/anvandarvilkor">Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="site-shell footer-tail">© {new Date().getFullYear()} Strandline, Inc.</div>
    </footer>
  );
};

export default CustomFooter;
