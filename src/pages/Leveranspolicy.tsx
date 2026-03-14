import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import CustomFooter from '../components/CustomFooter';

const Leveranspolicy = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="legal-page">
        <div className="site-shell legal-card fade-up">
          <h1>Shipping Policy</h1>
          <p>
            Orders are packed within 1 business day and delivered in 2 to 5 business
            days within the US.
          </p>

          <h2>Shipping rates</h2>
          <ul>
            <li>Free shipping on orders over $55.</li>
            <li>$4.95 flat rate for orders below $55.</li>
            <li>Expedited shipping option available at checkout.</li>
          </ul>

          <h2>Tracking</h2>
          <p>
            You will receive a tracking link by email as soon as your package leaves
            our fulfillment center.
          </p>

          <h2>Support</h2>
          <p>Email: support@strandlinehair.com</p>
        </div>
      </main>

      <CustomFooter />
    </>
  );
};

export default Leveranspolicy;
