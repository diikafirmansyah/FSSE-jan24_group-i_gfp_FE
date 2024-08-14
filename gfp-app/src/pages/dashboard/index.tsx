// pages/index.tsx
import React from 'react';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import useAuth from '@/middleware/auth';
import { API_URL } from '@/config';

const Dashboard: React.FC = () => {
    useAuth()
    const router = useRouter();

    const handleMarketplaceClick = () => {
        router.push('/marketplace');
    };

    const handleCartClick = () => {
        router.push('/cart');
    };

    const handleAddProductClick = () => {
        router.push('/add_product');
    };

    const handleLogoutClick = async () => {
        const token = localStorage.getItem('access_token');
        try {
            const response = await fetch(`${API_URL}/users/logout`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Bearer " + token
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            localStorage.removeItem('access_token');
            alert("Logout success!");
            router.push('/');
        } catch (error) {
            console.error("Error fetching products:", error);
            localStorage.removeItem('access_token');
            router.push('/')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome to AquaFish !!!</h1>
            <div className="flex flex-col items-center space-y-4">
                <Button label="Go to Marketplace" onClick={handleMarketplaceClick} />
                <Button label="View Cart" onClick={handleCartClick} />
                <Button label="Add Product" onClick={handleAddProductClick} />
                <Button label="Logout" onClick={handleLogoutClick} />
            </div>
        </div>
    );
};

export default Dashboard;
