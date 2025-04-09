"use server"


import { client } from "@/lib/prisma"

// Sample product data
const products = [
  {
    id: "101",
    name: "Artisanal Jaggery Block",
    description:
      "Our premium Artisanal Jaggery Block is handcrafted using traditional methods that have been passed down through generations. Made from the finest sugarcane, this jaggery block offers a rich, complex flavor profile with notes of caramel, molasses, and a subtle earthiness that mass-produced alternatives simply cannot match.",
    longDescription:
      "Each block is carefully processed to preserve the natural nutrients and minerals found in sugarcane, making it not just a sweetener, but a nutritious alternative to refined sugar. The deep golden-brown color is a testament to its purity and the careful attention given during production.\n\nOur jaggery is sourced from sustainable farms where sugarcane is grown without harmful pesticides, ensuring you get a product that's good for both you and the environment. The traditional slow-cooking process allows the sugarcane juice to develop its characteristic rich flavor, resulting in a jaggery block that adds depth and complexity to any dish it's used in.\n\nUnlike refined sugar, which is stripped of all nutrients during processing, our jaggery retains essential minerals like iron, magnesium, and potassium. It's also rich in antioxidants and has a lower glycemic index compared to regular sugar, making it a healthier choice for those mindful of their sugar intake.\n\nWhether you're using it to sweeten your tea or coffee, as an ingredient in traditional desserts, or as a natural sweetener in your baking, our Artisanal Jaggery Block will elevate your culinary creations with its distinctive flavor and nutritional benefits.",
    price: 89.99,
    originalPrice: 99.99,
    stock: 15,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    features: [
      "100% Natural and Unrefined",
      "Rich in Iron and Minerals",
      "No Chemical Additives",
      "Traditional Slow-Cooked Process",
      "Sustainable Farming Practices",
    ],
    weight: "500g",
    dimensions: "10cm x 10cm x 5cm",
    brand: "Artisanal Foods",
    modelNumber: "JB-101",
    warranty: "30 days",
    countryOfOrigin: "India",
    onSale: true,
  },
  {
    id: "102",
    name: "Organic Jaggery Powder",
    description: "Finely ground organic jaggery powder for easy use in cooking and baking.",
    longDescription: "Detailed description of Organic Jaggery Powder...",
    price: 59.99,
    originalPrice: 69.99,
    stock: 25,
    rating: 4.6,
    reviewCount: 78,
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    features: ["100% Organic", "Easy to Dissolve", "No Additives", "Versatile Use"],
    weight: "250g",
    dimensions: "8cm x 8cm x 12cm",
    brand: "Artisanal Foods",
    modelNumber: "JP-102",
    warranty: "30 days",
    countryOfOrigin: "India",
    onSale: true,
  },
  {
    id: "103",
    name: "Premium Jaggery Gift Box",
    description: "Assorted jaggery varieties presented in an elegant gift box.",
    price: 129.99,
    stock: 10,
    rating: 4.9,
    reviewCount: 42,
    images: ["/placeholder.svg?height=600&width=600"],
    features: ["Assorted Varieties", "Elegant Packaging", "Perfect Gift", "Premium Quality"],
    brand: "Artisanal Foods",
    countryOfOrigin: "India",
  },
  {
    id: "104",
    name: "Jaggery Infused Honey",
    description: "Pure honey naturally infused with artisanal jaggery for a unique sweetness.",
    price: 79.99,
    stock: 18,
    rating: 4.7,
    reviewCount: 56,
    images: ["/placeholder.svg?height=600&width=600"],
    features: ["Natural Ingredients", "Unique Flavor", "Versatile Use", "No Preservatives"],
    brand: "Artisanal Foods",
    countryOfOrigin: "India",
  },
]

// Sample related products data
const relatedProductsData = {
  "101": [
    {
      id: "102",
      name: "Organic Jaggery Powder",
      description: "Finely ground organic jaggery powder for easy use in cooking and baking.",
      price: 59.99,
      images: ["/placeholder.svg?height=300&width=300"],
      rating: 4.6,
      reviewCount: 78,
      stock: 25,
      features: [],
    },
    {
      id: "103",
      name: "Premium Jaggery Gift Box",
      description: "Assorted jaggery varieties presented in an elegant gift box.",
      price: 129.99,
      images: ["/placeholder.svg?height=300&width=300"],
      rating: 4.9,
      reviewCount: 42,
      stock: 10,
      features: [],
    },
    {
      id: "104",
      name: "Jaggery Infused Honey",
      description: "Pure honey naturally infused with artisanal jaggery for a unique sweetness.",
      price: 79.99,
      images: ["/placeholder.svg?height=300&width=300"],
      rating: 4.7,
      reviewCount: 56,
      stock: 18,
      features: [],
    },
    {
      id: "105",
      name: "Jaggery Coated Nuts",
      description: "Premium mixed nuts coated with a thin layer of our signature jaggery.",
      price: 69.99,
      images: ["/placeholder.svg?height=300&width=300"],
      rating: 4.5,
      reviewCount: 38,
      stock: 22,
      features: [],
    },
  ],
  // Add more related products for other product IDs
}

