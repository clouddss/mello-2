import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import CustomFooter from '../components/CustomFooter';
import './OmOss.css';

const OmOss = () => {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="section">
        <div className="site-shell about-wrap fade-up">
          <p className="brand-pill">About Strandline</p>
          <h1 className="section-title">A hair-filler brand built for repeat purchase.</h1>
          <p className="section-copy">
            We designed Strandline around one promise: instant coverage that looks
            invisible in daylight, flash photography, and video.
          </p>

          <div className="about-grid">
            <article>
              <h2>Formulation</h2>
              <p>
                Ultra-fine keratin fibers electrostatically bind to existing strands
                for density without clumping.
              </p>
            </article>
            <article>
              <h2>Brand Positioning</h2>
              <p>
                Clean, premium, and practical. Optimized for paid traffic landing
                pages and retention flows.
              </p>
            </article>
            <article>
              <h2>Customer Promise</h2>
              <p>
                30-day confidence guarantee, shade-match guidance, and fast support
                for subscription-style growth.
              </p>
            </article>
          </div>
        </div>
      </main>

      <CustomFooter />
    </>
  );
};

export default OmOss;
