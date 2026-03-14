import { useState } from 'react';
import './ReviewsMasonry.css';
import reviewsCsv from '../../reviews.csv?raw';
const imageFiles = [
  'reviews/results/brabild.png',
  'reviews/results/slide_3 copy.png',
  'after/after2.jpeg',
  'after/after4.jpeg',
  'after/after5.jpeg',
  'after/after1.jpeg',
  'after/after3.jpeg',
  'reviews/results/image copy 13.png',
  'reviews/results/image copy 10.png',
  'reviews/results/image copy 5.png',
  'reviews/results/featured.png',
  'reviews/results/featured4.png',
  'reviews/results/brareview.png',
  'reviews/results/bra.png',
  'reviews/results/download.png',
  'reviews/results/IMG_3555.JPG',
  'reviews/results/IMG_3557.JPG',
  'reviews/results/IMG_3556.JPG',
  'reviews/results/IMG_3532.JPG',
  'reviews/results/IMG_3552.JPG',
  'reviews/results/IMG_3534.JPG',
  'reviews/results/image.png',
  'reviews/results/download (11).png',
  'reviews/results/IMG_3554.JPG',
  'reviews/results/IMG_3553.JPG',
];

const imageModules = import.meta.glob('../assets/**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const reviewImages = imageFiles
  .map((file) => imageModules[`../assets/${file}`])
  .filter(Boolean);

const parseCsv = (csv: string) => {
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length <= 1) return [];

  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const record: Record<string, string> = {};
    headers.forEach((header, idx) => {
      record[header] = values[idx] ?? '';
    });
    return record;
  });
};

const parseCsvLine = (line: string) => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      const nextChar = line[i + 1];
      if (inQuotes && nextChar === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  result.push(current);
  return result;
};

const reviews = parseCsv(reviewsCsv);

const femaleNames = new Set([
  'Emma',
  'Sara',
  'Maja',
  'Elsa',
  'Alma',
  'Linnea',
  'Ida',
  'Ellen',
  'Nora',
  'Moa',
  'Klara',
  'Ella',
  'Tilde',
  'Liv',
  'Stella',
  'Mira',
  'Saga',
  'Tindra',
  'Selma',
  'Frida',
  'Astrid',
  'Elvira',
  'Linn',
  'Hedda',
  'Tove',
  'Ingrid',
  'Tyra',
  'Elise',
  'Ronja',
  'Siri',
  'Wilma',
  'Ebba',
  'Märta',
  'Freja',
  'Agnes',
  'Vera',
  'Hanna',
  'Matilda',
  'Sofia',
  'Lovisa',
  'Cornelia',
  'Amanda',
  'Signe',
  'Elin',
  'Tuva',
  'Mimmi',
  'Lina',
  'Majken',
  'Ester',
  'Lilly',
  'Svea',
  'Eira',
  'Alva',
  'Lova',
]);

