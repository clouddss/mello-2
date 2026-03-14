import { useMemo, useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import CustomFooter from '../components/CustomFooter';
import { useCart } from '../context/CartContext';
import './Product.css';

type Bundle = {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  label: string;
  perks: string[];
};

const bundles: Bundle[] = [
  {
    id: 'starter-kit',
    title: 'Starter Kit',
    price: 34,
    originalPrice: 42,
    label: 'Try it',
    perks: ['1 bottle + mini spray', 'Good for occasional use'],
  },
  {
    id: 'duo-kit',
    title: 'Duo Restore Kit',
    price: 58,
    originalPrice: 72,
    label: 'Best Seller',
    perks: ['2 bottles + precision spray', 'Most natural daily coverage'],
  },
  {
    id: 'studio-kit',
    title: 'Studio Refill Set',
    price: 86,
    originalPrice: 114,
    label: 'Best Value',
    perks: ['4 bottles + blend brush', 'Save 24% with auto-restock ready'],
  },
];

const Product = () => {
  const { addItem } = useCart();
  const [selectedBundle, setSelectedBundle] = useState<Bundle>(bundles[1]);

  const saveAmount = useMemo(
    () => selectedBundle.originalPrice - selectedBundle.price,
    [selectedBundle],
  );

  const handleAddToCart = () => {
    addItem({
      id: selectedBundle.id,
      name: `Strandline ${selectedBundle.title}`,
      price: selectedBundle.price,
      quantity: 1,
      image: '/vite.svg',
      originalPrice: selectedBundle.originalPrice,
    });
  };

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="section">
        <div className="site-shell product-layout fade-up">
          <section className="product-panel">
            <p className="brand-pill">Build your bundle</p>
            <h1 className="section-title">Hair filler kits for branded ecom conversion.</h1>
            <p className="section-copy">
              Every bundle includes shade-match support, application guide, and
              a confidence guarantee.
            </p>

            <div className="bundle-grid">
              {bundles.map((bundle) => {
                const active = selectedBundle.id === bundle.id;
                return (
                  <button
                    key={bundle.id}
                    type="button"
                    className={`bundle-card ${active ? 'active' : ''}`}
                    onClick={() => setSelectedBundle(bundle)}
                  >
                    <small>{bundle.label}</small>
                    <h3>{bundle.title}</h3>
                    <p>
                      <strong>${bundle.price}</strong>
                      <s>${bundle.originalPrice}</s>
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="checkout-panel fade-up">
            <h2>{selectedBundle.title}</h2>
            <p className="selection-copy">You save ${saveAmount} today.</p>
            <ul>
              {selectedBundle.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>

            <button type="button" className="btn-primary panel-btn" onClick={handleAddToCart}>
              Add to bag • ${selectedBundle.price}
            </button>

            <p className="mini-note">
              Ships in 24h. 30-day refund on first order. Dermatologist-tested fibers.
            </p>
          </aside>
        </div>

        <section className="site-shell section product-faq fade-up">
          <p className="brand-pill">FAQ</p>
          <h2 className="section-title">Questions before launch?</h2>
          <div className="faq-list">
            <article>
              <h3>Will it look obvious?</h3>
              <p>No. Fibers cling to existing strands and soften shine for natural blend.</p>
            </article>
            <article>
              <h3>Does it survive sweat?</h3>
              <p>Yes, once set with spray it is humidity- and workout-resistant.</p>
            </article>
            <article>
              <h3>Can customers shade match?</h3>
              <p>Yes. We include a simple 2-step shade guide on product and email flow.</p>
            </article>
          </div>
        </section>
      </main>

      <CustomFooter />
    </>
  );
};

export default Product;
