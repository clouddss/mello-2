import { useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import CustomFooter from '../components/CustomFooter';
import ProductGallery from '../components/ProductGallery';
import './Product.css';

type PackOption = '1' | '2' | '3';

const Product = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackOption>('2');

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="product-page">
        <div className="product-page-wrap">
          <ProductGallery
            selectedPackage={selectedPackage}
            onPackageChange={setSelectedPackage}
          />
        </div>
      </main>

      <CustomFooter />
    </>
  );
};

export default Product;
