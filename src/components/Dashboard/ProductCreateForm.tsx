import React, { useState } from 'react'
import { useCreateProduct } from '../../hooks/Dashboard/useCreateProduct'
import { useNotification } from '../../context/NotificationContext'
import { ButtonOne, UnderlineButton } from '../Button'

export const ProductCreateForm: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    active: true,
    product_type: 'unisex',
    cover_image: '',
    sub_images: [''],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    quantity: 9999
  })

  const { showNotification } = useNotification()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setForm({ ...form, [name]: checked })
  }

  const handleSubImageChange = (index: number, value: string) => {
    const newSubImages = [...form.sub_images]
    newSubImages[index] = value
    setForm({ ...form, sub_images: newSubImages })
  }

  const addSubImageField = () => {
    setForm({ ...form, sub_images: [...form.sub_images, ''] })
  }

  const removeSubImageField = (index: number) => {
    const newSubImages = form.sub_images.filter((_, i) => i !== index)
    setForm({ ...form, sub_images: newSubImages })
  }

  const handleSizeChange = (index: number, value: string) => {
    const newSizes = [...form.sizes]
    newSizes[index] = value
    setForm({ ...form, sizes: newSizes })
  }

  const addSizeField = () => {
    setForm({ ...form, sizes: [...form.sizes, ''] })
  }

  const removeSizeField = (index: number) => {
    const newSizes = form.sizes.filter((_, i) => i !== index)
    setForm({ ...form, sizes: newSizes })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const createdProduct = await useCreateProduct(form)
    if (createdProduct) {
      setForm({
        name: '',
        description: '',
        price: 0,
        active: true,
        product_type: 'unisex',
        cover_image: '',
        sub_images: [''],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        quantity: 9999
      })
      showNotification('Product created successfully', 'success')
    } else {
      showNotification('Failed to create product', 'error')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl text-center mb-6 font-thin tracking-wide mt-8">
        Create New Product
      </h2>

      <form
        className="mb-4 border rounded-3xl p-10 shadow-lg bg-white space-y-6 transition-all duration-500 hover:shadow-2xl"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            className="block text-gray-600 font-semibold mb-1"
            htmlFor="name"
          >
            Product Name
          </label>
          <input
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Enter product name"
            type="text"
            value={form.name}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-600 font-semibold mb-1"
            htmlFor="description"
          >
            Product Description
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="Enter product description"
            value={form.description}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-600 font-semibold mb-1"
            htmlFor="price"
          >
            Price In Cents (USD)
          </label>
          <input
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            id="price"
            name="price"
            onChange={handleChange}
            placeholder="Enter product price"
            type="number"
            value={form.price}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-600 font-semibold mb-1"
            htmlFor="product_type"
          >
            Product Type
          </label>
          <select
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            id="product_type"
            name="product_type"
            onChange={handleChange}
            value={form.product_type}
            required
          >
            <option value="unisex">Unisex</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-600 font-semibold mb-1"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            id="quantity"
            name="quantity"
            onChange={handleChange}
            placeholder="Enter product quantity"
            type="number"
            value={form.quantity}
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-600 font-semibold mb-1"
            htmlFor="cover_image"
          >
            Cover Image URL
          </label>
          <input
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            id="cover_image"
            name="cover_image"
            onChange={handleChange}
            placeholder="Enter cover image URL"
            type="text"
            value={form.cover_image}
          />
        </div>

        <div className="mb-6">
          <label
            className="flex items-center font-semibold text-gray-600"
            htmlFor="active"
          >
            <input
              checked={form.active}
              className="mr-2"
              id="active"
              name="active"
              onChange={handleCheckboxChange}
              type="checkbox"
            />
            Active
          </label>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-600">
            Sub-Images
          </h4>
          {form.sub_images.map((subImage, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors mr-2"
                onChange={(e) => handleSubImageChange(index, e.target.value)}
                placeholder={`Sub-Image URL ${index + 1}`}
                type="text"
                value={subImage}
              />
              <UnderlineButton
                className="tracking-wide text-red-500 text-sm"
                label="Remove"
                onClick={() => removeSubImageField(index)}
              />
            </div>
          ))}
          <UnderlineButton
            className="tracking-wide text-blue-500 text-sm"
            label="Add Sub-Image"
            onClick={addSubImageField}
          />
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2 text-gray-600">Sizes</h4>
          {form.sizes.map((size, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors mr-2"
                onChange={(e) => handleSizeChange(index, e.target.value)}
                placeholder={`Size ${index + 1}`}
                type="text"
                value={size}
              />
              <UnderlineButton
                className="tracking-wide text-red-500 text-sm"
                label="Remove"
                onClick={() => removeSizeField(index)}
              />
            </div>
          ))}
          <UnderlineButton
            className="tracking-wide text-blue-500 text-sm"
            label="Add Size"
            onClick={addSizeField}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <ButtonOne
            className="px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 rounded-full shadow-md"
            label="Create Product"
            type="submit"
          />
        </div>
      </form>
    </div>
  )
}
