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
          At Evera, we believe that every idea has a source. Our foundation is
          built on the principle of iteration—constantly evolving and drawing
          inspiration from what came before. We seek ideas everywhere, knowing
          that innovation often comes from unexpected places.
        </p>
        <p className="font-light">
          Our originality is rooted in playfulness, always exploring new
          connections and finding joy in the creative process. Inspired by the
          incredible work and people around us, we strive to cultivate a
          community of like-minded individuals who are passionate about
          creating, learning, and inspiring one another.
        </p>
      </div>
    </Section>
  )
}

export default About
