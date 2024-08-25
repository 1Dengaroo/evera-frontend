import React, { useState } from 'react'
import { useUserLogin } from '../hooks/Users/useUserLogin'
import { useNavigate } from 'react-router-dom'
import { Section } from '../components/Section/Section'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { handleLogin } = useUserLogin()
  const navigate = useNavigate()

  const onSubmit = async () => {
    const { success } = await handleLogin({ email, password })
    if (success) {
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <Section
      title="Login"
      titleClassName="text-4xl font-serif my-8"
      shortHeight
    >
      <div>
        {error && <p>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={onSubmit}>Login</button>
      </div>
    </Section>
  )
}

export default Login
