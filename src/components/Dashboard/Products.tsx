import React, { useState } from 'react'
import { Product } from '../../types'
import ProductCreateForm from './ProductCreateForm'
import ProductsList from './ProductsList'

const ProductsComponent: React.FC = () => {
  const [isEditingProduct, setIsEditingProduct] = useState<string | null>(null)
  const [editProductForm, setEditProductForm] = useState<any>({})
  const [products, setProducts] = useState<Product[]>([]) // eslint-disable-line
  const [selectedTab, setSelectedTab] = useState<'create' | 'list'>('list')

  const handleProductEditClick = (product: Product) => {
    setIsEditingProduct(product.id)
    setEditProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      active: product.active,
      product_type: product.product_type,
      sub_images: product.sub_images || []
    })
  }

  const handleProductUpdateSuccess = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    )
    setIsEditingProduct(null)
  }

  const handleProductCreateSuccess = (newProduct: Product) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts])
  }

  const renderTabContent = () => {
    if (selectedTab === 'create') {
      return (
        <ProductCreateForm handleCreateSuccess={handleProductCreateSuccess} />
      )
    } else if (selectedTab === 'list') {
      return (
        <ProductsList
          handleProductUpdateSuccess={handleProductUpdateSuccess}
          handleProductEditClick={handleProductEditClick}
          isEditingProduct={isEditingProduct}
          editProductForm={editProductForm}
          setEditProductForm={setEditProductForm}
          setIsEditing={setIsEditingProduct}
        />
      )
    }
  }

  return (
    <div>
      <div className="flex space-x-4 justify-center mb-6">
        <button
          className={`px-4 py-1 rounded ${selectedTab === 'create' ? 'bg-gray-800 text-white' : 'border border-black'}`}
          onClick={() => setSelectedTab('create')}
        >
          Create New Product
        </button>
        <button
          className={`px-4 py-1 rounded ${selectedTab === 'list' ? 'bg-gray-800 text-white' : 'border border-black'}`}
          onClick={() => setSelectedTab('list')}
        >
          Product List
        </button>
      </div>

      <div className="mt-16">{renderTabContent()}</div>
    </div>
  )
}

export default ProductsComponent
