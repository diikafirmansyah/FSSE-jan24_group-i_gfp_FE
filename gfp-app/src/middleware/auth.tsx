// src/middleware/auth.ts

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await fetch("http://127.0.0.1:5000/users/me", {
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
