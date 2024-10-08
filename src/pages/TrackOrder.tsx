import React, { useState } from 'react'
import { useTrackOrder } from '../hooks/API/Orders/useTrackOrder'
import { OrderDetails } from '../components/Order'
import { ButtonOne } from '../components/Button'

const TrackOrder: React.FC = () => {
  const [orderId, setOrderId] = useState('')
  const { order, trackOrder, loading, error } = useTrackOrder()

  const handleTrackOrder = async () => {
    await trackOrder(orderId)
  }

  return (
    <div className="max-w-4xl mx-auto md:px-4 py-4">
      {!order && (
        <>
          <h2 className="text-3xl text-center mb-6 font-light tracking-wide mt-8">
            Track Order
          </h2>
          <div className="flex items-center justify-center space-x-2 mb-8">
            <input
              className="border border-gray-300 w-1/2 rounded-full text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors px-4 py-2 placeholder:text-sm"
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
              type="text"
              value={orderId}
            />
            <ButtonOne
              className="text-sm tracking-wide"
              label="Track Order"
              onClick={handleTrackOrder}
            />
          </div>
        </>
      )}

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      <div className="my-16 px-8">
        {order && <OrderDetails order={order} />}
      </div>
    </div>
  )
}

export default TrackOrder
