// src/components/Navbar/LeftNavLinks.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { NavItem } from '../../types'

const leftNavItems: NavItem[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Orders', href: '/orders' }
]

const LeftNavLinks: React.FC<{ isMobile?: boolean; onClick?: () => void }> = ({
  isMobile,
  onClick
}) => {
  return (
    <>
      {leftNavItems.map((item) => (
        <Link
          key={item.label}
          to={item.href}
          onClick={onClick}
          className={`text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium ${
            isMobile ? 'block' : 'inline-block'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  )
}

export default LeftNavLinks
