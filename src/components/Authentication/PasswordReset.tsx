import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useResetPassword } from '../../hooks/Users/usePasswordReset'
import { Section } from '../Section'
import { useNotification } from '../../context/NotificationContext'
import { useNavigate } from 'react-router-dom'
import { ButtonOne } from '../Button'

export const PasswordReset: React.FC = () => {
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
      descriptionClassName="w-full"
      title="Reset Password"
      titleClassName="text-3xl font-thin tracking-wide my-8 w-full mt-12"
      shortHeight
    >
      <form
        className="flex flex-col items-center w-full"
        onSubmit={handleSubmit}
      >
        <input
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
        />
        <input
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm Password"
          type="password"
          value={passwordConfirmation}
        />
        <ButtonOne
          className="px-6 text-sm"
          label="Reset Password"
          type="submit"
        />
      </form>
    </Section>
  )
}
