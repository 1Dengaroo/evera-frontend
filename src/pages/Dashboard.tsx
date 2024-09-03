import React, { useState } from 'react'
import OrdersComponent from '../components/Dashboard/Orders'
import ProductsComponent from '../components/Dashboard/Products'

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'orders' | 'products' | null>(
    null
  )

  const renderContent = () => {
    if (selectedTab === 'orders') {
      return <OrdersComponent />
    } else if (selectedTab === 'products') {
      return <ProductsComponent />
    } else {
      return (
        <p className="text-center text-gray-600">
          Select a tab to view content.
        </p>
      )
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8">
      <div className="flex space-x-4 justify-center mb-6">
        <button
          className={`px-4 py-1 rounded ${selectedTab === 'orders' ? 'bg-gray-800 text-white' : 'border border-black'}`}
          onClick={() => setSelectedTab('orders')}
        >
          Orders
        </button>
        <button
          className={`px-4 py-1 rounded ${selectedTab === 'products' ? 'bg-gray-800 text-white' : 'border border-black'}`}
          onClick={() => setSelectedTab('products')}
        >
          Products
        </button>
      </div>

      <div className="mt-6">{renderContent()}</div>
    </div>
  )
}

export default Dashboard
