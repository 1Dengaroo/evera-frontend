import { useState, useEffect } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'

export const useGetAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const response = await axiosInstance.get('/users/check_admin')
        setIsAdmin(response.data.is_admin)
      } catch {
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    fetchAdminStatus()
  }, [])

  return { isAdmin, loading }
}
