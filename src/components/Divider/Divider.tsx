import React from 'react'

export const Divider = ({ className }: { className?: string }) => (
  <div className={'h-px w-full border-b border-gray-200 mt-1' + className} />
)
