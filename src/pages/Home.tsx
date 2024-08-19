import React from 'react';
import { Section } from '../components/Section/Section';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleShopButtonClick = () => {
    navigate('/shop');
  };

  const handleAboutButtonClick = () => {
    navigate('/about');
  }

  return (
    <>
      <Section
        title="Evera"
        backgroundImage="images/home_1.webp"
        titleClassName="text-6xl font-serif font-thin tracking-wide text-white mb-4" // Custom title styling
        descriptionClassName="text-md font-extralight text-white" // Custom description styling
      >
        <p>Elegance redefined</p>
        <button
          onClick={handleShopButtonClick}
          className="mt-6 bg-white text-black font-serif py-2 px-4 rounded shadow hover:bg-gray-200 transition duration-300"
        >
          Shop Now
        </button>
      </Section>
      <Section
        title="New Arrivals"
        backgroundColor="bg-white"
        titleClassName="text-4xl font-serif font-thin text-gray-900 mb-4" // Custom title styling
        descriptionClassName="text-lg text-gray-800" // Custom description styling
        shortHeight // Shorter height when no background image
      >
        <p>Discover our latest products.</p>
        <p>Handpicked just for you.</p>
      </Section>
      <Section
        title="Evera's Story"
        backgroundImage='images/home_2.webp'
        titleClassName="text-5xl font-serif font-thin text-white pb-4"
      >
        <button
          onClick={handleAboutButtonClick}
          className="mt-6 bg-white text-black font-serif py-2 px-4 rounded shadow hover:bg-gray-200 transition duration-300"
        >
          Our Story
        </button>
      </Section>
    </>
  );
};

export default Home;
