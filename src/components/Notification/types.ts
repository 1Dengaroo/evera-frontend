export interface NotificationProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose: () => void
}

export type NotificationContextType = {
  showNotification: (
    message: string,
    type?: NotificationProps['type'],
    duration?: number
  ) => void
}
