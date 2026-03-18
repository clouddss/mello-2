import { useState, useEffect, Fragment, type ReactNode } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import CustomFooter from '../components/CustomFooter';
import ProductGallery from '../components/ProductGallery';
import CustomerReviews from '../components/CustomerReviews';
import ComparisonTable from '../components/ComparisonTable';
import StoreFAQ from '../components/StoreFAQ';
import { useCart } from '../context/CartContext';
import { useScrollReveal, useParallax } from '../hooks/useScrollReveal';
import './Product.css';
import stockImage from '../assets/stock.svg';

type PackOption = '1' | '2' | '3';

const PACK_PRICES: Record<PackOption, number> = { '1': 349, '2': 599, '3': 849 };
const PACK_LABELS: Record<PackOption, string> = {
  '1': '1 Pack',
  '2': '2 Pack',
  '3': '3 Pack + 1 GRATIS',
};

type IWTSection = {
  imageLeft: boolean;
  eyebrow: string;
  heading: ReactNode;
  headingAlt?: string;
  body: ReactNode;
  bullets: string[];
  cta: string;
};

const IWT_SECTIONS: IWTSection[] = [
  {
    imageLeft: true,
    eyebrow: 'Omedelbart resultat',
    heading: <>Fylligare hår på mindre än 30 sekunder</>,
    body: <>Mello Hair Filler ger dig synlig skillnad på under sextio sekunder. Skaka, applicera - det är allt som krävs för att dölja din tunn - hårighet och få ett naturligt, fylligt resultat.</>,
    bullets: [
      'Inga verktyg eller specialkunskaper krävs',
      'Sitter kvar i vind och regn hela dagen',
      'Tvättas bort med vanligt schampo',
    ],
    cta: 'Prova riskfritt',
  },
  {
    imageLeft: false,
    eyebrow: 'Naturligt & osynligt',
    heading: <>Ingen kan se eller veta att du använder något</>,
    body: <>Naturliga keratinfibrer smälter in i ditt befintliga hår och skapar en sömlös täckning. Resultatet ser helt naturligt ut oavsett om du är på jobbet, på gymmet eller ute på stan.</>,
    bullets: [
      'Keratinfibrer matchar din naturliga hårstruktur',
      'Tillgänglig i 8 nyanser för perfekt matchning',
      'Dermatologiskt testad och hudläkargodkänd',
    ],
    cta: 'Välj din nyans',
  },
  {
    imageLeft: true,
    eyebrow: 'Tryggt köp',
    heading: '30 dagars pengarna-tillbaka-garanti',
    body: 'Vi är så övertygade om att du kommer att älska våran produkt att vi erbjuder full återbetalning inom 30 dagar —- inga frågor ställs vid kontakt. Vad har du egentligen att förlora? Hår???',
    bullets: [
      'Full återbetalning inom 30 dagar',
      'Fri retur, inga frågor ställs',
      'Leverans 2–4 vardagar',
    ],
    cta: 'Beställ nu',
  },
];

const BENEFITS = [
  { title: 'Omedelbar volym', body: 'Keratinfibrer fäster elektrostatiskt vid ditt hår och skapar synlig fylligare effekt på sekunder.' },
  { title: 'Håller hela dagen', body: <>Vind- och vattentålig formel — sitter kvar från morgon till kväll, <br/>tills du tvättar håret.</> },
  { title: 'Osynligt resultat', body: 'Naturliga fibrer smälter in med befintligt hår. Ingen kan se att du använder produkten.' },
  { title: 'Hudläkargodkänd', body: 'Dermatologiskt testad. Fri från skadliga kemikalier.' },
];

const FINAL_IWT = {
  eyebrow: 'Börja idag',
  heading: 'Gå med 11 740+ nöjda kunder',
  body: <>Tusentals män har redan återfått sitt självförtroende med Hair Filler. Prova du också — helt riskfritt med vår 30-dagarsgaranti.</>,
  bullets: [
    '11 740+ verifierade kunder',
    '4,8 / 5 i genomsnittligt betyg',
    'Snabb leverans direkt till dörren',
  ],
};

