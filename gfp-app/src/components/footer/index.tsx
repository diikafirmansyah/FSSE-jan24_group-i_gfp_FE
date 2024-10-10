import React from 'react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_URL } from '@/utils/config';
import { toastAlert } from '@/utils/toastAlert';

const Footer: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState<string>("");
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    const formData = new URLSearchParams();
    formData.append("email", email);

    const response = await fetch(`${API_URL}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });
    
    try {
      if (!response.ok) {
        toastAlert("error", "Subscribe Failed!");
      } else {
        toastAlert("info", "Thank you for subscribing!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">LautLestari</h2>
            <p className="mb-4">High-quality fish and aquatic supplies</p>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2">Subscribe to our newsletter</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={onChangeEmail}
                className="p-2 mb-4 rounded text-black"
              />
              <button onClick={handleSubmit} className="bg-blue-700 hover:bg-blue-600 py-2 rounded">
                Subscribe
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><a href="/marketplace" className="hover:text-gray-300">MarketPlace</a></li>
              <li className="mb-2"><a href="/about" className="hover:text-gray-300">About Us</a></li>
              <li className="mb-2"><a href="/ourteam" className="hover:text-gray-300">Meet Our Team</a></li>
              <li className="mb-2"><a href="/faq" className="hover:text-gray-300">FAQ</a></li>
              <li><a href="/blog" className="hover:text-gray-300">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li className="mb-2">Email: info@lautlestari.com</li>
              <li className="mb-2">Phone: +123-456-7890</li>
              <li className="mb-2">Address: 123 Aquatic Ave, Water City</li>
            </ul>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
              {isClient ? (
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "instagram"]}
                      className="hover:text-gray-400"
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "facebook-f"]}
                      className="hover:text-gray-400"
                    />
                  </a>
                  <a
                    href="https://www.twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon
                      icon={["fab", "twitter"]}
                      className="hover:text-gray-400"
                    />
                  </a>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center md:text-left">
          <p>
            &copy; {new Date().getFullYear()} LautLestari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
