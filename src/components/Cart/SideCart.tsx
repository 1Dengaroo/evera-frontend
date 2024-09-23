import React, { useContext } from 'react'
import { useCart } from '../../hooks/useCart'
import { CartItem } from './CartItem'
import { useNavigate } from 'react-router-dom'
import { useGetCartItemsDetails } from '../../hooks/API/Cart/useGetCartItemDetails'
import { AuthContext } from '../../context/AuthContext'
import { ButtonOne, UnderlineButton } from '../Button'
import { LoadingSpinner } from '../LoadingSpinner'

export const SideCart: React.FC = () => {
  const { items, showSideCart, hideSideCartView } = useCart()
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AuthContext)

  const {
    itemDetails,
    loading: detailsLoading,
    error: detailsError
  } = useGetCartItemsDetails(items)

  const total = itemDetails.reduce((sum, detail) => {
    const item = items.find((i) => i.id === detail.id && i.size === detail.size)
    const quantity = item ? item.quantity : 0
    return sum + detail.price * quantity
  }, 0)

  const cartIsValid = itemDetails.every((detail) => detail.isValid)

  return (
    <>
      {showSideCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={hideSideCartView}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-screen md:w-116 w-96 bg-white shadow-lg p-4 pb-36 z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          showSideCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 text-black text-2xl font-bold font-light"
          onClick={hideSideCartView}
        >
          &times;
        </button>

        <h2 className="text-xl font-normal tracking-widest">Your Cart</h2>

        {detailsLoading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : detailsError ? (
          <p className="text-center text-red-500">Error loading cart details</p>
        ) : items.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          items.map((item) => {
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
                showMobileLayout={true}
                size={item.size}
                validationMessage={details?.validationMessage}
              />
            )
          })
        )}

        {!detailsLoading && !detailsError && items.length > 0 && (
          <>
            <p className="text-right mt-4 pr-10">
              Total: ${(total / 100).toFixed(2)}
            </p>

            {cartIsValid && (
              <div className="w-full flex flex-col items-center">
                {!isAuthenticated ? (
                  <>
                    <ButtonOne
                      className="mt-6"
                      label="Login and track your order"
                      onClick={() => {
                        hideSideCartView()
                        navigate('/login')
                      }}
                    />
                    <UnderlineButton
                      className="text-sm mt-4 hover:underline"
                      label="Checkout as guest"
                      onClick={() => {
                        hideSideCartView()
                        navigate('/checkout')
                      }}
                    />
                  </>
                ) : (
                  <ButtonOne
                    className="mt-6"
                    label="Checkout"
                    onClick={() => {
                      hideSideCartView()
                      navigate('/checkout')
                    }}
                  />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
