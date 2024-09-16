import React, { useState, useEffect } from 'react'
import { ButtonOne, UnderlineButton } from '../Button'

export const DisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer')
    if (!hasSeenDisclaimer) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem('hasSeenDisclaimer', 'true')
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-md shadow-lg w-full max-w-lg mx-4 md:mx-0 relative">
        <button
          aria-label="Close"
          className="absolute top-10 right-10 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
          type="button"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h3 className="text-xl font-medium tracking-wider mb-4">
          Website Under Construction
        </h3>
        <p className="text-md text-gray-500 mb-6">
          This website is still under construction. The products you see are{' '}
          <span className="font-semibold">NOT for sale</span> and this is a
          showcase website <span className="font-semibold">ONLY</span>. Any
          orders placed will immediately be cancelled and refunded. The website
          images and content are placeholders and{' '}
          <span className="font-semibold">do not represent</span> our actual
          products.
          <br />
          <br />
          For any inquiries, please email us directly at{' '}
          <a className="text-blue-500" href="mailto:support@everafashion.com">
            <UnderlineButton
              className="text-blue-500"
              label="support@everafashion.com"
            />
          </a>
        </p>
        <ButtonOne
          className="tracking-wider"
          label="Got it!"
          onClick={handleClose}
        />
      </div>
    </div>
  )
}
