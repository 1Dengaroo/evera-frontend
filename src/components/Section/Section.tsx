import React, { ReactNode } from 'react'

interface SectionProps {
  title?: string
  children: ReactNode
  className?: string
  id?: string
  backgroundColor?: string
  backgroundImage?: string
  titleClassName?: string
  descriptionClassName?: string
  shortHeight?: boolean
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  className = '',
  id,
  backgroundColor = 'bg-white',
  backgroundImage,
  titleClassName = 'text-2xl font-bold text-gray-900 mb-6',
  descriptionClassName = '',
  shortHeight = false
}) => {
  const backgroundStyles = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: backgroundColor
      }
    : {}

  const heightClasses = backgroundImage
    ? 'min-h-[70vh] sm:min-h-[70vh] lg:min-h-[90vh]'
    : shortHeight
      ? 'min-h-[30vh] sm:min-h-[30vh] lg:min-h-[40vh]' // Shorter height when no background image
      : 'min-h-[70vh] sm:min-h-[70vh] lg:min-h-[90vh]'

  return (
    <section
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={`relative ${className} ${heightClasses} py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center`}
      id={id}
      style={backgroundStyles}
    >
      <div className="text-center">
        {title && (
          <h2
            className={titleClassName} // Apply custom title class
            id={id ? `${id}-heading` : undefined}
          >
            {title}
          </h2>
        )}
        <div className={descriptionClassName}>
          {' '}
          {/* Apply custom description class */}
          {children}
        </div>
      </div>
    </section>
  )
}
