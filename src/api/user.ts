// api/user.ts
import { NewUser, UserAddress } from "@/types";
import axios, { getAuthAxios } from "@/utils/axios";

export async function fetchUserAddress(token: string): Promise<UserAddress> {
    const authApi = await getAuthAxios(() => Promise.resolve(token));
    const res = await authApi.get("/api/address/");
    return res.data;
}

export async function createUserAddress(
    address: UserAddress,
    token?: string
): Promise<UserAddress> {
    const apiInstance = token
        ? await getAuthAxios(() => Promise.resolve(token))
        : axios;
    const res = await apiInstance.post("/api/address", address);
    return res.data;
}

export const checkUserExists = async (
    getToken: () => Promise<string | null>
): Promise<boolean> => {
    const authAxios = await getAuthAxios(getToken);

    try {
        const res = await authAxios.get("/users/check");
        return res.data.exists;
    } catch (error) {
        console.error("Error checking user existence", error);
        throw error;
    }
};

// Extend API logic
export async function createUser(user: NewUser, token?: string): Promise<any> {
    const apiInstance = token
        ? await getAuthAxios(() => Promise.resolve(token))
        : axios;
    const res = await apiInstance.post("/api/user/register", user);
    return res.data;
}
