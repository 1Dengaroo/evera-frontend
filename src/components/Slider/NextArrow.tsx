import React from 'react'

export const NextArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      onClick={onClick}
      style={{ ...style, display: 'block', right: '10px' }}
    />
  )
}
