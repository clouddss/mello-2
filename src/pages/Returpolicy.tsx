import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import CustomFooter from '../components/CustomFooter';

const Returpolicy = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="legal-page">
        <div className="site-shell legal-card fade-up">
          <h1>Returns & Guarantee</h1>
          <p>
            You can return unopened Strandline products within 30 days of delivery.
            Customer covers return postage unless item arrives damaged.
          </p>

          <h2>Return conditions</h2>
          <ul>
            <li>Unopened and unused product in original packaging.</li>
            <li>Return request submitted within 30 days of delivery date.</li>
            <li>Order ID included in the return email request.</li>
          </ul>

          <h2>Confidence guarantee</h2>
          <p>
            If your first opened bottle does not blend for your shade, contact support
            with before/after photos and we will issue a replacement or refund.
          </p>

          <h2>Contact</h2>
          <p>Email: support@strandlinehair.com</p>
        </div>
      </main>

      <CustomFooter />
    </>
  );
};

export default Returpolicy;
