import { Disclosure } from '@headlessui/react'
import { Divider } from '../Divider'
import clx from 'classnames'

export const AccountInfo = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-3xl">Account Information</h1>
      <span className="text-sm">
        View and update your profile information, including your name, email,
        and phone number. You can also update your billing address, or change
        your password.
      </span>
      <Disclosure>
        {({ open, close }) => (
          <>
            <div className="flex justify-between pt-4">
              <div className="flex flex-col gap-y-2">
                <span className="uppercase text-xs">Name</span>
                <span className="text-sm font-semibold">Andy Deng</span>
              </div>
              <Disclosure.Button>
                <button className="text-sm border rounded-lg bg-gray-50 px-12 py-1 font-medium shadow-sm">
                  Edit
                </button>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel
              static
              className={clx(
                'transition-[max-height,opacity] duration-300 ease-in-out overflow-visible',
                {
                  'max-h-[1000px] opacity-100': open,
                  'max-h-0 opacity-0': close
                }
              )}
            >
              <div className="flex flex-col space-y-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Divider />
      <Disclosure>
        {({ open, close }) => (
          <>
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="uppercase text-xs">Email</span>
                <span className="text-sm font-semibold">
                  andydengaroo@gmail.com
                </span>
              </div>
              <Disclosure.Button>
                <button className="text-sm border rounded-lg bg-gray-50 px-12 py-1 font-medium shadow-sm">
                  Edit
                </button>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel
              static
              className={clx(
                'transition-[max-height,opacity] duration-300 ease-in-out overflow-visible',
                {
                  'max-h-[1000px] opacity-100': open,
                  'max-h-0 opacity-0': close
                }
              )}
            >
              <div className="flex flex-col space-y-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Divider />

      <Disclosure>
        {({ open, close }) => (
          <>
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="uppercase text-xs">Phone</span>
                <span className="text-sm font-semibold">+1 123-456-7890</span>
              </div>
              <Disclosure.Button>
                <button className="text-sm border rounded-lg bg-gray-50 px-12 py-1 font-medium shadow-sm">
                  Edit
                </button>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel
              static
              className={clx(
                'transition-[max-height,opacity] duration-300 ease-in-out overflow-visible',
                {
                  'max-h-[1000px] opacity-100': open,
                  'max-h-0 opacity-0': close
                }
              )}
            >
              <div className="flex flex-col space-y-2">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Divider />

      <Disclosure>
        {({ open, close }) => (
          <>
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="uppercase text-xs">Password</span>
                <span className="text-sm font-semibold">********</span>
              </div>
              <Disclosure.Button>
                <button className="text-sm border rounded-lg bg-gray-50 px-12 py-1 font-medium shadow-sm">
                  Edit
                </button>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel
              static
              className={clx(
                'transition-[max-height,opacity] duration-300 ease-in-out overflow-visible',
                {
                  'max-h-[1000px] opacity-100': open,
                  'max-h-0 opacity-0': close
                }
              )}
            >
              <div className="flex flex-col space-y-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
