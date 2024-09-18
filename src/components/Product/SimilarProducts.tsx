import React from 'react'
import { ProductCard } from './ProductCard'
import { SimilarProductsProps } from '../../hooks/Products/types'

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  similarProducts
}) => {
  if (similarProducts.length === 0) return null

  return (
    <div className="py-8 mt-8">
      <h2 className="text-md font-thin tracking-wider mb-4 md:text-left text-center">
        YOU MAY ALSO LIKE
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
