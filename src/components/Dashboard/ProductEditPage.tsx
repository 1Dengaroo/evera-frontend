import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Product } from '../../types'
import { ProductForm } from './ProductEditForm'
import { useGetProduct } from '../../hooks/Dashboard/useGetProduct'

export const ProductEditPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>()
  const navigate = useNavigate()
  const { product, loading, error } = useGetProduct(productId)

  const [editForm, setEditForm] = useState<any>({
    name: '',
    description: '',
    price: 0,
    active: true,
    product_type: 'unisex',
    quantity: 9999,
    cover_image: '',
    sub_images: [],
    sizes: []
  })

  useEffect(() => {
    if (product) {
      setEditForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || 0,
        active: product.active ?? true,
        product_type: product.product_type || 'unisex',
        quantity: product.quantity || 9999,
        cover_image: product.cover_image || '',
        sub_images: product.sub_images || [],
        sizes: product.sizes || []
      })
    }
  }, [product])

  const handleProductUpdateSuccess = (updatedProduct: Product) => {
    navigate('/shop/' + updatedProduct.id)
  }

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>
  }

  if (error) {
    return <p className="text-center text-red-600">Error: {error}</p>
  }

  if (!product) {
    return <p className="text-center text-gray-600">Product not found.</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white space-y-6">
      <h2 className="text-3xl font-thin text-center mb-6">Edit Product</h2>
      <ProductForm
        editForm={editForm}
        handleUpdateSuccess={handleProductUpdateSuccess}
        product={product}
        setEditForm={setEditForm}
        setIsEditing={() => {}}
      />
    </div>
  )
}
