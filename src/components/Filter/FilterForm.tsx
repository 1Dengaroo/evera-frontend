import React from 'react'

interface FilterField {
  name: string
  type: 'text' | 'select' | 'date'
  placeholder?: string
  options?: { value: string; label: string }[]
}

interface FilterFormProps {
  filters: { [key: string]: string }
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onFilterSubmit: (e: React.FormEvent) => void
  fields: FilterField[]
}

const FilterForm: React.FC<FilterFormProps> = ({
  filters,
  onFilterChange,
  onFilterSubmit,
  fields
}) => {
  return (
    <form onSubmit={onFilterSubmit} className="mb-6">
      <div className="flex space-x-4">
        {fields.map((field, index) => {
          if (field.type === 'select') {
            return (
              <select
                key={index}
                name={field.name}
                value={filters[field.name]}
                onChange={onFilterChange}
                className="border px-4 py-2 w-full"
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
                className="border px-4 py-2 w-full placeholder:text-sm"
              />
            )
          }
        })}
        <button type="submit" className="bg-black text-white px-4 text-sm">
          Apply
        </button>
      </div>
    </form>
  )
}

export default FilterForm
