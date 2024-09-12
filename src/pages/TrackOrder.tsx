import React, { useState } from 'react'
import { useTrackOrder } from '../hooks/Orders/useTrackOrder'
import { Order } from '../types'
import { OrderCard } from '../components/Order'
import { ButtonOne } from '../components/Button'

const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState<Order | null>(null)

  const handleTrackOrder = async () => {
    const trackedOrder = await useTrackOrder(orderId)
    setOrder(trackedOrder)
  }

  return (
    <div className="max-w-4xl mx-auto md:px-4 py-4">
      <h2 className="text-3xl text-center mb-6 font-thin tracking-wide mt-8">
        Track Order
      </h2>
      <div className="flex items-center justify-center space-x-2 mb-8">
        <input
          type="text"
          placeholder="Enter Order ID"
          className="border border-gray-300 w-1/2 rounded-l px-4 py-2 w-64 placeholder:text-sm text-sm"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <ButtonOne
          className="text-sm tracking-wide"
          label="Track Order"
          onClick={handleTrackOrder}
        >
          Track Order
        </ButtonOne>
      </div>
      {order && <OrderCard order={order} />}
    </div>
  )
}

export default TrackOrder
