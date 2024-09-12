import React from 'react'
import { QuantityInputProps } from './types'

export const QuantityInput: React.FC<QuantityInputProps> = ({
  className = '',
  value,
  min = 1,
  onIncrement,
  onDecrement,
  onChange
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    if (!isNaN(newValue) && newValue >= min) {
      onChange(newValue)
    }
  }

  return (
    <div
      className={
        'inline-flex items-center border rounded-sm text-sm ' + className
      }
    >
      <button
        className="px-2 py-1"
        disabled={value <= min}
        onClick={onDecrement}
      >
        -
      </button>
      <input
        className="text-center border-none"
        min={min}
        onChange={handleInputChange}
        style={{
          appearance: 'textfield',
          minWidth: '2rem',
          width: 'auto',
          maxWidth: '4rem',
          height: '2rem'
        }}
        type="number"
        value={value}
      />
      <button className="px-2 py-1" onClick={onIncrement}>
        +
      </button>
    </div>
  )
}
