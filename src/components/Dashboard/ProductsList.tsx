import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetProducts } from '../../hooks/Dashboard/useGetProducts'
import { Product } from '../../types'
import ProductCard from '../Card/ProductCard'
import FilterForm from '../Filter/FilterForm'

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [productFilters, setProductFilters] = useState({
    name: '',
    active: '',
    startDate: '',
    endDate: '',
    sortByDate: 'desc'
  })
  const navigate = useNavigate()

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

  const handleProductEditClick = (productId: string) => {
    navigate(`/dashboard/products/edit/${productId}`)
  }

  return (
    <div>
      <h2 className="text-3xl text-center mb-6 font-thin tracking-wide mt-8">
        Your Products
      </h2>

      <FilterForm
        filters={productFilters}
        onFilterChange={handleProductFilterChange}
        onFilterSubmit={handleProductFilterSubmit}
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
        numberOfItems={products.length}
      />

      {products.length === 0 ? (
        <p className="text-center text-gray-600">You have no products.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEditClick={() => handleProductEditClick(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsList
