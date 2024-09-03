import React, { useState } from 'react'
import ProductCreateForm from './ProductCreateForm'
import ProductsList from './ProductsList'

const ProductsComponent: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'create' | 'list'>('list')

  const renderTabContent = () => {
    if (selectedTab === 'create') {
      return <ProductCreateForm />
    } else if (selectedTab === 'list') {
      return <ProductsList />
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
