import api from "@/https/axios"
import { Product } from "@/types"

export async function getAllProducts(): Promise<Product[]> {
    const res = await api.get("/api/products")
    return res.data
}

export async function getProductsById(id: string | number): Promise<Product> {
    const res = await api.get(`/api/products/${id}`)
    return res.data
}
