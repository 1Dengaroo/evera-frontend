import React, { useState } from 'react'
import { FilterFormProps } from './types'
import { ButtonOne, UnderlineButton } from '../Button'
import { IoFilterSharp } from 'react-icons/io5'
import { IoClose } from 'react-icons/io5'

export const FilterForm: React.FC<FilterFormProps> = ({
  filters,
  onFilterChange,
  onFilterSubmit,
  fields,
  numberOfItems
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4 border-t pt-8 pb-4">
        <div className="flex space-x-2">
          <IoFilterSharp className="text-xl" />
          <UnderlineButton
            label="FILTER & SORT"
            onClick={toggleSidebar}
            className="text-xs"
          />
        </div>
        {numberOfItems !== 1 ? (
          <p className="text-xs text-gray-600 tracking-wide">
            {numberOfItems} ITEMS
          </p>
        ) : (
          <p className="text-xs text-gray-600 tracking-wide">
            {numberOfItems} ITEM
          </p>
        )}
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-96 bg-white z-50 p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          className="absolute top-6 right-4 text-black text-2xl font-bold"
          onClick={closeSidebar}
        >
          <IoClose />
        </button>

        <h2 className="text-xl font-thin mb-4">Filter & Sort</h2>

        <form onSubmit={onFilterSubmit}>
          <div className="flex flex-col space-y-4">
            {fields.map((field, index) => {
              if (field.type === 'select') {
                return (
                  <select
                    key={index}
                    name={field.name}
                    value={filters[field.name]}
                    onChange={onFilterChange}
                    className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                  >
                    {field.options?.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )
              } else {
                return (
                  <input
                    key={index}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={filters[field.name]}
                    onChange={onFilterChange}
                    className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors placeholder:text-xs"
                  />
                )
              }
            })}
            <ButtonOne
              className="text-sm px-6 py-2 bg-gray-900 text-white tracking-wide rounded-full hover:bg-gray-700 transition-colors duration-300 shadow-md"
              label="VIEW PRODUCTS"
              type="submit"
              onClick={closeSidebar}
            />
          </div>
        </form>
      </div>
    </>
  )
}
