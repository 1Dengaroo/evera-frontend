'use client'

import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const SideMenuItems = {
  Home: '/',
  Shop: '/shop',
  Orders: '/orders',
  FAQ: '/faq',
  About: '/about',
  Cart: '/cart',
  Account: '/account'
}

const SideMenu = () => {
  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <Popover.Button
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
                >
                  Menu
                </Popover.Button>
              </div>

              {/* Overlay */}
              <Transition
                show={open}
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-50"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-50"
                leaveTo="opacity-0"
              >
                <div
                  className="fixed inset-0 bg-black opacity-50"
                  onClick={close}
                ></div>
              </Transition>

              {/* Side Menu */}
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Popover.Panel className="fixed inset-y-0 left-0 z-30 w-96 bg-white shadow-xl h-full">
                  <div className="relative flex flex-col h-full">
                    <div className="flex justify-end p-4">
                      <button data-testid="close-menu-button" onClick={close}>
                        X
                      </button>
                    </div>
                    <ul className="flex flex-col gap-6 items-start justify-start p-4">
                      {Object.entries(SideMenuItems).map(([name, href]) => {
                        return (
                          <li key={name}>
                            <a
                              href={href}
                              className="text-3xl leading-10 text-gray-600 hover:text-ui-fg-disabled"
                              onClick={close}
                              data-testid={`${name.toLowerCase()}-link`}
                            >
                              {name}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col gap-y-6 p-4 pb-8 mt-auto">
                      <p className="flex justify-between txt-compact-small">
                        © {new Date().getFullYear()} Evera Corp. All rights
                        reserved.
                      </p>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
