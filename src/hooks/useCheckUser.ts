// hooks/useCheckUser.ts
import { useEffect, useState } from "react";
import { getAuthAxios } from "@/utils/axios";
import { useAuth } from "@clerk/nextjs";

export const useCheckUser = () => {
    const { getToken } = useAuth();
    const [exists, setExists] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const authAxios = await getAuthAxios(getToken);
                const response = await authAxios.get("/api/user/check"); // or whatever your endpoint is
                setExists(response.data.exists); // <- THIS is the boolean returned from Go
            } catch (err: any) {
                setError(err);
                setExists(null);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    return { exists, loading, error };
};
