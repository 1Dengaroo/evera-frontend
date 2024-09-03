import React, { useState } from 'react'
import { useCreateProduct } from '../../hooks/Dashboard/useCreateProduct'
import { useNotification } from '../../context/NotificationContext'

const ProductCreateForm: React.FC = () => {
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
    <>
      <h2 className="text-3xl text-center mb-6 font-serif mt-8">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit} className="border p-4 rounded mb-6">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-semibold">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border px-4 py-2 w-full"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-semibold">
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border px-4 py-2 w-full"
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block mb-2 font-semibold">
            Price (USD)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="border px-4 py-2 w-full"
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="product_type" className="block mb-2 font-semibold">
            Product Type
          </label>
          <select
            id="product_type"
            name="product_type"
            value={form.product_type}
            onChange={handleChange}
            className="border px-4 py-2 w-full"
            required
          >
            <option value="unisex">Unisex</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2 font-semibold">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="border px-4 py-2 w-full"
            placeholder="Enter product quantity"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="cover_image" className="block mb-2 font-semibold">
            Cover Image URL
          </label>
          <input
            type="text"
            id="cover_image"
            name="cover_image"
            value={form.cover_image}
            onChange={handleChange}
            className="border px-4 py-2 w-full"
            placeholder="Enter cover image URL"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="active" className="flex items-center font-semibold">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={form.active}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Active
          </label>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Sub-Images</h4>
          {form.sub_images.map((subImage, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={subImage}
                onChange={(e) => handleSubImageChange(index, e.target.value)}
                className="border px-4 py-2 w-full"
                placeholder={`Sub-Image URL ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeSubImageField(index)}
                className="px-4 py-2 text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSubImageField}
            className="px-4 py-2 text-blue-500 hover:underline"
          >
            Add Sub-Image
          </button>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Sizes</h4>
          {form.sizes.map((size, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={size}
                onChange={(e) => handleSizeChange(index, e.target.value)}
                className="border px-4 py-2 w-full"
                placeholder={`Size ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeSizeField(index)}
                className="px-4 py-2 text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSizeField}
            className="px-4 py-2 text-blue-500 hover:underline"
          >
            Add Size
          </button>
        </div>

        <button type="submit" className="bg-black text-white px-4 py-2">
          Create Product
        </button>
      </form>
    </>
  )
}

export default ProductCreateForm
