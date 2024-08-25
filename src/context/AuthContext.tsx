import React, { createContext, useState, useContext } from 'react'
import { AuthContextType } from '../types'
import axios from 'axios'

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('jwtToken')
  )

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
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
