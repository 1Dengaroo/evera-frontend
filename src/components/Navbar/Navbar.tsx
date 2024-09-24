import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

import SideMenu from './SideMenu'

export const Navbar = () => {
  const { getCartSize } = useContext(CartContext)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 border-b duration-200 bg-white border-ui-border-base">
        <nav className="container mx-auto text-xs flex items-center justify-between w-full h-full px-8">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu />
            </div>
          </div>

          <div className="flex items-center h-full">
            <a
              className="uppercase text-lg hover:text-ui-fg-base font-serif tracking-widest"
              data-testid="nav-store-link"
              href="/"
            >
              Evera
            </a>
          </div>
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && (
                <a className="hover:text-ui-fg-base" href="/search">
                  Search
                </a>
              )}
            </div>
            <a
              className="hover:text-ui-fg-base hidden md:block"
              href="/account"
            >
              Account
            </a>
            <a className="hover:text-ui-fg-base flex gap-2" href="/cart">
              Cart ({getCartSize()})
            </a>
          </div>
        </nav>
      </header>
    </div>
  )
}
