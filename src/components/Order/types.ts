import { Order } from '../../types'

export interface OrderCardProps {
  order: Order
  onEditClick?: () => void
}
