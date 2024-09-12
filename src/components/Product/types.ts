import { Product } from '../../types'

export interface ProductDetailsProps {
  product: Product
}

export interface ProductCardProps {
  product: Product
  onEditClick?: () => void
}
