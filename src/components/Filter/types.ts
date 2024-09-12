export interface FilterField {
  name: string
  type: 'text' | 'select' | 'date'
  placeholder?: string
  options?: { value: string; label: string }[]
}

export interface FilterFormProps {
  filters: { [key: string]: string }
  onFilterChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  onFilterSubmit: (e: React.FormEvent) => void
  fields: FilterField[]
  numberOfItems: number
}
