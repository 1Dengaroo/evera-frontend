import React from 'react'
import { useUpdateOrder } from '../../hooks/Dashboard/useUpdateOrder'
import { OrderFormProps } from '../../types'
import { ButtonOne } from '../Button/ButtonOne'
import { UnderlineButton } from '../Button/UnderlineButton'

const OrderForm: React.FC<OrderFormProps> = ({
  order,
  editForm,
  setEditForm,
  handleUpdateSuccess,
  setIsEditing
}) => {
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

    const updatedOrder = await useUpdateOrder({
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
        <h3 className="text-2xl font-thin text-gray-900">
          Edit Order #{order.id}
        </h3>
      </div>
      <form>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1 font-semibold">
            Status:
          </label>
          <select
            name="status"
            value={editForm.delivery.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
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
            type="text"
            name="tracking_information"
            value={editForm.delivery.tracking_information || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
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
                type="text"
                name={field}
                placeholder={field.replace('_', ' ').toUpperCase()}
                value={editForm.delivery.address[field] || ''}
                onChange={handleAddressChange}
                className="w-full px-4 py-2 border rounded-full text-sm text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <ButtonOne
            label="Save Changes"
            onClick={handleSubmit}
            className="px-6 py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 transition-colors duration-300 rounded-full shadow-md"
          />
          <UnderlineButton
            label="Cancel"
            onClick={() => setIsEditing(null)}
            className="text-sm font-medium text-gray-900 hover:underline transition-all"
          />
        </div>
      </form>
    </div>
  )
}

export default OrderForm
