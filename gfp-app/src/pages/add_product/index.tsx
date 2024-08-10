// pages/add-product.tsx
import { NextPage } from 'next';
import AddProductForm from '@/components/AddProductForm';

const AddProductPage: NextPage = () => {
  return (
    <div>
      <h1>Add Product</h1>
      <AddProductForm />
    </div>
  );
};

export default AddProductPage;
