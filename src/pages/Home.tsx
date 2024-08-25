import React from 'react'
import { Section } from '../components/Section/Section'
import { useNavigate } from 'react-router-dom'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const user = localStorage.getItem('user')
  const parsedUser = user ? JSON.parse(user) : null

  const handleShopButtonClick = () => {
    navigate('/shop')
  }

  const handleAboutButtonClick = () => {
    navigate('/about')
  }

  return (
    <>
      <Section
        backgroundImage="images/home_1.webp"
        descriptionClassName="text-md font-extralight text-white"
        title="Evera"
        titleClassName="text-6xl font-serif font-thin tracking-wide text-white mb-4"
      >
        <p>Elegance redefined</p>
        {parsedUser && (
          <p className="mt-4 text-lg text-white">
            Welcome{parsedUser.name ? `, ${parsedUser.name}` : ''}
          </p>
        )}
        <button
          className="mt-6 bg-white text-black font-serif py-2 px-4 rounded shadow hover:bg-gray-200 transition duration-300"
          onClick={handleShopButtonClick}
        >
          Shop Now
        </button>
      </Section>
      <Section
        backgroundColor="bg-white"
        descriptionClassName="text-lg text-gray-800"
        title="New Arrivals"
        titleClassName="text-4xl font-serif font-thin text-gray-900 mb-4"
        shortHeight
      >
        <p>Discover our latest products.</p>
        <p>Handpicked just for you.</p>
      </Section>
      <Section
        backgroundImage="images/home_2.webp"
        title="Evera's Story"
        titleClassName="text-5xl font-serif font-thin text-white pb-4"
      >
        <button
          className="mt-6 bg-white text-black font-serif py-2 px-4 rounded shadow hover:bg-gray-200 transition duration-300"
          onClick={handleAboutButtonClick}
        >
          Our Story
        </button>
      </Section>
    </>
  )
}

export default Home
