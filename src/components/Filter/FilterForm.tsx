import React from 'react'
import { FilterFormProps } from './types'
import { ButtonOne } from '../Button/ButtonOne'

const FilterForm: React.FC<FilterFormProps> = ({
  filters,
  onFilterChange,
  onFilterSubmit,
  fields
}) => {
  return (
    <form onSubmit={onFilterSubmit} className="mb-4">
      <div className="flex space-x-2 items-center">
        {fields.map((field, index) => {
          if (field.type === 'select') {
            return (
              <select
                key={index}
                name={field.name}
                value={filters[field.name]}
                onChange={onFilterChange}
                className="border px-2 py-1 text-sm w-full"
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
                className="border px-2 py-1 text-sm w-full placeholder:text-xs"
              />
            )
          }
        })}
        <ButtonOne className="text-xs rounded" label="Apply" type="submit" />
      </div>
    </form>
  )
}

export default FilterForm
