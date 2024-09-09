import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useGetProductById } from '../hooks/Products/useGetProductById'
import { useCart } from '../hooks/Cart/useCart'
import { Product } from '../types'
import { useNotification } from '../context/NotificationContext'
import { QuantityInput } from '../components/Input/QuantityInput'

const NextArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', right: '10px' }}
      onClick={onClick}
    />
  )
}

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', left: '10px', zIndex: 1 }}
      onClick={onClick}
    />
  )
}

const ProductShow: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const { addItem } = useCart()
  const { showNotification } = useNotification()

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        const productData = await useGetProductById(id)
        setProduct(productData)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product || (!selectedSize && product.sizes.length > 0)) {
      showNotification('Please select a size', 'error')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      quantity,
      size: selectedSize,
      imageUrl: product.cover_image
    })
    showNotification('Item added to cart', 'success')
  }

  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1)
  }

  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

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

  if (!product) {
    return (
      <div className="flex justify-center">
        <p className="center text-xl my-16">Item not active or not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto md:p-4 mt-8">
      <div className="flex flex-col md:flex-row">
        {/* Left side with scrollable images */}
        <div className="md:w-1/2 h-full mb-6 md:mb-0">
          {/* Use Slick Slider for mobile view */}
          <div className="block md:hidden">
            <Slider {...sliderSettings}>
              <div>
                <img
                  alt={product.name}
                  className="w-full h-auto object-cover rounded-md mb-2"
                  src={product.cover_image}
                />
              </div>
              {product.sub_images.map((url, index) => (
                <div key={index}>
                  <img
                    alt={`Sub image ${index + 1}`}
                    className="w-full h-auto object-cover rounded-md mb-2"
                    src={url}
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Static images for larger screens */}
          <div className="hidden md:block">
            <img
              alt={product.name}
              className="w-3/4 mx-auto h-auto object-cover rounded-md mb-2"
              src={product.cover_image}
            />
            {product.sub_images.map((url, index) => (
              <img
                key={index}
                alt={`Sub image ${index + 1}`}
                className="w-3/4 mx-auto h-auto object-cover rounded-md mb-2"
                src={url}
              />
            ))}
          </div>
        </div>

        {/* Right side fixed with product info */}
        <div className="md:w-1/2 md:sticky top-28 self-start p-8">
          <h1 className="text-2xl tracking-wider my-4">{product.name}</h1>
          <p className="text-md font-light text-gray-700 mb-4">
            ${Number(product.price / 100).toFixed(2)} USD
          </p>
          {product.sizes.length > 0 && (
            <p className="text-sm font-thin text-gray-700 mb-4">Size</p>
          )}
          <div className="flex space-x-2 mb-4">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 text-xs rounded-sm border border-black ${
                  selectedSize === size ? 'bg-black text-white' : ''
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="text-sm font-thin text-gray-700 mb-2">Quantity</p>
          <QuantityInput
            className="mb-2 border-black"
            value={quantity}
            onIncrement={handleQuantityIncrement}
            onDecrement={handleQuantityDecrement}
            onChange={setQuantity}
          />
          <button
            className="w-full h-12 py-2 tracking-wider border border-black rounded-sm hover:bg-gray-100 mb-12 transition duration-500"
            onClick={handleAddToCart}
          >
            ADD TO BAG
          </button>
          <p className="text-gray-700 mb-4 tracking-wide font-thin text-sm">
            {product.description}
          </p>
          <p className="text-gray-700 mb-4 tracking-wide text-sm italic">
            *Size one up for a better oversized fit if you prefer a bigger
            hoodie. Keep regular size if you prefer the boxy and cropped fit of
            your hoodie. Refer to size chart for any sizing questions.{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductShow
