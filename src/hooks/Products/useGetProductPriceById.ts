import axios from 'axios'

export const useGetProductPriceById = async (
  id: string
): Promise<{ success: boolean; data: any; message?: string }> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/${id}/price_by_id`
    const response = await axios.get(url)
    return { success: true, data: Number(response.data.price) }
  } catch {
    return {
      success: false,
      data: null,
      message: 'Product is no longer available.'
    }
  }
}
