import { toast } from "sonner"
import { client } from "@/lib/prisma"

// Dashboard Data
export async function getDashboardData(timeRange: string) {
  try {
    // In a real application, this would be a fetch to your API
    // For demo purposes, we'll return mock data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      // KPI data
      revenue: {
        total: 24892.5,
        trend: 12.5,
      },
      orders: {
        total: 342,
        trend: 8.2,
      },
      customers: {
        total: 1205,
        trend: 15.3,
      },
      conversionRate: {
        rate: 3.2,
        trend: 0.5,
      },

      // Chart data
      revenueOverTime: [
        { date: "Jan", revenue: 4200 },
        { date: "Feb", revenue: 4800 },
        { date: "Mar", revenue: 5500 },
        { date: "Apr", revenue: 5200 },
        { date: "May", revenue: 6100 },
        { date: "Jun", revenue: 7500 },
        { date: "Jul", revenue: 8200 },
        { date: "Aug", revenue: 7800 },
        { date: "Sep", revenue: 8500 },
        { date: "Oct", revenue: 9200 },
        { date: "Nov", revenue: 10500 },
        { date: "Dec", revenue: 12000 },
      ],

      salesByCategory: [
        { name: "Electronics", value: 12450.8 },
        { name: "Clothing", value: 8320.5 },
        { name: "Home & Kitchen", value: 6125.3 },
        { name: "Beauty", value: 4890.2 },
        { name: "Books", value: 3200.1 },
      ],

      salesBreakdown: [
        { name: "Jan", online: 3800, inStore: 400 },
        { name: "Feb", online: 4300, inStore: 500 },
        { name: "Mar", online: 5000, inStore: 500 },
        { name: "Apr", online: 4700, inStore: 500 },
        { name: "May", online: 5500, inStore: 600 },
        { name: "Jun", online: 6800, inStore: 700 },
        { name: "Jul", online: 7500, inStore: 700 },
        { name: "Aug", online: 7100, inStore: 700 },
        { name: "Sep", online: 7800, inStore: 700 },
        { name: "Oct", online: 8500, inStore: 700 },
        { name: "Nov", online: 9800, inStore: 700 },
        { name: "Dec", online: 11200, inStore: 800 },
      ],

      orderStatusDistribution: [
        { status: "Pending", value: 45 },
        { status: "Processing", value: 85 },
        { status: "Shipped", value: 120 },
        { status: "Delivered", value: 350 },
        { status: "Cancelled", value: 20 },
      ],

      customerGrowth: [
        { date: "Jan", newCustomers: 120, activeCustomers: 450 },
        { date: "Feb", newCustomers: 140, activeCustomers: 520 },
        { date: "Mar", newCustomers: 160, activeCustomers: 580 },
        { date: "Apr", newCustomers: 180, activeCustomers: 620 },
        { date: "May", newCustomers: 200, activeCustomers: 680 },
        { date: "Jun", newCustomers: 220, activeCustomers: 750 },
        { date: "Jul", newCustomers: 240, activeCustomers: 820 },
        { date: "Aug", newCustomers: 260, activeCustomers: 880 },
        { date: "Sep", newCustomers: 280, activeCustomers: 940 },
        { date: "Oct", newCustomers: 300, activeCustomers: 1000 },
        { date: "Nov", newCustomers: 320, activeCustomers: 1080 },
        { date: "Dec", newCustomers: 340, activeCustomers: 1200 },
      ],

      // Recent activity
      recentOrders: [
        { id: "ORD-12345", customer: "John Doe", total: 129.99, status: "processing" },
        { id: "ORD-12344", customer: "Jane Smith", total: 89.99, status: "shipped" },
        { id: "ORD-12343", customer: "Robert Johnson", total: 239.99, status: "delivered" },
        { id: "ORD-12342", customer: "Emily Davis", total: 59.99, status: "delivered" },
        { id: "ORD-12341", customer: "Michael Brown", total: 149.99, status: "pending" },
      ],

      topProducts: [
        { id: "PROD-001", name: "Wireless Headphones", category: "Electronics", price: 89.99, sold: 120 },
        { id: "PROD-002", name: "Smart Watch", category: "Electronics", price: 199.99, sold: 95 },
        { id: "PROD-003", name: "Cotton T-Shirt", category: "Clothing", price: 24.99, sold: 85 },
        { id: "PROD-004", name: "Coffee Maker", category: "Home & Kitchen", price: 79.99, sold: 70 },
        { id: "PROD-005", name: "Facial Cleanser", category: "Beauty", price: 19.99, sold: 65 },
      ],
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    toast.error("Failed to fetch dashboard data")
    throw new Error("Failed to fetch dashboard data")
  }
}

