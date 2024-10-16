import { API_URL } from "@/utils/config";
import { toastAlert } from "@/utils/toastAlert";
import Link from "next/link";

interface Confirmation {
  id: number;
  user_id: number;
  buyer: string;
  product_id: number;
  price: number;
  qty: number;
  description: string;
  created_at: string;
  updated_at: string | null;
  is_confirm: number;
}

const ConfirmationCard: React.FC<Confirmation> = ({
  id,
  user_id,
  buyer,
  product_id,
  price,
  qty,
  description,
  created_at,
  updated_at,
  is_confirm,
}) => {
  const onConfirm = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/confirmations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        toastAlert("error", "Confirmation failed!");
        return;
      }

      const result = await response;
      console.log("Transaction confirmed!", result);
      toastAlert("success", "Transaction confirmed!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting the form", error);
      toastAlert("error", "An error occurred while confirming the transaction");
    }
  };

  return (
    <div className="border border-gray-300 p-6 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
      <p className="mb-2">
        <strong className="font-medium">Product: {" "}</strong>
        <Link href={`/fish/${product_id}`}>
          {description}
        </Link>
      </p>
      <p className="mb-2">
        <strong className="font-medium">Quantity:</strong> {qty}{" "}
      </p>
      <p className="mb-2">
        <strong className="font-medium">Date:</strong> {created_at}{" "}
      </p>
      <p className="mb-2">
        <strong className="font-medium">Total Price: </strong>
        {new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(price)}{" "}
      </p>
      <p className="mb-4">
        <strong className="font-medium">Buyer:</strong> {buyer}
      </p>
      <button
        onClick={onConfirm}
        disabled={is_confirm ? true : false}
        className={`px-4 py-2 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 ${
          is_confirm
            ? `bg-gray-400 cursor-not-allowed`
            : `bg-green-600 hover:bg-green-700 focus:ring-green-500`
        }`}
      >
        {is_confirm ? "Confirmed" : "Confirm Purchase"}
      </button>
    </div>
  );
};

export default ConfirmationCard;
