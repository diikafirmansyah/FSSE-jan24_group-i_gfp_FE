import React from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaFish } from "react-icons/fa";
import { AiOutlineTag } from "react-icons/ai";
import { BiRuler } from "react-icons/bi";
import { addToCart } from "@/utils/api/carts";
import { CiCirclePlus } from "react-icons/ci";
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
  thailand: "th",
  china: "cn",
};

interface Product {
  id: number;
  image: string | null;
  price: number;
  description: string;
  category: string;
  location: string;
  nationality: string;
  size: string;
  isSellerPage?: boolean;
}

const FishCard: React.FC<Product> = ({
  id,
  image,
  price,
  description,
  category,
  location,
  nationality,
  size,
  isSellerPage = false,
}) => {
  const isoCode =
    nationalityMap[nationality.toLowerCase()] || nationality.toLowerCase();
  const flagUrl = `https://flagcdn.com/w40/${isoCode}.png`;

  const handleCartClick = async () =>  {
    try {
      const result = await addToCart(id, 1);
      console.log(result);
      if(!result.ok){
        throw new Error('fail');
      }
      toastAlert("success", "success to add product to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toastAlert("error", "Failed to add product to cart");
    }
  };

  return (
    <div
      className="border border-transparent rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
      style={{
        backgroundImage: "linear-gradient(to right, #ffecd2, #fcb69f)",
        padding: "2px",
      }}
    >
      <div className="bg-white rounded-lg overflow-hidden">
        {image ? (
          <div className="relative w-full h-60 overflow-hidden">
            <img
              src={image}
              alt={description}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        ) : (
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 truncate">
              {description}
            </h2>
            {flagUrl && (
              <div className="flex items-center ml-2">
                <img
                  src={flagUrl}
                  alt={`Flag of ${nationality}`}
                  className="w-6 h-4 mr-2 shadow-md"
                  title={nationality.toUpperCase()}
                />
                <span className="text-sm font-semibold text-gray-700">
                  {isoCode.toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <p className="text-lg font-bold text-gray-800 mb-2 flex items-center">
            <AiOutlineTag className="mr-2 text-gray-500 transition-transform duration-300 ease-in-out transform hover:scale-110" />
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </p>
          <p className="text-sm text-gray-600 mb-4 flex items-center">
            <FaFish className="mr-2 text-gray-500 transition-transform duration-300 ease-in-out transform hover:scale-110" />
            {category}
          </p>
          <p className="text-sm text-gray-600 mb-4 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-500 transition-transform duration-300 ease-in-out transform hover:scale-110" />
            {location}
          </p>
          <p className="text-sm text-gray-600 mb-4 flex items-center">
            <BiRuler className="mr-2 text-gray-500 transition-transform duration-300 ease-in-out transform hover:scale-110" />
            {size} cm
          </p>
          {isSellerPage ? (
            <Link
            href={`/fish/edit/${id}`}
            className="inline-block px-4 py-2 w-full text-center bg-gradient-to-r from-green-500 to-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              Edit Details
            </Link>
          ) : (
            <div className="flex flex-row gap-3">
            <Link
            href={`/fish/${id}`}
            className="inline-block px-4 py-2 w-full text-center bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              View Details
            </Link>
            <CiCirclePlus size={36} onClick={handleCartClick} className="icon-black hover:cursor-pointer transition-transform transform hover:-translate-y-1"/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FishCard;