const TEXT_REVIEWS = [
  { name: 'Erik S.', title: 'Sjukt bra täckning!', body: 'Jag var skeptisk men wow vilken skillnad. Det ser helt naturligt ut och ingen anar något. Mitt självförtroende har verkligen höjts.', stars: 5 },
  { name: 'Marcus B.', title: 'Smidigt och snabbt', body: 'Tar bara några sekunder på morgonen. Sitter hela dagen trots vind och regn. Bästa investeringen jag gjort.', stars: 5 },
  { name: 'Johan L.', title: 'Ser helt naturligt ut', body: 'Fiberna klumpar sig inte och färgen matchar mitt hår perfekt. Har provat andra märken men Mello är överlägset.', stars: 5 },
  { name: 'Anders P.', title: 'Äntligen något som funkar', body: 'Trollar bort tunnhårigheten på nolltid. Känsla av trygghet hela kvällen när man är ute.', stars: 5 },
  { name: 'David K.', title: 'Enkel och effektiv', body: 'Enkel applicering och imponerande resultat. Skulle rekommendera till alla med samma problem.', stars: 5 },
  { name: 'Peter M.', title: 'Nöjd kund sedan dag ett', body: 'Köpte 3-pack och ångrar ingenting. Produkten gör exakt vad den lovar. Pengarna-tillbaka-garantin är ett stort plus.', stars: 5 },
];

