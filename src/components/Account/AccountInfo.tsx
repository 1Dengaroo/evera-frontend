import { Disclosure } from '@headlessui/react'
import { Divider } from '../Divider'
import clx from 'classnames'
import { NameForm, EmailForm, PhoneNumberForm, PasswordForm } from './Forms'
import { useGetProfile } from '../../hooks/API/Account/useGetProfile'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

export const AccountInfo = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const { profile, loading, error, fetchProfile } =
    useGetProfile(isAuthenticated)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading profile</div>
  }

  if (!profile) {
    return <div>Profile not found</div>
  }

  return (
    <div className="flex flex-col gap-y-8">
      <h1 className="text-3xl">Account Information</h1>
      <span className="text-sm">
        View and update your profile information, including your name, email,
        and phone number. You can also update your billing address, or change
        your password.
      </span>
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex justify-between pt-4">
              <div className="flex flex-col gap-y-2">
                <span className="uppercase text-xs">Name</span>
                <span className="text-sm font-semibold">{profile.name}</span>
              </div>
              <Disclosure.Button>
                <button className="text-sm border rounded-lg bg-gray-50 px-12 py-1 font-medium shadow-sm">
                  Edit
                </button>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel
              className={clx(
                'transition-[max-height,opacity] duration-300 ease-in-out',
                open
                  ? 'max-h-[1000px] opacity-100 overflow-visible pointer-events-auto'
                  : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
              )}
              static
            >
              <div className="flex flex-col space-y-2">
                <NameForm fetchProfile={fetchProfile} />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Divider />
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="uppercase text-xs">Email</span>
                <span className="text-sm font-semibold">{profile.email}</span>
              </div>
              <Disclosure.Button>
                <button className="text-sm border rounded-lg bg-gray-50 px-12 py-1 font-medium shadow-sm">
                  Edit
                </button>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel
              className={clx(
                'transition-[max-height,opacity] duration-300 ease-in-out',
                open
                  ? 'max-h-[1000px] opacity-100 overflow-visible pointer-events-auto'
                  : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
              )}
              static
            >
              <div className="flex flex-col space-y-2">
                <EmailForm fetchProfile={fetchProfile} />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Divider />

      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex justify-between">
              <div className="flex flex-col gap-y-2">
                <span className="uppercase text-xs">Phone</span>
                <span className="text-sm font-semibold">
                  {profile.phone_number}
                </span>
              </div>
              <Disclosure.Button>
                <button className="text-sm border rounded-lg bg-gray-50 px-12 py-1 font-medium shadow-sm">
                  Edit
                </button>
              </Disclosure.Button>
            </div>
            <Disclosure.Panel
              className={clx(
                'transition-[max-height,opacity] duration-300 ease-in-out',
                open
                  ? 'max-h-[1000px] opacity-100 overflow-visible pointer-events-auto'
                  : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
              )}
              static
            >
              <div className="flex flex-col space-y-2">
                <PhoneNumberForm fetchProfile={fetchProfile} />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Divider />

      <Disclosure>
        {({ open }) => (
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
              className={clx(
                'transition-[max-height,opacity] duration-300 ease-in-out',
                open
                  ? 'max-h-[1000px] opacity-100 overflow-visible pointer-events-auto'
                  : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
              )}
              static
            >
              <div className="flex flex-col space-y-2">
                <PasswordForm />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
