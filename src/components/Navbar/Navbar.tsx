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
    <nav className="bg-white shadow-md fixed top-0 w-full z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side: Logo and Left Nav Links */}
          <div className="flex items-center">
            <div className="text-2xl font-serif text-gray-900 mr-8 tracking-widest">
              <Link to="/">Evera</Link>
            </div>
            <div className="hidden md:flex space-x-4 mt-1">
              <LeftNavLinks />
            </div>
          </div>

          {/* Right side: Right Nav Links */}
          <div className="hidden md:flex items-center space-x-4 mt-1">
            <RightNavLinks />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900 transition duration-150 ease-in-out"
              onClick={toggleMenu}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="block h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                ) : (
                  <path
                    d="M4 6h16M4 12h16m-7 6h7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
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
          <LeftNavLinks onClick={closeMenu} isMobile />
          <RightNavLinks onClick={closeMenu} isMobile />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
