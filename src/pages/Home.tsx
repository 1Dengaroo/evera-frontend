import React from 'react'
import { useGetFrontPageProducts } from '../hooks/Products/useGetFrontPageProducts'
import { ProductCard } from '../components/Product'
import { Hero } from '../components/Hero'

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
          <a className="text-blue-500 text-sm" href={`/shop`}>
            View all
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
