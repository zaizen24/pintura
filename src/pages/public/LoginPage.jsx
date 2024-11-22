import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login Page';
    // ... (kode meta header tetap sama seperti sebelumnya)
  }, []);

  const handleInputChange = (e, setValue) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setValue(sanitizedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Login berhasil');
      navigate('/dashboard'); // Arahkan ke /dashboard
    } else {
      console.log('Email dan password harus diisi');
    }
  };

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
          <Link
            to="/"
            className="flex items-center bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 px-4 py-2 text-[14px] w-20 mb-6"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </Link>
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-6">
            Enter your email and password below to log into your account.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => handleInputChange(e, setEmail)}
                />
              </div>
            </div>
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
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                />
                <label className="ml-2 block text-sm text-gray-900" htmlFor="remember_me">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link className="font-medium text-blue-600 hover:text-blue-500" to="/forgotpassword">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                type="submit"
              >
                Login
              </button>
            </div>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                type="button"
              >
                <img
                  alt="Google logo"
                  className="mr-2"
                  height="20"
                  src="https://storage.googleapis.com/a1aa/image/LOfhfkIf76RfRQrNLdP2ixLvUfPUomGZr3XSlyQmfUcrLeg5JA.jpg"
                  width="20"
                />
                Sign In With Google
              </button>
            </div>
            <button
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              type="submit"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </body>
  );
};

export default LoginPage;
