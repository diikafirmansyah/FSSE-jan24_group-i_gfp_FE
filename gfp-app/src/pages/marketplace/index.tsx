import { GetServerSideProps } from "next";
import React from "react";
import SearchBar from "@/components/SearchBar";

interface Product {
  id: number;
  image: string | null;
  price: number;
  qty: number;
  description: string;
  category: string;
  location: string;
  created_at: string;
  updated_at: string | null;
}

interface MarketplaceProps {
  products: Product[];
}

const Marketplace: React.FC<MarketplaceProps> = ({ products }) => {
  console.log("Marketplace products:", products); // Debugging

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Marketplace</h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="border rounded-lg shadow-lg p-4">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.description}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 mb-4 rounded flex items-center justify-center">
                  <span className="text-gray-500">No Image Available</span>
                </div>
              )}
              <h2 className="text-2xl font-bold">{product.description}</h2>
              <p className="text-xl text-gray-600">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(product.price)}
              </p>
              <p className="text-sm text-gray-500">
                {product.category} - {product.location}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    let products: Product[] = [];
    try {
      const result = await response.json();
      products = result.products; // Ensure result is an array
      console.log("Fetched products:", products);
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      products = [];
    }

    return {
      props: {
        products: Array.isArray(products) ? products : [],
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
};

export default Marketplace;
