import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate, Outlet } from 'react-router-dom'
import { MdKeyboardArrowLeft } from 'react-icons/md'

import { AccountNav } from './AccountNav'
import { InteractiveLink } from '../Link'

export const Account: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const [showOutlet, setShowOutlet] = useState(false)

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  const handleNavItemClick = () => {
    setShowOutlet(true)
  }

  const handleBackClick = () => {
    setShowOutlet(false)
  }

  return (
    <div className="flex-1 md:py-12 p-6" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] py-12">
          <div className={`${showOutlet ? 'hidden' : ''} md:block`}>
            <AccountNav onNavItemClick={handleNavItemClick} />
          </div>
          <div className={`${!showOutlet ? 'hidden' : ''} md:block flex-1`}>
            <button
              className="md:hidden mb-4"
              onClick={handleBackClick}
              type="button"
            >
              <div className="flex items-center gap-x-1 text-xs">
                <MdKeyboardArrowLeft className="text-lg" />
                <span>Account</span>
              </div>
            </button>
            <Outlet />
          </div>
        </div>
        {/* Footer Section */}
        <div className="flex flex-col md:flex-row items-end justify-between md:border-t border-gray-200 py-12 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Got questions?</h3>
            <span className="text-sm">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <InteractiveLink href="/faq">Customer Service</InteractiveLink>
          </div>
        </div>
      </div>
    </div>
  )
}
