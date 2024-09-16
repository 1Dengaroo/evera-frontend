import React, { useState } from 'react'
import { useRequestPasswordReset } from '../../hooks/Users/usePasswordResetRequest'
import { Section } from '../Section'
import { useNotification } from '../../context/NotificationContext'
import { ButtonOne } from '../Button'

export const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState('')
  const { showNotification } = useNotification()

  const { requestPasswordReset, loading, error, message } =
    useRequestPasswordReset()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await requestPasswordReset(email)

    if (success) {
      showNotification(message || 'Reset instructions sent', 'success', 10000)
    } else {
      showNotification(error || 'Something went wrong.', 'error')
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
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          value={email}
          required
        />
        <ButtonOne
          label={loading ? 'Loading...' : 'Send Password Reset'}
          type="submit"
        />
      </form>
    </Section>
  )
}
