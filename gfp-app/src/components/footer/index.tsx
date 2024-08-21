import React from 'react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">AquaFish</h2>
            <p className="mb-4">High-quality fish and aquatic supplies</p>
            <form className="flex flex-col">
              <label htmlFor="email" className="mb-2">Subscribe to our newsletter</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="p-2 mb-4 rounded text-black"
              />
              <button type="submit" className="bg-blue-700 hover:bg-blue-600 py-2 rounded">
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="/shop" className="hover:text-gray-300">Shop</a></li>
              <li className="mb-2"><a href="/about" className="hover:text-gray-300">About Us</a></li>
              <li className="mb-2"><a href="/contact" className="hover:text-gray-300">Contact</a></li>
              <li className="mb-2"><a href="/faq" className="hover:text-gray-300">FAQ</a></li>
              <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li className="mb-2">Email: info@aquafish.com</li>
              <li className="mb-2">Phone: +123-456-7890</li>
              <li className="mb-2">Address: 123 Aquatic Ave, Water City</li>
            </ul>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              {isClient ? 
              <div className="flex space-x-4">
                  <a href="https://www.instagram.com/"target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'instagram']} className="hover:text-gray-400" />
                  </a>
                  <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'facebook-f']} className="hover:text-gray-400" />
                  </a>
                  <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'twitter']} className="hover:text-gray-400" />
                  </a>
              </div> : <div></div>
              }
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center md:text-left">
          <p>&copy; {new Date().getFullYear()} Aquafish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
