import React from 'react'

export const NextArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '10px' }}
      onClick={onClick}
    />
  )
}
