// pages/confirm.tsx
import { NextPage } from 'next';
import ConfirmationCard from '@/components/ConfirmationCard';
import { useState } from 'react';

const ConfirmPage: NextPage = () => {
  // Contoh data yang bisa diambil dari API atau state global

  const product = {
    name: 'Sample Product',
    price: 49.99
  };
  const buyer = 'John Doe';
  const qty = 2;

  const handleConfirm = () => {
    
    alert('Purchase confirmed!');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ConfirmationCard
        product={product}
        buyer={buyer}
        qty={qty}
        onConfirm={handleConfirm}
      />
    </div>
    
  );
};

export default ConfirmPage;
