import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Menambahkan header keamanan saat komponen dimuat
  useEffect(() => {
    document.title = 'Login Page'; // Menambahkan judul halaman

    // Menambahkan Content-Security-Policy (CSP) header
    const metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = 'Content-Security-Policy';
    metaCSP.content = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https: data:;";
    document.head.appendChild(metaCSP);

    // Menambahkan X-Frame-Options header
    const metaFrameOptions = document.createElement('meta');
    metaFrameOptions.httpEquiv = 'X-Frame-Options';
    metaFrameOptions.content = 'DENY';
    document.head.appendChild(metaFrameOptions);

    // Menambahkan X-Content-Type-Options header
    const metaContentTypeOptions = document.createElement('meta');
    metaContentTypeOptions.httpEquiv = 'X-Content-Type-Options';
    metaContentTypeOptions.content = 'nosniff';
    document.head.appendChild(metaContentTypeOptions);

    // Menambahkan Referrer-Policy header
    const metaReferrerPolicy = document.createElement('meta');
    metaReferrerPolicy.httpEquiv = 'Referrer-Policy';
    metaReferrerPolicy.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(metaReferrerPolicy);

    // Membersihkan header tambahan ketika komponen dilepas
    return () => {
      document.head.removeChild(metaCSP);
      document.head.removeChild(metaFrameOptions);
      document.head.removeChild(metaContentTypeOptions);
      document.head.removeChild(metaReferrerPolicy);
    };
  }, []);

  // Fungsi untuk menangani input pengguna
  const handleInputChange = (e, setValue) => {
    const sanitizedValue = DOMPurify.sanitize(e.target.value); // Sanitasi input pengguna
    setValue(sanitizedValue);
  };

  // Fungsi untuk menangani submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Lakukan pemrosesan lebih lanjut, seperti mengirim data ke server
  };

  return (
    <body class="bg-white flex items-center justify-center min-h-screen">
    <div class="flex w-full max-w-4xl">
   <div class="w-1/2 flex items-center justify-center">
    <img alt="Illustration of a person walking" class="w-3/4" height="400" src="https://storage.googleapis.com/a1aa/image/xPFFXov0GtqZK1cC9awwAQ4CK7rpak6OfZJjQP2utL0X8g5JA.jpg" width="400"/>
   </div>
   <div class="w-1/2 flex flex-col justify-center p-8">
    <Link to="/"
    class="flex items-center bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 px-4 py-2 text-[14px] w-20 mb-6">
     <i class="fas fa-arrow-left mr-2">
     </i>
     Back
    </Link>
    <h1 class="text-4xl font-bold text-blue-700 mb-2">
     Welcome Back
    </h1>
    <p class="text-gray-600 mb-6">
     Enter your email and password below to log into your account.
    </p>
    <form class="space-y-4">
     <div>
      <label class="block text-sm font-medium text-gray-700">
       Email
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
       <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i class="fas fa-envelope text-gray-400">
        </i>
       </div>
       <input class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Email" type="email"/>
      </div>
     </div>
     <div>
      <label class="block text-sm font-medium text-gray-700">
       Password
      </label>
      <div class="mt-1 relative rounded-md shadow-sm">
       <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i class="fas fa-lock text-gray-400">
        </i>
       </div>
       <input class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Password" type="password"/>
      </div>
     </div>
     <div class="flex items-center justify-between">
      <div class="flex items-center">
       <input class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" id="remember_me" name="remember_me" type="checkbox"/>
       <label class="ml-2 block text-sm text-gray-900" for="remember_me">
        Remember me
       </label>
      </div>
      <div class="text-sm">
       <a class="font-medium text-blue-600 hover:text-blue-500" href="#">
        Forgot Password?
       </a>
      </div>
     </div>
     <div>
      <button class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="submit">
       Login
      </button>
     </div>
     <div class="relative my-4">
      <div class="absolute inset-0 flex items-center">
       <div class="w-full border-t border-gray-300">
       </div>
      </div>
      <div class="relative flex justify-center text-sm">
       <span class="px-2 bg-white text-gray-500">
        Or
       </span>
      </div>
     </div>
     <div>
      <button class="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50" type="button">
       <img alt="Google logo" class="mr-2" height="20" src="https://storage.googleapis.com/a1aa/image/LOfhfkIf76RfRQrNLdP2ixLvUfPUomGZr3XSlyQmfUcrLeg5JA.jpg" width="20"/>
       Sign In With Google
      </button>
     </div>
    </form>
    <p class="mt-4 text-center text-sm text-gray-600">
     Haven't an Account?
     <a class="font-medium text-blue-600 hover:text-blue-500" href="#">
      Register Now.
     </a>
    </p>
   </div>
  </div>
  </body>
  )
}

export default LoginPage;
