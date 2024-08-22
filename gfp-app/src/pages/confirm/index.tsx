import { NextPage } from "next";
import ConfirmationCard from "@/components/ConfirmationCard";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import useAuth from "@/middleware/auth";
import Loading from "@/components/Loading";

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

const ConfirmPage: NextPage = () => {
  useAuth();

  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if(!localStorage.getItem("role")) {
      window.location.href = "/login";
    }else{
      if(localStorage.getItem("role") !== "seller") {
        window.location.href = "/dashboard";
      }
    }
    const fetchConfirmations = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await fetch(`${API_URL}/confirmations/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setConfirmations(result.confirmations || []);
        // console.log(result.confirmations);
      } catch (error) {
        console.error("Error fetching confirmations:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmations();
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex justify-center items-center h-[calc(100vh-6rem)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen flex-wrap gap-2">
      {confirmations.length > 0 ? (
        confirmations.map((item) => (
          <ConfirmationCard
            key={item.id}
            id={item.id}
            user_id={item.user_id}
            buyer={item.buyer}
            product_id={item.product_id}
            price={item.price}
            qty={item.qty}
            description={item.description}
            created_at={item.created_at}
            updated_at={item.updated_at}
            is_confirm={item.is_confirm}
          />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No confirmations
        </p>
      )}
    </div>
  );
};

export default ConfirmPage;
