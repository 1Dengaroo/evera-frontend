import React, { useState } from 'react'
import { useUpdatePassword } from '../../../hooks/API/Account/useUpdatePassword'
import { ButtonOne } from '../../Button'

export const PasswordForm: React.FC = () => {
  const { updatePassword, loading, error, message } = useUpdatePassword()
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await updatePassword({
      currentPassword,
      newPassword,
      passwordConfirmation
    })

    if (success) {
      setCurrentPassword('')
      setNewPassword('')
      setPasswordConfirmation('')
    }
  }

  return (
    <form className="mb-6 py-6 space-y-4" onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <div>
        <label className="block text-gray-600 mb-1 font-semibold">
          Current Password:
        </label>
        <input
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          type="password"
          value={currentPassword}
          required
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1 font-semibold">
          New Password:
        </label>
        <input
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          type="password"
          value={newPassword}
          required
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1 font-semibold">
          Confirm New Password:
        </label>
        <input
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm New Password"
          type="password"
          value={passwordConfirmation}
          required
        />
      </div>

      <ButtonOne
        disabled={loading}
        label={loading ? 'Updating...' : 'Update Password'}
      />
    </form>
  )
}
