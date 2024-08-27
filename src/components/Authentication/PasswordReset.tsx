import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useResetPassword } from '../../hooks/Users/usePasswordReset'
import { Section } from '../Section/Section'
import { useNotification } from '../../context/NotificationContext'
import { useNavigate } from 'react-router-dom'

const PasswordReset: React.FC = () => {
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [searchParams] = useSearchParams()
  const resetToken = searchParams.get('reset_password_token')
  const { showNotification } = useNotification()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { success, message } = await useResetPassword(
      resetToken,
      password,
      passwordConfirmation
    )
    if (success) {
      navigate('/login')
      showNotification('Password reset successfully, please login', 'success')
    } else {
      showNotification(message || 'Something went wrong', 'error')
    }
  }

  return (
    <Section
      title="Reset Password"
      titleClassName="text-4xl font-serif my-8 w-full mt-12"
      descriptionClassName="w-full"
      shortHeight
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
        />
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
        />
        <button
          className="bg-black text-white font-serif py-2 px-4"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </Section>
  )
}

export default PasswordReset
