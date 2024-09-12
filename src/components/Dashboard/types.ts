import { Order, Product } from '../../types'

export interface OrderFormProps {
  order: Order
  editForm: any
  setEditForm: React.Dispatch<React.SetStateAction<any>>
  handleUpdateSuccess: (updatedOrder: Order) => void
  setIsEditing: React.Dispatch<React.SetStateAction<string | null>>
}

export interface ProductFormProps {
  product: Product
  editForm: any
  setEditForm: React.Dispatch<React.SetStateAction<any>>
  handleUpdateSuccess: (updatedProduct: Product) => void
  setIsEditing: React.Dispatch<React.SetStateAction<string | null>>
}
