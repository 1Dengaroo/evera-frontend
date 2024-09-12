import React, { useEffect } from 'react'
import { ProductFormProps } from './types'
import { useUpdateProduct } from '../../hooks/Dashboard/useUpdateProduct'
import { useNotification } from '../../context/NotificationContext'
import { UnderlineButton } from '../Button'
import { useNavigate } from 'react-router-dom'

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  editForm,
  setEditForm,
  handleUpdateSuccess,
  setIsEditing
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    setEditForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      active: product.active === undefined ? true : product.active,
      product_type: product.product_type || 'unisex',
      cover_image: product.cover_image || '',
      sub_images: product.sub_images || [''],
      sizes: product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      quantity: product.quantity || 9999
    })
  }, [product, setEditForm])

  const { showNotification } = useNotification()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setEditForm((prevForm: any) => ({ ...prevForm, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setEditForm((prevForm: any) => ({ ...prevForm, [name]: checked }))
  }

  const handleSubImageChange = (index: number, value: string) => {
    const newSubImages = [...editForm.sub_images]
    newSubImages[index] = value
    setEditForm((prevForm: any) => ({ ...prevForm, sub_images: newSubImages }))
  }

  const addSubImage = () => {
    setEditForm((prevForm: any) => ({
      ...prevForm,
      sub_images: [...prevForm.sub_images, '']
    }))
  }

  const removeSubImage = (index: number) => {
    const newSubImages = editForm.sub_images.filter(
      (_: string, i: number) => i !== index
    )
    setEditForm((prevForm: any) => ({ ...prevForm, sub_images: newSubImages }))
  }

  const handleSizeChange = (index: number, value: string) => {
    const newSizes = [...editForm.sizes]
    newSizes[index] = value
    setEditForm((prevForm: any) => ({ ...prevForm, sizes: newSizes }))
  }

  const addSizeField = () => {
    setEditForm((prevForm: any) => ({
      ...prevForm,
      sizes: [...prevForm.sizes, '']
    }))
  }

  const removeSizeField = (index: number) => {
    const newSizes = editForm.sizes.filter(
      (_: string, i: number) => i !== index
    )
    setEditForm((prevForm: any) => ({ ...prevForm, sizes: newSizes }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const updatedProduct = await useUpdateProduct(product.id, editForm)
    if (!updatedProduct) {
      showNotification('Failed to update product', 'error')
      return
    }

    showNotification('Product updated successfully', 'success')
    handleUpdateSuccess(updatedProduct)
    setIsEditing(null)
  }

  const handleCancel = () => {
    setEditForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || 0,
      active: product.active || true,
      product_type: product.product_type || 'unisex',
      cover_image: product.cover_image || '',
      sub_images: product.sub_images || [''],
      sizes: product.sizes || ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      quantity: product.quantity || 9999
    })
    setIsEditing(null)
    navigate(-1)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 border rounded-3xl p-10 shadow-lg bg-white space-y-6 max-w-4xl mx-auto transition-all duration-500 hover:shadow-2xl"
    >
      <div className="flex justify-between items-center border-b pb-6 border-gray-300">
        <h3 className="text-2xl font-thin text-gray-900">
          Edit Product #{product.id}
        </h3>
      </div>

      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-gray-600 font-semibold mb-1"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={editForm.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-gray-600 font-semibold mb-1"
        >
          Product Description
        </label>
        <textarea
          id="description"
          name="description"
          value={editForm.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          placeholder="Enter product description"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="price"
          className="block text-gray-600 font-semibold mb-1"
        >
          Price In Cents (USD)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={editForm.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          placeholder="Enter product price"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="product_type"
          className="block text-gray-600 font-semibold mb-1"
        >
          Product Type
        </label>
        <select
          id="product_type"
          name="product_type"
          value={editForm.product_type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
        >
          <option value="unisex">Unisex</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="block text-gray-600 font-semibold mb-1"
        >
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={editForm.quantity}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          placeholder="Enter product quantity"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="cover_image"
          className="block text-gray-600 font-semibold mb-1"
        >
          Cover Image URL
        </label>
        <input
          type="text"
          id="cover_image"
          name="cover_image"
          value={editForm.cover_image}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          placeholder="Enter cover image URL"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-semibold mb-1">
          Sub-Images
        </label>
        {editForm.sub_images.map((subImage: string, index: number) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={subImage}
              onChange={(e) => handleSubImageChange(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors mr-2"
              placeholder={`Sub-Image URL ${index + 1}`}
            />
            <UnderlineButton
              label="Remove"
              onClick={() => removeSubImage(index)}
              className="tracking-wide text-red-500 text-sm"
            />
          </div>
        ))}
        <UnderlineButton
          className="tracking-wide text-blue-500 text-sm px-4 py-2"
          label="Add Sub-Image"
          onClick={addSubImage}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-semibold mb-1">Sizes</label>
        {editForm.sizes.map((size: string, index: number) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(index, e.target.value)}
              className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors mr-2"
              placeholder={`Size ${index + 1}`}
            />
            <UnderlineButton
              label="Remove"
              onClick={() => removeSizeField(index)}
              className="tracking-wide text-red-500 text-sm"
            />
          </div>
        ))}
        <UnderlineButton
          className="tracking-wide text-blue-500 text-sm px-4 py-2"
          label="Add Size"
          onClick={addSizeField}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="active"
          className="flex items-center font-semibold text-gray-600"
        >
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={editForm.active}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Active
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="submit"
          className="px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 rounded-full shadow-md"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-3 text-sm font-medium text-gray-900 hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
