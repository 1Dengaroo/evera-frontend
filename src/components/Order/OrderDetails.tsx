import { Order, OrderItem } from '../../types'
import { Thumbnail } from '../Thumbnail'
import { Divider } from '../Divider'

interface OrderDetailsProps {
  order: Order
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="flex flex-col gap-y-3 text-sm">
      <h1 className="text-3xl mb-2">Order Details</h1>
      <span>
        We have sent the order confirmation details to{' '}
        <span className="font-semibold">{order.email}</span>.
      </span>
      <span>Order date: {new Date(order.created_at).toDateString()}</span>
      <span className="text-blue-500">Order id: {order.id}</span>

      <div className="flex gap-x-4 my-2">
        <span>Order status: {order.delivery?.status}</span>
        <span>Payment status: {order.paid ? 'paid' : 'not paid'}</span>
      </div>

      <Divider />
      <div className="flex flex-col gap-y-4 mt-2">
        {order.order_items.map((item) => (
          <OrderItemShow key={item.product_id} item={item} />
        ))}
      </div>

      <h1 className="text-3xl my-6">Delivery</h1>
      <div className="flex justify-between text-gray-600 mb-6 gap-x-2">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-black">Shipping Address</h2>
          <span>
            {order.delivery?.address?.line1}, {order.delivery?.address?.line2}
          </span>
          <span>
            {order.delivery?.address?.city}, {order.delivery?.address?.state}
          </span>
          <span>{order.delivery?.address?.postal_code}</span>
          <span>{order.delivery?.address?.country}</span>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-black">Contact</h2>
          <span>{order.delivery?.email}</span>
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="">Method</h2>
          {order.amount_shipping === 0 ? (
            <span>Standard Shipping</span>
          ) : (
            <span>
              Expedited Shipping (${(order.amount_shipping / 100).toFixed(2)})
            </span>
          )}
        </div>
      </div>

      <Divider />

      <h1 className="font-medium mt-2">Order Summary</h1>
      <div className="flex justify-between items-center">
        <span>Subtotal</span>
        <span>${(order.subtotal / 100).toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center text-xs">
        <span>Shipping</span>
        <span>${(order.amount_shipping / 100).toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center text-xs mb-2">
        <span>Tax</span>
        <span>${(order.amount_tax / 100).toFixed(2)}</span>
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <span>Total</span>
        <span>
          $
          {(
            (order.subtotal + order.amount_shipping + order.amount_tax) /
            100
          ).toFixed(2)}
        </span>
      </div>
      <h1 className="font-medium mt-8">Need help?</h1>
      <span>
        Email us at{' '}
        <a className="text-blue-500" href="mailto:support@everafashion.com">
          support@everafashion.com
        </a>
      </span>
      <a href="/">Returns & Exchanges</a>
    </div>
  )
}

const OrderItemShow: React.FC<{ item: OrderItem }> = ({ item }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div key={item.product_id} className="flex gap-x-4 items-center">
          <Thumbnail
            images={[]}
            size="small-square"
            thumbnail={item.product.cover_image}
          />

          <div className="text-sm flex flex-col gap-y-1 md:ml-4">
            <span>{item.product.name}</span>
            {item.size && (
              <span className="text-gray-500">Size: {item.size}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-y-1 text-right text-sm">
          <span className="text-gray-400">
            {item.quantity} x ${(item.product.price / 100).toFixed(2)}
          </span>
          <span className="text-sm">
            ${((item.quantity * item.product.price) / 100).toFixed(2)}
          </span>
        </div>
      </div>
      <Divider />
    </>
  )
}
