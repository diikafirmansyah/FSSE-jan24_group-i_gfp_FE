import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <a href="/">AquaFish</a>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="/products" className="text-white hover:text-gray-300">Products</a>
          <a href="/features" className="text-white hover:text-gray-300">Features</a>
          <a href="/marketplace" className="text-white hover:text-gray-300">Marketplace</a>
          <a href="/company" className="text-white hover:text-gray-300">Company</a>
          <a href="/login" className="text-white hover:text-gray-300">Login</a>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="/products" className="block text-white hover:text-gray-300">Products</a>
          <a href="/features" className="block text-white hover:text-gray-300">Features</a>
          <a href="/marketplace" className="block text-white hover:text-gray-300">Marketplace</a>
          <a href="/company" className="block text-white hover:text-gray-300">Company</a>
          <a href="/login" className="block text-white hover:text-gray-300">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
