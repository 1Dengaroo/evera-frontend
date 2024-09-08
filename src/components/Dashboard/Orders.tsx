import React, { useEffect, useState } from 'react'
import { useGetOrders } from '../../hooks/Dashboard/useGetOrders'
import { Order } from '../../types'
import OrderCard from '../Order/OrderCard'
import OrderForm from '../Order/OrderForm'
import FilterForm from '../Filter/FilterForm'

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
  }, [])

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

  const handleOrderUpdateSuccess = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    )
    setIsEditingOrder(null)
  }

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

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl text-center mb-6 font-serif mt-8">Your Orders</h2>

      <FilterForm
        filters={orderFilters}
        onFilterChange={handleOrderFilterChange}
        onFilterSubmit={handleOrderFilterSubmit}
        fields={[
          { name: 'id', type: 'text', placeholder: 'Filter by ID' },
          { name: 'email', type: 'text', placeholder: 'Filter by email' },
          {
            name: 'status',
            type: 'select',
            options: [
              { value: '', label: 'No filter' },
              { value: 'manufacturing', label: 'Manufacturing' },
              { value: 'shipped', label: 'Shipped' },
              { value: 'delivered', label: 'Delivered' }
            ]
          }
        ]}
      />

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
