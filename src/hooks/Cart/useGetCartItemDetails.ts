import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { CartItem } from '../../types'
import _ from 'lodash'

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

  const debouncedFetchItemDetails = useCallback(
    _.debounce(async (items: CartItem[]) => {
      setLoading(true)
      setError(null)
      try {
        const url = `${process.env.REACT_APP_API_URL}/carts/cart_item_details`
        const filteredItems = items.map(({ id, size, quantity }) => ({
          id,
          size,
          quantity
        }))

        const response = await axios.post(url, { items: filteredItems })
        setItemDetails(response.data.itemDetails)
      } catch (err: any) {
        setError('Failed to fetch cart item details')
      } finally {
        setLoading(false)
      }
    }, 500),
    []
  )

  useEffect(() => {
    if (items.length === 0) {
      setItemDetails([])
      setLoading(false)
      return
    }

    debouncedFetchItemDetails(items)

    return () => {
      debouncedFetchItemDetails.cancel()
    }
  }, [items, debouncedFetchItemDetails])

  return { itemDetails, loading, error }
}
