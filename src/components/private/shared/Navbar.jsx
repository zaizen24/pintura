import React from 'react';

const Navbar = () => {
  return (
    <div>
      {/* Navbar Section */}
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-blue-600">PINTUR</div>
          <div className="ml-2 w-4 h-4 bg-blue-600"></div>
        </div>
        <div className="flex items-center flex-grow mx-4">
          <input
            type="text"
            placeholder="Type a command or search..."
            className="w-full p-2 rounded-full bg-gray-100 text-gray-500"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-blue-600">
            <i className="fas fa-circle"></i>
            <span className="ml-1">95 Credits</span>
          </div>
          <i className="fas fa-bell text-blue-600"></i>
          <img
            src="https://placehold.co/40x40"
            alt="User profile picture"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      {/* Navigation Section */}
      <div className="flex items-center space-x-8 p-4 bg-white">
        <div className="p-2 bg-gray-100 rounded text-blue-600">Home</div>
        <div className="text-gray-500">My Courses</div>
        <div className="text-gray-500">Workshop</div>
        <div className="text-gray-500">Community</div>
        <div className="text-gray-500">Settings</div>
      </div>
    </div>
  );
};

export default Navbar;
