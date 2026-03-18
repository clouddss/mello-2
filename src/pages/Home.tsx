import AnnouncementBar from '../components/AnnouncementBar';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturesBar from '../components/FeaturesBar';
import CustomerReviews from '../components/CustomerReviews';
import ImageWithText from '../components/ImageWithText';
import HowToSteps from '../components/HowToSteps';
import BeforeAfter from '../components/BeforeAfter';
import Testimonials from '../components/Testimonials';
import ComparisonTable from '../components/ComparisonTable';
import CustomFooter from '../components/CustomFooter';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: 'pack-2',
      name: 'Mello Hair Filler – Duo Kit',
      price: 399,
      quantity: 1,
      image: '/vite.svg',
      originalPrice: 599,
    });
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <FeaturesBar />
        <CustomerReviews />
        <ImageWithText onAddToCart={handleAddToCart} />
        <HowToSteps />
        <BeforeAfter />
        <ComparisonTable />
        <Testimonials />
      </main>
      <CustomFooter />
    </>
  );
};

export default Home;
