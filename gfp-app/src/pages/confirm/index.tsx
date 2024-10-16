import { NextPage } from "next";
import ConfirmationCard from "@/components/ConfirmationCard";
import { useEffect, useState } from "react";
import { API_URL } from "@/utils/config";
import useAuth from "@/middleware/auth";
import Loading from "@/components/Loading";

interface Confirmation {
  id: number;
  user_id: number;
  buyer: string;
  product_id: number;
  image: string;
  price: number;
  qty: number;
  description: string;
  created_at: string;
  updated_at: string | null;
  is_confirm: number;
}

const ITEMS_PER_PAGE = 6;
const tabs = ["Ongoing", "History"];

const ConfirmPage: NextPage = () => {
  useAuth();

  const [activeTab, setActiveTab] = useState<string>("Ongoing");
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmations();
  }, []);

  const filteredConfirmations = confirmations.filter((item) => {
    if (activeTab === tabs[0]) {
      return !item.is_confirm;
    } else if (activeTab === tabs[1]) {
      return item.is_confirm;
    }
  })

  const totalPages = Math.ceil(filteredConfirmations.length / ITEMS_PER_PAGE);
  const paginatedConfirmations = filteredConfirmations.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 flex justify-center items-center h-[calc(100vh-6rem)]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-12">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setActiveTab(tabs[0])}
          className={`px-4 py-2 ${activeTab === tabs[0] ? "font-bold" : ""}`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setActiveTab(tabs[1])}
          className={`px-4 py-2 ${activeTab === tabs[1] ? "font-bold" : ""}`}
        >
          History
        </button>
      </div>

      {/* Confirmation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {paginatedConfirmations.length > 0 ? (
        paginatedConfirmations.map((item) => (
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

      {/* Pagination */}
      {paginatedConfirmations.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="min-w-[100px] px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <span className="text-gray-600">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="min-w-[100px] px-4 py-2 text-white bg-blue-900 rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
      )}
    </div>
  );
};

export default ConfirmPage;
