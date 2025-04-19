// hooks/useProducts.ts
import { getAllProducts } from "@/api/products"
import { Product } from "@/types"
import { useEffect, useState } from "react"

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getAllProducts()
                setProducts(data)
            } catch (err: any) {
                setError(err.message || "Failed to fetch products")
            } finally {
                setLoading(false)
            }
        }
        fetch()
    }, [])

    return { products, loading, error }
}
