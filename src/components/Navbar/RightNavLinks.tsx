// src/components/Navbar/RightNavLinks.tsx
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { CartContext } from '../../context/CartContext'
import { useUserLogout } from '../../hooks/Users/useUserLogout'
import { NavItem } from './types'

const rightNavItems: NavItem[] = [{ label: 'Cart', href: '/cart' }]

const RightNavLinks: React.FC<{ isMobile?: boolean; onClick?: () => void }> = ({
  isMobile,
  onClick
}) => {
  const { isAuthenticated } = useContext(AuthContext)
  const { handleLogout } = useUserLogout()
  const { getCartSize } = useContext(CartContext)
  const navigate = useNavigate()

  const onLogout = async () => {
    const success = await handleLogout()
    if (success) {
      navigate('/')
      if (onClick) onClick()
    }
  }

  const authLinks: NavItem[] = isAuthenticated
    ? [{ label: 'Logout', href: '#' }]
    : [
        { label: 'Login', href: '/login' },
        { label: 'Signup', href: '/signup' }
      ]

  const allRightNavItems = [...rightNavItems, ...authLinks]

  return (
    <>
      {allRightNavItems.map((item) => (
        <Link
          key={item.label}
          className={`text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium ${
            isMobile ? 'block' : 'inline-block'
          }`}
          onClick={item.label === 'Logout' ? onLogout : onClick}
          to={item.href}
        >
          {item.label === 'Cart' && getCartSize() > 0 ? (
            <div className="relative">
              <span>Cart</span>
              <span className="absolute -top-1 left-7 bg-red-500 text-2xs text-white rounded-full h-3 w-3 flex items-center justify-center">
                {getCartSize()}
              </span>
            </div>
          ) : (
            item.label
          )}
        </Link>
      ))}
    </>
  )
}

export default RightNavLinks
