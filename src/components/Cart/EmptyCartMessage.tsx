import { InteractiveLink } from '../Link'

export const EmptyCartMessage = () => {
  return (
    <div
      className="py-48 px-2 flex flex-col justify-center items-start"
      data-testid="empty-cart-message"
    >
      <h1 className="flex flex-row text-3xl gap-x-2 items-baseline mb-2">
        Cart
      </h1>
      <p className="text-sm mt-4 mb-6 max-w-[32rem]">
        You don&apos;t have anything in your cart. Let&apos;s change that, use
        the link below to start browsing our products.
      </p>
      <div>
        <InteractiveLink href="/shop">Explore products</InteractiveLink>
      </div>
    </div>
  )
}
