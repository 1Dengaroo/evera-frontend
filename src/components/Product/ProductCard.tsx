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
      className="group rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer text-center"
      onClick={handleNavigate}
    >
      <img
        alt={product.name}
        className="object-cover mb-2 rounded border border-gray-300 rounded-2xl mb-6"
        src={product.cover_image}
      />
      <p className="text-sm text-gray-700 mb-2 tracking-wide">{product.name}</p>
      <p className="text-gray-500 font-serif font-light tracking-widest text-sm px-4 mb-2">
        Evera
      </p>
      <p className="text-gray-700 mb-4 text-xs font-light px-4  pb-6">
        ${Number(product.price / 100).toFixed(2)}
      </p>
      {onEditClick && (
        <div className="p-4">
          <ButtonOne label="Edit" onClick={handleEditClick} />
        </div>
      )}
    </div>
  )
}
