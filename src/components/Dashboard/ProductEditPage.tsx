import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Product } from '../../types'
import { ProductForm } from './ProductEditForm'
import { useGetProduct } from '../../hooks/Dashboard/useGetProduct'

export const ProductEditPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [editForm, setEditForm] = useState<any>({})
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await useGetProduct(productId)
      if (data) {
        setProduct(data)
        setEditForm({
          name: data.name,
          description: data.description,
          price: data.price,
          active: data.active,
          product_type: data.product_type,
          quantity: data.quantity || 9999,
          cover_image: data.cover_image,
          sub_images: data.sub_images || [],
          sizes: data.sizes || []
        })
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleProductUpdateSuccess = (updatedProduct: Product) => {
    navigate('/shop/' + updatedProduct.id)
  }

  if (!product) {
    return <></>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white space-y-6">
      <h2 className="text-3xl font-thin text-center mb-6">Edit Product</h2>
      <ProductForm
        product={product}
        editForm={editForm}
        setEditForm={setEditForm}
        handleUpdateSuccess={handleProductUpdateSuccess}
        setIsEditing={() => {}}
      />
    </div>
  )
}
