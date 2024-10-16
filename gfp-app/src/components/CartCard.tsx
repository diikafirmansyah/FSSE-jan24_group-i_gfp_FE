// components/ConfirmationCard.tsx
import React from "react";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { API_URL } from "@/utils/config";
import { toastAlert } from "@/utils/toastAlert";
import Link from "next/link";

interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  qty: number;
  price: number;
  description: string;
  image: string;
  seller: string;
  contact_phone: string;
}

interface CartProps {
  cart_items: Cart;
}

const CartCard: React.FC<CartProps> = ({ cart_items }) => {
  const [referralCode, setReferralCode] = useState<string>("");

  const onChangeReferralCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReferralCode(event.target.value);
  };

  const onConfirm = async () => {
    try {
      let fileToUpload = new URLSearchParams();

      fileToUpload.append("cart_id", cart_items.id.toString());
      fileToUpload.append("product_id", cart_items.product_id.toString());
      fileToUpload.append("qty", cart_items.qty.toString());

      if (referralCode != "") {
        fileToUpload.append("referral_code", referralCode);
      }

      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_URL}/confirmations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
        body: fileToUpload,
      });

      if (!response.ok) {
        toastAlert("error", "Product submission failed!");
        return;
      }

      const result = await response;
      console.log("Product added successfully", result);
      toastAlert("success", "Product added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting the form", error);
      toastAlert("error", "An error occurred while adding the product.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `${API_URL}/carts/${cart_items.product_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response) {
        toastAlert("error", "Product submission failed!");
        return;
      }

      const result = await response;
      console.log("Product deleted successfully", result);
      toastAlert("success", "Deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting the form", error);
      toastAlert("error", "An error occurred while adding the product.");
    }
  };

  return (
    <div className="flex flex-col justify-between bg-white border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out max-w-4xl mx-auto gap-6">
      <Link href={`/fish/${cart_items.product_id}`}>
        {cart_items.image ? (
          <div className="relative w-full h-60 overflow-hidden rounded-lg">
            <img
              src={cart_items.image}
              alt={cart_items.description}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
              />
          </div>
        ) : (
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-grow gap-4">
        <Link href={`/fish/${cart_items.product_id}`}>
          <h2 className="text-2xl font-bold text-gray-800">
            {cart_items.description}
          </h2>
        </Link>
        <p className="text-gray-600">
          <strong>Seller:{" "}</strong>
          {cart_items.seller}
        </p>
        <p className="text-gray-600">
          <strong>Contact Phone:{" "}</strong>
          {cart_items.contact_phone}
        </p>
        <p className="text-gray-600">
          <strong>Quantity:{" "}</strong>
          {cart_items.qty}
        </p>
        <p className="text-gray-700">
          <strong>Total Price:</strong>{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(cart_items.price)}
        </p>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="referral_code"
            className="text-gray-700 font-medium mb-2"
          >
            Referral Code
          </label>
          <input
            id="referral_code"
            name="referral_code"
            type="text"
            value={referralCode}
            placeholder="Input for 20% discount"
            maxLength={6}
            onChange={onChangeReferralCode}
            className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Confirm Purchase
          </button>

          <button
            onClick={handleDelete}
            className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <FaRegTrashAlt className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
