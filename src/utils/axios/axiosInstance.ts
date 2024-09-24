import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
