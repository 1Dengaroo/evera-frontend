export const isJwtExpired = (token: string): boolean => {
  if (!token) {
    return true
  }
  const payloadBase64 = token.split('.')[1]
  if (!payloadBase64) {
    return true
  }
  const payload = JSON.parse(atob(payloadBase64))
  const expiry = payload.exp
  if (expiry && Date.now() >= expiry * 1000) {
    return true
  }
  return false
}
