import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product, getProductById } from '../services/ProductService'
import { useCart } from '../hooks/useCart'

const ProductShow: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState<number>(1)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!product || (!selectedSize && product.sizes.length > 0)) {
      alert('Please select a size before adding to cart')
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      imageUrl: selectedImage || product.cover_image
    })
  }

  useEffect(() => {
    async function fetchProduct() {
      if (id) {
        const productData = await getProductById(Number(id))
        setProduct(productData)
        setSelectedImage(productData?.cover_image || null)
      }
    }
    fetchProduct()
  }, [id])

  if (!product) {
    return <p>Loading...</p>
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <img
            alt={product.name}
            className="w-full h-auto object-cover rounded-md mb-4"
            src={selectedImage || product.cover_image}
          />
          <div className="grid grid-cols-4 gap-2">
            {[...product.sub_images].map((url, index) => (
              <img
                key={index}
                alt={`Sub image ${index + 1}`}
                className={`w-full h-auto px-2 object-cover rounded-md cursor-pointer ${selectedImage === url ? 'border border-black' : ''}`}
                onClick={() => setSelectedImage(url)}
                src={url}
              />
            ))}
          </div>
        </div>
        <div className="md:ml-8 mt-4 md:mt-0 md:w-1/2 max-w-lg">
          <h1 className="text-3xl font-serif tracking-wide my-4">
            {product.name}
          </h1>
          <p className="text-md font-serif font-light text-gray-700 mb-4">
            ${Number(product.price).toFixed(2)} USD
          </p>
          {product.sizes.length > 0 && (
            <p className="text-sm font-serif font-thin text-gray-700 mb-4">
              Size
            </p>
          )}
          <div className="flex space-x-2 mb-4">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`px-4 py-2 text-xs rounded-xl border border-black ${selectedSize === size ? 'bg-black text-white' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="text-sm font-serif font-thin text-gray-700 mb-2">
            Quantity
          </p>
          <input
            className="w-24 h-8 border border-black px-4 text-sm text-center mb-4 rounded-sm"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            type="number"
            min="1"
          />
          <button
            className="w-full h-12 py-2 tracking-wider border border-black font-serif rounded-sm hover:bg-gray-100 mb-12"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <p className="text-gray-700 mb-4 tracking-wide font-thin font-serif text-sm">
            {product.description}
          </p>
          <p className="text-gray-700 mb-4 tracking-wide font-serif text-sm italic">
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
