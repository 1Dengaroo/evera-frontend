export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 w-full h-96 py-12">
      <div className="container mx-auto px-4 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-6 sm:flex-row items-start justify-between py-10">
          <div>
            <a
              href="/"
              className="text-xl font-light tracking-wider hover:text-gray-900 uppercase"
            >
              Evera Store
            </a>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 text-sm text-gray-600">
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-gray-900">Evera</span>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/account"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-gray-900"
                  >
                    Account
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-8">
          <p>© {new Date().getFullYear()} Evera Corp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
