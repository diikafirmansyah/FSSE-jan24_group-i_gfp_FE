import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import FishCard from "@/components/FishCard";
import Filter from "@/components/filter";
import useAuth from "@/middleware/auth";
import { API_URL } from "@/config";

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
  nationality: string; // Added nationality field
  size: string; // Added size field
}

const categories = ["Local", "Import"];

const Seller: React.FC = () => {
  useAuth();
  const [filters, setFilters] = useState<{
    category: string;
    location: string;
  }>({
    category: "",
    location: "",
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`${API_URL}/products/me`, {
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
        setProducts(result.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    setTimeout(() => {
      fetchProducts();
    }, 1000);
  }, []);

  const handleFilterChange = (newFilters: {
    category: string;
    location: string;
  }) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      filters.category === "" || product.category === filters.category;
    const locationMatch =
      filters.location === "" ||
      product.location.toLowerCase().includes(filters.location.toLowerCase());
    const searchMatch =
      searchQuery === "" ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && locationMatch && searchMatch;
  });

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-white text-center mb-10">
        My Fish List
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex justify-center mb-8">
        <div className="flex flex-col items-center space-y-4">
          <Filter categories={categories} onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <FishCard
              key={product.id}
              id={product.id}
              image={product.image}
              price={product.price}
              description={product.description}
              category={product.category}
              location={product.location}
              nationality={product.nationality} // Pass nationality to FishCard
              size={product.size} // Pass size to FishCard
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        )}
      </div>
    </div>
  );
};

export default Seller;