// User Management
export async function getUsers(filters?: { role?: string; status?: string }) {
  try {
    // In a real application, this would be a fetch to your API
    // For demo purposes, we'll return mock data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const users = [
      {
        id: "USR-001",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "ADMIN",
        status: "active",
        avatar: "",
        createdAt: "2023-01-15T00:00:00Z",
        phone: "+1 (555) 123-4567",
        location: "New York, USA",
        addresses: [
          {
            name: "John Doe",
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
            phone: "+1 (555) 123-4567",
            isDefault: true,
          },
        ],
        orders: [
          {
            id: "ORD-12345",
            date: "2023-05-15T00:00:00Z",
            status: "delivered",
            total: 129.99,
          },
          {
            id: "ORD-12300",
            date: "2023-04-10T00:00:00Z",
            status: "delivered",
            total: 89.99,
          },
        ],
        activity: [
          {
            action: "Logged in",
            date: "2023-05-20T10:30:00Z",
          },
          {
            action: "Updated profile",
            date: "2023-05-18T14:20:00Z",
          },
          {
            action: "Placed order #ORD-12345",
            date: "2023-05-15T09:45:00Z",
            details: "Total: $129.99",
          },
        ],
      },
      {
        id: "USR-002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "USER",
        status: "active",
        avatar: "",
        createdAt: "2023-02-20T00:00:00Z",
        phone: "+1 (555) 987-6543",
        location: "Los Angeles, USA",
        addresses: [
          {
            name: "Jane Smith",
            street: "456 Oak Ave",
            city: "Los Angeles",
            state: "CA",
            zip: "90001",
            country: "USA",
            phone: "+1 (555) 987-6543",
            isDefault: true,
          },
        ],
        orders: [
          {
            id: "ORD-12344",
            date: "2023-05-12T00:00:00Z",
            status: "shipped",
            total: 89.99,
          },
        ],
        activity: [
          {
            action: "Logged in",
            date: "2023-05-19T16:45:00Z",
          },
          {
            action: "Placed order #ORD-12344",
            date: "2023-05-12T11:30:00Z",
            details: "Total: $89.99",
          },
        ],
      },
      {
        id: "USR-003",
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
        role: "USER",
        status: "inactive",
        avatar: "",
        createdAt: "2023-03-10T00:00:00Z",
        phone: "+1 (555) 456-7890",
        location: "Chicago, USA",
        addresses: [],
        orders: [
          {
            id: "ORD-12343",
            date: "2023-05-08T00:00:00Z",
            status: "delivered",
            total: 239.99,
          },
        ],
        activity: [
          {
            action: "Last login",
            date: "2023-05-08T08:15:00Z",
          },
          {
            action: "Placed order #ORD-12343",
            date: "2023-05-08T08:10:00Z",
            details: "Total: $239.99",
          },
        ],
      },
      {
        id: "USR-004",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        role: "USER",
        status: "active",
        avatar: "",
        createdAt: "2023-04-05T00:00:00Z",
        phone: "+1 (555) 789-0123",
        location: "Miami, USA",
        addresses: [
          {
            name: "Emily Davis",
            street: "789 Pine St",
            city: "Miami",
            state: "FL",
            zip: "33101",
            country: "USA",
            phone: "+1 (555) 789-0123",
            isDefault: true,
          },
        ],
        orders: [
          {
            id: "ORD-12342",
            date: "2023-05-05T00:00:00Z",
            status: "delivered",
            total: 59.99,
          },
        ],
        activity: [
          {
            action: "Logged in",
            date: "2023-05-20T09:00:00Z",
          },
          {
            action: "Updated shipping address",
            date: "2023-05-15T13:20:00Z",
          },
          {
            action: "Placed order #ORD-12342",
            date: "2023-05-05T10:30:00Z",
            details: "Total: $59.99",
          },
        ],
      },
      {
        id: "USR-005",
        name: "Michael Brown",
        email: "michael.brown@example.com",
        role: "USER",
        status: "blocked",
        avatar: "",
        createdAt: "2023-01-25T00:00:00Z",
        phone: "+1 (555) 234-5678",
        location: "Seattle, USA",
        addresses: [
          {
            name: "Michael Brown",
            street: "101 Cedar Rd",
            city: "Seattle",
            state: "WA",
            zip: "98101",
            country: "USA",
            phone: "+1 (555) 234-5678",
            isDefault: true,
          },
        ],
        orders: [
          {
            id: "ORD-12341",
            date: "2023-05-01T00:00:00Z",
            status: "pending",
            total: 149.99,
          },
        ],
        activity: [
          {
            action: "Account blocked",
            date: "2023-05-10T14:00:00Z",
            details: "Multiple payment failures",
          },
          {
            action: "Placed order #ORD-12341",
            date: "2023-05-01T16:45:00Z",
            details: "Total: $149.99",
          },
        ],
      },
    ]

    // Apply filters
    let filteredUsers = [...users]

    if (filters?.role && filters.role !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.role === filters.role)
    }

    if (filters?.status && filters.status !== "all") {
      filteredUsers = filteredUsers.filter((user) => user.status === filters.status)
    }

    return filteredUsers
  } catch (error) {
    console.error("Error fetching users:", error)
    toast.error("Failed to fetch users")
    throw new Error("Failed to fetch users")
  }
}

