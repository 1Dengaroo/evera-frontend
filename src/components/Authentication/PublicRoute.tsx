import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const PublicRoutes: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes
