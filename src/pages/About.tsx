import React from 'react'
import { Section } from '../components/Section/Section'

const About: React.FC = () => {
  return (
    <Section
      title="About Us"
      titleClassName="text-4xl font-serif my-8"
      shortHeight
    >
      <div className="max-w-3xl mx-auto px-4 lg:px-8">
        <p className="mb-4 font-light">
          Nothing comes from nowhere. Evera is founded on the principle of
          iteration and building on what came before; finding ideas and
          inspiration from anything and anywhere.
        </p>
        <p className="font-light">
          Our originality comes from play - always looking around us and in
          between - exploring new connections and simply creating what we enjoy.
          Influenced by the plethora of incredible work and people around us,
          Evera hopes to build a community of like-minded individuals hungry to
          create and inspire.
        </p>
      </div>
    </Section>
  )
}

export default About
