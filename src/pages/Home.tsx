import React from 'react'
import { useGetFrontPageProducts } from '../hooks/API/Products/useGetFrontPageProducts'
import { ProductCard } from '../components/Product'
import { Hero } from '../components/Hero'
import { IoArrowForwardSharp } from 'react-icons/io5'

const Home: React.FC = () => {
  const { products } = useGetFrontPageProducts()

  return (
    <>
      <Hero
        backgroundImageUrl="https://www.everafashion.com/images/home_1.webp"
        heading="Evera"
        subHeading="Elegance Redefined"
        buttonText="Shop Now"
        buttonUrl="/shop"
      />

      <div className="py-12 sm:py-24 container mx-auto">
        <div className="flex justify-between mb-8 px-2">
          <p className="text-xl font-light tracking-wide">New Arrivals</p>
          <a
            href="/shop"
            className="text-blue-500 group"
            target="_blank"
            rel="noreferrer"
          >
            <span className="text-sm flex items-center gap-x-1">
              View All
              <IoArrowForwardSharp className="transition-transform duration-150 group-hover:-rotate-45 text-md" />
            </span>
          </a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 px-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Hero backgroundImageUrl="https://www.everafashion.com/images/home_2.webp" />
    </>
  )
}

export default Home
