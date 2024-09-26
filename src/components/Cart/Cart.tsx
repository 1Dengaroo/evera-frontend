import React, { useContext } from 'react'
import { useCart } from '../../hooks/useCart'
import { useGetCartItemsDetails } from '../../hooks/API/Cart/useGetCartItemDetails'
import { CartSummary } from './CartSummary'
import { AuthContext } from '../../context/AuthContext'
import { CartItem } from './CartItem'
import { EmptyCartMessage } from './EmptyCartMessage'
import { SignInPrompt } from './SignInPrompt'
import { Divider } from '../Divider'

export const Cart: React.FC = () => {
  const { items } = useCart()
  const { isAuthenticated } = useContext(AuthContext)

  const {
    itemDetails,
    loading: detailsLoading,
    error: detailsError
  } = useGetCartItemsDetails(items)

  if (detailsLoading) {
    return <p className="text-center mt-8">Loading...</p>
  }

  if (detailsError) {
    return (
      <p className="text-center mt-8 text-red-500">Error: {detailsError}</p>
    )
  }

  const total = itemDetails.reduce(
    (sum, item) =>
      sum +
      item.price *
        (items.find((i) => i.id === item.id && i.size === item.size)
          ?.quantity || 0),
    0
  )

  const cartIsValid = itemDetails.every((item) => item.isValid)

  return (
    <div className="py-12">
      <div className="container mx-auto max-w-7xl px-2">
        {items.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] mt-12">
            <div className="flex flex-col bg-white justify-between lg:mr-16 mb-16">
              {!isAuthenticated && (
                <div className="flex flex-col gap-y-4 mb-8">
                  <SignInPrompt />
                  <Divider />
                </div>
              )}
              <h2 className="text-3xl font-medium">Cart</h2>
              {items.map((item) => {
                const details = itemDetails.find(
                  (detail) => detail.id === item.id && detail.size === item.size
                )
                return (
                  <CartItem
                    key={`${item.id}-${item.size}`}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    isValid={details?.isValid}
                    name={item.name}
                    price={details?.price}
                    quantity={item.quantity}
                    size={item.size}
                    validationMessage={details?.validationMessage}
                  />
                )
              })}
            </div>

            {/* Right Side: Summary and Checkout */}
            <div className="">
              <div className="flex flex-col">
                <CartSummary cartIsValid={cartIsValid} total={total} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}
