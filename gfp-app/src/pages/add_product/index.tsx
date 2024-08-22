import { NextPage } from 'next';
import AddProductForm from '@/components/AddProductForm';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AddProductPage: NextPage = () => {

  const router = useRouter();
  
  useEffect (() => {
    if(!localStorage.getItem("role")) {
      window.location.href = "/login";
    }else{
      if(localStorage.getItem("role") !== "seller") {
        window.location.href = "/dashboard";
      }
    }
  }, []); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black p-6">
      <div className='flex flex-row gap-12'>
      <button
        onClick={() => router.back()}
        className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold px-6 py-3 rounded-full mb-6 hover:from-blue-600 hover:to-teal-600 transition transform hover:-translate-y-1 shadow-lg"
        style={{
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
        }}
        >Back</button>
      <h1 className='text-3xl font-bold'>Add Product</h1>
      </div>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
