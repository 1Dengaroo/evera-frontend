import React, { useEffect, useState } from 'react'
import { useGetOrders } from '../hooks/Orders/useGetOrders'
import { Order } from '../types'

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await useGetOrders()
      setOrders(fetchedOrders)
    }

    fetchOrders()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl text-center mb-6 font-serif mt-8">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-lg bg-white"
            >
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${order.paid ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}
                >
                  {order.paid ? 'Paid' : 'Not Paid'}
                </span>
              </div>
              <p className="text-gray-600">
                <strong>Email:</strong> {order.email}
              </p>
              <p className="text-gray-600">
                <strong>Total Price:</strong> ${(order.price / 100).toFixed(2)}
              </p>
              <p className="text-gray-600">
                <strong>Order Date:</strong>{' '}
                {new Date(order.created_at).toLocaleString()}
              </p>
              <p className="text-gray-600">
                <strong>Last Updated:</strong>{' '}
                {new Date(order.updated_at).toLocaleString()}
              </p>

              {/* Order Items */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Order Items</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {order.order_items.map((item) => (
                    <li key={item.product_id}>
                      {item.product.name} - Quantity: {item.quantity}, Price: $
                      {item.product.price}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery Information */}
              {order.delivery && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">
                    Delivery Information
                  </h4>
                  <p className="text-gray-600">
                    <strong>Status:</strong> {order.delivery.status}
                  </p>
                  <p className="text-gray-600">
                    <strong>Tracking Info:</strong>{' '}
                    {order.delivery.tracking_information || 'N/A'}
                  </p>
                  <p className="text-gray-600">
                    <strong>Delivery Email:</strong> {order.delivery.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Delivery Date:</strong>{' '}
                    {new Date(order.delivery.created_at).toLocaleString()}
                  </p>

                  {/* Address Information */}
                  {order.delivery.address && (
                    <div className="mt-2">
                      <h5 className="font-semibold">Address</h5>
                      <p className="text-gray-600">
                        {order.delivery.address.name}
                        <br />
                        {order.delivery.address.line1}
                        <br />
                        {order.delivery.address.line2 && (
                          <>
                            {order.delivery.address.line2}
                            <br />
                          </>
                        )}
                        {order.delivery.address.city},{' '}
                        {order.delivery.address.state}{' '}
                        {order.delivery.address.postal_code}
                        <br />
                        {order.delivery.address.country}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
