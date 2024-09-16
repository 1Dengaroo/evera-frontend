import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0 space-x-6">
            <a className="text-sm text-gray-600 hover:text-black mx-2" href="/">
              Home
            </a>
            <a className="text-sm text-gray-600 hover:text-black" href="/shop">
              Products
            </a>
            <a
              className="text-sm text-gray-600 hover:text-black"
              href="/orders"
            >
              Orders
            </a>
            <a className="text-sm text-gray-600 hover:text-black" href="/faq">
              FAQ
            </a>
            <a
              className="text-sm text-gray-600 hover:text-black"
              href="mailto:support@everafashion.com"
            >
              Support
            </a>
            <a
              className="text-sm text-gray-600 hover:text-black"
              href="/dashboard"
            >
              Dashboard
            </a>
          </div>

          <div className="flex items-center mb-4 md:mb-0">
            <a
              className="text-gray-600 hover:text-black mx-2"
              href="https://facebook.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaFacebook size={24} />
            </a>
            <a
              className="text-gray-600 hover:text-black mx-2"
              href="https://twitter.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaTwitter size={24} />
            </a>
            <a
              className="text-gray-600 hover:text-black mx-2"
              href="https://instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Built by{' '}
          <a
            className="text-gray-600 hover:underline"
            href="https://www.linkedin.com/in/andydeng-/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Andy Deng
          </a>
          . © 2024 Evera. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
