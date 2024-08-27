import React, { useState } from 'react'
import { useTrackOrder } from '../../hooks/Orders/useTrackOrder'
import { Order } from '../../types'
import OrderCard from './OrderCard'

const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<Order | null>(null)

  const handleTrackOrder = async () => {
    const trackedOrder = await useTrackOrder(orderId)
    setOrder(trackedOrder)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl text-center mb-6 font-serif mt-8">Track Order</h2>
      <div className="flex items-center justify-center space-x-2 mb-4">
        <input
          type="text"
          placeholder="Enter Order ID"
          className="border border-gray-300 rounded-l px-4 py-2 w-64 placeholder:text-sm text-sm"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          className="bg-black text-white text-sm font-serif py-2 px-4 rounded-r"
          onClick={handleTrackOrder}
        >
          Track Order
        </button>
      </div>
      {order && <OrderCard order={order} />}
    </div>
  )
}

export default TrackOrder
