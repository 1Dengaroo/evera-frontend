import React, { useEffect, useState, useContext } from 'react'
import { useGetOrders } from '../hooks/Orders/useGetOrders'
import { Order } from '../types'
import { OrderCard } from '../components/Order'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { UnderlineButton } from '../components/Button'

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await useGetOrders()
      setOrders(fetchedOrders)
    }

    if (isAuthenticated) {
      fetchOrders()
    }
  }, [])

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
        orders.length === 0 ? (
          <p className="text-center text-gray-600">You have no orders.</p>
        ) : (
          <div className="">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )
      ) : (
        <p className="text-center text-gray-600">
          You need to be logged in to view all of your orders
        </p>
      )}
    </div>
  )
}

export default Orders
