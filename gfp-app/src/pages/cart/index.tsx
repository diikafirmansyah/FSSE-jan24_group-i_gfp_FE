// pages/index.tsx
import React from 'react';
import Button from '../../components/Button';
import { useRouter } from 'next/router';

const Cart: React.FC = () => {
  const router = useRouter();

  const handleMarketplaceClick = () => {
    router.push('/marketplace');
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleAddProductClick = () => {
    router.push('/add-product');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome to AquaFish !!!</h1>
      <div className="flex flex-col items-center space-y-4">
        <Button label="Go to Marketplace" onClick={handleMarketplaceClick} />
        <Button label="View Cart" onClick={handleCartClick} />
        <Button label="Add Product" onClick={handleAddProductClick} />
      </div>
    </div>
  );
};

export default Cart;
