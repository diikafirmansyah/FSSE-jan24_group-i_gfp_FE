// components/ConfirmationCard.tsx
import React from 'react';
import ModalDialogs from './ModalDialogs';


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

const ConfirmationCard: React.FC<CardProps> = ({cart_items }) => {

    const onConfirm = async () => {
        try {
       
          let fileToUpload = new URLSearchParams();
          
     
          fileToUpload.append("product_id", cart_items.product_id.toString());
          fileToUpload.append("qty", cart_items.product_id.toString());
          fileToUpload.append("referral_code", cart_items.product_id.toString());
     
    
          const token = localStorage.getItem('access_token');

          const response = await fetch("http://127.0.0.1:5000/products", {
            method: "POST",
            headers: {
             
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": "Bearer " + token
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
        } catch (error) {
          console.error("Error submitting the form", error);
          alert("An error occurred while adding the product.");
        }
      };

      const handleDelete = async () => {
        try {
        const token = localStorage.getItem('access_token');

        const response = await fetch(`http://127.0.0.1:5000/carts/${cart_items.product_id}`, {
          method: "DELETE",
          headers: {
           
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token
          },
        });
  
        if (!response) {
          alert("Product submission failed!");
          return;
        }
  
        const result = await response;
        console.log("Product added successfully", result);
        alert("Product added successfully!");
      } catch (error) {
        console.error("Error submitting the form", error);
        alert("An error occurred while adding the product.");
      }
    };

  return (
    <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">{cart_items.description}</h2>
      <p className="mb-2"><strong className="font-medium">Quantity:</strong> {cart_items.qty}</p>
      <p className="mb-2"><strong className="font-medium">Price:</strong> {cart_items.price}</p>
      <button onClick={handleDelete} >Remove</button>
      <button 
        onClick={onConfirm} 
        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Confirm Purchase
      </button>
    </div>
  );
};

export default ConfirmationCard;
