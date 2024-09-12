export interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string, user: any) => void
  logout: () => void
}
