import React from 'react'
import { SectionProps } from './types'

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  className = '',
  id,
  backgroundImage,
  titleClassName = 'text-2xl font-bold text-gray-900 mb-6',
  descriptionClassName = '',
  shortHeight = false
}) => {
  const backgroundStyles = backgroundImage
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7) 100%), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }
    : {}

  const heightClasses = backgroundImage
    ? 'min-h-[70vh] sm:min-h-[70vh] lg:min-h-[90vh]'
    : shortHeight
      ? 'min-h-[30vh] sm:min-h-[30vh] lg:min-h-[40vh]'
      : 'min-h-[70vh] sm:min-h-[70vh] lg:min-h-[90vh]'

  return (
    <section
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={`relative py-8 sm:px-6 lg:px-8 flex items-center justify-center ${className} ${heightClasses}`}
      id={id}
      style={backgroundStyles}
    >
      <div className="text-center">
        {title && (
          <h2 className={titleClassName} id={id ? `${id}-heading` : undefined}>
            {title}
          </h2>
        )}
        <div className={descriptionClassName}> {children}</div>
      </div>
    </section>
  )
}
