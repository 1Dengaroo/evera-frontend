import React, { useEffect, useState } from 'react'
import { useGetProducts } from '../../hooks/Dashboard/useGetProducts'
import { Product } from '../../types'
import ProductCard from '../Card/ProductCard'
import ProductForm from './ProductEditForm'
import FilterForm from '../Filter/FilterForm'

const ProductsList: React.FC = () => {
  const [isEditingProduct, setIsEditingProduct] = useState<string | null>(null)
  const [editProductForm, setEditProductForm] = useState<any>({})
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

  const handleProductUpdateSuccess = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    )
    setIsEditingProduct(null)
  }

  const handleProductEditClick = (product: Product) => {
    setIsEditingProduct(product.id)
    setEditProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      active: product.active,
      product_type: product.product_type,
      quantity: product.quantity || 9999,
      cover_image: product.cover_image,
      sub_images: product.sub_images || [],
      sizes: product.sizes || []
    })
  }

  return (
    <div>
      <h2 className="text-3xl text-center mb-6 font-thin tracking-wide mt-16">
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
      />

      {products.length === 0 ? (
        <p className="text-center text-gray-600">You have no products.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              {isEditingProduct === product.id ? (
                <ProductForm
                  product={product}
                  editForm={editProductForm}
                  setEditForm={setEditProductForm}
                  handleUpdateSuccess={handleProductUpdateSuccess}
                  setIsEditing={setIsEditingProduct}
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
