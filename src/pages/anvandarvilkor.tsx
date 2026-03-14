import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import CustomFooter from '../components/CustomFooter';

const Anvandarvilkor = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="legal-page">
        <div className="site-shell legal-card fade-up">
          <h1>Terms of Use</h1>
          <p>
            By visiting or purchasing from Strandline, you agree to these terms and
            our policy pages.
          </p>

          <h2>Use of site</h2>
          <ul>
            <li>You must be at least the age of majority in your state or country.</li>
            <li>No misuse of the site, fraud attempts, or harmful code uploads.</li>
            <li>Product visuals are representative and may vary by monitor and light.</li>
          </ul>

          <h2>Orders and pricing</h2>
          <p>
            We reserve the right to correct pricing errors and cancel suspicious or
            duplicate orders.
          </p>

          <h2>Liability</h2>
          <p>
            Strandline products are provided as-is. We do not guarantee identical
            cosmetic outcomes for every user.
          </p>

          <h2>Contact</h2>
          <p>Email: support@strandlinehair.com</p>
        </div>
      </main>

      <CustomFooter />
    </>
  );
};

export default Anvandarvilkor;
