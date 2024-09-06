import React, { useEffect } from 'react'
import { ProductFormProps } from '../../types'
import { useUpdateProduct } from '../../hooks/Dashboard/useUpdateProduct'
import { useNotification } from '../../context/NotificationContext'

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  editForm,
  setEditForm,
  handleUpdateSuccess,
  setIsEditing
}) => {
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
  }

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-semibold">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={editForm.name}
          onChange={handleChange}
          className="border px-4 py-2 w-full"
          placeholder="Enter product name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block mb-2 font-semibold">
          Product Description
        </label>
        <textarea
          id="description"
          name="description"
          value={editForm.description}
          onChange={handleChange}
          className="border px-4 py-2 w-full"
          placeholder="Enter product description"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block mb-2 font-semibold">
          Price In Cents (USD)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={editForm.price}
          onChange={handleChange}
          className="border px-4 py-2 w-full"
          placeholder="Enter product price"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="product_type" className="block mb-2 font-semibold">
          Product Type
        </label>
        <select
          id="product_type"
          name="product_type"
          value={editForm.product_type}
          onChange={handleChange}
          className="border px-4 py-2 w-full"
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
          value={editForm.quantity}
          onChange={handleChange}
          className="border px-4 py-2 w-full"
          placeholder="Enter product quantity"
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
          value={editForm.cover_image}
          onChange={handleChange}
          className="border px-4 py-2 w-full"
          placeholder="Enter cover image URL"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Sub-Images</label>
        {editForm.sub_images.map((subImage: string, index: number) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={subImage}
              onChange={(e) => handleSubImageChange(index, e.target.value)}
              className="border px-4 py-2 w-full mr-2"
              placeholder={`Sub-Image URL ${index + 1}`}
            />
            <button
              type="button"
              onClick={() => removeSubImage(index)}
              className="px-4 py-2 text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSubImage}
          className="px-4 py-2 text-blue-500 hover:underline"
        >
          Add Sub-Image
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Sizes</label>
        {editForm.sizes.map((size: string, index: number) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={size}
              onChange={(e) => handleSizeChange(index, e.target.value)}
              className="border px-4 py-2 w-full mr-2"
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

      <div className="mb-4">
        <label htmlFor="active" className="flex items-center font-semibold">
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

      <div className="flex space-x-4">
        <button type="submit" className="bg-black text-white px-4 py-2">
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ProductForm
