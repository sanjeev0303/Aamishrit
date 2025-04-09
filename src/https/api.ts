import { Address, Product } from "@/types";
import { api } from "./client"


export const createProduct = async (data: FormData) => {
     const response = await api.post("/products", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
     })
     return response.data
}

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get("/products")
    const data = response.data.allProducts;
    return data
}

export const getProductById = async (id:string) => {
    const response = await api.get(`/products/${id}`)
    const data = await response.data
    return data as Product
}


export const getCategory = async(slug: string) => {
    const response = await api.get(`/category/${slug}`)
    console.log("response: ", response);
    const data = response.data
    return data as Product
}


export const createUserAddress = async(data: FormData, id: string) => {
    const response = await api.post(`/user-address`, data,{
        headers: {
            "id": id,
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}


export const getUserAddress = async (id: string) => {
    const response = await api.get("/user-address", {
        headers: {
            "id": id,
        },
    })

    const data  =  response.data.addresses
    console.log("User address: ", data);
    return data
}
