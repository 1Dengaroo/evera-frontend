import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

export function useCart() {
  const { state, dispatch, showSideCart, showSideCartView, hideSideCartView } =
    useContext(CartContext)

  function addItem(item: {
    id: string
    name: string
    size: string
    quantity: number
    imageUrl: string
  }) {
    dispatch({ type: 'ADD_ITEM', payload: item })
    showSideCartView()
  }

  function removeItem(id: string, size: string) {
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size } })
  }

  function updateQuantity(id: string, size: string, quantity: number) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } })
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' })
  }

  return {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    showSideCart,
    showSideCartView,
    hideSideCartView
  }
}