// Product Management
export async function getProducts(filters?: { categoryId?: string; inStock?: boolean }) {
  try {
    // In a real application, this would be a fetch to your API
    // For demo purposes, we'll return mock data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const products = [
      {
        id: "PROD-001",
        name: "Wireless Headphones",
        description: "Premium wireless headphones with noise cancellation",
        price: 89.99,
        originalPrice: 119.99,
        stock: 120,
        images: ["/placeholder.svg?height=200&width=200"],
        categoryId: "CAT-001",
        category: { id: "CAT-001", name: "Electronics" },
        isActive: true,
        isFeatured: true,
        rating: 4.5,
        reviewCount: 128,
        features: ["Active Noise Cancellation", "40-hour battery life", "Bluetooth 5.0", "Built-in microphone"],
        totalSales: 450,
        revenue: 40495.5,
        lastOrdered: "2023-05-20T00:00:00Z",
      },
      {
        id: "PROD-002",
        name: "Smart Watch",
        description: "Feature-rich smartwatch with health tracking",
        price: 199.99,
        stock: 95,
        images: ["/placeholder.svg?height=200&width=200"],
        categoryId: "CAT-001",
        category: { id: "CAT-001", name: "Electronics" },
        isActive: true,
        isFeatured: true,
        rating: 4.7,
        reviewCount: 95,
        features: ["Heart rate monitoring", "GPS tracking", "Water resistant", "7-day battery life"],
        totalSales: 320,
        revenue: 63996.8,
        lastOrdered: "2023-05-19T00:00:00Z",
      },
      {
        id: "PROD-003",
        name: "Cotton T-Shirt",
        description: "Comfortable 100% cotton t-shirt",
        price: 24.99,
        stock: 85,
        images: ["/placeholder.svg?height=200&width=200"],
        categoryId: "CAT-002",
        category: { id: "CAT-002", name: "Clothing" },
        isActive: true,
        isFeatured: false,
        rating: 4.2,
        reviewCount: 210,
        features: ["100% cotton", "Machine washable", "Available in multiple colors", "Unisex design"],
        variants: [
          { name: "Small / Black", price: 24.99, stock: 25 },
          { name: "Medium / Black", price: 24.99, stock: 30 },
          { name: "Large / Black", price: 24.99, stock: 20 },
          { name: "Small / White", price: 24.99, stock: 10 },
          { name: "Medium / White", price: 24.99, stock: 0 },
          { name: "Large / White", price: 24.99, stock: 0 },
        ],
        totalSales: 580,
        revenue: 14494.2,
        lastOrdered: "2023-05-18T00:00:00Z",
      },
      {
        id: "PROD-004",
        name: "Coffee Maker",
        description: "Programmable coffee maker with thermal carafe",
        price: 79.99,
        stock: 70,
        images: ["/placeholder.svg?height=200&width=200"],
        categoryId: "CAT-003",
        category: { id: "CAT-003", name: "Home & Kitchen" },
        isActive: true,
        isFeatured: false,
        rating: 4.4,
        reviewCount: 75,
        features: ["10-cup capacity", "Programmable timer", "Auto shut-off", "Thermal carafe"],
        totalSales: 210,
        revenue: 16797.9,
        lastOrdered: "2023-05-17T00:00:00Z",
      },
      {
        id: "PROD-005",
        name: "Facial Cleanser",
        description: "Gentle facial cleanser for all skin types",
        price: 19.99,
        stock: 65,
        images: ["/placeholder.svg?height=200&width=200"],
        categoryId: "CAT-004",
        category: { id: "CAT-004", name: "Beauty" },
        isActive: true,
        isFeatured: false,
        rating: 4.6,
        reviewCount: 150,
        features: ["Suitable for all skin types", "Fragrance-free", "Dermatologist tested", "Cruelty-free"],
        totalSales: 320,
        revenue: 6396.8,
        lastOrdered: "2023-05-16T00:00:00Z",
      },
      {
        id: "PROD-006",
        name: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with 360° sound",
        price: 49.99,
        stock: 0,
        images: ["/placeholder.svg?height=200&width=200"],
        categoryId: "CAT-001",
        category: { id: "CAT-001", name: "Electronics" },
        isActive: true,
        isFeatured: false,
        rating: 4.3,
        reviewCount: 85,
        features: ["10-hour battery life", "Waterproof design", "Bluetooth 5.0", "Built-in microphone"],
        totalSales: 180,
        revenue: 8998.2,
        lastOrdered: "2023-05-10T00:00:00Z",
      },
    ]

    // Apply filters
    let filteredProducts = [...products]

    if (filters?.categoryId) {
      filteredProducts = filteredProducts.filter((product) => product.categoryId === filters.categoryId)
    }

    if (filters?.inStock !== undefined) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.inStock ? product.stock > 0 : product.stock === 0,
      )
    }

    return filteredProducts
  } catch (error) {
    console.error("Error fetching products:", error)
    toast.error("Failed to fetch products")
    throw new Error("Failed to fetch products")
  }
}

