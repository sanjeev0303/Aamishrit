import axios from "@/utils/axios";
import { Category } from "@/types";

export async function getAllCategories(): Promise<Category[]> {
    const res = await axios.get("/categories");
    return res.data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    const res = await axios.get(`/categories/${slug}`);
    return res.data;
}
