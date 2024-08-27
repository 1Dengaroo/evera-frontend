import React, { useEffect, useState } from 'react'
import { useGetOrders } from '../hooks/Dashboard/useGetOrders'
import { Order } from '../types'
import OrderCard from '../components/Order/OrderCard'
import OrderForm from '../components/Order/OrderForm'

const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [filters, setFilters] = useState({ email: '', status: '', id: '' })

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await useGetOrders({
        email: filters.email || undefined,
        status: filters.status || undefined,
        id: filters.id || undefined
      })
      setOrders(fetchedOrders)
    }

    fetchOrders()
  }, [])

  const handleEditClick = (order: Order) => {
    setIsEditing(order.id)
    setEditForm({
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

  const handleUpdateSuccess = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    )
    setIsEditing(null)
  }

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const handleFilterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const fetchedOrders = await useGetOrders({
      email: filters.email || undefined,
      status: filters.status || undefined,
      id: filters.id || undefined
    })
    setOrders(fetchedOrders)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl text-center mb-6 font-serif mt-8">Your Orders</h2>

      <form onSubmit={handleFilterSubmit} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            name="id"
            placeholder="Filter by ID"
            value={filters.id}
            onChange={handleFilterChange}
            className="border px-4 py-2 w-full placeholder:text-sm"
          />
          <input
            type="text"
            name="email"
            placeholder="Filter by email"
            value={filters.email}
            onChange={handleFilterChange}
            className="border px-4 py-2 w-full placeholder:text-sm"
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
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
              {isEditing === order.id ? (
                <OrderForm
                  order={order}
                  editForm={editForm}
                  setEditForm={setEditForm}
                  handleUpdateSuccess={handleUpdateSuccess}
                  setIsEditing={setIsEditing}
                />
              ) : (
                <OrderCard
                  order={order}
                  onEditClick={() => handleEditClick(order)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
