import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "@/middleware/auth";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { API_URL } from "@/utils/config";
import { useRouter } from "next/router";
import { toastAlert } from "@/utils/toastAlert";

interface FormValues {
  image: File | null;
  size: string;
  description: string;
  location: string;
  nationality: string;
  qty: number;
  price: number;
  category: "Local" | "Import";
  referral_code: string;
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
  referral_code: Yup.string()
    .matches(/^[a-zA-Z0-9]{5}$/, "Referral code must be exactly 5 characters")
    .notRequired(),
});

const AddProductForm: React.FC = () => {
  useAuth();
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    try {
      let fileToUpload = new FormData();
      if (values.image) {
        fileToUpload.append("image", values.image);
      }
      fileToUpload.append("size", values.size);
      fileToUpload.append("description", values.description);
      fileToUpload.append("location", values.location);
      fileToUpload.append("nationality", values.nationality);
      fileToUpload.append("qty", values.qty.toString());
      fileToUpload.append("price", values.price.toString());
      fileToUpload.append("category", values.category);
      if (values.referral_code) {
        fileToUpload.append("referral_code", values.referral_code);
      }

      const token = localStorage.getItem("access_token");
      const response = await axios.post(`${API_URL}/products`, fileToUpload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 413) {
        toastAlert("error", "The uploaded file is too large. Please upload a smaller file.");
        return;
      }

      if (!response) {
        toastAlert("error", "Product submission failed!");
        return;
      }

      const result = await response;
      console.log("Product added successfully", result);
      toastAlert("success", "Product added successfully!");
      router.push("/seller");
    } catch (error) {
      console.error("Error submitting the form", error);
      toastAlert("error", "An error occurred while adding the product.");
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
      };

      try {
        const compressedFile = await imageCompression(file, options);
        formik.setFieldValue("image", compressedFile);
      } catch (error) {
        console.error("Image compression failed:", error);
      }
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
      referral_code: "",
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
        className="space-y-4 p-6 bg-white shadow-md rounded-md w-full max-w-[19rem] sm:max-w-md"
      >
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-medium text-gray-700">
            Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleImageUpload}
            className="border border-gray-300 rounded-md p-2 sm:width-6"
          />
          {formik.errors.image ? (
            <div className="text-red-500 mt-1">{formik.errors.image}</div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="fish-name"
            className="mb-2 font-medium text-gray-700"
          >
            Fish Name
          </label>
          <input
            id="fish-name"
            name="fish-name"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.description ? (
            <div className="text-red-500 mt-1">{formik.errors.description}</div>
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

        <div className="flex flex-col">
          <label
            htmlFor="referral_code"
            className="mb-2 font-medium text-gray-700"
          >
            Referral code (Optional)
          </label>
          <input
            id="referral_code"
            name="referral_code"
            type="text"
            maxLength={5}
            onChange={formik.handleChange}
            value={formik.values.referral_code}
            className="border border-gray-300 rounded-md p-2 text-black"
          />
          {formik.errors.referral_code ? (
            <div className="text-red-500 mt-1">
              {formik.errors.referral_code}
            </div>
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
