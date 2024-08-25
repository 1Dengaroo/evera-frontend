import React, { useState } from 'react'
import { useUserSignup } from '../hooks/Users/useUserSignup'
import { Section } from '../components/Section/Section'
import { useNavigate } from 'react-router-dom'

const Signup: React.FC = () => {
  const [name, setName] = useState<string | undefined>(undefined)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSignup = async () => {
    const data = await useUserSignup({ email, password, name })
    if (data.success) {
      navigate('/login')
    } else {
      setError(data.message)
    }
  }

  return (
    <Section
      title="Sign Up"
      titleClassName="text-4xl font-serif my-8"
      shortHeight
    >
      <div className="">
        <input
          type="text"
          placeholder="Name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          className=""
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=""
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className=""
        />
        <button onClick={handleSignup} className="">
          Sign Up
        </button>
      </div>
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </Section>
  )
}

export default Signup
