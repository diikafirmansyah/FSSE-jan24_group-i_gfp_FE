// pages/index.tsx
import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';

import CartCard from '../../components/CartCard';

interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  qty: number;
  price: number;
  description: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarts = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch("http://127.0.0.1:5000/carts", {
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
        setCartItems(result.cart_items || []);
        
      } catch (error) {
        console.error("Error fetching carts:", error);
      }
    };

    fetchCarts();
  }, []);


if (loading) return <Loading />;
if (error) return <p>{error}</p>;

  return (
    <div className='flex flex-col items-center'>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ): (
        <ul>
          {cartItems.map(item => (
            <CartCard key={item.id} cart_items={item} />
            
          ))}
        </ul>
      )}
    </div>
    
  );
};

export default Cart;
