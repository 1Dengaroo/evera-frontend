import React, { useEffect, useState, useContext } from 'react'
import { useGetOrders } from '../hooks/Orders/useGetOrders'
import { Order } from '../types'
import OrderCard from '../components/Order/OrderCard'
import { AuthContext } from '../context/AuthContext'
import TrackOrder from '../components/Order/TrackOrder'

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await useGetOrders()
      setOrders(fetchedOrders)
    }

    fetchOrders()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <TrackOrder />
      <h2 className="text-3xl text-center mb-6 font-serif mt-8">Your Orders</h2>
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
