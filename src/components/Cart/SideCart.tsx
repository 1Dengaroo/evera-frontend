import React, { useState, useEffect, useContext } from 'react'
import { useCart } from '../../hooks/Cart/useCart'
import { CartItem } from './CartItem'
import { useNavigate } from 'react-router-dom'
import { useValidateCart } from '../../hooks/Products/useValidateCart'
import { useGetCartTotal } from '../../hooks/Products/useGetCartTotal'
import { AuthContext } from '../../context/AuthContext'

export const SideCart: React.FC = () => {
  const { items, showSideCart, hideSideCartView } = useCart()
  const navigate = useNavigate()
  const [total, setTotal] = useState<number>(0)
  const { isAuthenticated } = useContext(AuthContext)
  const [cartIsValid, setCartIsValid] = useState<boolean>(false)

  useEffect(() => {
    const fetchTotal = async () => {
      const total = await useGetCartTotal(items)
      setTotal(total || 0)
    }

    const validateCart = async () => {
      const { valid } = await useValidateCart(items)
      !valid ? setCartIsValid(false) : setCartIsValid(true)
    }

    validateCart()
    fetchTotal()
  }, [items])

  return (
    <>
      {showSideCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={hideSideCartView}
        ></div>
      )}

      <div
        className={`fixed top-16 right-0 h-screen md:w-116 w-96 bg-white shadow-lg p-4 pb-36 z-20 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          showSideCart ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <button
          className="absolute top-4 right-4 text-black text-2xl font-bold font-thin"
          onClick={hideSideCartView}
        >
          &times;
        </button>

        <h2 className="text-xl font-normal tracking-widest">Your Cart</h2>

        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              size={item.size}
              quantity={item.quantity}
              imageUrl={item.imageUrl}
              showMobileLayout={true}
            />
          ))
        )}

        {items.length > 0 && (
          <>
            <p className="text-right mt-4 pr-10">
              Total: ${(total / 100).toFixed(2)}
            </p>

            {!isAuthenticated ? (
              <>
                {cartIsValid && (
                  <div className="w-full flex flex-col items-center">
                    <button
                      className="bg-black text-white font-serif py-2 px-4 mt-8"
                      onClick={() => {
                        hideSideCartView()
                        navigate('/login')
                      }}
                    >
                      Login to Checkout
                    </button>
                    <div
                      className="text-center mt-4 hover:underline cursor-pointer"
                      onClick={() => {
                        hideSideCartView()
                        navigate('/checkout')
                      }}
                    >
                      Checkout as guest
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {cartIsValid && (
                  <button
                    className="bg-black text-white py-2 px-4 mt-4 w-full"
                    onClick={() => {
                      hideSideCartView()
                      navigate('/checkout')
                    }}
                  >
                    Checkout
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
