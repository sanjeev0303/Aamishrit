import { onAuthenticateUser } from "@/actions/user"
import { redirect } from "next/navigation"
import UserManagement from "../_components/user-management"


export const metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage users of your e-commerce platform",
}

export default async function UsersPage() {
  const session = await onAuthenticateUser()

  // Check if user is authenticated and is an admin
  if (!session || session?.user?.role !== "ADMIN") {
    redirect("/api/auth/signin")
  }

  return <UserManagement />
}
