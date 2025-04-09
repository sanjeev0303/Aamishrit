import { redirect } from "next/navigation"
import CategoryManagement from "../_components/category-management"
import { onAuthenticateUser } from "@/actions/user"


export const metadata = {
  title: "Category Management | Admin Dashboard",
  description: "Manage product categories for your store",
}

export default async function AdminCategoriesPage() {
  const session = await onAuthenticateUser()

  // Check if user is authenticated and is an admin
  if (!session || session?.user?.role !== "ADMIN") {
    redirect("/api/auth/signin")
  }

  return <CategoryManagement />
}
