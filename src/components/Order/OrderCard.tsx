import React from 'react'
import { OrderCardProps } from '../../types'

const OrderCard: React.FC<OrderCardProps> = ({ order, onEditClick }) => {
  return (
    <div className="border rounded-lg p-6 shadow-lg bg-white space-y-6">
      {/* Order Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            order.paid
              ? 'bg-green-200 text-green-800'
              : 'bg-red-200 text-red-800'
          }`}
        >
          {order.paid ? 'Paid' : 'Not Paid'}
        </span>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700">
            <strong>Order Email:</strong> {order.email}
          </p>
          <p className="text-gray-700">
            <strong>Total Price:</strong> ${(order.price / 100).toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-gray-700">
            <strong>Order Date:</strong>{' '}
            {new Date(order.created_at).toLocaleString()}
          </p>
          <p className="text-gray-700">
            <strong>Last Updated:</strong>{' '}
            {new Date(order.updated_at).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div>
        <h4 className="text-lg font-semibold mb-2">Order Items</h4>
        <ul className="space-y-1">
          {order.order_items.map((item) => (
            <li
              key={item.product_id}
              className="flex justify-between text-gray-700"
            >
              <span>
                {item.size
                  ? item.product.name + ' (' + item.size + ')'
                  : item.product.name}
              </span>
              <span>
                Quantity: {item.quantity}, Price: ${item.product.price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Delivery Information */}
      {order.delivery && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Delivery Information</h4>
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Status:</strong> {order.delivery.status}
            </p>
            <p className="text-gray-700">
              <strong>Tracking Info:</strong>{' '}
              {order.delivery.tracking_information || 'N/A'}
            </p>
            <p className="text-gray-700">
              <strong>Delivery Email:</strong> {order.delivery.email}
            </p>
            <p className="text-gray-700">
              <strong>Delivery Date:</strong>{' '}
              {new Date(order.delivery.created_at).toLocaleString()}
            </p>
          </div>

          {/* Address Information */}
          {order.delivery.address && (
            <div className="mt-4 border-t pt-4">
              <h5 className="font-semibold mb-2">Delivery Address</h5>
              <p className="text-gray-700">
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
                {order.delivery.address.city}, {order.delivery.address.state}{' '}
                {order.delivery.address.postal_code}
                <br />
                {order.delivery.address.country}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Edit Button */}
      {onEditClick && (
        <div className="text-right">
          <button
            onClick={onEditClick}
            className="bg-black text-white tracking-wide py-2 px-4 text-sm rounded"
          >
            Edit Order
          </button>
        </div>
      )}
    </div>
  )
}

export default OrderCard
