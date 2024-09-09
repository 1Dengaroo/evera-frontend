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
    <>
      <div className="flex justify-between mb-2">
        <h3 className="text-xl font-semibold">Edit Order #{order.id}</h3>
      </div>
      <form>
        <p className="text-gray-600">
          <strong>Status:</strong>{' '}
          <select
            name="status"
            value={editForm.delivery.status}
            onChange={handleInputChange}
            className="border rounded p-1 w-full"
          >
            <option value="manufacturing">Manufacturing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </p>
        <p className="text-gray-600">
          <strong>Tracking Info:</strong>{' '}
          <input
            type="text"
            name="tracking_information"
            value={editForm.delivery.tracking_information || ''}
            onChange={handleInputChange}
            className="border rounded p-1 w-full"
          />
        </p>
        <div className="mt-4">
          <h5 className="font-semibold">Address</h5>
          <p className="text-gray-600">
            <input
              type="text"
              name="name"
              value={editForm.delivery.address.name}
              onChange={handleAddressChange}
              className="border rounded p-1 w-full"
            />
            <br />
            <input
              type="text"
              name="line1"
              value={editForm.delivery.address.line1}
              onChange={handleAddressChange}
              className="border rounded p-1 w-full"
            />
            <br />
            <input
              type="text"
              name="line2"
              value={editForm.delivery.address.line2 || ''}
              onChange={handleAddressChange}
              className="border rounded p-1 w-full"
            />
            <br />
            <input
              type="text"
              name="city"
              value={editForm.delivery.address.city}
              onChange={handleAddressChange}
              className="border rounded p-1 w-full"
            />
            <br />
            <input
              type="text"
              name="state"
              value={editForm.delivery.address.state}
              onChange={handleAddressChange}
              className="border rounded p-1 w-full"
            />
            <br />
            <input
              type="text"
              name="postal_code"
              value={editForm.delivery.address.postal_code}
              onChange={handleAddressChange}
              className="border rounded p-1 w-full"
            />
            <br />
            <input
              type="text"
              name="country"
              value={editForm.delivery.address.country}
              onChange={handleAddressChange}
              className="border rounded p-1 w-full"
            />
          </p>
        </div>
        <ButtonOne
          label="Save Changes"
          onClick={handleSubmit}
          className="mt-4 mr-4 text-sm"
        />
        <UnderlineButton
          label="Cancel"
          onClick={() => setIsEditing(null)}
          className="mt-4 ml-2 text-sm tracking-wide"
        />
      </form>
    </>
  )
}

export default OrderForm
