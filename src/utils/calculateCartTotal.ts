import { CartItem } from '../context/CartContext'
import { getCartTotal } from '../services/ProductService'

export async function calculateCartTotal(
  items: CartItem[]
): Promise<number | null> {
  const total = await getCartTotal(items)
  return total
}
