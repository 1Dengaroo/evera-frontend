import React from 'react'
import Slider from 'react-slick'
import { NextArrow } from './NextArrow'
import { PrevArrow } from './PrevArrow'
import { ProductImageSliderProps } from './types'

export const ProductImageSlider: React.FC<ProductImageSliderProps> = ({
  product
}) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  }

  return (
    <>
      <div className="block lg:hidden">
        <Slider {...sliderSettings}>
          <div>
            <img
              alt={product.name}
              className="w-full h-auto object-cover rounded-md mb-2"
              src={product.cover_image}
            />
          </div>
          {product.sub_images.map((url, index) => (
            <img
              key={url}
              alt={`Sub image ${index + 1}`}
              className="w-full h-auto object-cover rounded-md mb-2"
              src={url}
            />
          ))}
        </Slider>
      </div>

      <div className="hidden lg:block">
        <img
          alt={product.name}
          className="w-3/4 mx-auto h-auto object-cover rounded-md mb-2"
          src={product.cover_image}
        />
        {product.sub_images.map((url, index) => (
          <img
            key={url}
            alt={`Sub image ${index + 1}`}
            className="w-3/4 mx-auto h-auto object-cover rounded-md mb-2"
            src={url}
          />
        ))}
      </div>
    </>
  )
}
