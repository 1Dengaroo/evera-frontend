import React from 'react'
import { useUpdateOrder } from '../../hooks/API/Dashboard/useUpdateOrder'
import { OrderFormProps } from './types'
import { ButtonOne, UnderlineButton } from '../Button'

export const OrderForm: React.FC<OrderFormProps> = ({
  order,
  editForm,
  setEditForm,
  handleUpdateSuccess,
  setIsEditing
}) => {
  const { updateOrder, loading, error } = useUpdateOrder()

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setEditForm((prev: any) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        [name]: value
      }
    }))
  }

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setEditForm((prev: any) => ({
      ...prev,
      delivery: {
        ...prev.delivery,
        address: {
          ...prev.delivery.address,
          [name]: value
        }
      }
    }))
  }

  const handleSubmit = async () => {
    const { delivery } = editForm

    const updatedOrder = await updateOrder({
      orderId: order.id,
      delivery_attributes: {
        status: delivery.status,
        tracking_information: delivery.tracking_information,
        address_attributes: {
          name: delivery.address.name,
          line1: delivery.address.line1,
          line2: delivery.address.line2,
          city: delivery.address.city,
          state: delivery.address.state,
          postal_code: delivery.address.postal_code,
          country: delivery.address.country
        }
      }
    })

    if (updatedOrder) {
      handleUpdateSuccess(updatedOrder)
    } else {
      console.error('Failed to update order')
    }
  }

  return (
    <div className="mb-4 border rounded-3xl p-10 shadow-lg bg-white space-y-6 max-w-4xl mx-auto transition-all duration-500 hover:shadow-2xl">
      <div className="flex justify-between items-center border-b pb-6 border-gray-300">
        <h3 className="text-2xl font-light text-gray-900">
          Edit Order #{order.id}
        </h3>
      </div>
      <form>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1 font-semibold">
            Status:
          </label>
          <select
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            name="status"
            onChange={handleInputChange}
            value={editForm.delivery.status}
          >
            <option value="manufacturing">Manufacturing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1 font-semibold">
            Tracking Information:
          </label>
          <input
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            name="tracking_information"
            onChange={handleInputChange}
            type="text"
            value={editForm.delivery.tracking_information || ''}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1 font-semibold">
            Address:
          </label>
          {[
            'name',
            'line1',
            'line2',
            'city',
            'state',
            'postal_code',
            'country'
          ].map((field) => (
            <div key={field} className="mb-4">
              <input
                className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
                name={field}
                onChange={handleAddressChange}
                placeholder={field.replace('_', ' ').toUpperCase()}
                type="text"
                value={editForm.delivery.address[field] || ''}
              />
            </div>
          ))}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end space-x-4">
          <ButtonOne
            disabled={loading}
            label={loading ? 'Saving...' : 'Save Changes'}
            onClick={handleSubmit}
          />
          <UnderlineButton
            className="text-sm font-medium text-gray-900 hover:underline transition-all"
            label="Cancel"
            onClick={() => setIsEditing(null)}
          />
        </div>
      </form>
    </div>
  )
}
