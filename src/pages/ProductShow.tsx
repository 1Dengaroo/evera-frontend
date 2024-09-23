import React, { useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ProductImageSlider } from '../components/Slider'
import { useGetProductById } from '../hooks/API/Products/useGetProductById'
import { useGetSimilarProducts } from '../hooks/API/Products/useGetSimilarProducts'
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
    <div className="mx-6 sm:mx-0 flex flex-col pb-6 relative">
      <div className="flex flex-col md:flex-row">
        <div className="w-full relative flex-1">
          <ProductImageSlider product={product} />
        </div>

        <div className="md:w-1/2 md:p-8">
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
        <div className="mt-8 container mx-auto">
          <SimilarProducts similarProducts={similarProducts} />
        </div>
      )}
    </div>
  )
}

export default ProductShow