const StarFilled = () => (
  <svg viewBox="0 0 32 32" width="14" height="14" fill="#ef4a65">
    <path d="M16 4.588l2.833 8.719H28l-7.416 5.387 2.832 8.719L16 22.023l-7.417 5.389 2.833-8.719L4 13.307h9.167L16 4.588z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="14" height="14" style={{ flexShrink: 0 }}>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.5924 3.20027C9.34888 3.4078 9.22711 3.51158 9.09706 3.59874C8.79896 3.79854 8.46417 3.93721 8.1121 4.00672C7.95851 4.03705 7.79903 4.04977 7.48008 4.07522C6.6787 4.13918 6.278 4.17115 5.94371 4.28923C5.17051 4.56233 4.56233 5.17051 4.28923 5.94371C4.17115 6.278 4.13918 6.6787 4.07522 7.48008C4.04977 7.79903 4.03705 7.95851 4.00672 8.1121C3.93721 8.46417 3.79854 8.79896 3.59874 9.09706C3.51158 9.22711 3.40781 9.34887 3.20027 9.5924C2.67883 10.2043 2.4181 10.5102 2.26522 10.8301C1.91159 11.57 1.91159 12.43 2.26522 13.1699C2.41811 13.4898 2.67883 13.7957 3.20027 14.4076C3.40778 14.6511 3.51158 14.7729 3.59874 14.9029C3.79854 15.201 3.93721 15.5358 4.00672 15.8879C4.03705 16.0415 4.04977 16.201 4.07522 16.5199C4.13918 17.3213 4.17115 17.722 4.28923 18.0563C4.56233 18.8295 5.17051 19.4377 5.94371 19.7108C6.278 19.8288 6.6787 19.8608 7.48008 19.9248C7.79903 19.9502 7.95851 19.963 8.1121 19.9933C8.46417 20.0628 8.79896 20.2015 9.09706 20.4013C9.22711 20.4884 9.34887 20.5922 9.5924 20.7997C10.2043 21.3212 10.5102 21.5819 10.8301 21.7348C11.57 22.0884 12.43 22.0884 13.1699 21.7348C13.4898 21.5819 13.7957 21.3212 14.4076 20.7997C14.6511 20.5922 14.7729 20.4884 14.9029 20.4013C15.201 20.2015 15.5358 20.0628 15.8879 19.9933C16.0415 19.963 16.201 19.9502 16.5199 19.9248C17.3213 19.8608 17.722 19.8288 18.0563 19.7108C18.8295 19.4377 19.4377 18.8295 19.7108 18.0563C19.8288 17.722 19.8608 17.3213 19.9248 16.5199C19.9502 16.201 19.963 16.0415 19.9933 15.8879C20.0628 15.5358 20.2015 15.201 20.4013 14.9029C20.4884 14.7729 20.5922 14.6511 20.7997 14.4076C21.3212 13.7957 21.5819 13.4898 21.7348 13.1699C22.0884 12.43 22.0884 11.57 21.7348 10.8301C21.5819 10.5102 21.3212 10.2043 20.7997 9.5924C20.5922 9.34887 20.4884 9.22711 20.4013 9.09706C20.2015 8.79896 20.0628 8.46417 19.9933 8.1121C19.963 7.95851 19.9502 7.79903 19.9248 7.48008C19.8608 6.6787 19.8288 6.278 19.7108 5.94371C19.4377 5.17051 18.8295 4.56233 18.0563 4.28923C17.722 4.17115 17.3213 4.13918 16.5199 4.07522C16.201 4.04977 16.0415 4.03705 15.8879 4.00672C15.5358 3.93721 15.201 3.79854 14.9029 3.59874C14.7729 3.51158 14.6511 3.40781 14.4076 3.20027C13.7957 2.67883 13.4898 2.41811 13.1699 2.26522C12.43 1.91159 11.57 1.91159 10.8301 2.26522C10.5102 2.4181 10.2043 2.67883 9.5924 3.20027ZM16.3735 9.86314C16.6913 9.5453 16.6913 9.03 16.3735 8.71216C16.0557 8.39433 15.5403 8.39433 15.2225 8.71216L10.3723 13.5624L8.77746 11.9676C8.45963 11.6498 7.94432 11.6498 7.62649 11.9676C7.30866 12.2854 7.30866 12.8007 7.62649 13.1186L9.79678 15.2889C10.1146 15.6067 10.6299 15.6067 10.9478 15.2889L16.3735 9.86314Z" fill="#4caf50" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4a65" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WAVE_PATHS = {
  back:  "M0,40 C240,65 480,15 720,40 C960,65 1200,15 1440,40 C1680,65 1920,15 2160,40 C2400,65 2640,15 2880,40 L2880,80 L0,80Z",
  mid:   "M0,50 C240,20 480,70 720,45 C960,20 1200,68 1440,45 C1680,20 1920,70 2160,45 C2400,20 2640,68 2880,45 L2880,80 L0,80Z",
  front: "M0,55 C200,30 480,75 720,55 C960,30 1200,75 1440,55 C1680,30 1920,75 2160,55 C2400,30 2640,75 2880,55 L2880,80 L0,80Z",
};

const WaveDivider = ({ bg, fill }: { bg: string; fill: string }) => (
  <div className="pp-divider" style={{ background: `linear-gradient(to bottom, ${bg}, ${fill})` }}>
    <svg className="pp-wave-svg" viewBox="0 0 2880 80" preserveAspectRatio="none">
      <path className="pp-wave pp-wave--3" style={{ fill }} d={WAVE_PATHS.back} />
      <path className="pp-wave pp-wave--2" style={{ fill }} d={WAVE_PATHS.mid} />
      <path className="pp-wave pp-wave--1" style={{ fill }} d={WAVE_PATHS.front} />
    </svg>
  </div>
);

/* ── Scroll progress bar ── */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="pp-scroll-bar" style={{ width: `${progress}%` }} />;
};

