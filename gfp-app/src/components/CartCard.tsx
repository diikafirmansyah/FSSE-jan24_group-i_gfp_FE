// components/ConfirmationCard.tsx
import React from "react";
import ModalDialogs from "./ModalDialogs";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

interface Cart {
  id: number;
  user_id: number;
  product_id: number;
  qty: number;
  price: number;
  description: string;
}

interface CardProps {
  cart_items: Cart;
  //   onConfirm: () => void;
}

const ConfirmationCard: React.FC<CardProps> = ({ cart_items }) => {
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

      const response = await fetch("http://127.0.0.1:5000/confirmations", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
        body: fileToUpload,
      });

      if (!response) {
        alert("Product submission failed!");
        return;
      }

      const result = await response;
      console.log("Product added successfully", result);
      alert("Product added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("An error occurred while adding the product.");
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `http://127.0.0.1:5000/carts/${cart_items.product_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response) {
        alert("Product submission failed!");
        return;
      }

      const result = await response;
      console.log("Product deleted successfully", result);
      alert("Deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting the form", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between bg-white p-4 max-w-4xl mx-auto gap-7">
      <div className="flex flex-col  md:flex-row md:items-center md:gap-6 mb-4 md:mb-0">
        <div className="flex flex-col flex-grow">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {cart_items.description}
          </h2>
          <p className="text-gray-700 mb-1">
            <strong className="font-medium">Quantity:</strong> {cart_items.qty}
          </p>
          <p className="text-gray-700 mb-2">
            <strong className="font-medium">Total Price:</strong>{" "}
            {cart_items.price}
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <div className="flex flex-col md:flex-row md:items-center md:gap-2 mb-4 md:mb-0 w-full">
          <label
            htmlFor="referral_code"
            className="text-gray-700 font-medium mb-1 md:mb-0"
          >
            Referral Code
          </label>
          <input
            id="referral_code"
            name="referral_code"
            type="text"
            value={referralCode}
            placeholder="Input for 20% discount"
            onChange={onChangeReferralCode}
            className="bg-gray-200 border-2 border-gray-300 rounded-lg w-full md:w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Confirm Purchase
        </button>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center px-4 py-4 md:px-6 md:py-6 bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <FaRegTrashAlt className="text-white text-lg md:text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ConfirmationCard;
