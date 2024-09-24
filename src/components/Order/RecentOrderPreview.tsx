import { Order } from '../../types'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface RecentOrderPreviewProps {
  order: Order
}

export const RecentOrderPreview: React.FC<RecentOrderPreviewProps> = ({
  order
}) => {
  const navigate = useNavigate()

  return (
    <div
      className="bg-gray-50 flex justify-between p-4 rounded-lg border items-center text-xs hover:bg-gray-100 cursor-pointer transition duration-300"
      onClick={() => navigate(`/account/orders/details/${order.id}`)}
    >
      <div className="flex flex-col space-y-2 w-1/4">
        <span className="uppercase">Date placed</span>
        <span className="font-semibold">
          {new Date(order.created_at).toDateString()}
        </span>
      </div>
      <div className="flex flex-col space-y-2 w-1/4">
        <span className="uppercase">Order #</span>
        <span className="font-semibold">{order.id}</span>
      </div>
      <div className="flex flex-col space-y-2 w-1/4">
        <span className="uppercase">Total</span>
        <span className="font-semibold">
          ${(order.subtotal / 100).toFixed(2)}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold">
          <MdKeyboardArrowRight />
        </span>
      </div>
    </div>
  )
}
