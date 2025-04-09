import { onAuthenticateUser } from "@/actions/user"
import { redirect } from "next/navigation"
import AdminDashboard from "./_components/dashboard"


export const metadata = {
  title: "Admin Dashboard | ShopEase",
  description: "Manage your e-commerce store",
}

export default async function AdminPage() {
  const session = await onAuthenticateUser()
  // Check if user is authenticated and is an admin
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/sign-in")
  }

  return <AdminDashboard />
}
