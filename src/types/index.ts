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
