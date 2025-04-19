// hooks/useAllCategories.ts
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/api/category";

export function useAllCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });
}
