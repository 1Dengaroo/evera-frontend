// src/pages/FAQ.tsx

import React from 'react'
import { Section } from '../components/Section/Section'

const FAQ: React.FC = () => {
  return (
    <Section backgroundColor="bg-white" title="Frequently Asked Questions">
      <ul>
        <li>What is your return policy?</li>
        <li>How can I track my order?</li>
        <li>Do you offer international shipping?</li>
      </ul>
    </Section>
  )
}

export default FAQ