// Sample reviews data
const reviewsData = {
  "101": [
    {
      id: 1,
      user: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "March 15, 2024",
      title: "Authentic taste of childhood",
      comment:
        "This jaggery block transported me back to my grandmother's kitchen in rural India. The flavor is rich, complex, and exactly how traditional jaggery should taste. I appreciate that it's made without chemicals and preserves all the natural minerals. Will definitely purchase again!",
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "February 28, 2024",
      title: "Excellent alternative to refined sugar",
      comment:
        "As someone trying to move away from processed sugars, this jaggery has been a wonderful discovery. The caramel notes add depth to my morning tea, and I love using it in baking. Taking off one star only because it's a bit difficult to break into smaller pieces, but the taste more than makes up for it.",
    },
    {
      id: 3,
      user: "Sophia Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "February 10, 2024",
      title: "Worth every penny",
      comment:
        "The quality of this jaggery is exceptional. It dissolves beautifully in hot drinks and adds a complexity that regular sugar simply cannot match. I've started using it in my homemade granola and the results are amazing. The sustainable farming practices are also a huge plus for me.",
    },
    {
      id: 4,
      user: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "January 25, 2024",
      title: "Amazing product, fast shipping",
      comment:
        "Not only is the jaggery of exceptional quality, but the shipping was incredibly fast. The packaging was secure and eco-friendly, which I really appreciated. The jaggery itself has a wonderful depth of flavor that makes even a simple cup of tea feel special.",
    },
    {
      id: 5,
      user: "Aisha Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "January 12, 2024",
      title: "Great taste, slightly pricey",
      comment:
        "The flavor profile of this jaggery is truly exceptional - rich, complex, and with lovely caramel notes. I use it in my traditional Indian desserts and the results are always fantastic. My only hesitation is the price point, which is a bit high compared to other options, but the quality does justify it.",
    },
  ],
  // Add more reviews for other product IDs
}

// Sample user data
const userData = {
  id: "user123",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
}

// Sample user addresses
const userAddresses = [
  {
    id: "addr1",
    name: "John Doe",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: true,
  },
  {
    id: "addr2",
    name: "John Doe",
    street: "456 Park Avenue",
    city: "Boston",
    state: "MA",
    zip: "02108",
    country: "United States",
    phone: "+1 (555) 123-4567",
    isDefault: false,
  },
]

