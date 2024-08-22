import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import CartCard from "../../components/CartCard";
import { API_URL } from "@/config";
import useAuth from "@/middleware/auth";

interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  qty: number;
  price: number;
  description: string;
}

const Cart: React.FC = () => {
  useAuth();
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCarts = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`${API_URL}/carts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setCartItems(result.cart_items || []);
      } catch (error) {
        console.error("Error fetching carts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex justify-center items-center h-[calc(100vh-6rem)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 m-10 2xl:m-20 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 p-6 border-b border-gray-300 w-full text-center">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 py-8">Your cart is empty.</p>
      ) : (
        <ul className="p-6 w-full md:w-4/5 lg:w-3/5">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="bg-white border border-gray-300 rounded-lg shadow-md mb-4 p-4 flex items-center gap-4"
            >
              <div className="flex-1">
                <CartCard cart_items={item} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
