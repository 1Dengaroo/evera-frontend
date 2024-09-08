import React from 'react'

interface QuantityInputProps {
  className?: string
  value: number
  min?: number
  onIncrement: () => void
  onDecrement: () => void
  onChange: (newValue: number) => void
}

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
          minWidth: '2rem', // Allows the input to shrink to its minimum
          width: 'auto', // Makes the input auto size based on the content
          maxWidth: '4rem', // Adds a maximum width to prevent it from growing too much
          height: '2rem' // Ensures the input is consistent in height
        }}
      />
      <button onClick={onIncrement} className="px-2 py-1">
        +
      </button>
    </div>
  )
}
