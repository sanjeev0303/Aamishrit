import { onAuthenticateUser } from "@/actions/user"
import { redirect } from "next/navigation"
import OrderManagement from "../_components/order-management"

export const metadata = {
  title: "Order Management | Admin Dashboard",
  description: "Manage customer orders for your store",
}

export default async function AdminOrdersPage() {
  const session = await onAuthenticateUser()

  // Check if user is authenticated and is an admin
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/sign-in")
  }

  return <OrderManagement />
}
