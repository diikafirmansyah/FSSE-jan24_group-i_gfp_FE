import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import CartCard from "../../components/CartCard";
import { API_URL } from "@/utils/config";
import useAuth from "@/middleware/auth";

interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  qty: number;
  price: number;
  description: string;
  image: string;
  seller: string;
  contact_phone: string; 
}

const ITEMS_PER_PAGE = 4;

const Cart: React.FC = () => {
  useAuth();

  const [currentPage, setCurrentPage] = useState<number>(1);
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

  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE);
  const paginatedCartItems = cartItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex justify-center items-center h-[calc(100vh-6rem)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-12 lg:px-32">
      <h1 className="text-4xl font-extrabold text-black text-center mb-10">
        Your Cart
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
        {paginatedCartItems.length > 0 ? (
          paginatedCartItems.map((item) => (
            <div className="flex-1">
              <CartCard key={item.id} cart_items={item} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {paginatedCartItems.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="min-w-[100px] px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <span className="text-gray-600">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="min-w-[100px] px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
      )} 
    </div>
  );
};

export default Cart;
