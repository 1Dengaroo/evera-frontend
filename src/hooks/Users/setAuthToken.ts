import axios from 'axios'

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}