const Product = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackOption>('2');
  const { addItem } = useCart();
  const mainRef = useScrollReveal({ threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
  useParallax();

  const handleAddToCart = () => {
    addItem({
      id: `pack-${selectedPackage}`,
      name: `Mello Hair Filler – ${PACK_LABELS[selectedPackage]}`,
      price: PACK_PRICES[selectedPackage],
      quantity: 1,
      image: stockImage,
    });
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <ScrollProgress />

      <main className="pp-page" ref={mainRef}>

        {/* ━━━━ 1. Product buy box ━━━━ */}
        <section className="pp-buy-section">
          <div className="pp-wrap" data-reveal="fade-up">
            <ProductGallery
              selectedPackage={selectedPackage}
              onPackageChange={setSelectedPackage}
            />
          </div>
        </section>

        {/* pink → white */}
        <WaveDivider bg="linear-gradient(145deg, #fdf5f7 0%, #fefcf9 100%)" fill="#fff" />

        {/* ━━━━ 2. Customer reviews carousel ━━━━ */}
        <div data-reveal="fade-up">
          <CustomerReviews />
        </div>

        {/* white → pink */}
        <WaveDivider bg="#fff" fill="#fdf5f7" />

        {/* ━━━━ 3–5. ImageWithText × 3 ━━━━ */}
        {IWT_SECTIONS.map((s, idx) => (
          <Fragment key={idx}>
            {idx > 0 && (
              /* alternates: pink→white, white→pink */
              <WaveDivider
                bg={idx % 2 === 1 ? '#fdf5f7' : '#fff'}
                fill={idx % 2 === 1 ? '#fff' : '#fdf5f7'}
              />
            )}
          <section className={`pp-iwt-section ${idx % 2 === 0 ? 'pp-iwt-section--alt' : ''} ${s.imageLeft ? '' : 'pp-iwt-reverse'}`}>
            <div className="pp-wrap">
              <div className="pp-iwt-grid">
                <div
                  className="pp-iwt-media"
                  data-reveal={s.imageLeft ? 'slide-right' : 'slide-left'}
                >
                  <img
                    src={stockImage}
                    alt={s.headingAlt ?? s.eyebrow}
                    loading="lazy"
                    className="pp-iwt-img"
                    data-parallax="0.04"
                  />
                </div>
                <div className="pp-iwt-text" data-reveal="fade-up" data-reveal-delay="150">
                  <span className="pp-eyebrow-line" data-reveal="line-grow" data-reveal-delay="100" />
                  <p className="pp-eyebrow">{s.eyebrow}</p>
                  <h2 className="pp-iwt-heading">{s.heading}</h2>
                  <p className="pp-iwt-body">{s.body}</p>
                  <ul className="pp-iwt-bullets">
                    {s.bullets.map((b, i) => (
                      <li key={i} className="pp-iwt-bullet" data-reveal="fade-up" data-reveal-delay={`${300 + i * 100}`}>
                        <CheckIcon />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
          </Fragment>
        ))}

        {/* light pink → muted rose */}
        <WaveDivider bg="linear-gradient(145deg, #fdf5f7 0%, #fefcf9 100%)" fill="#d4748a" />

        {/* ━━━━ Section break — stats ribbon ━━━━ */}
        <div className="pp-ribbon" data-reveal="fade-up">
          <div className="pp-ribbon-inner">
            {[
              { num: '11 740+', label: 'Nöjda kunder' },
              { num: '4.8/5', label: 'Betyg' },
              { num: '30 sek', label: 'Till resultat' },
              { num: '8', label: 'Nyanser' },
            ].map((s, i) => (
              <div key={i} className="pp-ribbon-stat" data-reveal="scale-up" data-reveal-delay={`${i * 120}`}>
                <span className="pp-ribbon-num">{s.num}</span>
                <span className="pp-ribbon-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* muted rose → light pink */}
        <WaveDivider bg="#d4748a" fill="#fdf5f7" />

        {/* ━━━━ 6. Product benefits ━━━━ */}
        <section className="pp-benefits-section">
          <div className="pp-wrap">
            <div className="pp-benefits-header" data-reveal="fade-up">
              <span className="pp-eyebrow-line" data-reveal="line-grow" />
              <p className="pp-eyebrow">Varför Mello?</p>
              <h2 className="pp-benefits-heading">
                Designat för <em>din vardag</em>
              </h2>
            </div>
            <div className="pp-benefits-grid">
              {BENEFITS.map((b, i) => (
                <div key={i} className="pp-benefits-card" data-reveal="fade-up" data-reveal-delay={`${i * 80}`}>
                  <strong className="pp-benefits-title">{b.title}</strong>
                  <span className="pp-benefits-body">{b.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* pink → white */}
        <WaveDivider bg="linear-gradient(145deg, #fdf5f7 0%, #fefcf9 100%)" fill="#fff" />

        {/* ━━━━ 7. Comparison table ━━━━ */}
        <div data-reveal="fade-up">
          <ComparisonTable />
        </div>

        {/* white → pink */}
        <WaveDivider bg="#fff" fill="#fdf5f7" />

        {/* ━━━━ 8. Final CTA — centered ━━━━ */}
        <section className="pp-iwt-section pp-iwt-section--alt">
          <div className="pp-wrap">
            <div className="pp-final-center" data-reveal="fade-up">
              <span className="pp-eyebrow-line" data-reveal="line-grow" />
              <p className="pp-eyebrow">{FINAL_IWT.eyebrow}</p>
              <h2 className="pp-final-heading">{FINAL_IWT.heading}</h2>
              <p className="pp-final-body">{FINAL_IWT.body}</p>
              <ul className="pp-iwt-bullets pp-final-bullets">
                {FINAL_IWT.bullets.map((b, i) => (
                  <li key={i} className="pp-iwt-bullet" data-reveal="fade-up" data-reveal-delay={`${150 + i * 80}`}>
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Scrolling review strip */}
          <div className="pp-final-carousel">
            <div className="pp-final-track">
              {[...TEXT_REVIEWS, ...TEXT_REVIEWS, ...TEXT_REVIEWS].map((r, i) => (
                <div key={i} className="pp-final-card">
                  <div className="pp-final-card-stars">
                    {[...Array(r.stars)].map((_, j) => <StarFilled key={j} />)}
                  </div>
                  <p className="pp-final-card-quote">"{r.body}"</p>
                  <span className="pp-final-card-name">{r.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pp-final-cta">
            <button className="pp-final-cta-btn" onClick={handleAddToCart}>
              Beställ nu — 30 dagars garanti
            </button>
          </div>
        </section> 

        {/* pink → white */}
        <WaveDivider bg="linear-gradient(145deg, #fdf5f7 0%, #fefcf9 100%)" fill="#fff" />

        {/* ━━━━ 9. Store FAQ ━━━━ */}
        <div data-reveal="fade-up">
          <StoreFAQ />
        </div>

        {/* white → pink */}
        <WaveDivider bg="#fff" fill="#fdf5f7" />

        {/* ━━━━ 10. Text reviews grid ━━━━ */}
        <section className="pp-tr-section">
          <div className="pp-wrap">
            <div className="pp-tr-header" data-reveal="fade-up">
              <div className="pp-tr-pill">
                <div className="pp-tr-stars">{[...Array(5)].map((_, i) => <StarFilled key={i} />)}</div>
                <span className="pp-tr-pill-text"><strong>Betyg 4.8/5</strong> — +3 203 recensioner</span>
              </div>
              <h2 className="pp-tr-heading">Vad kunderna <em>säger</em></h2>
            </div>
            <div className="pp-tr-grid">
              {TEXT_REVIEWS.map((r, i) => (
                <div key={i} className="pp-tr-card" data-reveal="fade-up" data-reveal-delay={`${i * 80}`}>
                  <div className="pp-tr-card-stars">{[...Array(r.stars)].map((_, j) => <StarFilled key={j} />)}</div>
                  <h3 className="pp-tr-card-title">"{r.title}"</h3>
                  <p className="pp-tr-card-body">{r.body}</p>
                  <div className="pp-tr-card-author">
                    <span className="pp-tr-card-name">{r.name}</span>
                    <span className="pp-tr-card-verified"><VerifiedIcon /> Verifierat köp</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <CustomFooter />
    </>
  );
};

export default Product;
