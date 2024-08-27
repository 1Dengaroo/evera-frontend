import React, { useState } from 'react'
import { useRequestPasswordReset } from '../../hooks/Users/usePasswordResetRequest'
import { Section } from '../Section/Section'
import { useNotification } from '../../context/NotificationContext'

const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState('')
  const { showNotification } = useNotification()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { success, message } = await useRequestPasswordReset(email)

    if (success) {
      showNotification(message || 'Reset instructions sent', 'success', 10000)
    } else {
      showNotification('Something went wrong.', 'error')
    }
    setLoading(false)
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
          required
        />
        <button
          className="bg-black text-white font-serif py-2 px-4 text-sm"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Instructions'}
        </button>
      </form>
    </Section>
  )
}

export default PasswordResetRequest
