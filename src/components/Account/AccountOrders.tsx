import { useContext } from 'react'
import { useGetOrders } from '../../hooks/API/Orders/useGetOrders'
import { AuthContext } from '../../context/AuthContext'
import { OrderPreview } from '../Order'

export const AccountOrders = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { orders, loading, error } = useGetOrders(isAuthenticated)

  return (
    <>
      <h1 className="text-3xl mb-8">Orders</h1>
      <p className="text-sm mb-8">
        View your previous orders and their status. You can also create returns
        or exchanges for your orders if needed.
      </p>
      {orders.map((order) => (
        <div className="mb-16">
          <OrderPreview key={order.id} order={order} />
        </div>
      ))}
    </>
  )
}
