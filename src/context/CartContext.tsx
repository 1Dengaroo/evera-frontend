import React, { createContext, useReducer, useEffect, ReactNode } from 'react'
import { CartItem } from '../types'
export interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string } }
  | {
      type: 'UPDATE_QUANTITY'
      payload: { id: string; size: string; quantity: number }
    }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: []
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      )
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            item.id !== action.payload.id || item.size !== action.payload.size
        )
      }
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      }
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] }
    }

    default:
      return state
  }
}

export const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  getCartSize: () => number
}>({
  state: initialState,
  dispatch: () => null,
  getCartSize: () => 0
})

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const localData = localStorage.getItem('cart')
    return localData ? JSON.parse(localData) : initialState
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  const getCartSize = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{ state, dispatch, getCartSize }}>
      {children}
    </CartContext.Provider>
  )
}