const ReviewsMasonry = () => {
  const [visibleCount, setVisibleCount] = useState(20);
  const femaleReviews = reviews.filter((review) => femaleNames.has(review.name));
  const imageCount = Math.min(reviewImages.length, femaleReviews.length, visibleCount);
  const visibleReviews = femaleReviews.slice(0, imageCount);
  const remainingReviews = reviews.slice(visibleReviews.length, visibleCount);
  const imageLeft = visibleReviews.filter((_, idx) => idx % 2 === 0);
  const imageRight = visibleReviews.filter((_, idx) => idx % 2 === 1);
  const textLeft = remainingReviews.filter((_, idx) => idx % 2 === 0);
  const textRight = remainingReviews.filter((_, idx) => idx % 2 === 1);
  const avgRating =
    reviews.length === 0
      ? 5
      : reviews.reduce((sum, review) => sum + Number(review.rating || 5), 0) /
        reviews.length;
  const avgRatingRounded = Math.round(avgRating * 10) / 10;

  return (
    <section
      id="shopify-section-template--26436321640792__reviews_masonry"
      className="shopify-section section reviews-masonry-section"
    >
      <div className="reviews-masonry-wrapper page-width">
        <div className="reviews-masonry-header">
          <div className="reviews-masonry-header__rating">
            <div className="reviews-masonry-header__stars" aria-label={`${avgRatingRounded} av 5`}>
              {'★★★★★'}
            </div>
            <div className="reviews-masonry-header__chevron" aria-hidden="true">
              ▾
            </div>
          </div>
          <button className="reviews-masonry-header__filter" type="button" aria-label="Filter">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 6h10M4 12h16M4 18h8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="16" cy="6" r="2" fill="currentColor" />
              <circle cx="12" cy="18" r="2" fill="currentColor" />
            </svg>
          </button>
        </div>
        <button className="reviews-masonry-cta" type="button">
          Skriv en recension
        </button>
        <div className="reviews-masonry-columns reviews-masonry-columns--images">
          <div className="reviews-masonry-column">
            {imageLeft.map((review, idx) => {
              const image = reviewImages[(idx * 2) % reviewImages.length];
              const rating = Math.max(1, Math.min(5, Number(review.rating || 5)));
              const date = review.review_date
                ? new Date(review.review_date).toLocaleDateString('en-US')
                : '';

              return (
                <article className="review-card" key={`${review.name}-img-left-${idx}`}>
                  <img src={image} alt={review.name} loading="lazy" />
                  <div className="review-card__body">
                    <div className="review-card__name">{review.name}.</div>
                    <div className="review-card__date">{date}</div>
                    <div className="review-card__stars" aria-label={`${rating} av 5`}>
                      {'★★★★★'.slice(0, rating)}
                    </div>
                    <div className="review-card__text">{review.review_text}</div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="reviews-masonry-column">
            {imageRight.map((review, idx) => {
              const image = reviewImages[(idx * 2 + 1) % reviewImages.length];
              const rating = Math.max(1, Math.min(5, Number(review.rating || 5)));
              const date = review.review_date
                ? new Date(review.review_date).toLocaleDateString('en-US')
                : '';

              return (
                <article className="review-card" key={`${review.name}-img-right-${idx}`}>
                  <img src={image} alt={review.name} loading="lazy" />
                  <div className="review-card__body">
                    <div className="review-card__name">{review.name}.</div>
                    <div className="review-card__date">{date}</div>
                    <div className="review-card__stars" aria-label={`${rating} av 5`}>
                      {'★★★★★'.slice(0, rating)}
                    </div>
                    <div className="review-card__text">{review.review_text}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="reviews-masonry-columns reviews-masonry-columns--text">
          <div className="reviews-masonry-column">
            {textLeft.map((review, idx) => {
              const rating = Math.max(1, Math.min(5, Number(review.rating || 5)));
              const date = review.review_date
                ? new Date(review.review_date).toLocaleDateString('en-US')
                : '';

              return (
                <article className="review-card review-card--text" key={`${review.name}-text-left-${idx}`}>
                  <div className="review-card__body">
                    <div className="review-card__name">{review.name}.</div>
                    <div className="review-card__date">{date}</div>
                    <div className="review-card__stars" aria-label={`${rating} av 5`}>
                      {'★★★★★'.slice(0, rating)}
                    </div>
                    <div className="review-card__text">{review.review_text}</div>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="reviews-masonry-column">
            {textRight.map((review, idx) => {
              const rating = Math.max(1, Math.min(5, Number(review.rating || 5)));
              const date = review.review_date
                ? new Date(review.review_date).toLocaleDateString('en-US')
                : '';

              return (
                <article className="review-card review-card--text" key={`${review.name}-text-right-${idx}`}>
                  <div className="review-card__body">
                    <div className="review-card__name">{review.name}.</div>
                    <div className="review-card__date">{date}</div>
                    <div className="review-card__stars" aria-label={`${rating} av 5`}>
                      {'★★★★★'.slice(0, rating)}
                    </div>
                    <div className="review-card__text">{review.review_text}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        {visibleCount < reviews.length && (
          <div className="reviews-masonry-load-more">
            <button
              id="loadMore"
              style={{}}
              data-url="h=1768921989860&total=1281&variant=visible&limit=20&page=2&language=sv"
              tabIndex={0}
              data-testid="load-more-button"
              className="btn lx-btn lx-primary load-more-button load-more-button-size-medium"
              type="button"
              onClick={() => setVisibleCount((count) => Math.min(count + 19, reviews.length))}
            >
              Visa fler recensioner
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsMasonry;
