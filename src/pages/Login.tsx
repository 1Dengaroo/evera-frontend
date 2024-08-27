import React, { useState } from 'react'
import { useUserLogin } from '../hooks/Users/useUserLogin'
import { useNavigate } from 'react-router-dom'
import { Section } from '../components/Section/Section'
import { useNotification } from '../context/NotificationContext'

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
      title="Login"
      titleClassName="text-4xl font-serif my-8 w-full mt-12"
      descriptionClassName="w-full"
      shortHeight
    >
      <div className="flex flex-col items-center w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 mb-4 w-96 border border-black placeholder:text-xs"
        />
        <button
          className="bg-black text-white font-serif py-2 px-4"
          onClick={onSubmit}
        >
          Login
        </button>
        <div className="flex flex-col items-center mt-4">
          <button
            className="text-sm font-serif underline cursor-pointer"
            onClick={() => navigate('/reset-password')}
          >
            Forgot Password?
          </button>
          <button
            className="text-sm font-serif underline cursor-pointer mt-2"
            onClick={() => navigate('/signup')}
          >
            Create an account
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </Section>
  )
}

export default Login
