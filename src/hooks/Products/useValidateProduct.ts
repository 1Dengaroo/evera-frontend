import axios from 'axios'

export const useValidateProduct = async (item: {
  id: string
  quantity: number
  size: string
}): Promise<any> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/products/validate_product`
    const response = await axios.post(url, {
      item: {
        id: item.id,
        quantity: item.quantity,
        size: item.size
      }
    })
    return response.data
  } catch (error: any) {
    return error.response.data
  }
}
