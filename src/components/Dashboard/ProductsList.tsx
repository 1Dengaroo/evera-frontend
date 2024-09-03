import React, { useEffect, useState } from 'react'
import { useGetProducts } from '../../hooks/Dashboard/useGetProducts'
import { Product } from '../../types'
import ProductCard from '../Card/ProductCard'
import ProductForm from './ProductEditForm'
import { ProductsListProps } from '../../types'

const ProductsList: React.FC<ProductsListProps> = ({
  handleProductUpdateSuccess,
  handleProductEditClick,
  isEditingProduct,
  editProductForm,
  setEditProductForm,
  setIsEditing
}) => {
  const [products, setProducts] = useState<Product[]>([])
  const [productFilters, setProductFilters] = useState({
    name: '',
    active: '',
    startDate: '',
    endDate: '',
    sortByDate: 'desc'
  })

  useEffect(() => {
    const fetchProducts = async () => {
      const { name, active, sortByDate } = productFilters
      const fetchedProducts = await useGetProducts({
        name,
        active: active ? active === 'true' : undefined,
        sortByDate
      })
      setProducts(fetchedProducts)
    }

    fetchProducts()
  }, [])

  const handleProductFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setProductFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const handleProductFilterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, active, startDate, endDate, sortByDate } = productFilters
    const fetchedProducts = await useGetProducts({
      name,
      active: active ? active === 'true' : undefined,
      startDate,
      endDate,
      sortByDate
    })
    setProducts(fetchedProducts)
  }

  return (
    <div>
      <h2 className="text-3xl text-center mb-6 font-serif mt-16">
        Your Products
      </h2>

      <form onSubmit={handleProductFilterSubmit} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            placeholder="Filter by Name"
            value={productFilters.name}
            onChange={handleProductFilterChange}
            className="border px-4 py-2 w-full placeholder:text-sm"
          />
          <select
            name="active"
            value={productFilters.active}
            onChange={handleProductFilterChange}
            className="border px-4 py-2 w-full"
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={productFilters.startDate}
            onChange={handleProductFilterChange}
            className="border px-4 py-2 w-full"
          />
          <input
            type="date"
            name="endDate"
            value={productFilters.endDate}
            onChange={handleProductFilterChange}
            className="border px-4 py-2 w-full"
          />
          <select
            name="sortByDate"
            value={productFilters.sortByDate}
            onChange={handleProductFilterChange}
            className="border px-4 py-2 w-full"
          >
            <option value="asc">Sort by earliest</option>
            <option value="desc">Sort by newest</option>
          </select>
          <button type="submit" className="bg-black text-white px-4 text-sm">
            Apply
          </button>
        </div>
      </form>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">You have no products.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              {isEditingProduct === product.id ? (
                <ProductForm
                  product={product}
                  editForm={editProductForm}
                  setEditForm={setEditProductForm}
                  handleUpdateSuccess={handleProductUpdateSuccess}
                  setIsEditing={setIsEditing}
                />
              ) : (
                <ProductCard
                  product={product}
                  onEditClick={() => handleProductEditClick(product)}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsList
