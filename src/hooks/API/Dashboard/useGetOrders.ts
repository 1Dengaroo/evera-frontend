import { useState } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { Order } from '../../../types'
import { AdminGetOrdersParams } from './types'

export const useGetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async (params?: AdminGetOrdersParams) => {
    setLoading(true)
    setError(null)
    try {
      const url = `/orders/admin_index?${new URLSearchParams({
        ...(params?.id && { id: params.id }),
        ...(params?.email && { email: params.email }),
        ...(params?.status && { status: params.status })
      }).toString()}`

      const response = await axiosInstance.get(url.toString())
      setOrders(response.data)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const updateOrderInState = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    )
  }

  return { orders, fetchOrders, loading, error, updateOrderInState }
}
