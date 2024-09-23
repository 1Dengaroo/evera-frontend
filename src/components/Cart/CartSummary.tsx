import React, { useContext } from 'react'
import { ButtonOne, UnderlineButton } from '../Button'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { Divider } from '../Divider'

type SummaryProps = {
  total: number
  cartIsValid: boolean
}

export const CartSummary: React.FC<SummaryProps> = ({ total, cartIsValid }) => {
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="text-3xl font-medium mb-4">Summary</h2>
      <Divider />
      <div className="flex flex-col gap-y-4 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>${(total / 100).toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p>$0.00</p>
        </div>
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>$0.00</p>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between">
        <p className="font-bold">Total</p>
        <p className="font-bold">${(total / 100).toFixed(2)}</p>
      </div>

      {cartIsValid && (
        <div className="w-full flex flex-col items-center mt-8">
          {!isAuthenticated ? (
            <>
              <ButtonOne
                label="Login and track your order"
                onClick={() => navigate('/login')}
              />
              <UnderlineButton
                className="text-sm mt-4 hover:underline transition-all"
                label="Checkout as guest"
                onClick={() => navigate('/checkout')}
              />
            </>
          ) : (
            <ButtonOne
              className="w-full"
              label="Checkout"
              onClick={() => navigate('/checkout')}
            />
          )}
        </div>
      )}
    </div>
  )
}
