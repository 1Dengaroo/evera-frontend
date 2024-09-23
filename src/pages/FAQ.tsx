import React from 'react'
import { Section } from '../components/Section'
import { UnderlineButton } from '../components/Button'

const FAQ: React.FC = () => {
  return (
    <Section
      title="Frequently Asked Questions"
      titleClassName="text-3xl tracking-wide font-light my-8 pt-8"
      shortHeight
    >
      <div className="max-w-3xl mx-auto px-4 lg:px-8 pt-8">
        <div className="mb-12">
          <h3 className="text-xl tracking-wide mb-2">What is Evera?</h3>
          <p className="font-light">
            Evera is a brand built on the principle of iteration and creativity.
            We focus on finding ideas and inspiration from anything and
            anywhere, creating products and experiences that resonate with a
            community of like-minded individuals.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl tracking-wide mb-2">
            How can I purchase products?
          </h3>
          <p className="font-light">
            You can browse and purchase our products directly from our Shop
            page. Simply add the items you wish to purchase to your cart and
            proceed to checkout when you&apos;re ready.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl tracking-wide mb-2">
            What is your return policy?
          </h3>
          <p className="font-light">
            We offer a 30-day return policy on all of our products. If
            you&apos;re not satisfied with your purchase, you can return it for
            a full refund within 30 days of receiving your order. Please refer
            to our Return Policy page for more details.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-xl tracking-wide mb-2">
            How can I contact customer support?
          </h3>
          <p className="font-light">
            You can contact our customer support team by emailing us directly at
            <a
              className="text-blue-500 hover:underline"
              href="mailto:support@everafashion.com"
            >
              {' '}
              <UnderlineButton
                className="text-blue-500"
                label="support@everafashion.com"
              />
            </a>
            . We&apos;re here to assist you with any questions or concerns you
            may have.
          </p>
        </div>
      </div>
    </Section>
  )
}

export default FAQ
