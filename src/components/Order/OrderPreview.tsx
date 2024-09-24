import { Order } from '../../types'
import { Thumbnail } from '../Thumbnail'
import { Divider } from '../Divider'
import { useNavigate } from 'react-router-dom'
interface OrderPreviewProps {
  order: Order
}

export const OrderPreview: React.FC<OrderPreviewProps> = ({ order }) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex flex-col gap-y-2 pb-2">
        <h1 className="text-lg font-semibold"># {order.id}</h1>
        <div className="flex items-center divide-x divide-gray-200 text-xs text-gray-800">
          <span className="pr-2">
            {new Date(order.created_at).toDateString()}
          </span>
          <span className="px-2">order.total</span>
          <span className="pl-2">
            {order.order_items.length}{' '}
            {order.order_items.length > 1 ? 'items' : 'item'}
          </span>
        </div>
        <div className="flex gap-x-4 mt-2">
          {order.order_items.slice(0, 3).map((item) => (
            <div className="flex flex-col gap-y-4">
              <Thumbnail
                images={[]}
                size="small"
                thumbnail={item.product.cover_image}
              />

              <span className="text-xs font-medium">
                {item.product.name} x{item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        <button
          className="text-sm font-medium ml-auto bg-gray-50 border rounded-lg px-4 py-2 my-6 hover:bg-gray-100 shadow-sm transition duration-300"
          onClick={() => navigate(`details/${order.id}`)}
        >
          See Details
        </button>
      </div>
      <Divider />
    </>
  )
}
