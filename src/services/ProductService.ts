import axios from 'axios'
import { CartItem } from '../context/CartContext'

const API_URL = 'http://localhost:5000/api/v1/products'

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  active: boolean
  cover_image: string
  sub_images: string[]
  sizes: string[]
  quantity: number
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch {
    return []
  }
}

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch {
    return null
  }
}

export const getProductPriceById = async (
  id: string
): Promise<number | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}/get_price_by_id`)
    return response.data.price
  } catch {
    return null
  }
}

export const getCartTotal = async (
  items: CartItem[]
): Promise<number | null> => {
  try {
    const response = await axios.post(`${API_URL}/get_cart_total`, {
      items: items
    })
    return Number(response.data.total)
  } catch {
    return null
  }
}
