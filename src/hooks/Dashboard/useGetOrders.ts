import axios from 'axios'
import { Order } from '../../types'
import { setAuthToken } from '../Users/setAuthToken'
import { AdminGetOrdersParams } from '../../types'

export const useGetOrders = async (
  params?: AdminGetOrdersParams
): Promise<Order[]> => {
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
    return response.data
  } catch {
    return []
  }
}
