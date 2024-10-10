import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faShoppingCart,
  faBoxOpen,
  faSignOutAlt,
  faHome,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import useAuth from '@/middleware/auth';
import { API_URL } from '@/utils/config';
import { toastAlert } from '@/utils/toastAlert';

const Dashboard: React.FC = () => {
  useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await fetch(`${API_URL}/users/me`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer " + token
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const userData = await response.json();
          setRole(userData.role);
          setUserData(userData.username);
          localStorage.setItem('role', userData.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    }
    fetchUserRole();
  }, [])

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogoutClick = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const response = await fetch(`${API_URL}/users/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      toastAlert("success", "Logout Success!");
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('role');
      router.push('/');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('./assets/bg-register.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 text-center mb-10 px-4 sm:px-8 lg:px-16">
        <motion.h1
          className="text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome to LautLestari, {userData || 'Guest'}!
        </motion.h1>
        <p className="text-lg text-gray-200">
          Explore and manage your aquarium experience with ease. Navigate through our marketplace, manage your cart, and more.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 mb-10">
        <div className="flex items-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 mr-4">
            <FontAwesomeIcon icon={faUserCircle} size="3x" className="text-gray-600" />
          </div>
          <div>
            {userData ? (
              <>
                <h2 className="text-2xl font-semibold text-gray-800">Hello, {userData}!</h2>
                <p className="text-gray-600">User Role: {role}</p>
              </>
            ) : (
              <p className="text-gray-600">Loading user data...</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
            onClick={() => handleNavigation('/marketplace')}
          >
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Go to Marketplace
          </button>
          <button
            className="w-full flex items-center justify-center px-4 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
            onClick={() => handleNavigation('/cart')}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
            View Cart
          </button>
          {role === 'seller' && (
            <>
              <button
                className="w-full flex items-center justify-center px-4 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none"
                onClick={() => handleNavigation('/add_product')}
              >
                <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
                Add Product
              </button>
              <button
                className="w-full flex items-center justify-center px-4 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 focus:outline-none"
                onClick={() => handleNavigation('/seller')}
              >
                <FontAwesomeIcon icon={faBoxOpen} className="mr-2" />
                Seller Dashboard
              </button>
              <button
                className="w-full flex items-center justify-center px-4 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 focus:outline-none"
                onClick={() => handleNavigation('/confirm')}
              >
                <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                Confirmation
              </button>
            </>
          )}
          <button
            className="w-full flex items-center justify-center px-4 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none"
            onClick={handleLogoutClick}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </div>
      </div>

      <footer className="relative z-10 w-full max-w-lg mx-auto text-center text-gray-400 mt-10">
        <p className="text-sm">&copy; 2024 LautLestari. All rights reserved.</p>
        <p className="text-sm">
          <a href="/terms" className="text-blue-300 hover:underline">
            Terms of Service
          </a>{' '}
          |{' '}
          <a href="/privacy" className="text-blue-300 hover:underline">
            Privacy Policy
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
