import React from 'react'
import { OrderCardProps } from '../../types'
import { ButtonOne } from '../Button/ButtonOne'

const OrderStatusBadge: React.FC<{ paid: boolean }> = ({ paid }) => (
  <span
    className={`inline-block px-6 py-2 rounded-full text-sm font-semibold tracking-wider transition-colors duration-300 ${
      paid ? 'bg-green-100' : 'bg-red-200'
    }`}
  >
    {paid ? 'Paid' : 'Not Paid'}
  </span>
)

const OrderDetailItem: React.FC<{ label: string; value: string }> = ({
  label,
  value
}) => (
  <p className="text-gray-800 font-light leading-relaxed">
    <strong className="font-medium text-gray-600">{label}:</strong> {value}
  </p>
)

const OrderItem: React.FC<{ item: any }> = ({ item }) => (
  <li className="flex justify-between text-gray-900 border-b border-gray-300 py-3 last:border-b-0">
    <span className="font-light">
      {item.size ? `${item.product.name} (${item.size})` : item.product.name}
    </span>
    <span className="font-light">
      Quantity: {item.quantity}, Price: ${(item.product.price / 100).toFixed(2)}
    </span>
  </li>
)

const DeliveryAddress: React.FC<{ address: any }> = ({ address }) => (
  <div className="mt-6 border-t border-gray-300 pt-4">
    <h5 className="font-semibold text-gray-700 mb-2 tracking-wide">
      Delivery Address
    </h5>
    <p className="text-gray-900 font-light">
      {address.name}
      <br />
      {address.line1}
      {address.line2 && (
        <>
          <br />
          {address.line2}
        </>
      )}
      <br />
      {address.city}, {address.state} {address.postal_code}
      <br />
      {address.country}
    </p>
  </div>
)

const OrderCard: React.FC<OrderCardProps> = ({ order, onEditClick }) => (
  <div className="mb-4 border rounded-3xl p-10 shadow-lg bg-white space-y-10 max-w-4xl mx-auto transition-all duration-500 hover:shadow-2xl">
    <div className="flex justify-between items-center border-b pb-6 border-gray-300">
      <h3 className="text-2xl font-thin text-gray-900">Order #{order.id}</h3>
      <OrderStatusBadge paid={order.paid} />
    </div>

    <div className="grid grid-cols-2 gap-8">
      <div>
        <OrderDetailItem label="Order Email" value={order.email} />
        <OrderDetailItem
          label="Total Price"
          value={`$${(order.price / 100).toFixed(2)}`}
        />
      </div>
      <div>
        <OrderDetailItem
          label="Order Date"
          value={new Date(order.created_at).toLocaleString()}
        />
        <OrderDetailItem
          label="Last Updated"
          value={new Date(order.updated_at).toLocaleString()}
        />
      </div>
    </div>

    <div>
      <h4 className="text-xl font-semibold text-gray-900 tracking-wide">
        Order Items
      </h4>
      <ul className="divide-y divide-gray-300">
        {order.order_items.map((item) => (
          <OrderItem key={item.product_id} item={item} />
        ))}
      </ul>
    </div>

    {order.delivery && (
      <div>
        <h4 className="text-xl font-semibold text-gray-900 tracking-wide mb-4">
          Delivery Information
        </h4>
        <div className="space-y-4">
          <OrderDetailItem label="Status" value={order.delivery.status} />
          <OrderDetailItem
            label="Tracking Info"
            value={order.delivery.tracking_information || 'N/A'}
          />
          <OrderDetailItem
            label="Delivery Email"
            value={order.delivery.email}
          />
          <OrderDetailItem
            label="Delivery Date"
            value={new Date(order.delivery.created_at).toLocaleString()}
          />
        </div>

        {order.delivery.address && (
          <DeliveryAddress address={order.delivery.address} />
        )}
      </div>
    )}

    {onEditClick && (
      <div className="text-right">
        <ButtonOne
          className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 px-6 py-3 rounded-full shadow-md"
          label="Edit Order"
          onClick={onEditClick}
        />
      </div>
    )}
  </div>
)

export default OrderCard
