import React, { useContext } from 'react'
import { useGetOrders } from '../hooks/API/Orders/useGetOrders'
import { OrderCard } from '../components/Order'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { UnderlineButton } from '../components/Button'
import { LoadingSpinner } from '../components/LoadingSpinner'

const Orders: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const { orders, loading, error } = useGetOrders(isAuthenticated)

  const handleNavigateToTrackOrder = () => {
    navigate('/orders/track')
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl text-center mb-6 tracking-wide mt-8">
        Your Orders
      </h2>
      <UnderlineButton
        className="text-center cursor-pointer mb-6 mx-auto w-full text-blue-500"
        label="Track Your Order"
        onClick={handleNavigateToTrackOrder}
      />
      {isAuthenticated ? (
        loading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <p className="text-center text-red-600">Error: {error}</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600">You have no orders.</p>
        ) : (
          <div>
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )
      ) : (
        <p className="text-center text-gray-600">
          You need to be logged in to view all of your orders.
        </p>
      )}
    </div>
  )
}

export default Orders
