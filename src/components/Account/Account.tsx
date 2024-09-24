import React, { useState, useContext } from 'react'
import { IoArrowForwardSharp } from 'react-icons/io5'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import { AccountNav } from './AccountNav'
import { AccountInfo } from './AccountInfo'
import { AccountOrders } from './AccountOrders'
import { AccountOverview } from './AccountOverview'

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState('')
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  return (
    <div className="flex-1 sm:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] py-12">
          <div>
            <AccountNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="flex-1">
            {activeTab === 'profile' && <AccountInfo />}
            {activeTab === 'orders' && <AccountOrders />}
            {activeTab === '' && <AccountOverview />}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-end justify-between sm:border-t border-gray-200 py-12 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Got questions?</h3>
            <span className="text-sm">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <a className="text-blue-500 group" href="/faq">
              <span className="text-sm flex items-center gap-x-1">
                Customer Service
                <IoArrowForwardSharp className="transition-transform duration-150 group-hover:-rotate-45 text-md" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
