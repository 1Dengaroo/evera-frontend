import { Product } from '../../../types'

export interface ProductFilterParams {
  name?: string
  sort_by?: 'price' | 'created_at'
  sort_direction?: 'asc' | 'desc'
}

export interface SimilarProductsProps {
  similarProducts: Product[]
}
