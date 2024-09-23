import React from 'react'
import { ProductCard } from './ProductCard'
import { SimilarProductsProps } from '../../hooks/API/Products/types'

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  similarProducts
}) => {
  if (similarProducts.length === 0) return null

  return (
    <div className="py-8 mt-8">
      <h2 className="text-xs tracking-wide mb-4 md:text-left text-center">
        You may also like...
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 text-center">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
