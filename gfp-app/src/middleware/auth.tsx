import { useEffect } from "react";
import { useRouter } from "next/router";

const useAuth = (): null => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      router.push('/login');
    }
  }, []);

  return null;
};

export default useAuth;
