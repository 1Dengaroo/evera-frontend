export interface GetProductsParams {
  active?: boolean
  name?: string
  startDate?: string
  endDate?: string
  sortByDate?: string
}

export interface AdminGetOrdersParams {
  id?: string
  email?: string
  status?: string
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
