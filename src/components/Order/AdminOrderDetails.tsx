import { Order } from '../../types'
import { Divider } from '../Divider'
import { ButtonOne } from '../Button'
import { OrderDetails } from './OrderDetails'

interface AdminOrderDetailsProps {
  order: Order
  onEditClick?: () => void
}

export const AdminOrderDetails: React.FC<AdminOrderDetailsProps> = ({
  order,
  onEditClick
}) => {
  return (
    <>
      <OrderDetails order={order} />
      {onEditClick && (
        <div className="text-right mt-8">
          <Divider />
          <div className="mt-8" />
          <ButtonOne label="Edit Order" onClick={onEditClick} />
        </div>
      )}
    </>
  )
}
