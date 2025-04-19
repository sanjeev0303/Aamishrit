// utils/axios.ts
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Optional: helper to attach auth dynamically
export const getAuthAxios = async (getToken: () => Promise<string | null>) => {
    const token = await getToken();
    const authApi = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });
    return authApi;
};

export default api;
