import React from 'react'

export const Hero = ({
  backgroundImageUrl,
  heading,
  subHeading,
  buttonUrl,
  buttonText
}: {
  backgroundImageUrl: string
  heading?: string
  subHeading?: string
  buttonUrl?: string
  buttonText?: string
}) => {
  return (
    <div
      className="h-[90vh] w-full border-b border-ui-border-base relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.7) 100%), url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span>
          <h1 className="text-6xl leading-10 text-white font-light tracking-widest font-serif">
            {heading}
          </h1>
          <h2 className="text-md leading-9 text-white font-light tracking-wide mt-6">
            {subHeading}
          </h2>
        </span>
        {buttonUrl && (
          <a href={buttonUrl} target="_blank" rel="noreferrer">
            <button className="bg-white text-black tracking-wide py-2 px-4 rounded shadow hover:bg-gray-200 transition duration-300">
              {buttonText}
            </button>
          </a>
        )}
      </div>
    </div>
  )
}
