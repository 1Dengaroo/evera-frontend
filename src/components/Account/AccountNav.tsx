import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useUserLogout } from '../../hooks/API/Users/useUserLogout'
import { ChevronDown, User, Package } from 'react-feather'

export const AccountNav: React.FC<{ onNavItemClick: () => void }> = ({
  onNavItemClick
}) => {
  const navigate = useNavigate()
  const { handleLogout } = useUserLogout()

  const onLogout = async () => {
    const success = await handleLogout()
    if (success) navigate('/')
  }

  return (
    <div>
      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <h3 className="text-2xl pb-8 px-8 border-b border-gray-200">Account</h3>
        <div className="text-base-regular">
          <ul>
            <li>
              <NavLink
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                data-testid="profile-link"
                onClick={onNavItemClick}
                to="/account/profile"
              >
                <div className="flex items-center gap-x-2">
                  <User size={20} />
                  <span>Profile</span>
                </div>
                <ChevronDown className="transform -rotate-90" />
              </NavLink>
            </li>
            <NavLink
              className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
              data-testid="overview-link"
              onClick={onNavItemClick}
              to="/account/overview"
            >
              <div className="flex items-center gap-x-2">
                <Package size={20} />
                <span>Overview</span>
              </div>
              <ChevronDown className="transform -rotate-90" />
            </NavLink>
            <li>
              <NavLink
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                data-testid="orders-link"
                onClick={onNavItemClick}
                to="/account/orders"
              >
                <div className="flex items-center gap-x-2">
                  <Package size={20} />
                  <span>Orders</span>
                </div>
                <ChevronDown className="transform -rotate-90" />
              </NavLink>
            </li>
            <li>
              <button
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                onClick={() => {
                  onLogout()
                  onNavItemClick()
                }}
                type="button"
              >
                <div className="flex items-center gap-x-2">
                  <span>Log out</span>
                </div>
                <ChevronDown className="transform -rotate-90" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-sm font-semibold">Account</h3>
          </div>
          <div className="text-sm">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'font-semibold' : ''
                  }
                  to="/account/overview"
                >
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'font-semibold' : ''
                  }
                  to="/account/profile"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'font-semibold' : ''
                  }
                  to="/account/orders"
                >
                  Orders
                </NavLink>
              </li>
              <li className="text-grey-700">
                <button onClick={onLogout} type="button">
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
