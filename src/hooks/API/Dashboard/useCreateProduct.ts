import axiosInstance from '../../../utils/axios/axiosInstance'
import { Product } from '../../../types'

export const useCreateProduct = () => {
  const createProduct = async (
    newProduct: Partial<Product>
  ): Promise<Product | null> => {
    try {
      const response = await axiosInstance.post('/products', newProduct)
      return response.data
    } catch {
      return null
    }
  }

  return { createProduct }
}
