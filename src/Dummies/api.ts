import { products } from "../Dummies/data/products"
import { categories } from "../Dummies/data/categories"
import type { Product, Category, Review, Order, User, Address, WishlistItem } from "./dummy-types"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock reviews data
const reviews: Review[] = [
  {
    id: 1,
    user: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-10-15",
    title: "Excellent product!",
    comment: "This is exactly what I was looking for. Great quality and fast shipping.",
  },
  {
    id: 2,
    user: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2023-09-28",
    title: "Very good",
    comment: "I'm happy with my purchase. Would recommend to others.",
  },
  {
    id: 3,
    user: "Robert Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2023-11-02",
    title: "Exceeded expectations",
    comment: "The quality is even better than I expected. Will definitely buy again.",
  },
]

// Mock users data
const users: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    image: "https://images.unsplash.com/photo-1500511599662-5441d83fae18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    image: "https://images.unsplash.com/photo-1607114910421-a7c2b982d497?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]

// Mock addresses data
const addresses: Address[] = [
  {
    id: "addr1",
    fullName: "John Doe",
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    landmark: "Near Central Park",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "400001",
    country: "India",
    mobileNumber: "9876543210",
    isDefault: true,
    userId: "user1",
  },
  {
    id: "addr2",
    fullName: "John Doe",
    addressLine1: "456 Work Avenue",
    addressLine2: "Floor 3",
    landmark: "Opposite Coffee Shop",
    city: "Bangalore",
    state: "Karnataka",
    pinCode: "560001",
    country: "India",
    mobileNumber: "9876543210",
    isDefault: false,
    userId: "user1",
  },
]

// Mock orders data
const orders: Order[] = [
  {
    id: "order1",
    date: "2023-11-15",
    status: "delivered",
    items: [
      {
        id: "1",
        name: "Organic Herbal Tea",
        price: 12.99,
        quantity: 2,
        images: ["https://images.unsplash.com/photo-1623659945109-a0ab8cee7762?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      },
      {
        id: "3",
        name: "Organic Palm Jaggery",
        price: 9.99,
        quantity: 1,
        images: ["https://plus.unsplash.com/premium_photo-1700070729323-4e1dcdca2c17?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      },
    ],
    subtotal: 35.97,
    shipping: 5.0,
    tax: 4.1,
    total: 45.07,
    shippingAddress: addresses[0],
    payment: {
      method: "cod",
      date: "2023-11-15",
    },
    trackingNumber: "TRK12345678",
    estimatedDelivery: "2023-11-20",
    timeline: {
      confirmed: "2023-11-15T10:00:00Z",
      processing: "2023-11-15T14:00:00Z",
      shipped: "2023-11-16T09:00:00Z",
      delivered: "2023-11-19T15:30:00Z",
    },
  },
  {
    id: "order2",
    date: "2023-12-05",
    status: "processing",
    items: [
      {
        id: "5",
        name: "Whole Wheat Cookies",
        price: 7.99,
        quantity: 3,
        images: ["https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],
      },
    ],
    subtotal: 23.97,
    shipping: 5.0,
    tax: 2.9,
    total: 31.87,
    shippingAddress: addresses[0],
    payment: {
      method: "cod",
      date: "2023-12-05",
    },
    estimatedShipping: "2023-12-07",
    estimatedDelivery: "2023-12-12",
    timeline: {
      confirmed: "2023-12-05T11:20:00Z",
      processing: "2023-12-05T16:45:00Z",
    },
  },
]

// Mock wishlist data
const wishlist: WishlistItem[] = [
  {
    id: "wish1",
    productId: "1",
    userId: "user1",
    product: products[0],
  },
  {
    id: "wish2",
    productId: "5",
    userId: "user1",
    product: products[4],
  },
]

// API functions
export async function getProducts(options?: {
  limit?: number
  category?: string
  featured?: boolean
  search?: string
}) {
  await delay(500) // Simulate network delay

  let filteredProducts = [...products]

  // Apply category filter
  if (options?.category) {
    filteredProducts = filteredProducts.filter((product) => product.category.slug === options.category)
  }

  // Apply featured filter
  if (options?.featured) {
    filteredProducts = filteredProducts.filter((product) => product.isFeatured)
  }

  // Apply search filter
  if (options?.search) {
    const searchTerm = options.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.name.toLowerCase().includes(searchTerm),
    )
  }

  // Apply limit
  if (options?.limit) {
    filteredProducts = filteredProducts.slice(0, options.limit)
  }

  return filteredProducts
}

export async function getProductById(id: string): Promise<Product | null> {
  await delay(300)
  const product = products.find((p) => p.id === id)
  return product || null
}

export async function getCategories(): Promise<Category[]> {
  await delay(300)
  return categories
}

export async function getCategory(slug: string): Promise<Category | null> {
  await delay(300)
  const category = categories.find((c) => c.slug === slug)
  return category || null
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  await delay(400)
  return reviews
}

export async function getCurrentUser(): Promise<User | null> {
  await delay(300)
  // For demo purposes, always return the first user
  return users[0]
}

export async function getUserAddresses(userId: string): Promise<Address[]> {
  await delay(300)
  return addresses.filter((address) => address.userId === userId)
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  await delay(500)
  return orders
}

export async function getUserWishlist(userId: string): Promise<WishlistItem[]> {
  await delay(300)
  return wishlist.filter((item) => item.userId === userId)
}

export async function addToWishlist(userId: string, productId: string): Promise<WishlistItem> {
  await delay(300)
  const product = products.find((p) => p.id === productId)
  if (!product) {
    throw new Error("Product not found")
  }

  const newWishlistItem: WishlistItem = {
    id: `wish${Date.now()}`,
    productId,
    userId,
    product,
  }

  wishlist.push(newWishlistItem)
  return newWishlistItem
}

export async function removeFromWishlist(wishlistItemId: string): Promise<void> {
  await delay(300)
  const index = wishlist.findIndex((item) => item.id === wishlistItemId)
  if (index !== -1) {
    wishlist.splice(index, 1)
  }
}

export async function createOrder(orderData: any): Promise<Order> {
  await delay(800)

  const newOrder: Order = {
    id: `order${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
    status: "processing",
    items: orderData.items,
    subtotal: orderData.subtotal,
    shipping: orderData.shipping,
    tax: orderData.tax,
    total: orderData.total,
    shippingAddress: orderData.shippingAddress,
    payment: {
      method: orderData.paymentInfo.method,
      date: new Date().toISOString().split("T")[0],
    },
    estimatedShipping: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    timeline: {
      confirmed: new Date().toISOString(),
      processing: new Date().toISOString(),
    },
  }

  orders.push(newOrder)
  return newOrder
}

export async function createUserAddress(addressData: Partial<Address>, userId: string): Promise<Address> {
  await delay(500)

  // If this is the first address or marked as default, update other addresses
  if (addressData.isDefault) {
    addresses.forEach((addr) => {
      if (addr.userId === userId) {
        addr.isDefault = false
      }
    })
  }

  const newAddress: Address = {
    id: `addr${Date.now()}`,
    fullName: addressData.fullName || "",
    addressLine1: addressData.addressLine1 || "",
    addressLine2: addressData.addressLine2 || "",
    landmark: addressData.landmark || "",
    city: addressData.city || "",
    state: addressData.state || "",
    pinCode: addressData.pinCode || "",
    country: addressData.country || "India",
    mobileNumber: addressData.mobileNumber || "",
    isDefault: addressData.isDefault || addresses.filter((a) => a.userId === userId).length === 0,
    userId,
  }

  addresses.push(newAddress)
  return newAddress
}
