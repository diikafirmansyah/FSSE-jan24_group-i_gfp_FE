// src/middleware/auth.ts

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config';

const useAuth = () => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await fetch(`${API_URL}/users/me`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData);
                    } else {
                        router.push('/login');
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    router.push('/login');
                }
            } else {
                router.push('/login');
            }
        };

        fetchUser();
    }, [router]);

    return user;
};

export default useAuth;
