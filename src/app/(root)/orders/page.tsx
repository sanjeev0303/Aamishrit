"use client"


import Footer from "@/components/global/footer"

export default function OrderPage() {
//   const [expandedOrder, setExpandedOrder] = useState<number | null>(null)

//   const toggleOrderExpand = (orderId: number) => {
//     if (expandedOrder === orderId) {
//       setExpandedOrder(null)
//     } else {
//       setExpandedOrder(orderId)
//     }
//   }

  // Sample order data

//   const orders = [
//     {
//       id: 1,
//       orderNumber: "ORD-7829",
//       date: "March 25, 2025",
//       total: "$249.95",
//       status: "Delivered",
//       items: [
//         {
//           id: 101,
//           name: "Artisanal Jaggery Block",
//           price: "$89.99",
//           quantity: 1,
//           image: "https://images.unsplash.com/photo-1742646895349-93c71c08e693?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         },
//         {
//           id: 102,
//           name: "Organic Jaggery Powder",
//           price: "$59.99",
//           quantity: 2,
//           image: "https://images.unsplash.com/photo-1742576948659-3c630862a38d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         },
//         {
//           id: 103,
//           name: "Premium Jaggery Gift Box",
//           price: "$39.98",
//           quantity: 1,
//           image: "https://images.unsplash.com/photo-1742654230443-7c19cb55cd46?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         },
//       ],
//     },
//     {
//       id: 2,
//       orderNumber: "ORD-7830",
//       date: "March 27, 2025",
//       total: "$159.97",
//       status: "Processing",
//       items: [
//         {
//           id: 201,
//           name: "Jaggery Infused Honey",
//           price: "$79.99",
//           quantity: 1,
//           image: "https://images.unsplash.com/photo-1742732370413-063ed597e8f4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         },
//         {
//           id: 202,
//           name: "Jaggery Coated Nuts",
//           price: "$39.99",
//           quantity: 2,
//           image: "https://images.unsplash.com/photo-1742830444687-7dfd4c0934a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         },
//       ],
//     },
//     {
//       id: 3,
//       orderNumber: "ORD-7831",
//       date: "March 28, 2025",
//       total: "$129.99",
//       status: "Shipped",
//       items: [
//         {
//           id: 301,
//           name: "Luxury Jaggery Hamper",
//           price: "$129.99",
//           quantity: 1,
//           image: "https://images.unsplash.com/photo-1741619215920-1db7baf88f6e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         },
//       ],
//     },
//   ]

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "Delivered":
//         return <CheckCircle className="h-5 w-5 text-emerald-600" />
//       case "Processing":
//         return <Clock className="h-5 w-5 text-amber-600" />
//       case "Shipped":
//         return <Truck className="h-5 w-5 text-blue-600" />
//       default:
//         return <Package className="h-5 w-5 text-gray-600" />
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Delivered":
//         return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
//       case "Processing":
//         return "bg-amber-100 text-amber-800 hover:bg-amber-200"
//       case "Shipped":
//         return "bg-blue-100 text-blue-800 hover:bg-blue-200"
//       default:
//         return "bg-gray-100 text-gray-800 hover:bg-gray-200"
//     }
//   }

  return (
    <div className="min-h-screen bg-[#FDF7F0]">

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-18 pt-2 mb-8">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#6B4226]">My Orders</h2>
          <p className="text-[#8B5A2B] mt-2">Track and manage your orders</p>
        </div>

            <div className="space-y-6">
              {/* {orders.map((order) => (
                <OrderItem key={order.id} orderItems={order} />
              ))} */}
            </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}
