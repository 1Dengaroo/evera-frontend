import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { ProductImageSlider } from '../components/Slider'
import { useGetProductById } from '../hooks/Products/useGetProductById'
import { useGetSimilarProducts } from '../hooks/Products/useGetSimilarProducts'
import { Product } from '../types'
import { SimilarProducts, ProductDetails } from '../components/Product'

const ProductShow: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const [product, setProduct] = useState<Product | null>(null)
  const [similar, setSimilar] = useState<Product[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        const productData = await useGetProductById(id)
        setProduct(productData)
      }
    }
    async function fetchSimilarProducts() {
      const similarProducts = await useGetSimilarProducts(id || '')
      setSimilar(similarProducts)
    }
    fetchProduct()
    fetchSimilarProducts()
  }, [id])

  if (!product) {
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

      <SimilarProducts similarProducts={similar} />
    </div>
  )
}

export default ProductShow
