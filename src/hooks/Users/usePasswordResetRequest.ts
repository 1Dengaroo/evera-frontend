import axios from 'axios'

export const useRequestPasswordReset = async (
  email: string
): Promise<{ success: boolean; message: string | null }> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/password`
    const response = await axios.post(url, { email })
    return { success: true, message: response.data.message }
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong.'
    return { success: false, message: errorMessage }
  }
}
