import React from "react";
import Link from "next/link";

interface Product {
  id: number;
  image: string | null;
  price: number;
  description: string;
  category: string;
  location: string;
}

const FishCard: React.FC<Product> = ({
  id,
  image,
  price,
  description,
  category,
  location,
}) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
      {image ? (
        <img
          src={image}
          alt={description}
          className="w-full h-60 object-cover bg-gray-100"
        />
      ) : (
        <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
          No Image Available
        </div>
      )}
      <div className="p-6 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{description}</h2>
        <p className="text-lg font-bold text-gray-700 mb-2">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(price)}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {category} - {location}
        </p>
        <Link
          href={`/fish/${id}`}
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FishCard;
