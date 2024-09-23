import { useState, useEffect } from 'react'
import axios from 'axios'
import { setAuthToken } from '../../../utils/auth/setAuthToken'

export const useGetAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/users/check_admin`
        const token = localStorage.getItem('jwtToken')
        setAuthToken(token)
        const response = await axios.get(url)
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
