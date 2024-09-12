import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export const PublicRoutes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}
