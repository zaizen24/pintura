import React from 'react'
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <body className="bg-white flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-4xl">
        <div className="w-1/2 flex items-center justify-center">
          <img
            alt="Illustration of a person walking"
            className="w-3/4"
            height="400"
            src="https://storage.googleapis.com/a1aa/image/xPFFXov0GtqZK1cC9awwAQ4CK7rpak6OfZJjQP2utL0X8g5JA.jpg"
            width="400"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center p-8">
          <Link to="/"
           className="flex items-center bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 px-4 py-2 text-[14px] w-20 mb-6">
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </Link>
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Register</h1>
          <p className="text-gray-600 mb-6">
            Fill out the form below to create your account.
          </p>
          <form className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-gray-400"></i>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Username"
                  type="text"
                />
              </div>
            </div>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Email"
                  type="email"
                />
              </div>
            </div>
            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Password"
                  type="password"
                />
              </div>
            </div>
            {/* Password Confirmation Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm Password"
                  type="password"
                />
              </div>
            </div>
            {/* Submit Button */}
            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            Have an Account?{' '}
            <a className="font-medium text-blue-600 hover:text-blue-500" href="#">
              Sign in Now.
            </a>
          </p>
        </div>
      </div>
    </body>
  )
}

export default RegisterPage
