import type { Address } from "@/types"
import { mockDataService } from "../moke-data"

export const createUserAddress = async (formData: FormData, userId: string) => {
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

  // Create address using our mock service
  const newAddress = await mockDataService.createAddress(addressData, userId)

  return {
    message: "Address created successfully",
    address: newAddress,
  }
}

export const getUserAddress = async (userId: string) => {
  // Get addresses using our mock service
  const addresses = await mockDataService.getUserAddresses(userId)
  return addresses
}
