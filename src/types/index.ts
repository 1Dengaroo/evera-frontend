export interface CartItem {
  id: string
  name: string
  size: string
  quantity: number
  imageUrl: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  active: boolean
  cover_image: string
  sub_images: string[]
  sizes: string[]
  quantity: number
  product_type: string
}

export interface UserCredentials {
  email: string
  password: string
  name?: string
}

export interface User {
  id: number
  email: string
  name: string
}

export interface NavItem {
  label: string
  href: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, user: any) => void
  logout: () => void
}

export interface UserLoginResponse {
  success: boolean
  data: any
}

export interface Order {
  id: string
  email: string
  paid: boolean
  created_at: string
  updated_at: string
  price: number
  order_items: OrderItem[]
  delivery?: Delivery
}

export interface OrderItem {
  product_id: number
  quantity: number
  product: Product
  size: string
}

export interface Product {
  name: string
  price: number
}

export interface Delivery {
  email: string
  status: string
  tracking_information?: string
  created_at: string
  updated_at: string
  address: Address
}

export interface Address {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  postal_code: string
  country: string
}

export interface NotificationProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number // duration in milliseconds
  onClose: () => void
}

export interface UpdateOrderParams {
  orderId: string
  delivery_attributes: {
    status?: string
    tracking_information?: string
    address_attributes: {
      name?: string
      line1?: string
      line2?: string
      city?: string
      state?: string
      postal_code?: string
      country?: string
    }
  }
}

export interface OrderFormProps {
  order: Order
  editForm: any
  setEditForm: React.Dispatch<React.SetStateAction<any>>
  handleUpdateSuccess: (updatedOrder: Order) => void
  setIsEditing: React.Dispatch<React.SetStateAction<string | null>>
}

export interface OrderCardProps {
  order: Order
  onEditClick?: () => void // Optional edit handler for admin view
}

export interface AdminGetOrdersParams {
  id?: string
  email?: string
  status?: string
}

export interface ProductCardProps {
  product: Product
  onEditClick?: () => void // Optional edit handler for admin view
}

export interface ProductFormProps {
  product: Product
  editForm: any
  setEditForm: React.Dispatch<React.SetStateAction<any>>
  handleUpdateSuccess: (updatedProduct: Product) => void
  setIsEditing: React.Dispatch<React.SetStateAction<string | null>>
}

export interface ProductCreateFormProps {
  handleCreateSuccess: (newProduct: Product) => void
}

export interface ProductsListProps {
  handleProductUpdateSuccess: (updatedProduct: Product) => void
  handleProductEditClick: (product: Product) => void
  isEditingProduct: string | null
  editProductForm: any
  setEditProductForm: React.Dispatch<any>
  setIsEditing: React.Dispatch<React.SetStateAction<string | null>>
}

export interface CartItemProps {
  id: string
  name: string
  size: string
  quantity: number
  imageUrl: string
}
