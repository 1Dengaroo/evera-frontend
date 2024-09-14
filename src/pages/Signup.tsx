import React, { useState } from 'react'
import { useUserSignup } from '../hooks/Users/useUserSignup'
import { Section } from '../components/Section'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../context/NotificationContext'
import { ButtonOne } from '../components/Button'

const Signup: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const { signup, loading, error } = useUserSignup()

  const handleSignup = async () => {
    const success = await signup({ email, password, name })
    if (success) {
      navigate('/login')
      showNotification('Account created successfully, please login', 'success')
    } else if (error) {
      showNotification(error, 'error')
    }
  }

  return (
    <Section
      title="Sign Up"
      titleClassName="text-3xl font-thin tracking-wide my-8 mt-12"
      shortHeight
    >
      <div className="flex flex-col items-center w-full">
        <input
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
          value={name}
        />
        <input
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          value={email}
        />
        <input
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
        />
        <ButtonOne
          className="px-6 text-sm"
          disabled={loading}
          label={loading ? 'Signing Up...' : 'Sign Up'}
          onClick={handleSignup}
        />
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </Section>
  )
}

export default Signup