export async function getCategories() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      { id: "cm96p6c420001bt30q2m3q7bv", name: "Jaggery", slug: "jaggery", productCount: 15 },
      { id: "cm96p6c420001bt30q2m3q7bv", name: "Herbal-Tea", slug: "herbal-tea", productCount: 25 },
      { id: "cm96p6c420001bt30q2m3q7bv", name: "Cookies", slug: "cookies", productCount: 18 },
    ]
  } catch (error) {
    console.error("Error fetching categories:", error)
    toast.error("Failed to fetch categories")
    throw new Error("Failed to fetch categories")
  }
}

export async function createProduct(data: any) {
  try {
    // In a real application, this would be a POST to your API
    // For demo purposes, we'll simulate a successful creation

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate a random ID
    const id = `PROD-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`

    return {
      id,
      ...data,
      createdAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error creating product:", error)
    toast.error("Failed to create product")
    throw new Error("Failed to create product")
  }
}

export async function updateProduct(data: any) {
  try {
    // In a real application, this would be a PUT to your API
    // For demo purposes, we'll simulate a successful update

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      ...data,
      updatedAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error updating product:", error)
    toast.error("Failed to update product")
    throw new Error("Failed to update product")
  }
}

export async function deleteProduct(id: string) {
  try {
    // In a real application, this would be a DELETE to your API
    // For demo purposes, we'll simulate a successful deletion

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true }
  } catch (error) {
    console.error("Error deleting product:", error)
    toast.error("Failed to delete product")
    throw new Error("Failed to delete product")
  }
}

