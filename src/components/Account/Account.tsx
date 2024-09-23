import React, { useState } from 'react'

import { AccountNav } from './AccountNav'
import { AccountInfo } from './AccountInfo'

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState('')

  return (
    <div className="flex-1 sm:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-[240px_1fr] py-12">
          <div>
            <AccountNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="flex-1">
            {activeTab === 'profile' && <AccountInfo />}
            {activeTab === 'orders' && 'Orders'}
            {activeTab === '' && "Welcome to your account. Let's get started."}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-end justify-between sm:border-t border-gray-200 py-12 gap-8">
          <div>
            <h3 className="text-xl-semi mb-4">Got questions?</h3>
            <span className="txt-medium">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>
          <div>
            <a href="/faq" className="text-blue-500">
              Customer Service
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
