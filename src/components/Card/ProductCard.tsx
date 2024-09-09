import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductCardProps } from '../../types'
import { UnderlineButton } from '../Button/UnderlineButton'

const ProductCard: React.FC<ProductCardProps> = ({ product, onEditClick }) => {
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
        <button
          onClick={handleEditClick}
          className="bg-black text-white font-serif py-2 px-4 mx-4 mb-4"
        >
          Edit
        </button>
      )}
    </div>
  )
}

export default ProductCard
