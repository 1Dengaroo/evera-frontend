import { useState, useEffect } from 'react'
import axios from 'axios'
import { CartItem } from '../../types'

interface CartItemDetails {
  id: string
  size: string
  price: number
  isValid: boolean
  validationMessage?: string
}

export const useGetCartItemsDetails = (items: CartItem[]) => {
  const [itemDetails, setItemDetails] = useState<CartItemDetails[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (items.length === 0) {
      setItemDetails([])
      setLoading(false)
      return
    }

    const fetchItemDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const url = `${process.env.REACT_APP_API_URL}/products/cart_item_details`
        const response = await axios.post(url, { items })
        setItemDetails(response.data.itemDetails)
      } catch (err: any) {
        setError('Failed to fetch cart item details')
      } finally {
        setLoading(false)
      }
    }

    fetchItemDetails()
  }, [items])

  return { itemDetails, loading, error }
}
