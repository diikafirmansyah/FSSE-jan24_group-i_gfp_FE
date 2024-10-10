import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/utils/config';
import { TiShoppingCart } from "react-icons/ti";
import { toastAlert } from "@/utils/toastAlert";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${API_URL}/users/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer " + token
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      toastAlert("success", "Logout success!");
      router.push('/');
    } catch (error) {
      console.error("Error fetching products:", error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      router.push('/');
    }
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <nav className="bg-blue-900 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4 md:p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-white rounded-full bg-opacity-40">
            <img 
              src="/assets/logo.png" 
              alt="AquaFish Logo" 
              className="h-12 w-auto transition-transform duration-300 hover:scale-110" 
            />
          </div>
          <div className="text-white text-2xl font-bold">
            <a href="/" className="hover:text-gray-300 transition-colors duration-300">LautLestari</a>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <a href="/dashboard" className="text-white hover:text-gray-300 transition-colors duration-300">Dashboard</a>
          <a href="/marketplace" className="text-white hover:text-gray-300 transition-colors duration-300">Marketplace</a>
          <a href="/about" className="text-white hover:text-gray-300 transition-colors duration-300">About</a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 transition-colors duration-300">
              Logout
            </button>
          ) : (
            <a href="/login" className="text-white hover:text-gray-300 transition-colors duration-300">Login</a>
          )}
          <a href="/cart" className="text-white hover:text-gray-300 transition-colors duration-300 mt-1"><TiShoppingCart size={22} /></a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none transition-transform duration-300 hover:scale-110"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-700`}
      >
        <div className="px-4 py-3 space-y-1">
          <a href="/dashboard" className="block text-white hover:text-gray-300 transition-colors duration-300">Dashboard</a>
          <a href="/cart" className="block text-white hover:text-gray-300 transition-colors duration-300">Cart</a>
          <a href="/marketplace" className="block text-white hover:text-gray-300 transition-colors duration-300">Marketplace</a>
          <a href="/about" className="block text-white hover:text-gray-300 transition-colors duration-300">About</a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-left block text-white hover:text-red-400 transition-colors duration-300">
              Logout
            </button>
          ) : (
            <a href="/login" className="block text-white hover:text-gray-300 transition-colors duration-300">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
