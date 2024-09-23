import React, { useState } from 'react'
import { useGetProducts } from '../hooks/Products/useGetProducts'
import { ProductCard } from '../components/Product'
import { FilterForm } from '../components/Filter'
import { LoadingSpinner } from '../components/LoadingSpinner'

const Shop: React.FC = () => {
  const [productFilters, setProductFilters] = useState({
    name: '',
    sort_by: 'created_at',
    sort_direction: 'desc'
  })

  const [submittedFilters, setSubmittedFilters] = useState({
    name: '',
    sort_by: 'created_at',
    sort_direction: 'desc'
  })

  const { products, loading, error } = useGetProducts({
    name: submittedFilters.name || undefined,
    sort_by: submittedFilters.sort_by as 'price' | 'created_at',
    sort_direction: submittedFilters.sort_direction as 'asc' | 'desc'
  })

  const handleProductFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setProductFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }))
  }

  const handleProductFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedFilters({ ...productFilters })
  }

  return (
    <div className="w-full px-8 text-center container mx-auto">
      <h2 className="text-3xl mb-6 font-light tracking-wide mt-16">
        Our Products
      </h2>
      <p className="font-light mb-8">SHOP ALL</p>

      <FilterForm
        fields={[
          { name: 'name', type: 'text', placeholder: 'Filter by name' },
          {
            name: 'sort_by',
            type: 'select',
            options: [
              { value: 'created_at', label: 'Sort by Created Date' },
              { value: 'price', label: 'Sort by Price' }
            ]
          },
          {
            name: 'sort_direction',
            type: 'select',
            options: [
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' }
            ]
          }
        ]}
        filters={productFilters}
        numberOfItems={products.length}
        onFilterChange={handleProductFilterChange}
        onFilterSubmit={handleProductFilterSubmit}
      />

      {loading ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner size={48} />
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Shop
