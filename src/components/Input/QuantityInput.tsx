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
        onClick={onDecrement}
        className="px-2 py-1"
        disabled={value <= min}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        min={min}
        onChange={handleInputChange}
        className="text-center border-none"
        style={{
          appearance: 'textfield',
          minWidth: '2rem',
          width: 'auto',
          maxWidth: '4rem',
          height: '2rem'
        }}
      />
      <button onClick={onIncrement} className="px-2 py-1">
        +
      </button>
    </div>
  )
}
