import React, { useState, useEffect } from 'react'
import { Section } from '../components/Section/Section'
import { useGetProducts } from '../hooks/Products/useGetProducts'
import ProductCard from '../components/Product/ProductCard'
import FilterForm from '../components/Filter/FilterForm'
import { Product } from '../types'

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [productFilters, setProductFilters] = useState({
    name: '',
    sort_by: 'created_at',
    sort_direction: 'desc'
  })

  useEffect(() => {
    async function fetchData() {
      const result = await useGetProducts({
        name: productFilters.name || undefined,
        sort_by: productFilters.sort_by as 'price' | 'created_at',
        sort_direction: productFilters.sort_direction as 'asc' | 'desc'
      })
      setProducts(result)
    }
    fetchData()
  }, [])

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
    async function fetchData() {
      const result = await useGetProducts({
        name: productFilters.name || undefined,
        sort_by: productFilters.sort_by as 'price' | 'created_at',
        sort_direction: productFilters.sort_direction as 'asc' | 'desc'
      })
      setProducts(result)
    }
    fetchData()
  }

  return (
    <Section
      title="Discover All Products"
      titleClassName="text-3xl tracking-wide font-thin mt-8 mb-8"
      shortHeight
    >
      <p className="font-light mb-8">SHOP ALL</p>

      <FilterForm
        filters={productFilters}
        onFilterChange={handleProductFilterChange}
        onFilterSubmit={handleProductFilterSubmit}
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
        numberOfItems={products.length}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  )
}

export default Shop
