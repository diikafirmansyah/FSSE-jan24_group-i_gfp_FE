// components/AddProductForm.tsx
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  image: File | null;
  size: string;
  description: string;
  location: string;
  nationality: string;
  qty: number;
  price: number;
  category: string; // Tambahkan category di sini
}

const validationSchema = Yup.object({
  image: Yup.mixed().required('Image is required'),
  size: Yup.string().required('Size is required'),
  description: Yup.string().required('Description is required'),
  location: Yup.string().required('Location is required'),
  nationality: Yup.string().required('Nationality is required'),
  qty: Yup.number().required('Quantity is required').positive('Quantity must be greater than zero'),
  price: Yup.number().required('Price is required').positive('Price must be greater than zero'),
  category: Yup.string().required('Category is required'), // Tambahkan validasi untuk category di sini
});

const AddProductForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      image: null,
      size: '',
      description: '',
      location: '',
      nationality: '',
      qty: 0,
      price: 0,
      category: '', // Tambahkan initial value untuk category di sini
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form Values:', values);
      // Handle form submission here
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-md w-full max-w-md">
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-medium text-gray-700">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] || null;
              formik.setFieldValue('image', file);
            }}
            className="border border-gray-300 rounded-md p-2"
          />
          {formik.errors.image ? <div className="text-red-500 mt-1">{formik.errors.image}</div> : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="size" className="mb-2 font-medium text-gray-700">Size</label>
          <input
            id="size"
            name="size"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.size}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.size ? <div className="text-red-500 mt-1">{formik.errors.size}</div> : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="border border-gray-300 rounded-md p-2 h-32 text-black"
          />
          {formik.errors.description ? <div className="text-red-500 mt-1">{formik.errors.description}</div> : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="mb-2 font-medium text-gray-700">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.location}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.location ? <div className="text-red-500 mt-1">{formik.errors.location}</div> : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="nationality" className="mb-2 font-medium text-gray-700">Nationality</label>
          <input
            id="nationality"
            name="nationality"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nationality}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.nationality ? <div className="text-red-500 mt-1">{formik.errors.nationality}</div> : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="qty" className="mb-2 font-medium text-gray-700">Quantity</label>
          <input
            id="qty"
            name="qty"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.qty}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.qty ? <div className="text-red-500 mt-1">{formik.errors.qty}</div> : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-medium text-gray-700">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.price ? <div className="text-red-500 mt-1">{formik.errors.price}</div> : null}
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2 font-medium text-gray-700">Category</label>
          <input
            id="category"
            name="category"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.category}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.category ? <div className="text-red-500 mt-1">{formik.errors.category}</div> : null}
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
