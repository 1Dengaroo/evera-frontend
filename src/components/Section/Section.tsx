import React, { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  titleClassName?: string; // Custom class for title
  descriptionClassName?: string; // Custom class for description (children)
  shortHeight?: boolean; // New prop to make height shorter when no background image
}

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  className = '',
  id,
  backgroundColor = 'bg-white',
  backgroundImage,
  titleClassName = 'text-2xl font-bold text-gray-900 mb-6', // Default styling for title
  descriptionClassName = '', // Default styling for description
  shortHeight = false, // Default to false, meaning normal height
}) => {
  const backgroundStyles = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: backgroundColor,
      }
    : {};

  const heightClasses = backgroundImage
    ? 'min-h-[70vh] sm:min-h-[70vh] lg:min-h-[90vh]'
    : shortHeight
    ? 'min-h-[30vh] sm:min-h-[30vh] lg:min-h-[40vh]' // Shorter height when no background image
    : 'min-h-[70vh] sm:min-h-[70vh] lg:min-h-[90vh]';

  return (
    <section
      id={id}
      className={`relative ${className} ${heightClasses} py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center`}
      style={backgroundStyles}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="text-center">
        {title && (
          <h2
            id={id ? `${id}-heading` : undefined}
            className={titleClassName} // Apply custom title class
          >
            {title}
          </h2>
        )}
        <div className={descriptionClassName}> {/* Apply custom description class */}
          {children}
        </div>
      </div>
    </section>
  );
};
