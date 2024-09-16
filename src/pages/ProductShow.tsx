import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ProductImageSlider } from '../components/Slider'
import { useGetProductById } from '../hooks/Products/useGetProductById'
import { useGetSimilarProducts } from '../hooks/Products/useGetSimilarProducts'
import { SimilarProducts, ProductDetails } from '../components/Product'
import { LoadingSpinner } from '../components/LoadingSpinner'

const ProductShow: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  const {
    product,
    loading: productLoading,
    error: productError
  } = useGetProductById(id || '')

  const {
    similarProducts,
    loading: similarLoading,
    error: similarError
  } = useGetSimilarProducts(id || '')

  if (productLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (productError || !product) {
    return (
      <div className="flex justify-center">
        <p className="center text-xl my-16">Item not active or not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto lg:p-4 mt-8">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 mb-6 lg:mb-0">
          <ProductImageSlider product={product} />
        </div>

        <div className="lg:w-1/2 p-8">
          <ProductDetails product={product} />
        </div>
      </div>

      {similarLoading ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : similarError ? (
        <p className="text-center text-red-600">{similarError}</p>
      ) : (
        <SimilarProducts similarProducts={similarProducts} />
      )}
    </div>
  )
}

export default ProductShow
