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
      className={`bg-black text-white py-2 px-4 ${className}`}
      type={type}
      {...props}
    >
      {label}
    </button>
  )
}