// Order Management
export async function getOrders(filters?: { status?: string; dateRange?: string }) {
  try {
    // In a real application, this would be a fetch to your API
    // For demo purposes, we'll return mock data

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const orders = [
      {
        id: "ORD-12345",
        date: "2023-05-15T00:00:00Z",
        customer: {
          id: "USR-001",
          name: "John Doe",
          email: "john.doe@example.com",
        },
        total: 129.99,
        subtotal: 119.99,
        tax: 10.0,
        shipping: 0,
        discount: 0,
        status: "processing",
        paymentMethod: "Credit Card",
        items: [
          {
            id: "ITEM-001",
            productId: "PROD-001",
            name: "Wireless Headphones",
            price: 89.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
          },
          {
            id: "ITEM-002",
            productId: "PROD-005",
            name: "Facial Cleanser",
            price: 19.99,
            quantity: 2,
            image: "/placeholder.svg?height=80&width=80",
          },
        ],
      },
      {
        id: "ORD-12344",
        date: "2023-05-12T00:00:00Z",
        customer: {
          id: "USR-002",
          name: "Jane Smith",
          email: "jane.smith@example.com",
        },
        total: 89.99,
        subtotal: 79.99,
        tax: 5.0,
        shipping: 5.0,
        discount: 0,
        status: "shipped",
        paymentMethod: "PayPal",
        items: [
          {
            id: "ITEM-003",
            productId: "PROD-002",
            name: "Smart Watch",
            price: 199.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
          },
        ],
      },
      {
        id: "ORD-12343",
        date: "2023-05-08T00:00:00Z",
        customer: {
          id: "USR-003",
          name: "Robert Johnson",
          email: "robert.johnson@example.com",
        },
        total: 239.99,
        subtotal: 219.99,
        tax: 20.0,
        shipping: 0,
        discount: 0,
        status: "delivered",
        paymentMethod: "Credit Card",
        items: [
          {
            id: "ITEM-004",
            productId: "PROD-006",
            name: "Bluetooth Speaker",
            price: 49.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
          },
          {
            id: "ITEM-005",
            productId: "PROD-004",
            name: "Coffee Maker",
            price: 79.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
          },
          {
            id: "ITEM-006",
            productId: "PROD-003",
            name: "Cotton T-Shirt",
            price: 24.99,
            quantity: 2,
            image: "/placeholder.svg?height=80&width=80",
          },
        ],
      },
      {
        id: "ORD-12342",
        date: "2023-05-05T00:00:00Z",
        customer: {
          id: "USR-004",
          name: "Emily Davis",
          email: "emily.davis@example.com",
        },
        total: 59.99,
        subtotal: 49.99,
        tax: 5.0,
        shipping: 5.0,
        discount: 0,
        status: "delivered",
        paymentMethod: "Credit Card",
        items: [
          {
            id: "ITEM-007",
            productId: "PROD-006",
            name: "Bluetooth Speaker",
            price: 49.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
          },
        ],
      },
      {
        id: "ORD-12341",
        date: "2023-05-01T00:00:00Z",
        customer: {
          id: "USR-005",
          name: "Michael Brown",
          email: "michael.brown@example.com",
        },
        total: 149.99,
        subtotal: 139.99,
        tax: 10.0,
        shipping: 0,
        discount: 0,
        status: "pending",
        paymentMethod: "Credit Card",
        items: [
          {
            id: "ITEM-008",
            productId: "PROD-001",
            name: "Wireless Headphones",
            price: 89.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
          },
          {
            id: "ITEM-009",
            productId: "PROD-003",
            name: "Cotton T-Shirt",
            price: 24.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
          },
          {
            id: "ITEM-010",
            productId: "PROD-005",
            name: "Facial Cleanser",
            price: 19.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
          },
        ],
      },
    ]

    // Apply filters
    let filteredOrders = [...orders]

    if (filters?.status && filters.status !== "all") {
      filteredOrders = filteredOrders.filter((order) => order.status === filters.status)
    }

    if (filters?.dateRange && filters.dateRange !== "all") {
      const now = new Date()
      let startDate: Date

      switch (filters.dateRange) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0))
          break
        case "yesterday":
          startDate = new Date(now)
          startDate.setDate(startDate.getDate() - 1)
          startDate.setHours(0, 0, 0, 0)
          const endOfYesterday = new Date(startDate)
          endOfYesterday.setHours(23, 59, 59, 999)
          filteredOrders = filteredOrders.filter((order) => {
            const orderDate = new Date(order.date)
            return orderDate >= startDate && orderDate <= endOfYesterday
          })
          return filteredOrders
        case "week":
          startDate = new Date(now)
          startDate.setDate(startDate.getDate() - 7)
          break
        case "month":
          startDate = new Date(now)
          startDate.setMonth(startDate.getMonth() - 1)
          break
        case "year":
          startDate = new Date(now)
          startDate.setFullYear(startDate.getFullYear() - 1)
          break
        default:
          return filteredOrders
      }

      filteredOrders = filteredOrders.filter((order) => {
        const orderDate = new Date(order.date)
        return orderDate >= startDate
      })
    }

    return filteredOrders
  } catch (error) {
    console.error("Error fetching orders:", error)
    toast.error("Failed to fetch orders")
    throw new Error("Failed to fetch orders")
  }
}

