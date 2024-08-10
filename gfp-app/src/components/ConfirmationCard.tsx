// components/ConfirmationCard.tsx
import React from 'react';

interface Product {
  name: string;
  price: number;
}

interface ConfirmationCardProps {
  product: Product;
  buyer: string;
  qty: number;
  onConfirm: () => void;
}

const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ product, buyer, qty, onConfirm }) => {
  return (
    <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
      <p className="mb-2"><strong className="font-medium">Product:</strong> {product.name}</p>
      <p className="mb-2"><strong className="font-medium">Price:</strong> ${product.price.toFixed(2)}</p>
      <p className="mb-2"><strong className="font-medium">Quantity:</strong> {qty}</p>
      <p className="mb-4"><strong className="font-medium">Total:</strong> ${ (product.price * qty).toFixed(2) }</p>
      <p className="mb-4"><strong className="font-medium">Buyer:</strong> {buyer}</p>
      <button 
        onClick={onConfirm} 
        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Confirm Purchase
      </button>
    </div>
  );
};

export default ConfirmationCard;
