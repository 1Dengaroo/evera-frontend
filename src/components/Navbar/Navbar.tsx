// src/components/Navbar/Navbar.tsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LeftNavLinks from './LeftNavLinks'
import RightNavLinks from './RightNavLinks'

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side: Logo and Left Nav Links */}
          <div className="flex items-center">
            <div className="text-2xl font-serif text-gray-900 mr-8">
              <Link to="/">Evera</Link>
            </div>
            <div className="hidden md:flex space-x-4">
              <LeftNavLinks />
            </div>
          </div>

          {/* Right side: Right Nav Links */}
          <div className="hidden md:flex items-center space-x-4">
            <RightNavLinks />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900 transition duration-150 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden md:hidden transition-all duration-300 ease-in-out transform-gpu`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <LeftNavLinks isMobile onClick={closeMenu} />
          <RightNavLinks isMobile onClick={closeMenu} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
