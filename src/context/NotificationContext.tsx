// NotificationContext.tsx
import React, { createContext, useContext, useState } from 'react'
import Notification from '../components/Notification/Notification'
import {
  NotificationProps,
  NotificationContextType
} from '../components/Notification/types'

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [notification, setNotification] = useState<Omit<
    NotificationProps,
    'onClose'
  > | null>(null)

  const showNotification = (
    message: string,
    type: NotificationProps['type'] = 'info',
    duration = 3000
  ) => {
    setNotification({ message, type, duration })
  }

  const handleClose = () => {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={handleClose}
        />
      )}
      {children}
    </NotificationContext.Provider>
  )
}
