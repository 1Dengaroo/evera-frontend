import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductCardProps } from './types'
import { UnderlineButton, ButtonOne } from '../Button'

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEditClick
}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/shop/${product.id}`)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEditClick) {
      onEditClick()
    }
  }

  return (
    <div
      className="group rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
      onClick={handleNavigate}
    >
      <img
        alt={product.name}
        className="w-full h-116 object-cover mb-2 rounded"
        src={product.cover_image}
      />
      <UnderlineButton
        label={product.name}
        className="text-sm font-light text-gray-700 mb-2 tracking-wide"
      />
      <p className="text-gray-500 font-serif font-thin tracking-widest text-sm px-4 mb-2">
        Evera
      </p>
      <p className="text-gray-700 mb-4 text-xs font-light px-4">
        ${Number(product.price / 100).toFixed(2)}
      </p>
      {onEditClick && (
        <div className="p-4">
          <ButtonOne
            label="Edit"
            onClick={handleEditClick}
            className="px-6 py-3 right text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 rounded-full shadow-md"
          />
        </div>
      )}
    </div>
  )
}
