import React from 'react'

export const PrevArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      onClick={onClick}
      style={{ ...style, display: 'block', left: '10px', zIndex: 1 }}
    />
  )
}
