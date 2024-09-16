import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetProducts } from '../../hooks/Dashboard/useGetProducts'
import { ProductCard } from '../Product'
import { FilterForm } from '../Filter'
import { LoadingSpinner } from '../LoadingSpinner'

export const ProductsList: React.FC = () => {
  const [productFilters, setProductFilters] = useState({
    name: '',
    active: '',
    startDate: '',
    endDate: '',
    sortByDate: 'desc'
  })
  const navigate = useNavigate()
  const { products, fetchProducts, loading, error } = useGetProducts()

  useEffect(() => {
    const { name, active, sortByDate } = productFilters
    fetchProducts({
      name,
      active: active ? active === 'true' : undefined,
      sortByDate
    })
  }, [])

  const handleProductFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setProductFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
  }

  const handleProductFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, active, startDate, endDate, sortByDate } = productFilters
    fetchProducts({
      name,
      active: active ? active === 'true' : undefined,
      startDate,
      endDate,
      sortByDate
    })
  }

  const handleProductEditClick = (productId: string) => {
    navigate(`/dashboard/products/edit/${productId}`)
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl text-center mb-6 font-thin tracking-wide mt-16">
        Your Products
      </h2>

      <FilterForm
        fields={[
          { name: 'name', type: 'text', placeholder: 'Filter by Name' },
          {
            name: 'active',
            type: 'select',
            options: [
              { value: '', label: 'All' },
              { value: 'true', label: 'Active' },
              { value: 'false', label: 'Inactive' }
            ]
          },
          { name: 'startDate', type: 'date' },
          { name: 'endDate', type: 'date' },
          {
            name: 'sortByDate',
            type: 'select',
            options: [
              { value: 'asc', label: 'Sort by earliest' },
              { value: 'desc', label: 'Sort by newest' }
            ]
          }
        ]}
        filters={productFilters}
        numberOfItems={products.length}
        onFilterChange={handleProductFilterChange}
        onFilterSubmit={handleProductFilterSubmit}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600">You have no products</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              onEditClick={() => handleProductEditClick(product.id)}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  )
}
