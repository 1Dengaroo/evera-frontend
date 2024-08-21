import axios from 'axios'

export const useGetProductPriceById = async (
  id: string
): Promise<number | null> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/${id}/get_price_by_id`
    const response = await axios.get(url)
    return Number(response.data.price)
  } catch {
    return null
  }
}
