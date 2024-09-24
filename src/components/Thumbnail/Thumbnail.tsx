import React, { FC } from 'react'

const PlaceholderImage: FC<{ size: number }> = ({ size }) => (
  <div style={{ width: size, height: size, backgroundColor: '#ddd' }} />
)

type ThumbnailProps = {
  thumbnail?: string | null
  images?: string[] | null
  size?: 'small' | 'medium' | 'large' | 'full' | 'square' | 'small-square'
  isFeatured?: boolean
  className?: string
  'data-testid'?: string
}

export const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  size = 'small',
  isFeatured,
  className,
  'data-testid': dataTestid
}) => {
  const initialImage = thumbnail || images?.[0]

  return (
    <div
      className={`relative border border-gray-300 w-full overflow-hidden p-4 rounded-lg ease-in-out duration-150 ${className} ${
        isFeatured
          ? 'aspect-[11/14]'
          : size !== 'square'
            ? 'aspect-[9/16]'
            : 'aspect-[1/1]'
      } ${getSizeClasses(size)}`}
      data-testid={dataTestid}
    >
      <ImageOrPlaceholder image={initialImage} size={size} />
    </div>
  )
}

const ImageOrPlaceholder: FC<{
  image?: string
  size: ThumbnailProps['size']
}> = ({ image, size }) => {
  return image ? (
    <img
      alt="Thumbnail"
      className="absolute inset-0 object-cover object-center w-full h-full"
      draggable={false}
      src={image}
    />
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === 'small' ? 16 : 24} />
    </div>
  )
}

const getSizeClasses = (size: ThumbnailProps['size']) => {
  switch (size) {
    case 'small':
      return 'w-[180px]'
    case 'medium':
      return 'w-[290px]'
    case 'large':
      return 'w-[440px]'
    case 'full':
      return 'w-full'
    case 'square':
      return 'w-[180px] h-[180px]'
    case 'small-square':
      return 'w-[64px] h-[64px]'
    default:
      return ''
  }
}
