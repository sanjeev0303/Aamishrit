// hooks/useAddress.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUserAddress, createUserAddress } from "@/api/user";
import { UserAddress } from "@/types";
import { useAuth } from "@clerk/nextjs";

// for fetching user address
export function useUserAddress() {
    const { getToken } = useAuth();

    return useQuery<UserAddress>({
        queryKey: ["userAddress"],
        queryFn: async () => {
            const token = await getToken();
            if (!token) throw new Error("User not authenticated");
            return fetchUserAddress(token);
        },
        retry: false,
    });
}

// for creating/updating address
export function useCreateUserAddress(options?: { onSuccess?: () => void }) {
    const queryClient = useQueryClient();
    const { getToken } = useAuth();

    return useMutation({
        mutationFn: async (address: UserAddress) => {
            const token = await getToken();
            return createUserAddress(address, token || undefined);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userAddress"] });
            if (options?.onSuccess) options.onSuccess(); // 🔥
        },
    });
}