export async function getOrderById(id: string) {
  try {
    // In a real application, this would be a fetch to your API
    // For demo purposes, we'll return mock data

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Find the order with the matching ID
    const orders = await getOrders()
    const order = orders.find(order => order.id === id)

    if (!order) {
      throw new Error("Order not found")
    }

    // Add additional details for the order view
    return {
      ...order,
      shippingAddress: {
        name: order.customer.name,
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
        phone: "+1 (555) 123-4567"
      },
      shippingMethod: "Standard Shipping",
      trackingNumber: order.status === "shipped" || order.status === "delivered" ? "TRK12345678" : null,
            estimatedDelivery: order.status === "shipped" ? "2023-05-25T00:00:00Z" : null
          }
        } catch (error) {
          console.error("Error fetching order:", error)
          toast.error("Failed to fetch order")
          throw new Error("Failed to fetch order")
        }
      }



    //   export async function createCategory(data: {
    //     name: string
    //     slug: string
    //     description?: string
    //     parentId?: string
    //     isActive: boolean
    //     image?: string
    //   })


    //   export async function updateCategory(data: {
    //     id: string
    //     name: string
    //     slug: string
    //     description?: string
    //     parentId?: string
    //     isActive: boolean
    //     image?: string
    //   }) {
    //     try {
    //       const category = await client.category.update({
    //         where: {
    //           id: data.id,
    //         },
    //         data: {
    //           name: data.name,
    //           slug: data.slug,
    //           description: data.description,
    //           parentId: data.parentId || null,
    //           isActive: data.isActive,
    //           image: data.image,
    //         },
    //       })

    //       return category
    //     } catch (error) {
    //       console.error("Error updating category:", error)
    //       throw new Error("Failed to update category")
    //     }
    //   }

    //   export async function deleteCategory(id: string) {
    //     try {
    //       // First update any products in this category to have no category
    //       await client.product.updateMany({
    //         where: {
    //           categoryId: id,
    //         },
    //         data: {
    //           categoryId: null as any, // This would require a default category in a real app
    //         },
    //       })

    //       // Then delete the category
    //       const category = await client.category.delete({
    //         where: {
    //           id,
    //         },
    //       })

    //       return category
    //     } catch (error) {
    //       console.error("Error deleting category:", error)
    //       throw new Error("Failed to delete category")
    //     }
    //   }





      export async function updateOrderStatus(data: {
        orderId: string
        status: string
        note?: string
        trackingNumber?: string
      }) {
        try {
          // Prepare the update data
          const updateData: any = {
            status: data.status,
            notes: data.note ? data.note || "" : undefined,
          }

          // Add tracking number if provided
          if (data.trackingNumber) {
            updateData.trackingNumber = data.trackingNumber
          }

          // Update the timestamp based on the new status
          switch (data.status) {
            case "PENDING":
              updateData.confirmedAt = new Date()
              break
            case "PROCESSING":
              updateData.processingAt = new Date()
              break
            case "SHIPPED":
              updateData.shippedAt = new Date()
              break
            case "DELIVERED":
              updateData.deliveredAt = new Date()
              break
            case "CANCELLED":
              updateData.cancelledAt = new Date()
              break
          }

          const order = await client.order.update({
            where: {
              id: data.orderId,
            },
            data: updateData,
          })

          return order
        } catch (error) {
          console.error("Error updating order status:", error)
          throw new Error("Failed to update order status")
        }
      }
