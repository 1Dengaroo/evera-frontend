import { useContext, useEffect } from 'react'
import { useTrackOrder } from '../../hooks/API/Orders/useTrackOrder'
import { AuthContext } from '../../context/AuthContext'
import { OrderDetails } from '../Order'
import { useParams } from 'react-router-dom'

export const AccountOrderDetails = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { order, trackOrder, loading, error } = useTrackOrder()
  const { orderId } = useParams<Record<string, string | undefined>>()

  useEffect(() => {
    if (isAuthenticated && orderId) {
      trackOrder(orderId)
    }
  }, [isAuthenticated, orderId, trackOrder])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!order) {
    return <div>Order does not exist</div>
  }

  return <OrderDetails order={order} />
}
