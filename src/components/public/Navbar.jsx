import React from 'react';
import Logo from '../../assets//logo/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b fixed top-0 w-full font-poppins">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src={Logo} alt="Pintura" className="w-[125px] h-[25px] object-contain" />
        </a>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6 ml-auto mr-20">
          {['Home', 'About', 'Contact', 'Pricing'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-600 hover:text-blue-600 transition duration-300 text-[16px] font-light"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-blue-600 border border-blue-600 rounded hover:bg-blue-100 transition duration-300 px-4 py-2 text-[14px]"
          >
            Login
          </a>
          <a
            href="#"
            className="bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 px-4 py-2 text-[14px]"
          >
            Register
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
