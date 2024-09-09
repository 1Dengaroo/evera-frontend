import React, { useState, useEffect } from 'react'
import { Section } from '../components/Section/Section'
import { useGetProducts } from '../hooks/Products/useGetProducts'
import ProductCard from '../components/Card/ProductCard'
import { Product } from '../types'

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchData() {
      const result = await useGetProducts()
      setProducts(result)
    }
    fetchData()
  }, [])

  return (
    <Section
      backgroundColor="bg-white"
      title="Discover All Products"
      titleClassName="text-3xl tracking-wide font-thin mt-8 mb-8"
      shortHeight
    >
      <p className="font-light mb-8">SHOP ALL</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  )
}

export default Shop
