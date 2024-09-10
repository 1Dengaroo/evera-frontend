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

const OrderDetailItem: React.FC<{
  label: string
  value: string
  className?: string
}> = ({ label, value, className }) => (
  <p className={`text-gray-800 font-light leading-relaxed ${className}`}>
    {label}: {value}
  </p>
)

const OrderItem: React.FC<{ item: any }> = ({ item }) => (
  <div className="flex items-start items-center justify-between py-6 border-b w-full">
    <div className="flex items-start items-center">
      <img
        src={item.product.cover_image}
        alt={item.name}
        className="w-24 h-32 object-cover rounded-md mb-2"
      />
      <div className="ml-6">
        <h3 className="text-md font-thin tracking-wider">
          {item.size
            ? `${item.product.name} (${item.size})`
            : item.product.name}
        </h3>
        <p className="text-sm text-gray-500">
          ${(item.product.price / 100).toFixed(2)} x {item.quantity}
        </p>
      </div>
    </div>
    <div className="ml-auto md:text-right text-left">
      ${((item.product.price / 100) * item.quantity).toFixed(2)}
    </div>
  </div>
)

const DeliveryAddress: React.FC<{ address: any }> = ({ address }) => (
  <>
    <h4 className="text-lg font-thin text-gray-900 tracking-wide mb-4">
      Delivery Address
    </h4>
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
  </>
)

const OrderCard: React.FC<OrderCardProps> = ({ order, onEditClick }) => (
  <div className="mb-4 border rounded-3xl p-10 shadow-lg bg-white space-y-10 max-w-4xl mx-auto transition-all duration-500 hover:shadow-2xl">
    <div className="flex justify-between items-center border-b pb-6 border-gray-300">
      <h3 className="text-2xl font-thin text-gray-900">Order #{order.id}</h3>
      <OrderStatusBadge paid={order.paid} />
    </div>

    <div>
      <h4 className="text-lg font-thin text-gray-900 tracking-wide">
        Order Items
      </h4>
      <ul className="divide-y divide-gray-300">
        {order.order_items.map((item) => (
          <OrderItem key={item.product_id} item={item} />
        ))}
      </ul>
    </div>

    <div>
      <OrderDetailItem
        className="md:text-right text-left"
        label="Subtotal"
        value={`$${(order.subtotal / 100).toFixed(2)}`}
      />
      <OrderDetailItem
        className="md:text-right text-left"
        label="Shipping"
        value={`$${(order.amount_shipping / 100).toFixed(2)}`}
      />
      <OrderDetailItem
        className="md:text-right text-left"
        label="Tax"
        value={`$${(order.amount_tax / 100).toFixed(2)}`}
      />
      <OrderDetailItem
        className="md:text-right text-left"
        label="Total"
        value={`$${(
          (order.subtotal + order.amount_shipping + order.amount_tax) /
          100
        ).toFixed(2)}`}
      />
    </div>

    {order.delivery && (
      <div className="flex flex-col md:flex-row justify-between">
        {order.delivery.address && (
          <div className="md:w-1/2 mb-4 md:mb-0">
            <DeliveryAddress address={order.delivery.address} />
          </div>
        )}

        <div className="md:w-1/2 md:text-right text-left">
          <h4 className="text-lg font-thin text-gray-900 tracking-wide mb-4">
            Delivery Information
          </h4>
          <OrderDetailItem
            className="md:text-right text-left"
            label="Status"
            value={
              order.delivery.status[0].toUpperCase() +
              order.delivery.status.slice(1)
            }
          />
          <OrderDetailItem
            className="md:text-right text-left"
            label="Tracking Information"
            value={order.delivery.tracking_information || 'N/A'}
          />
          <OrderDetailItem
            className="md:text-right text-left"
            label="Email"
            value={order.delivery.email}
          />
        </div>
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
