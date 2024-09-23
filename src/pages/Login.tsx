import React, { useState } from 'react'
import { useUserLogin } from '../hooks/Users/useUserLogin'
import { useNavigate } from 'react-router-dom'
import { Section } from '../components/Section'
import { useNotification } from '../context/NotificationContext'
import { ButtonOne, UnderlineButton } from '../components/Button'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin } = useUserLogin()
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async () => {
    const { success } = await handleLogin({ email, password })
    if (success) {
      navigate('/')
      showNotification('Logged in successfully', 'success')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <Section
      descriptionClassName="w-full"
      title="Login"
      titleClassName="text-3xl font-light tracking-wide my-8 w-full mt-12"
      shortHeight
    >
      <div className="flex flex-col items-center w-full">
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
        <ButtonOne label="Login" onClick={onSubmit} />
        <div className="flex flex-col items-center mt-4">
          <UnderlineButton
            className="text-sm cursor-pointer mb-2"
            label="Forgot password?"
            onClick={() => navigate('/reset-password')}
          />
          <UnderlineButton
            className="text-sm cursor-pointer"
            label="Create an account"
            onClick={() => navigate('/signup')}
          />
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </Section>
  )
}

export default Login
