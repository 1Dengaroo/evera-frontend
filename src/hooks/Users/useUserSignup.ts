import axios from 'axios'
import { UserCredentials } from '../../types'

export const useUserSignup = async (
  credentials: UserCredentials
): Promise<any> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/signup`

    await axios.post(url, {
      user: credentials
    })

    return { success: true }
  } catch (error: any) {
    return { success: false, message: error.response.data.status.message }
  }
}
