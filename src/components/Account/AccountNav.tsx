import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserLogout } from '../../hooks/API/Users/useUserLogout'
import { ChevronDown, User, MapPin, Package } from 'react-feather'

interface AccountNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const AccountNav = ({ activeTab, setActiveTab }: AccountNavProps) => {
  const navigate = useNavigate()
  const { handleLogout } = useUserLogout()

  const onLogout = async () => {
    const success = await handleLogout()
    if (success) navigate('/')
  }

  return (
    <div>
      <div className="sm:hidden">
        <div className="text-xl-semi mb-4 px-8">Hello NAME</div>
        <div className="text-base-regular">
          <ul>
            <li>
              <a
                href="/account/profile"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                data-testid="profile-link"
              >
                <>
                  <div className="flex items-center gap-x-2">
                    <User size={20} />
                    <span>Profile</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </>
              </a>
            </li>
            <li>
              <a
                href="/account/addresses"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                data-testid="addresses-link"
              >
                <>
                  <div className="flex items-center gap-x-2">
                    <MapPin size={20} />
                    <span>Addresses</span>
                  </div>
                  <ChevronDown className="transform -rotate-90" />
                </>
              </a>
            </li>
            <li>
              <a
                href="/account/orders"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                data-testid="orders-link"
              >
                <div className="flex items-center gap-x-2">
                  <Package size={20} />
                  <span>Orders</span>
                </div>
                <ChevronDown className="transform -rotate-90" />
              </a>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                onClick={onLogout}
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
      <div className="hidden sm:block" data-testid="account-nav">
        <div>
          <div className="pb-4">
            <h3 className="text-sm font-semibold">Account</h3>
          </div>
          <div className="text-sm">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink
                  tab=""
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                >
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  tab="profile"
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                >
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  tab="orders"
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                >
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button type="button" onClick={onLogout}>
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

type AccountNavLinkProps = {
  tab: string
  activeTab: string
  children: React.ReactNode
  setActiveTab: (tab: string) => void
}

const AccountNavLink = ({
  tab,
  activeTab,
  children,
  setActiveTab
}: AccountNavLinkProps) => {
  return (
    <button
      type="button"
      onClick={() => setActiveTab(tab)}
      className={activeTab === tab ? 'font-semibold' : ''}
    >
      {children}
    </button>
  )
}
