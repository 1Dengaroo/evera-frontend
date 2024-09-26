import React from 'react'
import { ButtonOneProps } from './types'

export const ButtonOne: React.FC<ButtonOneProps> = ({
  label,
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      className={`px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 rounded-full shadow-md ${className}`}
      type={type || 'button'}
      {...props}
    >
      {label}
    </button>
  )
}
