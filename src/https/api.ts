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


export const getUserAddress = async (userId: string) => {
    const response = await api.get(`/user-address/${userId}`, {
        params: { userId }
    });

    const data = response.data.addresses;
    console.log("User address: ", data);
    return data;
}

export const createUserAddress = async(formData: FormData, id: string) => {

    // Extract form data
    const addressData: Partial<Address> = {
        fullName: formData.get("fullName") as string,
        mobileNumber: formData.get("mobileNumber") as string,
        pinCode: formData.get("pinCode") as string,
        addressLine1: formData.get("addressLine1") as string,
        addressLine2: (formData.get("addressLine2") as string) || undefined,
        landmark: (formData.get("landmark") as string) || undefined,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        isDefault: formData.get("isDefault") === "true",
      }

    const response = await api.post(`/user-address/${id}`, addressData,{
        headers: {
            "Content-Type": "multipart/form-data"
        },
        params: {
            userId : id
        }
    })
    return response.data
}
