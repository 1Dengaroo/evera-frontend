import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetAdminStatus } from '../../hooks/Users/useGetAdminStatus'

const ProtectedRoutes: React.FC = () => {
  const { isAdmin, loading } = useGetAdminStatus()

  if (loading) {
    return (
      <div className="text-center tracking-wide font-thin text-lg">
        Loading...
      </div>
    )
  }

  return isAdmin ? <Outlet /> : <Navigate to="/404" />
}

export default ProtectedRoutes
