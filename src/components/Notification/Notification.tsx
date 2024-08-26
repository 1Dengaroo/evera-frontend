import React, { useEffect } from 'react'
import { NotificationProps } from '../../types'

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-300 shadow-lg shadow-green-100'
      case 'error':
        return 'border-red-300 shadow-lg shadow-red-100'
      case 'info':
        return 'border-blue-300 shadow-lg shadow-blue-100'
      case 'warning':
        return 'border-yellow-300 shadow-lg shadow-yellow-100'
      default:
        return 'border-blue-300 shadow-lg shadow-blue-100'
    }
  }

  return (
    <div
      className={`fixed top-8 left-1/2 transform -translate-x-1/2 p-4 rounded-lg border bg-white ${getStyles()} z-10`}
    >
      <p>{message}</p>
    </div>
  )
}

export default Notification
