import axios from 'axios'
import { setAuthToken } from '../auth/setAuthToken'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
