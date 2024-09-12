export interface UserLoginResponse {
  success: boolean
  data: any
}

export interface UserCredentials {
  email: string
  password: string
  name?: string
}
