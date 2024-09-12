import React, { useEffect } from 'react'
import { Section } from '../components/Section'
import { useNavigate } from 'react-router-dom'
import { useGetFrontPageProducts } from '../hooks/Products/useGetFrontPageProducts'
import { ProductCard } from '../components/Product'
import { Product } from '../types'

const Home: React.FC = () => {
  const navigate = useNavigate()
  const [products, setProducts] = React.useState<Product[]>([])

  useEffect(() => {
    async function fetchData() {
      const result = await useGetFrontPageProducts()
      setProducts(result)
    }
    fetchData()
  }, [])

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
        descriptionClassName="text-md font-thin text-white"
        title="Evera"
        titleClassName="text-6xl font-serif font-thin tracking-widest text-white mb-4"
      >
        <p>Elegance redefined</p>
        <button
          className="mt-6 bg-white text-black tracking-wide py-2 px-4 rounded shadow hover:bg-gray-200 transition duration-300"
          onClick={handleShopButtonClick}
        >
          Shop Now
        </button>
      </Section>
      <Section
        descriptionClassName="text-lg text-gray-800"
        title="New Arrivals"
        titleClassName="text-2xl font-thin text-gray-900 mb-4 tracking-wider mb-8"
        shortHeight
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>
      <Section
        backgroundImage="images/home_2.webp"
        title="Evera's Story"
        titleClassName="text-5xl font-serif font-thin text-white pb-4 mb-12 tracking-wide"
      >
        <button
          className="bg-white text-black tracking-wide py-2 px-4 rounded shadow hover:bg-gray-200 transition duration-300"
          onClick={handleAboutButtonClick}
        >
          Our Story
        </button>
      </Section>
    </>
  )
}

export default Home