// Sample orders data
const ordersData = [
  {
    id: "ORD12345",
    date: "March 15, 2024",
    status: "delivered",
    items: [
      {
        productId: "101",
        name: "Artisanal Jaggery Block",
        price: 89.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        productId: "102",
        name: "Organic Jaggery Powder",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    subtotal: 239.97,
    shipping: 0,
    tax: 16.8,
    total: 256.77,
    shippingAddress: userAddresses[0],
    payment: {
      method: "Credit Card",
      cardLast4: "1234",
      date: "March 15, 2024",
    },
    trackingNumber: "TRK987654321",
    timeline: {
      confirmed: "March 15, 2024",
      processing: "March 16, 2024",
      shipped: "March 17, 2024",
      delivered: "March 20, 2024",
    },
  },
  {
    id: "ORD12346",
    date: "February 28, 2024",
    status: "shipped",
    items: [
      {
        productId: "103",
        name: "Premium Jaggery Gift Box",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    subtotal: 129.99,
    shipping: 0,
    tax: 9.1,
    total: 139.09,
    shippingAddress: userAddresses[1],
    payment: {
      method: "PayPal",
      date: "February 28, 2024",
    },
    trackingNumber: "TRK123456789",
    estimatedDelivery: "March 25, 2024",
    timeline: {
      confirmed: "February 28, 2024",
      processing: "March 1, 2024",
      shipped: "March 3, 2024",
    },
  },
  {
    id: "ORD12347",
    date: "February 10, 2024",
    status: "processing",
    items: [
      {
        productId: "104",
        name: "Jaggery Infused Honey",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        productId: "105",
        name: "Jaggery Coated Nuts",
        price: 69.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    subtotal: 219.97,
    shipping: 0,
    tax: 15.4,
    total: 235.37,
    shippingAddress: userAddresses[0],
    payment: {
      method: "Credit Card",
      cardLast4: "5678",
      date: "February 10, 2024",
    },
    estimatedShipping: "March 26, 2024",
    timeline: {
      confirmed: "February 10, 2024",
      processing: "February 11, 2024",
    },
  },
  {
    id: "ORD12348",
    date: "January 5, 2024",
    status: "cancelled",
    items: [
      {
        productId: "102",
        name: "Organic Jaggery Powder",
        price: 59.99,
        quantity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    subtotal: 179.97,
    shipping: 0,
    tax: 12.6,
    total: 192.57,
    shippingAddress: userAddresses[0],
    payment: {
      method: "Credit Card",
      cardLast4: "1234",
      date: "January 5, 2024",
    },
    timeline: {
      confirmed: "January 5, 2024",
      processing: "January 6, 2024",
      cancelled: "January 7, 2024",
    },
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// API functions
export async function getProducts({
  featured,
  categoryId,
  limit,
}: { featured?: boolean; categoryId?: string; limit?: number } = {}) {
  // Simulate network request
  await delay(800)

  let filteredProducts = [...products]

  // Apply filters
  if (featured) {
    filteredProducts = filteredProducts.filter((p) => p.rating >= 4.5)
  }

  if (categoryId) {
    // In a real app, you would filter by category
    filteredProducts = filteredProducts.slice(0, 2) // Just a mock filter
  }

  // Apply limit
  if (limit && limit > 0) {
    filteredProducts = filteredProducts.slice(0, limit)
  }

  return filteredProducts
}

export async function getProductById(id: string) {
  // Simulate network request
  await delay(800)

  const product = products.find((p) => p.id === id)

  if (!product) {
    throw new Error(`Product with ID ${id} not found`)
  }

  return product
}

export async function getRelatedProducts(productId: string) {
  // Simulate network request
  await delay(600)

  return relatedProductsData[productId as keyof typeof relatedProductsData] || []
}

export async function getProductReviews(productId: string) {
  // Simulate network request
  await delay(700)

  return reviewsData[productId as keyof typeof reviewsData] || []
}

export async function submitProductReview({
  productId,
  review,
}: {
  productId: string
  review: {
    title: string
    comment: string
    rating: number
  }
}) {
  // Simulate network request
  await delay(1000)

  // In a real app, this would send the review to a server
  console.log("Submitting review for product", productId, review)

  // Simulate success
  return { success: true }
}

export async function getUserProfile() {
  // Simulate network request
  await delay(600)

  return userData
}

export async function updateUserProfile(data: any) {
  // Simulate network request
  await delay(800)

  // In a real app, this would update the user profile on the server
  console.log("Updating user profile:", data)

  // Simulate success
  return { ...userData, ...data }
}

export async function getUserAddresses() {
  // Simulate network request
  await delay(500)

  return userAddresses
}

export async function addUserAddress(addressData: any) {
  // Simulate network request
  await delay(700)

  // In a real app, this would add the address on the server
  console.log("Adding address:", addressData)

  // Simulate success
  const newAddress = {
    id: `addr${Date.now()}`,
    ...addressData,
  }

  return newAddress
}

export async function updateUserAddress({ id, ...addressData }: { id: string; [key: string]: any }) {
  // Simulate network request
  await delay(700)

  // In a real app, this would update the address on the server
  console.log("Updating address:", id, addressData)

  // Simulate success
  return {
    id,
    ...addressData,
  }
}

export async function deleteUserAddress(id: string) {
  // Simulate network request
  await delay(600)

  // In a real app, this would delete the address on the server
  console.log("Deleting address:", id)

  // Simulate success
  return { success: true }
}

export async function getUserOrders() {
  // Simulate network request
  await delay(800)

  return ordersData
}

export async function getOrderById(id: string) {
  // Simulate network request
  await delay(700)

  const order = ordersData.find((o) => o.id === id)

  if (!order) {
    throw new Error(`Order with ID ${id} not found`)
  }

  return order
}

export async function createOrder(orderData: any) {
  // Simulate network request
  await delay(1500)

  // In a real app, this would create the order on the server
  console.log("Creating order:", orderData)

  // Simulate success
  return {
    id: `ORD${Math.floor(10000 + Math.random() * 90000)}`,
    date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    status: "processing",
    ...orderData,
    timeline: {
      confirmed: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      processing: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    },
  }
}

// export async function getProductsByCategory(categorySlug: string, options?: { limit?: number }) {
//   try {
//     const category = await client

//     .category.findUnique({
//       where: {
//         slug: categorySlug,
//         isActive: true,
//       },
//       select: {
//         id: true,
//         children: {
//           select: {
//             id: true,
//           },
//         },
//       },
//     })

//     if (!category) {
//       return []
//     }

//     // Get all subcategory IDs to include their products too
//     const categoryIds = [category.id, ...(category.children?.map((child) => child.id) || [])]

//     const products = await client.product.findMany({
//       where: {
//         categoryId: {
//           in: categoryIds,
//         },
//         isActive: true,
//       },
//       include: {
//         images: {
//           where: {
//             isMain: true,
//           },
//           take: 1,
//         },
//         category: {
//           select: {
//             name: true,
//             slug: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//       take: options?.limit || undefined,
//     })

//     // Transform the data to match the expected format
//     return products.map((product) => ({
//       id: product.id,
//       name: product.name,
//       description: product.description,
//       price: product.price.toNumber(),
//       originalPrice: product.originalPrice?.toNumber(),
//       images: product.images.map((img) => img.url) || ["/placeholder.svg?height=300&width=300"],
//       stock: product.stock,
//       rating: product.rating,
//       reviewCount: product.reviewCount,
//       features: [], // This would be fetched separately if needed
//       onSale: product.onSale,
//       category: product.category,
//     }))
//   } catch (error) {
//     console.error(`Error fetching products for category ${categorySlug}:`, error)
//     return []
//   }
// }
