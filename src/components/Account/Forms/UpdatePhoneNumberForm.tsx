import React, { useState } from 'react'
import { useUpdateProfile } from '../../../hooks/API/Account/useUpdateProfile'
import { ButtonOne } from '../../Button'

interface PhoneNumberFormProps {
  fetchProfile: () => Promise<void>
}

export const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
  fetchProfile
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const { updateProfile, loading, error } = useUpdateProfile()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const updatedProfile = await updateProfile({
      phone_number_attributes: { number: phoneNumber }
    })
    if (updatedProfile) {
      await fetchProfile()
    }
  }

  return (
    <form className="mb-6 py-6 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-600 mb-1 font-semibold">
          Phone Number:
        </label>
        <input
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          name="phone_number"
          type="tel"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ButtonOne
        disabled={loading}
        label={loading ? 'Saving...' : 'Save Phone Number'}
        onClick={handleSubmit}
      />
    </form>
  )
}
