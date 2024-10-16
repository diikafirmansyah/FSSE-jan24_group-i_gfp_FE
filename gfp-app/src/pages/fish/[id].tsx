import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaFish } from "react-icons/fa";
import { AiOutlineTag } from "react-icons/ai";
import { BiRuler } from "react-icons/bi";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import useAuth from "@/middleware/auth";
import { addToCart } from "../../utils/api/carts";
import { API_URL } from "@/utils/config";
import { toastAlert } from "@/utils/toastAlert";

const nationalityMap: { [key: string]: string } = {
  usa: "us",
  unitedstates: "us",
  uk: "gb",
  england: "gb",
  france: "fr",
  japan: "jp",
  indonesia: "id",
  india: "in",
};

interface Product {
  id: number;
  user_id: number;
  seller: string;
  image: string | null;
  price: number;
  qty: number;
  description: string;
  category: string;
  location: string;
  created_at: string;
  updated_at: string | null;
  nationality: string;
  size: string;
}

const FishDetail: React.FC = () => {
  useAuth();
  const router = useRouter();
  const { id } = router.query;

  const [quantity, setQuantity] = useState<number>(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; 

    const fetchProduct = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`${API_URL}/products/${id}`, {
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
        setProduct(result || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex justify-center items-center h-[calc(100vh-6rem)]">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  const nationality = product.nationality
    ? product.nationality.toLowerCase()
    : "";
  const isoCode = nationalityMap[nationality] || "";
  const flagUrl = isoCode ? `https://flagcdn.com/w40/${isoCode}.png` : null;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, Math.min(Number(e.target.value), product.qty));
    setQuantity(value);
  };

  const handleCartClick = async () =>  {
    if (!product) return;

    try {
      const result = await addToCart(product.id, quantity);
      console.log(result)
      if(!result.ok){
        throw new Error('fail')
      }
      toastAlert("success", "success to add product to cart")
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toastAlert("error", "Failed to add product to cart");
    }
  };

  return (
    <motion.div
      className="container max-w-5xl mx-auto py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        borderRadius: "16px",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <button
        onClick={() => router.back()}
        className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-full mb-6 hover:from-blue-600 hover:to-teal-600 transition transform hover:-translate-y-1 shadow-lg"
        style={{
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
        }}
      >
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center"
        >
          Back
        </motion.div>
      </button>

      <motion.h1
        className="text-5xl font-extrabold text-gray-900 mb-8 flex items-center space-x-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "linear-gradient(to right, #ff7e5f, #feb47b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <span>{product.description}</span>
        {flagUrl ? (
          <motion.img
            src={flagUrl}
            alt={product.nationality}
            className="w-10 h-10 rounded-full shadow-md"
            title={product.nationality}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <span className="text-sm text-gray-500">(No flag available)</span>
        )}
      </motion.h1>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        {product.image ? (
          <motion.div
            className="w-full lg:w-1/2 h-96 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <motion.img
              src={product.image}
              alt={product.description}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(80%)" }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"
              style={{ mixBlendMode: "multiply" }}
            />
          </motion.div>
        ) : (
          <div className="w-full lg:w-1/2 h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg shadow-xl">
            No Image Available
          </div>
        )}

        <div className="lg:w-1/2 space-y-6 bg-white p-6 rounded-lg shadow-lg border-t-4 border-b-4 border-gradient-to-r from-blue-500 to-teal-500">
          <motion.p
            className="text-2xl font-bold text-gray-800 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <AiOutlineTag className="mr-2 text-gray-500" />
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(product.price)}
          </motion.p>

          <motion.p
            className="text-lg text-gray-600 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <FaFish className="mr-2 text-gray-500" />
            {product.category}
          </motion.p>

          <motion.p
            className="text-lg text-gray-600 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <FaMapMarkerAlt className="mr-2 text-gray-500" />
            {product.location}
          </motion.p>

          <motion.p
            className="text-lg text-gray-600 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <BiRuler className="mr-2 text-gray-500" />
            Size: {product.size}
          </motion.p>

          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Seller: {product.seller}
          </motion.p>

          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Quantity available: {product.qty}
          </motion.p>

          <motion.div
            className="flex items-center space-x-4 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <label htmlFor="quantity" className="text-lg text-gray-600">Quantity:</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              min="1"
              max={product.qty}
              onChange={handleQuantityChange}
              className="text-base text-gray-700 w-20 p-2 border border-gray-300 rounded-lg"
            />
          </motion.div>

          <Button label="Add to Cart" onClick={handleCartClick} />
        </div>
      </div>
    </motion.div>
  );
};

export default FishDetail;
