import { Address } from "./dummy-types"

// Mock user data
export const mockUser = {
  id: "user_123",
  name: "John Doe",
  email: "john@example.com",
}

// Mock addresses
export const mockAddresses: Address[] = [
  {
    id: "addr_1",
    fullName: "John Doe",
    mobileNumber: "9876543210",
    addressLine1: "123 Main Street",
    addressLine2: "Apartment 4B",
    landmark: "Near Central Park",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400001",
    country: "India",
    isDefault: true,
    userId: "user_123",
  },
  {
    id: "addr_2",
    fullName: "John Doe",
    mobileNumber: "9876543210",
    addressLine1: "456 Work Avenue",
    addressLine2: "Floor 3",
    landmark: "Opposite Coffee Shop",
    city: "Bangalore",
    state: "Karnataka",
    pinCode: "560001",
    country: "India",
    isDefault: false,
    userId: "user_123",
  },
]

// Mock cart items
export const mockCartItems = [
  {
    id: "prod_1",
    name: "Wireless Headphones",
    price: 2499,
    quantity: 1,
    images: ["https://images.unsplash.com/photo-1612388307727-afe00578ca21?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
  },
  {
    id: "prod_2",
    name: "Smart Watch",
    price: 3999,
    quantity: 1,
    images: ["https://plus.unsplash.com/premium_photo-1672916806667-4db17f753e54?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
  },
]

// Mock data service to replace Prisma
export const mockDataService = {
  // User functions
  getUser: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockUser
  },

  // Address functions
  getUserAddresses: async (userId: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))
    return mockAddresses.filter((addr) => addr.userId === userId)
  },

  createAddress: async (addressData: Partial<Address>, userId: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // If this is the first address or marked as default, update other addresses
    if (addressData.isDefault || mockAddresses.length === 0) {
      mockAddresses.forEach((addr) => {
        if (addr.userId === userId) {
          addr.isDefault = false
        }
      })
    }

    // Create new address
    const newAddress: Address = {
      id: `addr_${Date.now()}`,
      fullName: addressData.fullName || "",
      mobileNumber: addressData.mobileNumber || "",
      addressLine1: addressData.addressLine1 || "",
      addressLine2: addressData.addressLine2 || "",
      landmark: addressData.landmark || "",
      city: addressData.city || "",
      state: addressData.state || "",
      pinCode: addressData.pinCode || "",
      country: addressData.country || "India",
      isDefault: addressData.isDefault || mockAddresses.length === 0, // First address is default
      userId,
    }

    mockAddresses.push(newAddress)
    return newAddress
  },

  // Order functions
  createOrder: async (orderData: any) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      id: `order_${Date.now()}`,
      ...orderData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }
  },
}
