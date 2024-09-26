import React, { useEffect } from 'react'
import { ProductFormProps } from './types'
import { useUpdateProduct } from '../../hooks/API/Dashboard/useUpdateProduct'
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
  const { updateProduct, loading, error } = useUpdateProduct()
  const { showNotification } = useNotification()

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
    const updatedProduct = await updateProduct(product.id, editForm)
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
      className="mb-4 border rounded-3xl p-10 shadow-lg bg-white space-y-6 max-w-4xl mx-auto transition-all duration-500 hover:shadow-2xl"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center border-b pb-6 border-gray-300">
        <h3 className="text-2xl font-light text-gray-900">
          Edit Product #{product.id}
        </h3>
      </div>

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
          value={editForm.name}
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
          value={editForm.description}
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
          value={editForm.price}
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
          value={editForm.product_type}
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
          value={editForm.quantity}
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
          value={editForm.cover_image}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 font-semibold mb-1">
          Sub-Images
        </label>
        {editForm.sub_images.map((subImage: string, index: number) => (
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
              onClick={() => removeSubImage(index)}
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
          className="tracking-wide text-blue-500 text-sm px-4 py-2"
          label="Add Size"
          onClick={addSizeField}
        />
      </div>

      <div className="mb-6">
        <label
          className="flex items-center font-semibold text-gray-600"
          htmlFor="active"
        >
          <input
            checked={editForm.active}
            className="mr-2"
            id="active"
            name="active"
            onChange={handleCheckboxChange}
            type="checkbox"
          />
          Active
        </label>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-end space-x-4">
        <button
          className="px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 rounded-full shadow-md"
          disabled={loading}
          type="submit"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          className="px-6 py-3 text-sm font-medium text-gray-900 hover:underline"
          onClick={handleCancel}
          type="button"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
