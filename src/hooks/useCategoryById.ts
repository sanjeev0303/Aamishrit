import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "@/api/category";

export function useCategory(id: string | number) {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById(id),
        enabled: !!id, // prevents firing query with empty id
    });
}
