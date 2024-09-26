import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo
} from 'react'
import { AuthContextType } from './types'
import axios from 'axios'
import { isJwtExpired } from '../utils/auth/isJwtExpired'
import { useNotification } from './NotificationContext'

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { showNotification } = useNotification()
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('jwtToken')
  )

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      const token: string = localStorage.getItem('jwtToken') || ''
      if (isJwtExpired(token)) {
        logout()
      }
    }
  }, [])

  const login = (token: string, user: any) => {
    setIsAuthenticated(true)
    localStorage.setItem('jwtToken', token)
    localStorage.setItem('user', JSON.stringify(user))
    axios.defaults.headers.common['Authorization'] = `${token}`
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    showNotification('You have been logged out', 'info', 5000)
  }

  const contextValue = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, logout]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
