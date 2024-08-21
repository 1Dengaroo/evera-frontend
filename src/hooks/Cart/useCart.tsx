import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

export function useCart() {
  const { state, dispatch } = useContext(CartContext)

  function addItem(item: {
    id: string
    name: string
    size: string
    quantity: number
    imageUrl: string
  }) {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  function removeItem(id: string) {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  function updateQuantity(id: string, quantity: number) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  return {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
}
