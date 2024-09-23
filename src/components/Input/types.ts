export interface QuantityInputProps {
  className?: string
  value: number
  min?: number
  onIncrement: () => void
  onDecrement: () => void
  onChange: (newValue: number) => void
}

export type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>
