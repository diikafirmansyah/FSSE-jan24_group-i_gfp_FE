// components/ConfirmationCard.tsx
import React from 'react';
import ModalDialogs from './ModalDialogs';
import { useState } from 'react';


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

	const [referralCode, setReferralCode] = useState<string>('');

	const onChangeReferralCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		setReferralCode(event.target.value);
	  };

    const onConfirm = async () => {
        try {
       
          let fileToUpload = new URLSearchParams();
          
		  fileToUpload.append("cart_id", cart_items.id.toString());
          fileToUpload.append("product_id", cart_items.product_id.toString());
          fileToUpload.append("qty", cart_items.qty.toString());
		  
		  if(referralCode != ""){
			fileToUpload.append("referral_code", referralCode);}
    
          const token = localStorage.getItem('access_token');

          const response = await fetch("http://127.0.0.1:5000/confirmations", {
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
      <p className="mb-2"><strong className="font-medium">Total Price:</strong> {cart_items.price}</p>
	  <div>
		<label htmlFor="referral_code">Referral Code</label>
	  <input
                      id="referral_code"
                      name="referral_code"
                      type="text"
					  value={referralCode}
                      placeholder="Input for 20% discount" 
                      onChange={onChangeReferralCode}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
	  </div>
      
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
