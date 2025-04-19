// hooks/useAllCategories.ts
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getCategoryById } from "@/api/category";

export function useAllCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });
}

export function useCategoryById(id: string | number) {
    return useQuery({
        queryKey: ["categories", id],
        queryFn: () => getCategoryById(id),
        enabled: !!id,
    })
}
