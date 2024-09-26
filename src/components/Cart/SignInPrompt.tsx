export const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <h1 className="text-xl font-medium">Already have an account?</h1>
        <p className="text-sm text-gray-600 mt-4">
          Sign in for a better experience.
        </p>
      </div>
      <div>
        <a href="/account">
          <button
            className="text-sm font-medium ml-auto bg-gray-50 border rounded-lg px-4 py-2 my-6 hover:bg-gray-100 shadow-sm transition duration-300"
            data-testid="sign-in-button"
            type="button"
          >
            Sign in
          </button>
        </a>
      </div>
    </div>
  )
}
