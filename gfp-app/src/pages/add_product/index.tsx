// pages/add-product.tsx
import { NextPage } from 'next';
import AddProductForm from '@/components/AddProductForm';

const AddProductPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-6">
      <h1 className='text-3xl font-bold'>Add Product</h1>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
