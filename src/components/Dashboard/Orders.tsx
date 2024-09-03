import React, { useEffect, useState } from 'react'
import { useGetOrders } from '../../hooks/Dashboard/useGetOrders'
import { Order } from '../../types'
import OrderCard from '../Order/OrderCard'
import OrderForm from '../Order/OrderForm'

const OrdersComponent: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isEditingOrder, setIsEditingOrder] = useState<string | null>(null)
  const [editOrderForm, setEditOrderForm] = useState<any>({})
  const [orderFilters, setOrderFilters] = useState({
    email: '',
    status: '',
    id: ''
  })

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await useGetOrders({
        email: orderFilters.email || undefined,
        status: orderFilters.status || undefined,
        id: orderFilters.id || undefined
      })
      setOrders(fetchedOrders)
    }

    fetchOrders()
  }, [orderFilters])

  const handleOrderEditClick = (order: Order) => {
    setIsEditingOrder(order.id)
    setEditOrderForm({
      delivery: {
        status: order.delivery?.status || '',
        tracking_information: order.delivery?.tracking_information || '',
        address: {
          name: order.delivery?.address?.name || '',
          line1: order.delivery?.address?.line1 || '',
          line2: order.delivery?.address?.line2 || '',
          city: order.delivery?.address?.city || '',
          state: order.delivery?.address?.state || '',
          postal_code: order.delivery?.address?.postal_code || '',
          country: order.delivery?.address?.country || ''
        }
      }
    })
  }

  const handleOrderUpdateSuccess = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    )
    setIsEditingOrder(null)
  }

  const handleOrderFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setOrderFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const handleOrderFilterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fetchedOrders = await useGetOrders({
      email: orderFilters.email || undefined,
      status: orderFilters.status || undefined,
      id: orderFilters.id || undefined
    })
    setOrders(fetchedOrders)
  }

  return (
    <div>
      <h2 className="text-3xl text-center mb-6 font-serif mt-8">Your Orders</h2>

      <form onSubmit={handleOrderFilterSubmit} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            name="id"
            placeholder="Filter by ID"
            value={orderFilters.id}
            onChange={handleOrderFilterChange}
            className="border px-4 py-2 w-full placeholder:text-sm"
          />
          <input
            type="text"
            name="email"
            placeholder="Filter by email"
            value={orderFilters.email}
            onChange={handleOrderFilterChange}
            className="border px-4 py-2 w-full placeholder:text-sm"
          />
          <select
            name="status"
            value={orderFilters.status}
            onChange={handleOrderFilterChange}
            className="border px-4 py-2 w-full"
          >
            <option value="">No filter</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
          <button type="submit" className="bg-black text-white px-4 text-sm">
            Apply
          </button>
        </div>
      </form>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {orders.map((order) => (
            <div key={order.id}>
              {isEditingOrder === order.id ? (
                <OrderForm
                  order={order}
                  editForm={editOrderForm}
                  setEditForm={setEditOrderForm}
                  handleUpdateSuccess={handleOrderUpdateSuccess}
                  setIsEditing={setIsEditingOrder}
                />
              ) : (
                <OrderCard
                  order={order}
                  onEditClick={() => handleOrderEditClick(order)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersComponent
