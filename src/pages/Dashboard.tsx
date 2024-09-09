import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import OrdersComponent from '../components/Dashboard/Orders'
import ProductCreateForm from '../components/Dashboard/ProductCreateForm'
import ProductsList from '../components/Dashboard/ProductsList'

const Dashboard: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getTabFromURL = () => {
    const params = new URLSearchParams(location.search)
    return params.get('tab') as 'orders' | 'products' | 'create product' | null
  }

  const [selectedTab, setSelectedTab] = React.useState<
    'orders' | 'products' | 'create product' | null
  >(getTabFromURL())

  useEffect(() => {
    if (selectedTab) {
      navigate(`?tab=${selectedTab}`, { replace: true })
    } else {
      navigate(``, { replace: true })
    }
  }, [selectedTab, navigate])

  const renderContent = () => {
    if (selectedTab === 'orders') {
      return <OrdersComponent />
    } else if (selectedTab === 'create product') {
      return <ProductCreateForm />
    } else if (selectedTab === 'products') {
      return <ProductsList />
    } else {
      return (
        <p className="text-center text-gray-600">
          Select a tab to view content.
        </p>
      )
    }
  }

  return (
    <div className="mx-auto md:px-16 p-4 mt-8">
      <h2 className="text-3xl text-center mb-6 font-thin tracking-wide">
        Dashboard
      </h2>
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
        <button
          className={`px-4 py-1 rounded ${selectedTab === 'create product' ? 'bg-gray-800 text-white' : 'border border-black'}`}
          onClick={() => setSelectedTab('create product')}
        >
          Create Product
        </button>
      </div>

      <div className="mt-6">{renderContent()}</div>
    </div>
  )
}

export default Dashboard
