import { useState } from 'react'
import axios from 'axios'
import { Order } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'
import { AdminGetOrdersParams } from './types'

export const useGetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async (params?: AdminGetOrdersParams) => {
    setLoading(true)
    setError(null)
    try {
      const url = new URL(`${process.env.REACT_APP_API_URL}/orders/admin_index`)
      const token = localStorage.getItem('jwtToken')

      setAuthToken(token)

      if (params?.id) {
        url.searchParams.append('id', params.id)
      }
      if (params?.email) {
        url.searchParams.append('email', params.email)
      }
      if (params?.status) {
        url.searchParams.append('status', params.status)
      }

      const response = await axios.get(url.toString())
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
