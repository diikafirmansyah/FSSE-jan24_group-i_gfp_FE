import { GetServerSideProps } from "next";
import React from "react";

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

interface FishDetailProps {
  product: Product | null;
}

const FishDetail: React.FC<FishDetailProps> = ({ product }) => {
  console.log("Product data:", product); // Debugging

  if (!product) {
    return <p className="text-center text-gray-500">Product not found</p>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">{product.description}</h1>
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {product.image ? (
          <img
            src={product.image}
            alt={product.description}
            className="w-full lg:w-1/2 h-80 object-cover bg-gray-100 rounded-lg"
          />
        ) : (
          <div className="w-full lg:w-1/2 h-80 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
            No Image Available
          </div>
        )}
        <div className="lg:w-1/2">
          <p className="text-lg font-bold text-gray-700 mb-4">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(product.price)}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {product.category} - {product.location}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-500">Quantity available: {product.qty}</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const response = await fetch(`http://127.0.0.1:5000/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const product = await response.json();
    console.log("Fetched product:", product); // Debugging
    return {
      props: {
        product: product || null,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      props: {
        product: null,
      },
    };
  }
};

export default FishDetail;
