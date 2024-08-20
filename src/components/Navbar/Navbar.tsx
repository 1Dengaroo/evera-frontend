// src/components/Navbar.tsx

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// Define the structure for navigation items
interface NavItem {
  label: string
  href: string
}

// Navigation items array
const navItems: NavItem[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Production', href: '/production' },
  { label: 'Cart', href: '/cart' }
]

// Separate component for individual navigation items
const NavLinks: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => (
  <>
    {navItems.map((item) => (
      <Link
        key={item.label}
        className={`px-2 text-gray-700 hover:text-gray-900 ${
          isMobile ? 'block' : 'inline-block'
        }`}
        to={item.href}
      >
        {item.label}
      </Link>
    ))}
  </>
)

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-serif text-gray-900">
              <Link to="/">Evera</Link>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <NavLinks />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              className="text-gray-900 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLinks isMobile />
        </div>
      </div>
    </nav>
  )
}
