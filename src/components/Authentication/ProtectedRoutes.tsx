import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useGetAdminStatus } from '../../hooks/Users/useGetAdminStatus'

export const ProtectedRoutes: React.FC = () => {
  const { isAdmin, loading } = useGetAdminStatus()

  if (loading) {
    return (
      <div className="text-center tracking-wide font-light text-lg">
        Loading...
      </div>
    )
  }

  return isAdmin ? <Outlet /> : <Navigate to="/404" />
}
