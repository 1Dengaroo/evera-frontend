import { useContext } from 'react'
import { Divider } from '../Divider'
import { useGetOrders } from '../../hooks/API/Orders/useGetOrders'
import { AuthContext } from '../../context/AuthContext'
import { OrderPreview } from '../Order'
import { useGetProfile } from '../../hooks/API/Account/useGetProfile'

export const AccountOverview = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { orders, loading, error } = useGetOrders(isAuthenticated)
  const { profile } = useGetProfile(isAuthenticated)

  if (!profile) {
    return <div>Profile not found</div>
  }

  const percentage = (
    (((profile.name ? 1 : 0) +
      (profile.phone_number ? 1 : 0) +
      (profile.email ? 1 : 0)) /
      3) *
    100
  ).toFixed(0)

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Hello {profile.name?.split(' ')[0]}</h1>
        <p className="text-xs">
          Signed in as: <span className="font-semibold">{profile.email}</span>
        </p>
      </div>
      <Divider />
      <div className="flex gap-x-16">
        <div className="flex flex-col gap-y-4">
          <span className="text-md font-semibold">Profile</span>
          <div className="flex gap-x-2 items-center">
            <p className="text-3xl font-semibold">{percentage}%</p>
            <span className="uppercase text-sm">Completed</span>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="text-md font-semibold">Orders</span>
          <div className="flex gap-x-2 items-center">
            <p className="text-3xl font-semibold">{orders.length}</p>
            <span className="uppercase text-sm">Orders</span>
          </div>
        </div>
      </div>

      <h2 className="text-md font-semibold pt-8">Recent Orders</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <div className="flex flex-col gap-y-2">
          {orders.map((order) => (
            <OrderPreview key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}
