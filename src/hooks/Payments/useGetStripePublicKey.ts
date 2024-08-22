import axios from 'axios'

export const useGetStripePublicKey = async (): Promise<string> => {
  try {
    const url = `${process.env.REACT_APP_API_URL}/configurations/stripe_public_key`
    const response = await axios.get(url)
    return response.data.stripe_public_key
  } catch {
    return ''
  }
}
