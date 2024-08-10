import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "@/middleware/auth";

interface FormValues {
  image: File | null;
  size: string;
  description: string;
  location: string;
  nationality: string;
  qty: number;
  price: number;
  category: "Local" | "Import";
}

const validationSchema = Yup.object({
  image: Yup.mixed().required("Image is required"),
  size: Yup.string().required("Size is required"),
  description: Yup.string().required("Description is required"),
  location: Yup.string().required("Location is required"),
  nationality: Yup.string().required("Nationality is required"),
  qty: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be greater than zero"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be greater than zero"),
  category: Yup.string()
    .oneOf(["Local", "Import"])
    .required("Category is required"),
});

const AddProductForm: React.FC = () => {
  useAuth();

  const handleSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();

      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("size", values.size);
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("nationality", values.nationality);
      formData.append("qty", values.qty.toString());
      formData.append("price", values.price.toString());
      formData.append("category", values.category);

      const token = localStorage.getItem('access_token');
      const response = await fetch("http://127.0.0.1:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer " + token
        },
        body: formData,
      });

      if (!response.ok) {
        alert("Product submission failed!");
        return;
      }

      const result = await response.json();
      console.log("Product added successfully", result);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("An error occurred while adding the product.");
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      image: null,
      size: "",
      description: "",
      location: "",
      nationality: "",
      qty: 0,
      price: 0,
      category: "Local",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);
      handleSubmit(values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4 p-6 bg-white shadow-md rounded-md w-full max-w-md"
      >
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-medium text-gray-700">
            Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] || null;
              formik.setFieldValue("image", file);
            }}
            className="border border-gray-300 rounded-md p-2"
          />
          {formik.errors.image ? (
            <div className="text-red-500 mt-1">{formik.errors.image}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="size" className="mb-2 font-medium text-gray-700">
            Size
          </label>
          <input
            id="size"
            name="size"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.size}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.size ? (
            <div className="text-red-500 mt-1">{formik.errors.size}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mb-2 font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="border border-gray-300 rounded-md p-2 h-32 text-black"
          />
          {formik.errors.description ? (
            <div className="text-red-500 mt-1">{formik.errors.description}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="location" className="mb-2 font-medium text-gray-700">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.location}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.location ? (
            <div className="text-red-500 mt-1">{formik.errors.location}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="nationality"
            className="mb-2 font-medium text-gray-700"
          >
            Nationality
          </label>
          <input
            id="nationality"
            name="nationality"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nationality}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.nationality ? (
            <div className="text-red-500 mt-1">{formik.errors.nationality}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="qty" className="mb-2 font-medium text-gray-700">
            Quantity
          </label>
          <input
            id="qty"
            name="qty"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.qty}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.qty ? (
            <div className="text-red-500 mt-1">{formik.errors.qty}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="mb-2 font-medium text-gray-700">
            Price (IDR)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.price ? (
            <div className="text-red-500 mt-1">{formik.errors.price}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="mb-2 font-medium text-gray-700">
            Category
          </label>
          <div role="group" aria-labelledby="category">
            <label className="inline-flex items-center">
              <input
                type="radio"
                id="category-local"
                name="category"
                value="Local"
                checked={formik.values.category === "Local"}
                onChange={formik.handleChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Local</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                id="category-import"
                name="category"
                value="Import"
                checked={formik.values.category === "Import"}
                onChange={formik.handleChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Import</span>
            </label>
          </div>
          {formik.errors.category ? (
            <div className="text-red-500 mt-1">{formik.errors.category}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
