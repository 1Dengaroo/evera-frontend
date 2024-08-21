import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1/products'

export const useGetProductPriceById = async (
  id: string
): Promise<number | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}/get_price_by_id`)
    return response.data.price
  } catch {
    return null
  }
}
