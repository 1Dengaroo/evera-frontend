import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Section } from '../components/Section/Section'

export const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Section
      title="404 Not Found"
      titleClassName="text-3xl font-thin tracking-wide my-8 mt-12"
      shortHeight
    >
      <div className="flex flex-col items-center w-full">
        <p className="text-center">
          The page you are looking for does not exist. Go back to{' '}
          <span
            onClick={() => navigate('/')}
            className="text-blue-500 cursor-pointer"
          >
            Home
          </span>
        </p>
      </div>
    </Section>
  )
}
