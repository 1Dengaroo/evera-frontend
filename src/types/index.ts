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
