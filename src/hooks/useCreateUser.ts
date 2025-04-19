import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getAuthAxios } from "@/utils/axios";

export const useCreateUser = () => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const submit = async (user: { name: string }) => {
        setLoading(true);
        setError(null);

        try {
            const token = await getToken();
            const authApi = await getAuthAxios(() => Promise.resolve(token || ""));
            await authApi.post("/api/user/register", user);
            router.replace("/checkout");
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to create user");
        } finally {
            setLoading(false);
        }
    };

    return { submit, loading, error };
};
