import axios from 'axios'

export const useResetPassword = async (
  resetToken: string | null,
  password: string,
  passwordConfirmation: string
): Promise<{ success: boolean; message: string | null }> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/password`
    const response = await axios.put(url, {
      user: {
        reset_password_token: resetToken,
        password,
        password_confirmation: passwordConfirmation
      }
    })
    return { success: true, message: response.data.message }
  } catch (error: any) {
    const errorMessage = error.response?.data?.error || 'Something went wrong.'
    return { success: false, message: errorMessage }
  }
}
