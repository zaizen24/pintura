import DOMPurify from 'dompurify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // For navigating after login

  // Sanitize input values
  const handleInputChange = (e, setValue) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value);
    setValue(sanitizedValue);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and password are required');
      return;
    }

    const userData = {
      email,
      password,
      rememberMe,
    };

    try {
      console.log('Sending login request to server...');
      const response = await fetch('https://localhost:5000/api/auth/login', { // Ensure this is the correct endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token); // Save the token in localStorage
        navigate('/dashboard'); // Navigate to dashboard after login
      } else {
        console.error('Login error:', data);
        setErrorMessage('wrong email or password');
      }
    } catch (error) {
      console.error('Something went wrong:', error);
      setErrorMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="bg-white flex items-center justify-center min-h-screen font-poppins">
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
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-6">
            Enter your email and password below to log into your account.
          </p>

          {errorMessage && <p className="text-red-600 text-center mb-4">{errorMessage}</p>}

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

            <div className="flex items-center">
              <input
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="ml-2 block text-sm text-gray-900">Remember Me</label>
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

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
